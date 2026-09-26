import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sitio 100% estático (carpeta `out/`), para publicarlo en Netlify.
  output: "export",
  // Cada página se genera como carpeta/index.html: funciona en cualquier hosting.
  trailingSlash: true,
  // Sin servidor no hay optimizador de imágenes; las fotos ya están comprimidas.
  images: { unoptimized: true },
};

export default nextConfig;
