import type { NextConfig } from "next";

// GitHub Pages sirve el sitio en /plenamente; el workflow define NEXT_PUBLIC_BASE_PATH.
// En local (o con dominio propio) queda vacío y el sitio vive en la raíz.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export", // genera HTML estático en out/
  basePath,
  trailingSlash: true,
  images: { unoptimized: true }, // GitHub Pages no tiene servidor de imágenes
};

export default nextConfig;
