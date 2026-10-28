import { writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { PAGE_SEO, SITE_CONFIG, absoluteUrl, normalizeSiteUrl } from "../seo.config.js";

const outputDirectory = join(import.meta.dirname, "..", "dist");
const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL || SITE_CONFIG.url);

async function generateCrawlerFiles() {
  const pages = Object.values(PAGE_SEO).filter(
    (page) => !page.robots?.includes("noindex")
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${absoluteUrl(page.path, siteUrl)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.path === "/" ? "1.0" : page.path.startsWith("/services") ? "0.9" : "0.7"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  const robots = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml", siteUrl)}
`;

  await Promise.all([
    writeFile(join(outputDirectory, "sitemap.xml"), sitemap, "utf8"),
    writeFile(join(outputDirectory, "robots.txt"), robots, "utf8"),
  ]);

  // Ensure /services/ resolves cleanly alongside /services
  try {
    const servicesHtml = await readFile(join(outputDirectory, "services.html"), "utf8");
    await writeFile(join(outputDirectory, "services", "index.html"), servicesHtml, "utf8");
  } catch (e) {
    // Non-fatal if services.html doesn't exist
  }

  console.log(`SEO files generated successfully for ${siteUrl} (${pages.length} URLs in sitemap).`);
}

generateCrawlerFiles().catch((err) => {
  console.error("Error generating SEO files:", err);
  process.exit(1);
});
