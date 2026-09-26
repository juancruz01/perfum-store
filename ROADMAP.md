# Perfum.store — Plan de trabajo

Tienda / catálogo de perfumes con pedidos. Stack: **Next.js 15 + TypeScript + Tailwind CSS**, hosting en **Vercel**.

## Etapas

- [x] **Etapa 1 — Base del proyecto**
  - Proyecto Next.js, paleta de colores y tipografías (Playfair Display + Montserrat)
  - Extracción de los PDFs del proveedor (1.017 perfumes) → `data/catalogo-completo.json`
  - Selección curada de 126 perfumes en tendencia, tope $350.000; precio = costo + envío $3.250 + margen (árabes 30%, diseñador y nicho 20%) → `src/data/products.json`
  - Navbar: buscador con sugerencias, logo, submenús (Árabes / Diseñador / Nicho), FAQ, carrito; menú móvil
  - Footer y rutas base
- [x] **Etapa 2 — Home**: carrusel hero (2 diapositivas), banners Masculinas / Femeninas, franja de beneficios, botón de WhatsApp
- [x] **Etapa 3 — Catálogo**: grilla de productos, filtros por categoría y marca, orden, búsqueda, "Comprar" suma al carrito (guardado en el navegador), "Los más vendidos" en el inicio
- [x] **Etapa 4 — Ficha de producto**: imagen, precio, cantidad, "Agregar al carrito", consulta por WhatsApp, "Inspirado en…", desplegables (descripción, notas, para quién, uso, rendimiento, similares). Textos editables en `src/data/product-info.ts`
- [x] **Etapa 5 — Carrito y pedidos**: carrito con cantidades y progreso de envío gratis, datos del cliente, envío a domicilio o retiro (Claypole / Solano), pago por transferencia, efectivo o Mercado Pago, pedido numerado enviado por WhatsApp
- [x] **Etapa 6 — Imágenes**: fotos oficiales de los 128 perfumes (Fragrantica), normalizadas a WebP 800x1000 con fondo blanco y frasco centrado → `public/products/`
- [x] **Etapa 7 — FAQ, SEO y pulido**: disponibilidad por perfume (en stock / por encargo, leída del color de los PDFs) con filtro, FAQ (12 preguntas), vista previa para compartir (`public/og.jpg`), sitemap, robots, datos estructurados, página 404, accesibilidad
- [ ] **Etapa 8 — Publicación**: deploy en Vercel, dominio, link para Instagram

## Cómo se arma el catálogo

| Archivo | Qué es |
| --- | --- |
| `src/config/pricing.json` | Cotización del dólar, margen (%) por tipo, precio máximo y monto de envío gratis |
| `scripts/catalog-selection.mjs` | Lista de perfumes que se publican |
| `scripts/catalog-overrides.mjs` | Correcciones de nombres y género de cada perfume |
| `data/catalogo-completo.json` | Todos los perfumes del proveedor (para elegir nuevos) |
| `src/data/products.json` | Catálogo publicado (generado, no editar a mano) |
| `scripts/image-ids.json` | Código de Fragrantica de la foto de cada perfume |
| `public/products/<slug>.webp` | Foto de cada perfume (reemplazable por una propia, mismo nombre) |

Después de cambiar cualquiera de esos archivos:

```bash
npm run catalog
```

Para un perfume nuevo: agregalo a la selección, sumá su código de Fragrantica en `scripts/image-ids.json`
(el número al final de la URL, ej. `.../Khamrah-75805.html` → 75805) y corré:

```bash
npm run images
npm run catalog
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verificación de producción
```
