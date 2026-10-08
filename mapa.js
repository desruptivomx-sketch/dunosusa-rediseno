// Mapa de tiendas Dunosusa (Leaflet + OpenStreetMap). Datos de muestra con coordenadas aproximadas;
// en la versión final se conecta al listado completo de tiendas.
(() => {
  const TIENDAS = [
    { nombre: "Mérida Centro, calle 65", dir: "Calle 65 No. 477-A x 54 y 56, Centro", ciudad: "Mérida", estado: "Yucatán", lat: 20.9646, lng: -89.6206 },
    { nombre: "Mérida Centro, calle 69", dir: "Calle 69 No. 474 x 54 y 56, Centro", ciudad: "Mérida", estado: "Yucatán", lat: 20.9622, lng: -89.6203 },
    { nombre: "Vista Alegre", dir: "Fraccionamiento Vista Alegre", ciudad: "Mérida", estado: "Yucatán", lat: 20.9930, lng: -89.5790 },
    { nombre: "José María Iturralde", dir: "Calle 15, Col. José María Iturralde", ciudad: "Mérida", estado: "Yucatán", lat: 20.9890, lng: -89.5640 },
    { nombre: "Kanasín, Pedregales", dir: "Calle 9 No. 232, Pedregales de Kanasín II", ciudad: "Kanasín", estado: "Yucatán", lat: 20.9350, lng: -89.5650 },
    { nombre: "Chicxulub Puerto", dir: "Calle 21, Centro", ciudad: "Chicxulub Puerto", estado: "Yucatán", lat: 21.2920, lng: -89.6070 },
    { nombre: "Motul", dir: "Centro", ciudad: "Motul", estado: "Yucatán", lat: 21.0950, lng: -89.2830 },
    { nombre: "Homún", dir: "Calle 17 No. 101-B entre 20 y 22, Centro", ciudad: "Homún", estado: "Yucatán", lat: 20.7390, lng: -89.2850 },
    { nombre: "Oxkutzcab", dir: "Calle 51 No. 143-A entre 62 y 64", ciudad: "Oxkutzcab", estado: "Yucatán", lat: 20.3030, lng: -89.4180 },
    { nombre: "Calkiní", dir: "Calle 7 No. 100, San Isidro", ciudad: "Calkiní", estado: "Campeche", lat: 20.3710, lng: -90.0510 },
    { nombre: "Champotón", dir: "Calle 10 No. 8 x 3 y 5, Col. Venustiano Carranza", ciudad: "Champotón", estado: "Campeche", lat: 19.3490, lng: -90.7230 },
    { nombre: "Playa del Carmen, Colosio", dir: "Col. Colosio", ciudad: "Playa del Carmen", estado: "Quintana Roo", lat: 20.6450, lng: -87.0800 },
    { nombre: "Playa del Carmen, Las Palmas", dir: "Fraccionamiento Las Palmas", ciudad: "Playa del Carmen", estado: "Quintana Roo", lat: 20.6560, lng: -87.0930 },
    { nombre: "Playa del Carmen, Nueva Creación", dir: "Col. Nueva Creación", ciudad: "Playa del Carmen", estado: "Quintana Roo", lat: 20.6360, lng: -87.0900 }
  ].map((t, i) => ({ ...t, id: i }));

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const sinAcentos = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const esCel = () => window.matchMedia("(max-width: 860px)").matches;

  const lista = $("#store-list");
  const input = $("#map-query");
  const estadoTxt = $("#tiendas-status");
  const conteo = $("#results-count");
  const masBtn = $("#more-stores");
  if (!lista || !input) return;

  const VISIBLES = 6;
  let estado = "todos", yoPos = null, verTodas = false, activa = null;

  const PIN = '<svg viewBox="0 0 32 42" aria-hidden="true"><path d="M16 1C7.7 1 1 7.6 1 15.8 1 27 16 41 16 41s15-14 15-25.2C31 7.6 24.3 1 16 1z"/><circle cx="16" cy="15.5" r="5.5"/></svg>';
  const PIN_MINI = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2z"/></svg>';

  const km = (a, b) => {
    const R = 6371, r = x => x * Math.PI / 180;
    const h = Math.sin(r(b.lat - a.lat) / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(r(b.lng - a.lng) / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };
  const kmTxt = d => (d < 10 ? d.toFixed(1) : Math.round(d)) + " km";
  const abierta = () => { const h = new Date().getHours(); return h >= 7 && h < 22; };
  const horario = () => abierta() ? '<span class="abierta">Abierta hasta las 22:00</span>' : '<span class="cerrada">Cerrada, abre a las 7:00</span>';
  const ruta = t => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Dunosusa ${t.dir}, ${t.ciudad}, ${t.estado}`)}`;

  /* ---------- Mapa ---------- */
  let mapa = null, capa = null, yoMarca = null;
  const marcas = new Map();

  function iniciarMapa() {
    const cont = $("#store-map");
    if (!window.L) { cont.hidden = true; $("#map-fallback").hidden = false; return; }
    mapa = L.map(cont, { scrollWheelZoom: false, dragging: !L.Browser.mobile, tap: false, zoomSnap: 0.5 }).setView([20.97, -89.62], 8);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      maxZoom: 19, subdomains: "abcd",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(mapa);
    capa = L.layerGroup().addTo(mapa);

    // El mapa no secuestra el scroll: la rueda hace zoom solo después de un clic; en celular se mueve con dos dedos
    const pista = document.createElement("div");
    pista.className = "mapa-pista";
    pista.textContent = L.Browser.mobile ? "Usa dos dedos para mover el mapa" : "Haz clic en el mapa para hacer zoom con la rueda";
    pista.hidden = true;
    cont.appendChild(pista);
    let t;
    const avisar = () => { pista.hidden = false; clearTimeout(t); t = setTimeout(() => (pista.hidden = true), 1400); };
    cont.addEventListener("wheel", () => { if (!mapa.scrollWheelZoom.enabled()) avisar(); }, { passive: true });
    mapa.on("click", () => { mapa.scrollWheelZoom.enable(); pista.hidden = true; });
    cont.addEventListener("mouseleave", () => mapa.scrollWheelZoom.disable());
    if (L.Browser.mobile) {
      cont.addEventListener("touchstart", e => {
        if (e.touches.length > 1) { mapa.dragging.enable(); pista.hidden = true; } else { mapa.dragging.disable(); avisar(); }
      }, { passive: true });
    }
  }

  const icono = on => L.divIcon({ className: "mapa-pin" + (on ? " is-on" : ""), html: PIN, iconSize: [32, 42], iconAnchor: [16, 41], popupAnchor: [0, -38] });
  const ventana = t => `<h3>${t.nombre}</h3><p>${t.dir}, ${t.ciudad}, ${t.estado}</p><p>${horario()}${t.dist != null ? ` · a ${kmTxt(t.dist)}` : ""}</p><a class="tienda-ir" href="${ruta(t)}" target="_blank" rel="noopener">Cómo llegar</a>`;

  function abrirAlTerminar(m) {
    if (!m || !mapa) return;
    let hecho = false;
    const abrir = () => { if (!hecho) { hecho = true; m.openPopup(); } };
    mapa.once("moveend", abrir);
    setTimeout(abrir, 450);
  }

  function pintarMapa(res) {
    if (!mapa) return;
    capa.clearLayers(); marcas.clear();
    res.forEach(t => {
      const m = L.marker([t.lat, t.lng], { icon: icono(t.id === activa), title: t.nombre, alt: `Tienda ${t.nombre}`, riseOnHover: true })
        .bindPopup(ventana(t), { maxWidth: 260, autoPanPadding: [24, 24] })
        .on("click", () => marcar(t.id, false));
      m.addTo(capa); marcas.set(t.id, m);
    });
    let pts = res.map(t => [t.lat, t.lng]);
    if (yoPos) pts = pts.slice(0, 3).concat([[yoPos.lat, yoPos.lng]]);
    if (!pts.length) return;
    if (pts.length === 1) mapa.setView(pts[0], 15);
    else mapa.fitBounds(pts, { padding: [40, 40], maxZoom: 14 });
  }

  function marcar(id, desdeLista) {
    activa = id;
    marcas.forEach((m, k) => m.setIcon(icono(k === id)));
    $$(".tienda").forEach(li => li.classList.toggle("is-active", Number(li.dataset.id) === id));
    const m = marcas.get(id);
    if (desdeLista && m) {
      mapa.setView(m.getLatLng(), Math.max(mapa.getZoom(), 15), { animate: !reduce.matches });
      abrirAlTerminar(m);
      if (esCel()) $("#store-map").scrollIntoView({ block: "center", behavior: reduce.matches ? "auto" : "smooth" });
    } else if (!desdeLista) {
      $(`.tienda[data-id="${id}"]`)?.scrollIntoView({ block: "nearest", behavior: reduce.matches ? "auto" : "smooth" });
    }
  }

  /* ---------- Lista ---------- */
  function filtrar() {
    const q = sinAcentos(input.value.trim());
    const res = TIENDAS.filter(t =>
      (estado === "todos" || t.estado === estado) &&
      (!q || sinAcentos(`${t.nombre} ${t.dir} ${t.ciudad} ${t.estado}`).includes(q))
    ).map(t => ({ ...t, dist: yoPos ? km(yoPos, t) : null }));
    if (yoPos) res.sort((a, b) => a.dist - b.dist);
    return res;
  }

  function pintar() {
    let res = filtrar();
    pintarMapa(res);
    if (!res.length) {
      masBtn.hidden = true; conteo.textContent = "";
      lista.innerHTML = `<li class="tienda-vacia">No encontramos tiendas con "${esc(input.value.trim())}". Prueba con el nombre del municipio o usa tu ubicación.</li>`;
      return res;
    }
    conteo.textContent = `${res.length} ${res.length === 1 ? "tienda" : "tiendas"}${yoPos ? ", de la más cercana a la más lejana" : " en el mapa"}`;
    const total = res.length;
    const cortar = total > VISIBLES && !verTodas;
    masBtn.hidden = !cortar;
    if (cortar) { masBtn.textContent = `Ver las ${total} tiendas`; res = res.slice(0, VISIBLES); }
    lista.innerHTML = res.map(t => `
      <li class="tienda${t.id === activa ? " is-active" : ""}" data-id="${t.id}">
        <h3>${t.nombre}</h3>
        <p class="tienda-dir">${t.dir}, ${t.ciudad}, ${t.estado}</p>
        <div class="tienda-meta">${horario()}${t.dist != null ? `<span>a ${kmTxt(t.dist)}</span>` : ""}</div>
        <div class="tienda-acts">
          ${mapa ? `<button class="tienda-ver" type="button" data-ver="${t.id}">${PIN_MINI}Ver en el mapa</button>` : ""}
          <a class="tienda-ir" href="${ruta(t)}" target="_blank" rel="noopener">Cómo llegar</a>
        </div>
      </li>`).join("");
    return filtrar();
  }

  lista.addEventListener("click", e => { const b = e.target.closest("[data-ver]"); if (b) marcar(Number(b.dataset.ver), true); });
  input.addEventListener("input", () => { verTodas = false; pintar(); });
  $("#map-form").addEventListener("submit", e => e.preventDefault());
  masBtn.addEventListener("click", () => { verTodas = true; pintar(); });
  $$("[data-state]").forEach(b => b.addEventListener("click", () => {
    estado = b.dataset.state; verTodas = false;
    $$("[data-state]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    pintar();
  }));

  /* ---------- Ubicación ---------- */
  function ubicar() {
    if (!("geolocation" in navigator)) { estadoTxt.textContent = "Tu navegador no permite usar la ubicación. Escribe tu ciudad o colonia."; return; }
    estadoTxt.textContent = "Buscando tiendas cerca de ti…";
    navigator.geolocation.getCurrentPosition(pos => {
      yoPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      estado = "todos"; input.value = ""; verTodas = false;
      $$("[data-state]").forEach(x => x.setAttribute("aria-pressed", String(x.dataset.state === "todos")));
      if (mapa) {
        yoMarca?.remove();
        yoMarca = L.marker([yoPos.lat, yoPos.lng], {
          icon: L.divIcon({ className: "mapa-yo", html: "<span></span>", iconSize: [20, 20], iconAnchor: [10, 10] }),
          title: "Tu ubicación", keyboard: false, zIndexOffset: 1000
        }).bindPopup("Estás aquí").addTo(mapa);
      }
      const cerca = TIENDAS.map(t => ({ ...t, dist: km(yoPos, t) })).sort((a, b) => a.dist - b.dist)[0];
      activa = cerca.id;
      pintar();
      abrirAlTerminar(marcas.get(cerca.id));
      estadoTxt.textContent = `Tu tienda más cercana es ${cerca.nombre}, a ${kmTxt(cerca.dist)}.`;
    }, () => {
      estadoTxt.textContent = "No pudimos obtener tu ubicación. Revisa el permiso del navegador o escribe tu ciudad o colonia.";
    }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
  }
  $("#locate").addEventListener("click", ubicar);
  $$("[data-locate]").forEach(a => a.addEventListener("click", ubicar));

  /* ---------- Buscador del banner amarillo ---------- */
  const formBanner = $("#store-form"), inputBanner = $("#store-query"), msgBanner = $("#store-message");
  formBanner?.addEventListener("submit", e => {
    e.preventDefault();
    const q = (inputBanner.value || "").trim();
    if (!q) { inputBanner.focus(); return; }
    if (/^\d{5}$/.test(q)) {
      msgBanner.textContent = "Por ahora busca por ciudad, colonia o municipio. El código postal se activa con el listado completo.";
      return;
    }
    input.value = q; estado = "todos"; verTodas = false;
    $$("[data-state]").forEach(x => x.setAttribute("aria-pressed", String(x.dataset.state === "todos")));
    const n = pintar().length;
    msgBanner.textContent = n ? `${n} ${n === 1 ? "tienda encontrada" : "tiendas encontradas"}. Te llevamos al mapa.` : `No encontramos tiendas con "${q}". Prueba con otra ciudad.`;
    if (n) $("#tiendas").scrollIntoView({ behavior: reduce.matches ? "auto" : "smooth", block: "start" });
  });

  iniciarMapa();
  pintar();
})();
