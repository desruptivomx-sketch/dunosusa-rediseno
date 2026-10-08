# Propuesta de rediseño: Dunosusa

Propuesta de sitio web para [Abarrotes Dunosusa](https://www.dunosusa.com.mx), elaborada por **Desruptivo, Agencia Creativa Integral**. No es el sitio oficial; conserva `noindex`.

## Recursos visuales

La página incorpora las **53 imágenes finales generadas en Magnific**, alojadas dentro del repositorio y optimizadas en WebP (aproximadamente 3,9 MB en conjunto). No depende de enlaces temporales del generador.

- `img/productos/`: 19 productos con transparencia.
- `img/categorias/`: 8 categorías con transparencia.
- `img/portada/`: compra familiar y entrega pickup.
- `img/equipo/`: interior, atención, mayoreo, equipo y distribución.
- `img/servicios/`: 8 imágenes de servicios; entrega de dinero regenerada desde cero, sin logotipo ni cuadro blanco.
- `img/pickup/`: estacionamiento, bolsas y comprobante ilustrativo.
- `img/historia/`: 4 escenas genéricas en una galería desplegable, identificadas como ilustrativas, no como documentación histórica.
- `img/banners/`: 4 temporadas, sin texto, botones ni gráficos superpuestos en la imagen. Los títulos se muestran como HTML fuera de ella.
- `assets-manifest.json`: correspondencia de ID, nombre, archivo, dimensiones, transparencia, peso e identificador de Magnific.

Los SVG anteriores permanecen disponibles; la fachada de la portada conserva su ilustración original. Las imágenes fuera de la portada tienen carga diferida y dimensiones declaradas. Los primeros 27 archivos WebP conservan canal alfa.

## Funcionalidad

Anaquel horizontal de 19 productos, búsqueda por producto o categoría (sin distinguir acentos), menú móvil, categorías, temporadas, servicios, pickup y equipo. El formulario de tiendas sigue siendo una demostración. Las imágenes no representan marcas de productos, personal, sucursales o hechos históricos verificados. No se asignaron precios ficticios a los productos nuevos.

## Desarrollo local

Sitio estático, sin paso de compilación:

```sh
python3 -m http.server 8765
```

Abrir `http://localhost:8765`. Archivos principales: `index.html`, `styles.css`, `fonts.css` y `script.js`.

Antes de convertirlo en sitio oficial: conectar catálogo, promociones y directorio de tiendas reales; confirmar disponibilidad de servicios; validar imágenes, textos y tipografías con la marca. Se conserva el logotipo vectorial local incorporado recientemente al encabezado.
