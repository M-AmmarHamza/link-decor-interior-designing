import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve('c:/Users/ammar/OneDrive/Documents/Interior Designing/link-decor-interior-designing');

// 1. Update script.js for Dynamic WhatsApp CTAs
const scriptPath = path.join(projectRoot, 'script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

const oldWhatsAppBlockRegex = /function initWhatsAppCTAs\(\)[\s\S]*?function initHeaderScroll\(\)/;
const newWhatsAppBlock = `function initWhatsAppCTAs() {
  const buttons = document.querySelectorAll("[data-whatsapp]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute("data-service");
      const customMessage = btn.getAttribute("data-message");
      
      let message = "Hi Link Decor, I would like to book a free consultation for interior designing in Karachi.";
      
      if (serviceName) {
        message = \`Hi Link Decor, I am interested in your \${serviceName} services. Can I get a quote?\`;
      } else if (customMessage) {
        message = customMessage;
      }
      
      const url = buildWhatsAppUrl(message);
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}

function initHeaderScroll()`;

scriptContent = scriptContent.replace(oldWhatsAppBlockRegex, newWhatsAppBlock);
fs.writeFileSync(scriptPath, scriptContent, 'utf8');
console.log('Updated script.js');

// 2. Find all HTML files
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    if (file === 'node_modules' || file === 'dist' || file === '.vercel') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(projectRoot);
console.log(`Found ${htmlFiles.length} HTML files to inspect and polish.`);

const mapIframeEmbed = `<iframe src="https://maps.google.com/maps?q=Ayesha+Masjid%2C+New+Saeedabad%2C+Baldia+Town%2C+Karachi&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed" class="w-full h-48 rounded-lg border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Link Decor Location - Ayesha Masjid New Saeedabad Baldia Town Karachi"></iframe>`;

htmlFiles.forEach((filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Fix Footer Phone Link & ensure footer-phone-link class
  if (content.includes('href="about:invalid#zCSafez"')) {
    content = content.replace(/href="about:invalid#zCSafez"/g, 'href="tel:+923132663450"');
    modified = true;
  }

  // Ensure footer phone link has tel:+923132663450 and footer-phone-link class
  const phonePattern = /<a\s+href="tel:\+923132663450"([^>]*)>\+92 313 2663450<\/a>/g;
  if (phonePattern.test(content)) {
    content = content.replace(phonePattern, (match, attrs) => {
      if (!attrs.includes('footer-phone-link') && match.includes('+92 313 2663450')) {
        return `<a href="tel:+923132663450" class="footer-phone-link" style="color:inherit; text-decoration:none;">+92 313 2663450</a>`;
      }
      return match;
    });
    modified = true;
  }

  // 2. Replace Footer Map Placeholder with functional Google Maps iframe
  const mapPlaceholderRegex = /<div class="map-placeholder-box" aria-label="Google Maps Embed Placeholder">[\s\S]*?<\/div>/g;
  if (mapPlaceholderRegex.test(content)) {
    content = content.replace(mapPlaceholderRegex, mapIframeEmbed);
    modified = true;
  }

  // Also replace contact page showroom placeholder if present
  const showroomMapRegex = /<div class="map-placeholder-box"[^>]*aria-label="Google Maps Embed Placeholder">[\s\S]*?<\/div>/g;
  if (showroomMapRegex.test(content)) {
    content = content.replace(showroomMapRegex, mapIframeEmbed);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Polished: ${path.relative(projectRoot, filePath)}`);
  }
});
