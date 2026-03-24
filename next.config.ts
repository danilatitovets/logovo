import type { NextConfig } from "next";

/**
 * Статический экспорт для shared-хостинга (например hoster.by → public_html).
 *
 * При `output: 'export'` и `distDir` не равном `'.next'` Next.js использует
 * ваш `distDir` как папку готового сайта (`out/`), а промежуточную сборку
 * ведёт в `.next`. См. `node_modules/next/dist/export/utils.js` → hasCustomExportOutput.
 */
const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
