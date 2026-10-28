import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve('c:/Users/ammar/OneDrive/Documents/Interior Designing/link-decor-interior-designing');

const exactIframeEmbed = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.941665339574!2d66.9624575!3d24.934057100000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb36ad22273778f%3A0xc679f49887ed84de!2sAyesha%20Masjid!5e0!3m2!1sen!2s!4v1793203637026!5m2!1sen!2s" class="w-full h-48 sm:h-56 rounded-lg border-0 shadow-sm" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" title="Link Decor Location - Ayesha Masjid Baldia Town Karachi"></iframe>`;

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
console.log(`Found ${htmlFiles.length} HTML files.`);

htmlFiles.forEach((filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace any existing google map iframe
  const iframeRegex = /<iframe\s+src="https:\/\/maps\.google\.com\/maps\?[^"]*"[^>]*><\/iframe>/g;
  if (iframeRegex.test(content)) {
    content = content.replace(iframeRegex, exactIframeEmbed);
    modified = true;
  }

  // Also replace any leftover placeholder box if any
  const placeholderRegex = /<div class="map-placeholder-box"[^>]*>[\s\S]*?<\/div>/g;
  if (placeholderRegex.test(content)) {
    content = content.replace(placeholderRegex, exactIframeEmbed);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated map embed in: ${path.relative(projectRoot, filePath)}`);
  }
});
