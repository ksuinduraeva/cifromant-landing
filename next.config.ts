import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Полностью статический сайт — собирается в HTML/CSS/JS в папку out/,
  // которую можно положить на любой хостинг (Timeweb) без сервера Node.js.
  output: "export",
  // Каждая страница экспортируется как папка с index.html (articles/slug/index.html),
  // а не как articles/slug.html. Без этого Apache/LiteSpeed на Timeweb отдаёт 403
  // на URL со слешем (папка без index). Со слешем структура корректна для статики.
  trailingSlash: true,
  // next/image без серверной оптимизации (нужно для статического экспорта).
  images: { unoptimized: true },
};

export default nextConfig;
