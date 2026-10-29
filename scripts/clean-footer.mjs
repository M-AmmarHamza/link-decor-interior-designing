import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve('c:/Users/ammar/OneDrive/Documents/Interior Designing/link-decor-interior-designing');

// 1. Update styles.css
const stylesPath = path.join(projectRoot, 'styles.css');
let styles = fs.readFileSync(stylesPath, 'utf8');

// Ensure .footer-top has align-items: start;
styles = styles.replace(/\.footer-top\s*\{([\s\S]*?)\}/, (match, body) => {
  if (!body.includes('align-items')) {
    return `.footer-top {${body}  align-items: start;\n}`;
  }
  return match;
});

// Add utilities if not present
if (!styles.includes('.rounded-b-lg')) {
  styles = styles.replace('.rounded-lg {', `.rounded-b-lg {
  border-bottom-left-radius: 0.5rem !important;
  border-bottom-right-radius: 0.5rem !important;
}

.items-start {
  align-items: flex-start !important;
}

.rounded-lg {`);
}

fs.writeFileSync(stylesPath, styles, 'utf8');
console.log('Updated styles.css with align-items: start, .items-start, and .rounded-b-lg');

// 2. Update all HTML files
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

  // Add items-start to footer-top
  if (content.includes('class="container footer-top"')) {
    content = content.replace(/class="container footer-top"/g, 'class="container footer-top items-start"');
    modified = true;
  }

  // Add rounded-b-lg to map iframe
  if (content.includes('rounded-lg border-0 shadow-sm') && !content.includes('rounded-b-lg')) {
    content = content.replace(/rounded-lg border-0 shadow-sm/g, 'rounded-lg rounded-b-lg border-0 shadow-sm');
    modified = true;
  }

  // Remove Service Coverage section and tags
  const coverageRegex = /\s*<div style="margin-top:12px;">\s*<span[^>]*>Service Coverage:<\/span>[\s\S]*?<\/div>\s*<\/div>/g;
  if (coverageRegex.test(content)) {
    content = content.replace(coverageRegex, '');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned footer in: ${path.relative(projectRoot, filePath)}`);
  }
});
