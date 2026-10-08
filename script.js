// Datos de muestra para la propuesta. En la versión final vienen del catálogo y del listado de tiendas.
const OFERTAS = [
  { cat: "despensa", nombre: "Aceite vegetal", pres: "Botella de 1 L", precio: 34.9, antes: 41.5 },
  { cat: "lacteos", nombre: "Huevo blanco", pres: "Paquete de 18 piezas", precio: 58, antes: 66 },
  { cat: "limpieza", nombre: "Detergente en polvo", pres: "Bolsa de 1 kg", precio: 36.9, antes: 44.9 },
  { cat: "higiene", nombre: "Papel higiénico", pres: "12 rollos", precio: 72, antes: 85 },
  { cat: "despensa", nombre: "Arroz súper extra", pres: "Bolsa de 1 kg", precio: 24.5, antes: 29 },
  { cat: "bebidas", nombre: "Refresco de cola", pres: "Botella de 3 L", precio: 42, antes: 48 },
  { cat: "salchichoneria", nombre: "Jamón de pavo", pres: "Paquete de 250 g", precio: 29.9, antes: 36.5 },
  { cat: "despensa", nombre: "Frijol negro", pres: "Bolsa de 1 kg", precio: 32.9, antes: 38 },
  { cat: "lacteos", nombre: "Leche entera", pres: "Caja de 1 L", precio: 25.9, antes: 28.5 },
  { cat: "limpieza", nombre: "Cloro", pres: "Botella de 950 ml", precio: 14.5, antes: 17.9 },
  { cat: "despensa", nombre: "Atún en agua", pres: "Lata de 140 g", precio: 49, antes: null, promo: "3 por" },
  { cat: "higiene", nombre: "Pasta dental", pres: "Tubo de 100 ml", precio: 22.9, antes: 27.5 },
  { cat: "salchichoneria", nombre: "Salchicha de pavo", pres: "Paquete de 500 g", precio: 34.5, antes: 41 },
  { cat: "bebidas", nombre: "Café soluble", pres: "Frasco de 200 g", precio: 89, antes: 104 },
  { cat: "lacteos", nombre: "Queso amarillo", pres: "12 rebanadas", precio: 36.5, antes: 42 },
  { cat: "limpieza", nombre: "Lavatrastes líquido", pres: "Botella de 750 ml", precio: 27.9, antes: 33 }
];

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
  { nombre: "Playa del Carmen, Palmas", dir: "Fraccionamiento Las Palmas", ciudad: "Playa del Carmen", estado: "Quintana Roo", lat: 20.6560, lng: -87.0930 },
  { nombre: "Playa del Carmen, Nueva Creación", dir: "Col. Nueva Creación", ciudad: "Playa del Carmen", estado: "Quintana Roo", lat: 20.6360, lng: -87.0900 }
];

const TONOS = ["yellow", "pink", "green", "orange"];
const INCLINACION = ["-1.6deg", "1.1deg", "-0.6deg", "1.8deg", "-1.2deg", "0.7deg"];

const esc = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const sinAcentos = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const pesos = n => {
  const [ent, dec] = n.toFixed(2).split(".");
  return `$${ent}<sup>${dec}</sup>`;
};

/* ---------- Ofertas ---------- */
const tagList = document.getElementById("tag-list");
const moreBtn = document.getElementById("more-tags");
const VISIBLES = 8;
let catActiva = "todo";
let verTodas = false;

function pintarOfertas(cat = catActiva) {
  catActiva = cat;
  let lista = cat === "todo" ? OFERTAS : OFERTAS.filter(o => o.cat === cat);
  const recortar = cat === "todo" && lista.length > VISIBLES;
  moreBtn.hidden = !recortar;
  if (recortar) {
    moreBtn.textContent = verTodas ? "Ver menos ofertas" : `Ver las ${lista.length} ofertas`;
    moreBtn.setAttribute("aria-expanded", String(verTodas));
    if (!verTodas) lista = lista.slice(0, VISIBLES);
  }
  if (!lista.length) {
    tagList.innerHTML = `<li class="empty-tags">Esta semana no hay ofertas en este departamento. Elige otro.</li>`;
    return;
  }
  tagList.innerHTML = lista.map((o, i) => {
    const ahorro = o.antes ? Math.round((1 - o.precio / o.antes) * 100) : null;
    const texto = encodeURIComponent(`${o.nombre} ${o.pres} a $${o.precio.toFixed(2)} esta semana en Dunosusa`);
    return `
      <li class="tag" data-tone="${TONOS[i % TONOS.length]}" style="--tilt:${INCLINACION[i % INCLINACION.length]}">
        ${ahorro ? `<span class="tag-deal">-${ahorro}%</span>` : ""}
        <p class="tag-name">${o.nombre}</p>
        <p class="tag-size">${o.pres}</p>
        <p class="tag-price">${o.promo ? `<span style="font-size:.5em">${o.promo} </span>` : ""}${pesos(o.precio)}</p>
        ${o.antes ? `<p class="tag-before">Antes <s>$${o.antes.toFixed(2)}</s></p>` : `<p class="tag-before">Llévate 3 latas</p>`}
        <a class="tag-share" href="https://wa.me/?text=${texto}" target="_blank" rel="noopener">Compartir por WhatsApp</a>
      </li>`;
  }).join("");
}

document.querySelectorAll("[data-cat]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-cat]").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    pintarOfertas(btn.dataset.cat);
  });
});
moreBtn.addEventListener("click", () => {
  verTodas = !verTodas;
  pintarOfertas();
  if (!verTodas) document.getElementById("ofertas").scrollIntoView({ block: "start" });
});
pintarOfertas("todo");

/* ---------- Tiendas ---------- */
const storeList = document.getElementById("store-list");
const q = document.getElementById("q");
const status = document.getElementById("finder-status");
let estadoActivo = "todos";
let miUbicacion = null;
let verTodasTiendas = false;
const moreStores = document.getElementById("more-stores");
const TIENDAS_VISIBLES = 6;

function distanciaKm(a, b) {
  const R = 6371, rad = x => x * Math.PI / 180;
  const dLat = rad(b.lat - a.lat), dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function abiertaAhora() {
  const h = new Date().getHours();
  return h >= 7 && h < 22;
}

function pintarTiendas() {
  const texto = sinAcentos(q.value.trim());
  let lista = TIENDAS.filter(t =>
    (estadoActivo === "todos" || t.estado === estadoActivo) &&
    (!texto || sinAcentos(`${t.nombre} ${t.dir} ${t.ciudad}`).includes(texto))
  );

  if (miUbicacion) {
    lista = lista.map(t => ({ ...t, km: distanciaKm(miUbicacion, t) })).sort((a, b) => a.km - b.km);
  }

  if (!lista.length) {
    moreStores.hidden = true;
    storeList.innerHTML = `<li class="store-empty">No encontramos tiendas con "${esc(q.value.trim())}". Prueba con el nombre del municipio o usa tu ubicación.</li>`;
    return;
  }

  const recortar = !texto && !miUbicacion && lista.length > TIENDAS_VISIBLES;
  moreStores.hidden = !recortar || verTodasTiendas;
  if (recortar && !verTodasTiendas) lista = lista.slice(0, TIENDAS_VISIBLES);
  if (miUbicacion && !texto) lista = lista.slice(0, 8);

  const abierta = abiertaAhora();
  storeList.innerHTML = lista.map(t => {
    const ruta = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Dunosusa ${t.dir}, ${t.ciudad}, ${t.estado}`)}`;
    const km = t.km != null ? `<span>${t.km < 10 ? t.km.toFixed(1) : Math.round(t.km)} km</span>` : "";
    return `
      <li class="store">
        <h3>${t.nombre}</h3>
        <p class="store-addr">${t.dir}, ${t.ciudad}, ${t.estado}</p>
        <div class="store-meta">
          ${abierta ? `<span class="open">Abierta hasta las 22:00</span>` : `<span class="closed">Cerrada, abre a las 7:00</span>`}
          ${km}
        </div>
        <a class="store-go" href="${ruta}" target="_blank" rel="noopener">Cómo llegar</a>
      </li>`;
  }).join("");
}

q.addEventListener("input", pintarTiendas);
moreStores.addEventListener("click", () => { verTodasTiendas = true; pintarTiendas(); });

document.querySelectorAll("[data-state]").forEach(btn => {
  btn.addEventListener("click", () => {
    estadoActivo = btn.dataset.state;
    document.querySelectorAll("[data-state]").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    pintarTiendas();
  });
});

document.getElementById("locate").addEventListener("click", () => {
  if (!("geolocation" in navigator)) {
    status.textContent = "Tu navegador no permite usar la ubicación. Escribe tu colonia o municipio.";
    return;
  }
  status.textContent = "Buscando tiendas cerca de ti…";
  navigator.geolocation.getCurrentPosition(
    pos => {
      miUbicacion = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      estadoActivo = "todos";
      document.querySelectorAll("[data-state]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.state === "todos")));
      q.value = "";
      pintarTiendas();
      status.textContent = "Ordenadas de la más cercana a la más lejana.";
    },
    () => {
      status.textContent = "No pudimos obtener tu ubicación. Revisa el permiso del navegador o escribe tu colonia.";
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
  );
});

pintarTiendas();

/* ---------- Menú en celular ---------- */
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => {
  const abierto = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(abierto));
  toggle.textContent = abierto ? "Cerrar" : "Menú";
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.textContent = "Menú";
}));

/* ---------- Horarios por pestaña ---------- */
const tabs = [...document.querySelectorAll('[role="tab"]')];
function activar(tab) {
  tabs.forEach(t => {
    const sel = t === tab;
    t.setAttribute("aria-selected", String(sel));
    t.tabIndex = sel ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !sel;
  });
}
tabs.forEach((t, i) => {
  t.addEventListener("click", () => activar(t));
  t.addEventListener("keydown", e => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const sig = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    activar(sig);
    sig.focus();
  });
});

/* ---------- Notas de la propuesta ---------- */
const notesBtn = document.getElementById("notes-toggle");
const notas = document.querySelectorAll(".note");
notesBtn.textContent = `Ver qué cambia (${notas.length})`;
notesBtn.addEventListener("click", () => {
  const mostrar = notesBtn.getAttribute("aria-pressed") !== "true";
  notesBtn.setAttribute("aria-pressed", String(mostrar));
  notas.forEach(n => (n.hidden = !mostrar));
  notesBtn.textContent = mostrar ? "Ocultar notas" : `Ver qué cambia (${notas.length})`;
});
