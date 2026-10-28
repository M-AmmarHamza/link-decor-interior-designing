import { defineConfig, loadEnv } from "vite";
import { resolve } from "node:path";
import {
  PAGE_SEO,
  cleanInternalLinks,
  normalizeSiteUrl,
  replaceSeoHead,
} from "./seo.config.js";

const pages = [
  { name: "index", file: "index.html" },
  { name: "services", file: "services.html" },
  { name: "ceilings", file: "services/ceilings.html" },
  { name: "flooring", file: "services/flooring.html" },
  { name: "wallpapers", file: "services/wallpapers.html" },
  { name: "wall-paneling", file: "services/wall-paneling.html" },
  { name: "window-blinds", file: "services/window-blinds.html" },
  { name: "about", file: "about.html" },
  { name: "contact", file: "contact.html" },
  { name: "terms", file: "terms.html" },
  { name: "privacy-policy", file: "privacy-policy.html" },
  { name: "404", file: "404.html" },
];

const pageKeyFromPath = (path = "") => {
  const clean = path.replace(/^\//, "").replace(/\.html$/i, "");
  if (!clean || clean === "index") return "index";
  if (clean.startsWith("services/")) return clean.replace("services/", "");
  return clean;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = normalizeSiteUrl(
    env.VITE_SITE_URL || process.env.VITE_SITE_URL || "https://link-decor-interior-designing.vercel.app"
  );

  return {
    plugins: [
      {
        name: "link-decor-seo",
        transformIndexHtml: {
          order: "pre",
          handler(html, context) {
            const key = pageKeyFromPath(context.path);
            const page = PAGE_SEO[key];
            return cleanInternalLinks(
              page ? replaceSeoHead(html, page, siteUrl) : html
            );
          },
        },
      },
    ],
    build: {
      rollupOptions: {
        input: Object.fromEntries(
          pages.map((p) => [p.name, resolve(import.meta.dirname, p.file)])
        ),
      },
    },
    server: { port: 4173, host: "127.0.0.1" },
  };
});
