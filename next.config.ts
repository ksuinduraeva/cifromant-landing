import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Полностью статический сайт — собирается в HTML/CSS/JS в папку out/,
  // которую можно положить на любой хостинг (Timeweb) без сервера Node.js.
  output: "export",
  // next/image без серверной оптимизации (нужно для статического экспорта).
  images: { unoptimized: true },
};

export default nextConfig;
