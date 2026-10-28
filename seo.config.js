const DEFAULT_SITE_URL = "https://link-decor-interior-designing.vercel.app";
const DEFAULT_WHATSAPP = "923161013991";

const envSiteUrl =
  (typeof process !== "undefined" && process.env?.VITE_SITE_URL) ||
  import.meta.env?.VITE_SITE_URL ||
  DEFAULT_SITE_URL;

const envWhatsApp =
  (typeof process !== "undefined" && process.env?.VITE_WHATSAPP_NUMBER) ||
  import.meta.env?.VITE_WHATSAPP_NUMBER ||
  DEFAULT_WHATSAPP;

export const normalizeSiteUrl = (value = DEFAULT_SITE_URL) =>
  String(value).trim().replace(/\/+$/, "");

export const SITE_CONFIG = Object.freeze({
  name: "Link Decor",
  legalName: "Link Decor Interior Solutions",
  url: normalizeSiteUrl(envSiteUrl),
  locale: "en_PK",
  language: "en-PK",
  currency: "PKR",
  phone: `+${String(envWhatsApp).replace(/\D/g, "")}`,
  whatsapp: String(envWhatsApp).replace(/\D/g, ""),
  address: "Shop # 12, Main Hub River Road, Near Chandni Chowk, Baldia Town, Karachi, Pakistan",
  city: "Karachi",
  region: "Sindh",
  country: "PK",
  defaultImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
});

export const PAGE_SEO = Object.freeze({
  index: {
    path: "/",
    title: "Best Interior Solutions in Karachi | Link Decor - False Ceiling, Wallpapers, Flooring",
    description: "Link Decor provides premium interior designing in Karachi. Expert Gypsum False Ceilings, 3D Wallpapers, SPC Flooring, WPC Wall Paneling & Window Blinds.",
    type: "website",
    schemaType: "HomeAndConstructionBusiness",
  },
  services: {
    path: "/services",
    title: "Interior Design & Decoration Services in Karachi | Link Decor",
    description: "Explore professional interior solutions in Karachi: Gypsum False Ceilings, SPC Flooring, 3D Wallpapers, WPC Wall Paneling, and Window Blinds. Free on-site consultation.",
    type: "website",
    schemaType: "Service",
  },
  ceilings: {
    path: "/services/ceilings",
    title: "Best False Ceiling in Karachi - Gypsum & PVC Suspended Ceilings | Link Decor",
    description: "Affordable Gypsum board false ceilings, moisture-resistant PVC ceilings, modern cove lighting profiles & POP designs in Karachi. Starting from Rs. 140/sq.ft.",
    type: "service",
    schemaType: "Service",
  },
  flooring: {
    path: "/services/flooring",
    title: "Premium Wooden, Vinyl & SPC Flooring in Karachi | Link Decor",
    description: "Waterproof SPC flooring, luxury vinyl planks (LVP), and engineered wooden flooring in Karachi. Termite-proof, scratch-resistant. Starting from Rs. 280/sq.ft.",
    type: "service",
    schemaType: "Service",
  },
  wallpapers: {
    path: "/services/wallpapers",
    title: "Luxury 3D & Fabric Wallpapers in Karachi | Link Decor",
    description: "Premium 3D embossed wallpapers, imported fabric textiles, washable vinyl and custom wall murals in Karachi. Starting from Rs. 70/sq.ft.",
    type: "service",
    schemaType: "Service",
  },
  "wall-paneling": {
    path: "/services/wall-paneling",
    title: "Modern WPC & PVC Wall Paneling in Karachi | Link Decor",
    description: "Fluted WPC louvers, high-gloss PVC marble sheets, acoustic wooden slats and TV feature wall paneling in Karachi. Starting from Rs. 220/sq.ft.",
    type: "service",
    schemaType: "Service",
  },
  "window-blinds": {
    path: "/services/window-blinds",
    title: "Custom Window Blinds & Frosted Glass Films in Karachi | Link Decor",
    description: "Custom zebra day-and-night blinds, blackout roller blinds, vertical blinds, frosted privacy films and sun control glass films in Karachi. Starting from Rs. 160/sq.ft.",
    type: "service",
    schemaType: "Service",
  },
  about: {
    path: "/about",
    title: "About Link Decor | Karachi's Premier Interior Design Specialists",
    description: "Discover Link Decor's journey of elevating homes, offices, and commercial spaces across Karachi with craftsmanship, durability, and transparent pricing.",
    type: "website",
    schemaType: "AboutPage",
  },
  contact: {
    path: "/contact",
    title: "Contact Link Decor Karachi | Book Free On-Site Consultation",
    description: "Get in touch with Link Decor in Baldia Town, Karachi. Request a free estimate, schedule on-site measurements, or chat on WhatsApp +92 316 1013991.",
    type: "website",
    schemaType: "ContactPage",
  },
  terms: {
    path: "/terms",
    title: "Terms & Conditions | Link Decor Karachi",
    description: "Review consultation terms, quotation estimates, project timelines, and warranty terms for Link Decor interior solutions in Karachi.",
    type: "website",
    schemaType: "WebPage",
  },
  "privacy-policy": {
    path: "/privacy-policy",
    title: "Privacy Policy | Link Decor Karachi",
    description: "Learn how Link Decor protects your customer consultation information, contact details, and site measurements.",
    type: "website",
    schemaType: "WebPage",
  },
  404: {
    path: "/404",
    title: "Page Not Found | Link Decor Karachi",
    description: "The requested interior solution page could not be found. Explore our services or contact Link Decor on WhatsApp.",
    robots: "noindex, nofollow",
  },
});

export const absoluteUrl = (path = "/", baseUrl = SITE_CONFIG.url) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizeSiteUrl(baseUrl)}${cleanPath}`;
};

export const cleanInternalLinks = (html = "") =>
  html.replace(/href="([^"]+)\.html(#?[^"]*)"/g, 'href="$1$2"');

export const replaceSeoHead = (html, page, siteUrl = SITE_CONFIG.url) => {
  const canonical = absoluteUrl(page.path, siteUrl);
  const image = page.image || SITE_CONFIG.defaultImage;
  const imageAlt = page.imageAlt || page.title;
  const robots = page.robots || "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  let result = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"/i, `<meta name="description" content="${page.description}"`)
    .replace(/<meta\s+name="robots"\s+content="[^"]*"/i, `<meta name="robots" content="${robots}"`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"/i, `<link rel="canonical" href="${canonical}"`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"/i, `<meta property="og:title" content="${page.title}"`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"/i, `<meta property="og:description" content="${page.description}"`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"/i, `<meta property="og:url" content="${canonical}"`)
    .replace(/<meta\s+property="og:image"\s+content="[^"]*"/i, `<meta property="og:image" content="${image}"`)
    .replace(/<meta\s+property="og:image:alt"\s+content="[^"]*"/i, `<meta property="og:image:alt" content="${imageAlt}"`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"/i, `<meta name="twitter:title" content="${page.title}"`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"/i, `<meta name="twitter:description" content="${page.description}"`)
    .replace(/<meta\s+name="twitter:image"\s+content="[^"]*"/i, `<meta name="twitter:image" content="${image}"`);

  return result;
};
