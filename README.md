# Propuesta de rediseño: Dunosusa

Propuesta de sitio web para [Abarrotes Dunosusa](https://www.dunosusa.com.mx) elaborada por **Desruptivo, Agencia Creativa Integral**.

No es el sitio oficial. La página lleva `noindex` para que Google no la muestre en lugar del sitio real. Precios, fotos y listado de tiendas son de muestra.

## Versión 2: "Tu Dunosusa, más cerca"

Reconstruida sobre el mockup visual aprobado: crema, rojo, azul marino y amarillo, con cintas rojas y sellos amarillos.

- **Banderola animada "¡Cerca de ti!"** en la portada: la cinta ondea y el texto se desliza sobre ella. Se pausa fuera de pantalla y con "reducir movimiento".
- **Promos de la semana en movimiento:** anaquel que avanza solo, con productos grandes y chicos y etiqueta amarilla de precio. Se pausa con el cursor o con el botón "Pausar".
- **Mi lista:** el botón "+" agrega productos; la lista se envía por WhatsApp o se lleva a pickup.
- **Catálogo completo** desde "Ver todas las promociones", el buscador del header o cada categoría, con filtros por departamento.
- Se conservan las correcciones de la versión 1: buscador de tiendas con GPS, pickup en 3 pasos, facturación con requisitos a la vista, servicios con nombre y descripción, entradas para tenderos, proveedores y empleo, y footer único con horarios por pestaña.

El botón **"Ver qué cambia"** muestra notas de antes y después en cada sección, para presentar la propuesta.

## Pendientes antes de publicarlo como sitio oficial

- **Fotos:** las de `img/` están recortadas del mockup de referencia. Reemplazar por fotos reales del catálogo y de una tienda.
- Conectar las promociones al catálogo semanal real.
- Conectar el buscador de tiendas al listado completo con coordenadas.
- Confirmar la paleta y tipografías con el manual de marca de Dunosusa.
- Confirmar El Sembrador, Va y Ven, Despensas, la página de terrenos y la regla de facturación del mes en curso.
- Subir el logotipo al repositorio. Por ahora se carga desde `dunosusa.com.mx`.
- Mover el portal de facturación a https.
- Quitar la barra de "propuesta", el botón de notas y la etiqueta `noindex`.

## Archivos

- `index.html`: página principal
- `styles.css`: estilos
- `script.js`: anaquel animado, lista, catálogo, buscador de tiendas, menú, horarios y notas
- `img/`: imágenes provisionales
