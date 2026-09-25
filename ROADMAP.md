# Perfum.store — Plan de trabajo

Tienda / catálogo de perfumes con pedidos. Stack: **Next.js 15 + TypeScript + Tailwind CSS**, hosting en **Vercel**.

## Etapas

- [x] **Etapa 1 — Base del proyecto**
  - Proyecto Next.js, paleta de colores y tipografías (Playfair Display + Montserrat)
  - Extracción de los PDFs del proveedor (1.017 perfumes) → `data/catalogo-completo.json`
  - Selección curada de 126 perfumes en tendencia / más vendidos, tope $350.000 → `src/data/products.json`
  - Navbar: buscador con sugerencias, logo, submenús (Árabes / Diseñador / Nicho), FAQ, carrito; menú móvil
  - Footer y rutas base
- [ ] **Etapa 2 — Home**: carrusel hero, banners Masculinas / Femeninas, franja de beneficios, destacados
- [ ] **Etapa 3 — Catálogo**: grilla de productos, filtros (tipo, marca), orden, página de búsqueda
- [ ] **Etapa 4 — Ficha de producto**: galería, precio, cantidad, "Agregar al carrito", acordeones con info
- [ ] **Etapa 5 — Carrito y pedidos**: carrito persistente, formulario de datos, envío del pedido por WhatsApp
- [ ] **Etapa 6 — Imágenes**: banners del hero y categorías, fotos de producto homogéneas
- [ ] **Etapa 7 — FAQ, SEO y pulido**: preguntas frecuentes, metadatos, Open Graph, accesibilidad, responsive
- [ ] **Etapa 8 — Publicación**: deploy en Vercel, dominio, link para Instagram

## Cómo se arma el catálogo

| Archivo | Qué es |
| --- | --- |
| `src/config/pricing.json` | Cotización del dólar, margen (%) por tipo, precio máximo y monto de envío gratis |
| `scripts/catalog-selection.mjs` | Lista de perfumes que se publican |
| `scripts/catalog-overrides.mjs` | Correcciones de nombres y género de cada perfume |
| `data/catalogo-completo.json` | Todos los perfumes del proveedor (para elegir nuevos) |
| `src/data/products.json` | Catálogo publicado (generado, no editar a mano) |

Después de cambiar cualquiera de esos archivos:

```bash
npm run catalog
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verificación de producción
```
