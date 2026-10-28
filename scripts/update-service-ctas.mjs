import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve('c:/Users/ammar/OneDrive/Documents/Interior Designing/link-decor-interior-designing');

const serviceMappings = [
  {
    name: "Gypsum and PVC False Ceilings",
    shortName: "False Ceilings",
    encoded: "Gypsum%20and%20PVC%20False%20Ceilings"
  },
  {
    name: "SPC Flooring",
    shortName: "SPC Flooring",
    encoded: "SPC%20Flooring"
  },
  {
    name: "3D and Fabric Wallpapers",
    shortName: "3D%20and%20Fabric%20Wallpapers",
    encoded: "3D%20and%20Fabric%20Wallpapers"
  },
  {
    name: "WPC and PVC Wall Paneling",
    shortName: "WPC%20and%20PVC%20Wall%20Paneling",
    encoded: "WPC%20and%20PVC%20Wall%20Paneling"
  },
  {
    name: "Window Blinds and Glass Films",
    shortName: "Window%20Blinds%20and%20Glass%20Films",
    encoded: "Window%20Blinds%20and%20Glass%20Films"
  }
];

// Helper to make target URL
function getServiceWhatsAppUrl(serviceName) {
  const encodedName = encodeURIComponent(serviceName);
  return `https://wa.me/923132663450?text=Hi%20Link%20Decor%2C%20I%20am%20interested%20in%20your%20${encodedName}%20services.%20Can%20I%20get%20a%20quote%3F`;
}

// 1. Update index.html
let indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
serviceMappings.forEach(svc => {
  const newUrl = getServiceWhatsAppUrl(svc.name);
  // Replace old quote pattern for this service
  const oldRegex = new RegExp(`href="https:\\/\\/wa\\.me\\/923132663450\\?text=Hi%20Link%20Decor%2C%20I%20need%20details%20and%20a%20quote%20for%20[^"]*${svc.encoded}[^"]*"`, 'g');
  indexHtml = indexHtml.replace(oldRegex, `href="${newUrl}"`);
});
fs.writeFileSync(path.join(projectRoot, 'index.html'), indexHtml, 'utf8');
console.log('Updated service card CTAs in index.html');

// 2. Update services.html
let servicesHtml = fs.readFileSync(path.join(projectRoot, 'services.html'), 'utf8');
serviceMappings.forEach(svc => {
  const newUrl = getServiceWhatsAppUrl(svc.name);
  const oldRegex = new RegExp(`href="https:\\/\\/wa\\.me\\/923132663450\\?text=Hi%20Link%20Decor%2C%20I%20need%20details%20and%20a%20quote%20for%20[^"]*${svc.encoded}[^"]*"`, 'g');
  servicesHtml = servicesHtml.replace(oldRegex, `href="${newUrl}"`);
});
fs.writeFileSync(path.join(projectRoot, 'services.html'), servicesHtml, 'utf8');
console.log('Updated service card CTAs in services.html');

// 3. Individual Service Pages
const individualPages = [
  { file: 'services/ceilings.html', service: 'False Ceilings' },
  { file: 'services/flooring.html', service: 'SPC Flooring' },
  { file: 'services/wallpapers.html', service: '3D and Fabric Wallpapers' },
  { file: 'services/wall-paneling.html', service: 'WPC and PVC Wall Paneling' },
  { file: 'services/window-blinds.html', service: 'Window Blinds and Glass Films' }
];

individualPages.forEach(item => {
  const p = path.join(projectRoot, item.file);
  let content = fs.readFileSync(p, 'utf8');
  const targetUrl = getServiceWhatsAppUrl(item.service);

  // Update hero CTA
  const heroRegex = /href="https:\/\/wa\.me\/923132663450\?text=Hi%20Link%20Decor%2C%20I%20need%20details%20and%20a%20quote%20for[^"]*"(\s+class="btn btn-whatsapp[^"]*"\s+data-whatsapp)(\s+data-message="[^"]*")?/g;
  content = content.replace(heroRegex, `href="${targetUrl}"$1 data-service="${item.service}"`);

  fs.writeFileSync(p, content, 'utf8');
  console.log(`Updated hero CTA in ${item.file}`);
});
