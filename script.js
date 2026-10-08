// Datos de muestra para la propuesta. En la versión final vienen del catálogo semanal y del listado de tiendas.
// Las fotos están recortadas del mockup de referencia; se reemplazan por las del catálogo real.
const DEPTOS = {
  frutas: "Frutas y verduras",
  carnes: "Carnes",
  lacteos: "Lácteos y refrigerados",
  abarrotes: "Abarrotes",
  limpieza: "Limpieza del hogar",
  higiene: "Higiene personal",
  bebidas: "Bebidas"
};

// tam: "big" o "small" define el tamaño en el anaquel animado de la portada
const PRODUCTOS = [
  { id: "platano", cat: "frutas", nombre: "Plátano Chiapas", pres: "Kilo", precio: 24.9, unidad: "kg", antes: 29.9, img: "img/p-platano.webp", bg: "#F5EFE9", tam: "big" },
  { id: "leche", cat: "lacteos", nombre: "Leche Lala entera", pres: "Caja de 1 L", precio: 27.9, unidad: "pz", antes: 30.5, img: "img/p-leche.webp", bg: "#F5EEE8", tam: "small" },
  { id: "res", cat: "carnes", nombre: "Bistec de res", pres: "Kilo", precio: 169, unidad: "kg", antes: 189, img: "img/p-res.webp", bg: "#1D2A4A", tam: "small" },
  { id: "huevo", cat: "lacteos", nombre: "Huevo blanco", pres: "30 piezas", precio: 49, unidad: "pz", antes: 62, img: "img/p-huevo.webp", bg: "#F4EEE7", tam: "big" },
  { id: "limpiador", cat: "limpieza", nombre: "Limpiador multiusos", pres: "Atomizador de 650 ml", precio: 29.9, unidad: "pz", antes: 36.5, img: "img/p-limpiador.webp", bg: "#ECE4D9", tam: "small" },
  { id: "jitomate", cat: "frutas", nombre: "Jitomate saladet", pres: "Kilo", precio: 19.9, unidad: "kg", antes: 26.9, img: "img/p-jitomate.webp", bg: "#E41D1E", tam: "small" },
  { id: "pollo", cat: "carnes", nombre: "Pierna y muslo de pollo", pres: "Kilo", precio: 64.9, unidad: "kg", antes: 74.9 },
  { id: "aceite", cat: "abarrotes", nombre: "Aceite vegetal", pres: "Botella de 1 L", precio: 34.9, unidad: "pz", antes: 41.5 },
  { id: "arroz", cat: "abarrotes", nombre: "Arroz súper extra", pres: "Bolsa de 1 kg", precio: 24.5, unidad: "pz", antes: 29 },
  { id: "frijol", cat: "abarrotes", nombre: "Frijol negro", pres: "Bolsa de 1 kg", precio: 32.9, unidad: "pz", antes: 38 },
  { id: "atun", cat: "abarrotes", nombre: "Atún en agua", pres: "Lata de 140 g", precio: 49, unidad: "", antes: null, promo: "3 por" },
  { id: "cafe", cat: "abarrotes", nombre: "Café soluble", pres: "Frasco de 200 g", precio: 89, unidad: "pz", antes: 104 },
  { id: "jamon", cat: "lacteos", nombre: "Jamón de pavo", pres: "Paquete de 250 g", precio: 29.9, unidad: "pz", antes: 36.5 },
  { id: "salchicha", cat: "lacteos", nombre: "Salchicha de pavo", pres: "Paquete de 500 g", precio: 34.5, unidad: "pz", antes: 41 },
  { id: "queso", cat: "lacteos", nombre: "Queso amarillo", pres: "12 rebanadas", precio: 36.5, unidad: "pz", antes: 42 },
  { id: "detergente", cat: "limpieza", nombre: "Detergente en polvo", pres: "Bolsa de 1 kg", precio: 36.9, unidad: "pz", antes: 44.9 },
  { id: "cloro", cat: "limpieza", nombre: "Cloro", pres: "Botella de 950 ml", precio: 14.5, unidad: "pz", antes: 17.9 },
  { id: "lavatrastes", cat: "limpieza", nombre: "Lavatrastes líquido", pres: "Botella de 750 ml", precio: 27.9, unidad: "pz", antes: 33 },
  { id: "papel", cat: "higiene", nombre: "Papel higiénico", pres: "12 rollos", precio: 72, unidad: "pz", antes: 85 },
  { id: "pasta", cat: "higiene", nombre: "Pasta dental", pres: "Tubo de 100 ml", precio: 22.9, unidad: "pz", antes: 27.5 },
  { id: "refresco", cat: "bebidas", nombre: "Refresco de cola", pres: "Botella de 3 L", precio: 42, unidad: "pz", antes: 48 }
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

/* ---------- Utilidades ---------- */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const sinAcentos = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const dinero = n => `$${n.toFixed(2)}`;
const porId = Object.fromEntries(PRODUCTOS.map(p => [p.id, p]));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const ICO = {
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true" class="ico-fill"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true" class="ico-fill"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>',
  frutas: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7c-3-2-7-1-7 4 0 5 3 10 7 9 4 1 7-4 7-9 0-5-4-6-7-4z"/><path d="M12 7c0-2 1-3.5 3-4"/></svg>',
  carnes: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 4.5a5 5 0 0 1 4.9 6.2c-.8 3.4-4.6 4.8-7.4 5.4L8 20a2 2 0 1 1-2.8-2.8l-.4-.4A2 2 0 1 1 7.6 14l3.9-4a6 6 0 0 1 3-5.5z"/></svg>',
  lacteos: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 2.5h6M9.5 2.5v3L7 9v12.5h10V9l-2.5-3.5v-3"/><path d="M7 13h10"/></svg>',
  abarrotes: '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="5.5" rx="6" ry="2"/><path d="M6 5.5v13c0 1.1 2.7 2 6 2s6-.9 6-2v-13"/><path d="M6 10.5c0 1.1 2.7 2 6 2s6-.9 6-2"/></svg>',
  limpieza: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 9h7l1 12H7z"/><path d="M10 9V6h4l3-2v5"/><path d="M14 4.5h-4"/></svg>',
  higiene: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="6"/><circle cx="12" cy="9" r="2"/><path d="M6 9v10h12V9"/></svg>',
  bebidas: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 2.5h4M10.5 2.5V6L8 9.5v12h8v-12L13.5 6V2.5"/><path d="M8 14h8"/></svg>'
};

function etiqueta(p) {
  const [ent, dec] = p.precio.toFixed(2).split(".");
  const pre = p.promo ? `<small class="pre">${p.promo}</small>` : "";
  return `<p class="ptag" aria-hidden="true">${pre}<span class="cur">$</span><span class="ent">${ent}</span><span class="dec"><b>.${dec}</b><small>${p.unidad || ""}</small></span></p>`;
}
function precioLeido(p) {
  const u = p.unidad === "kg" ? " el kilo" : p.unidad === "pz" ? " la pieza" : "";
  return `<span class="sr-only">${p.promo ? p.promo + " " : ""}${dinero(p.precio)}${u}</span>`;
}

/* ---------- Toast ---------- */
const toast = $("#toast");
let toastTimer;
function avisar(texto) {
  toast.textContent = texto;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------- Anaquel animado (promos de la semana) ---------- */
const shelf = $("#shelf");
const track = $("#shelf-track");
const destacados = PRODUCTOS.filter(p => p.img);

function tarjeta(p, i) {
  return `
    <article class="pcard pcard-${p.tam}">
      <div class="pcard-media" style="--bg:${p.bg}">
        <img src="${p.img}" alt="" width="645" height="483" ${i > 3 ? 'loading="lazy"' : ""}>
        ${etiqueta(p)}
      </div>
      <div class="pcard-foot">
        <div><h3>${p.nombre}</h3><p>${p.pres}${precioLeido(p)}</p></div>
        <button class="add" type="button" data-add="${p.id}" aria-label="Agregar ${p.nombre} a mi lista">${ICO.plus}</button>
      </div>
    </article>`;
}
const set = destacados.map(tarjeta).join("");
track.innerHTML = `<div class="shelf-set">${set}</div><div class="shelf-set" aria-hidden="true" inert>${set}</div>`;

function velocidadAnaquel() {
  const mitad = track.scrollWidth / 2;
  track.style.setProperty("--shelf-dur", `${Math.max(18, mitad / 42)}s`);
}
window.addEventListener("load", velocidadAnaquel);
window.addEventListener("resize", velocidadAnaquel);
velocidadAnaquel();

const pauseBtn = $("#shelf-pause");
pauseBtn.addEventListener("click", () => {
  const pausar = pauseBtn.getAttribute("aria-pressed") !== "true";
  pauseBtn.setAttribute("aria-pressed", String(pausar));
  shelf.classList.toggle("is-paused", pausar);
  pauseBtn.innerHTML = `${pausar ? ICO.play : ICO.pause}<span>${pausar ? "Reanudar" : "Pausar"}</span>`;
});

/* ---------- Mi lista ---------- */
const CLAVE = "dunosusa-mi-lista";
let lista = {};
try { lista = JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch (e) { lista = {}; }
const pill = $("#list-pill");
const pillCount = $("#list-count");

function guardar() {
  try { localStorage.setItem(CLAVE, JSON.stringify(lista)); } catch (e) { /* sin almacenamiento: la lista vive en la sesión */ }
}
function totalPiezas() { return Object.values(lista).reduce((a, b) => a + b, 0); }

function pintarPill() {
  const n = totalPiezas();
  pill.hidden = n === 0;
  pillCount.textContent = n;
  pill.setAttribute("aria-label", `Mi lista, ${n} ${n === 1 ? "producto" : "productos"}`);
}

function agregar(id, boton) {
  lista[id] = (lista[id] || 0) + 1;
  guardar();
  pintarPill();
  pill.classList.remove("bump"); void pill.offsetWidth; pill.classList.add("bump");
  avisar(`Agregaste ${porId[id].nombre} a tu lista`);
  if (boton) {
    boton.classList.add("is-added");
    boton.innerHTML = ICO.check;
    setTimeout(() => { boton.classList.remove("is-added"); boton.innerHTML = ICO.plus; }, 1000);
  }
  if (listDialog.open) pintarLista();
}

document.addEventListener("click", e => {
  const b = e.target.closest("[data-add]");
  if (b) agregar(b.dataset.add, b);
});

const listDialog = $("#list-dialog");
const listItems = $("#list-items");
const listFoot = $("#list-foot");

function pintarLista() {
  const ids = Object.keys(lista).filter(id => porId[id] && lista[id] > 0);
  if (!ids.length) {
    listItems.innerHTML = `<li class="list-empty">Tu lista está vacía. Toca el botón + en cualquier promoción para agregarla.</li>`;
    listFoot.hidden = true;
    return;
  }
  listFoot.hidden = false;
  let total = 0;
  const lineas = [];
  listItems.innerHTML = ids.map(id => {
    const p = porId[id], n = lista[id];
    const sub = p.precio * n;
    total += sub;
    lineas.push(`- ${n} x ${p.nombre} (${p.pres}) ${dinero(sub)}`);
    return `
      <li class="list-item">
        <h3>${p.nombre}</h3>
        <p>${p.pres} · ${p.promo ? p.promo + " " : ""}${dinero(p.precio)}</p>
        <div class="qty">
          <button type="button" data-qty="-1" data-id="${id}" aria-label="Quitar uno de ${p.nombre}">−</button>
          <output aria-label="Cantidad de ${p.nombre}">${n}</output>
          <button type="button" data-qty="1" data-id="${id}" aria-label="Agregar uno de ${p.nombre}">+</button>
        </div>
      </li>`;
  }).join("");
  $("#list-total").textContent = dinero(total);
  const texto = `Mi lista Dunosusa\n${lineas.join("\n")}\nTotal aproximado: ${dinero(total)}`;
  $("#list-wa").href = `https://wa.me/?text=${encodeURIComponent(texto)}`;
}

listItems.addEventListener("click", e => {
  const b = e.target.closest("[data-qty]");
  if (!b) return;
  const id = b.dataset.id;
  lista[id] = Math.max(0, (lista[id] || 0) + Number(b.dataset.qty));
  if (!lista[id]) delete lista[id];
  guardar(); pintarPill(); pintarLista();
});
$("#list-clear").addEventListener("click", () => { lista = {}; guardar(); pintarPill(); pintarLista(); });
pill.addEventListener("click", () => { pintarLista(); listDialog.showModal(); });
pintarPill();

/* ---------- Todas las promociones ---------- */
const promosDialog = $("#promos-dialog");
const grid = $("#offer-grid");
const sheetChips = $("#sheet-chips");
const sheetQuery = $("#sheet-query");
let filtro = { cat: "todo", q: "" };

sheetChips.innerHTML = [["todo", "Todo"], ...Object.entries(DEPTOS)]
  .map(([k, v]) => `<button class="chip" type="button" data-sheet-cat="${k}" aria-pressed="false">${v}</button>`).join("");

function pintarPromos() {
  $$("[data-sheet-cat]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.sheetCat === filtro.cat)));
  const q = sinAcentos(filtro.q.trim());
  const res = PRODUCTOS.filter(p =>
    (filtro.cat === "todo" || p.cat === filtro.cat) &&
    (!q || sinAcentos(`${p.nombre} ${p.pres} ${DEPTOS[p.cat]}`).includes(q))
  );
  sheetQuery.hidden = !q;
  if (q) sheetQuery.innerHTML = `<span>${res.length} ${res.length === 1 ? "resultado" : "resultados"} para "${esc(filtro.q.trim())}"</span><button class="link-btn" type="button" id="clear-q">Quitar búsqueda</button>`;

  if (!res.length) {
    grid.innerHTML = `<li class="offer-empty">${q ? `No hay promociones de "${esc(filtro.q.trim())}" esta semana. Prueba con otra palabra o elige un departamento.` : "Esta semana no hay promociones en este departamento. Elige otro."}</li>`;
    return;
  }
  grid.innerHTML = res.map(p => {
    const texto = encodeURIComponent(`${p.nombre} ${p.pres} a ${dinero(p.precio)} esta semana en Dunosusa`);
    const thumb = p.img ? `<img src="${p.img}" alt="" loading="lazy">` : ICO[p.cat];
    return `
      <li class="offer">
        <div class="offer-thumb" style="--bg:${p.img ? p.bg : "var(--cream-2)"}">${thumb}</div>
        <h3>${p.nombre}</h3>
        <p class="offer-pres">${p.pres}${precioLeido(p)}</p>
        <div class="offer-row">
          <div>${etiqueta(p)}${p.antes ? `<p class="offer-before">Antes <s>${dinero(p.antes)}</s></p>` : `<p class="offer-before">Llévate 3 latas</p>`}</div>
          <div class="offer-acts">
            <a class="offer-share" href="https://wa.me/?text=${texto}" target="_blank" rel="noopener">Compartir</a>
            <button class="add" type="button" data-add="${p.id}" aria-label="Agregar ${p.nombre} a mi lista">${ICO.plus}</button>
          </div>
        </div>
      </li>`;
  }).join("");
}

function abrirPromos(cat = "todo", q = "") {
  filtro = { cat, q };
  pintarPromos();
  if (!promosDialog.open) promosDialog.showModal();
  grid.scrollTop = 0;
}

sheetChips.addEventListener("click", e => {
  const b = e.target.closest("[data-sheet-cat]");
  if (b) { filtro.cat = b.dataset.sheetCat; pintarPromos(); }
});
sheetQuery.addEventListener("click", e => {
  if (e.target.id === "clear-q") { filtro.q = ""; $("#buscar").value = ""; pintarPromos(); }
});
$$("[data-open-promos]").forEach(el => el.addEventListener("click", e => { e.preventDefault(); abrirPromos(); }));
$$("[data-filter]").forEach(el => el.addEventListener("click", () => abrirPromos(el.dataset.filter)));
$("#search-form").addEventListener("submit", e => {
  e.preventDefault();
  abrirPromos("todo", $("#buscar").value);
});

// Cerrar hojas: botón, clic fuera y Escape (nativo)
$$("dialog").forEach(d => {
  d.addEventListener("click", e => { if (e.target === d || e.target.closest("[data-close]")) d.close(); });
});

/* ---------- Carrusel de categorías ---------- */
const catList = $("#cat-list");
const railBtns = $$("[data-rail]");
function estadoRail() {
  const max = catList.scrollWidth - catList.clientWidth - 2;
  railBtns[0].disabled = catList.scrollLeft <= 2;
  railBtns[1].disabled = catList.scrollLeft >= max;
}
railBtns.forEach(b => b.addEventListener("click", () => {
  catList.scrollBy({ left: Number(b.dataset.rail) * 172 * 2, behavior: reduceMotion.matches ? "auto" : "smooth" });
}));
catList.addEventListener("scroll", estadoRail, { passive: true });
window.addEventListener("resize", estadoRail);
estadoRail();

/* ---------- Tiendas ---------- */
const storeList = $("#store-list");
const q = $("#q");
const status = $("#finder-status");
const moreStores = $("#more-stores");
const TIENDAS_VISIBLES = 6;
let estadoActivo = "todos";
let miUbicacion = null;
let verTodasTiendas = false;

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
  let res = TIENDAS.filter(t =>
    (estadoActivo === "todos" || t.estado === estadoActivo) &&
    (!texto || sinAcentos(`${t.nombre} ${t.dir} ${t.ciudad}`).includes(texto))
  );
  if (miUbicacion) res = res.map(t => ({ ...t, km: distanciaKm(miUbicacion, t) })).sort((a, b) => a.km - b.km);

  if (!res.length) {
    moreStores.hidden = true;
    storeList.innerHTML = `<li class="store-empty">No encontramos tiendas con "${esc(q.value.trim())}". Prueba con el nombre del municipio o usa tu ubicación.</li>`;
    return;
  }
  const recortar = !texto && !miUbicacion && res.length > TIENDAS_VISIBLES;
  moreStores.hidden = !recortar || verTodasTiendas;
  if (recortar && !verTodasTiendas) res = res.slice(0, TIENDAS_VISIBLES);
  if (miUbicacion && !texto) res = res.slice(0, 6);

  const abierta = abiertaAhora();
  storeList.innerHTML = res.map(t => {
    const ruta = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Dunosusa ${t.dir}, ${t.ciudad}, ${t.estado}`)}`;
    const km = t.km != null ? `<span>a ${t.km < 10 ? t.km.toFixed(1) : Math.round(t.km)} km</span>` : "";
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
$$("[data-state]").forEach(btn => btn.addEventListener("click", () => {
  estadoActivo = btn.dataset.state;
  $$("[data-state]").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
  pintarTiendas();
}));

function ubicar() {
  if (!("geolocation" in navigator)) {
    status.textContent = "Tu navegador no permite usar la ubicación. Escribe tu colonia o municipio.";
    return;
  }
  status.textContent = "Buscando tiendas cerca de ti…";
  navigator.geolocation.getCurrentPosition(
    pos => {
      miUbicacion = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      estadoActivo = "todos";
      $$("[data-state]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.state === "todos")));
      q.value = "";
      pintarTiendas();
      status.textContent = "Ordenadas de la más cercana a la más lejana.";
    },
    () => { status.textContent = "No pudimos obtener tu ubicación. Revisa el permiso del navegador o escribe tu colonia."; },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
  );
}
$("#locate").addEventListener("click", ubicar);
$$("[data-locate], #near-btn").forEach(a => a.addEventListener("click", ubicar));
pintarTiendas();

/* ---------- Banderola: respeta "reducir movimiento" y se detiene fuera de pantalla ---------- */
const cintas = $$("svg.ribbon");
let heroVisible = true;
function moverCintas() {
  cintas.forEach(s => {
    if (typeof s.pauseAnimations !== "function") return;
    if (reduceMotion.matches || !heroVisible) s.pauseAnimations(); else s.unpauseAnimations();
  });
}
if ("IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; moverCintas(); }).observe($(".hero"));
}
reduceMotion.addEventListener?.("change", moverCintas);
moverCintas();

/* ---------- Menú en pantallas medianas y celular ---------- */
const toggle = $(".nav-toggle");
const menu = $("#menu");
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
const tabs = $$('[role="tab"]');
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
const notesBtn = $("#notes-toggle");
const notas = $$(".note");
notesBtn.textContent = `Ver qué cambia (${notas.length})`;
notesBtn.addEventListener("click", () => {
  const mostrar = notesBtn.getAttribute("aria-pressed") !== "true";
  notesBtn.setAttribute("aria-pressed", String(mostrar));
  notas.forEach(n => (n.hidden = !mostrar));
  notesBtn.textContent = mostrar ? "Ocultar notas" : `Ver qué cambia (${notas.length})`;
});
