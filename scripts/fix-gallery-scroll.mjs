import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve('c:/Users/ammar/OneDrive/Documents/Interior Designing/link-decor-interior-designing');

// 1. Update gallery.html
const galleryPath = path.join(projectRoot, 'gallery.html');
let galleryHtml = fs.readFileSync(galleryPath, 'utf8');

// Reduce section top padding to pt-8 and hero padding
galleryHtml = galleryHtml.replace(
  '<section class="section" id="gallery-portfolio">',
  '<section class="section pt-8" id="gallery-portfolio">'
);

// Optional inline hero padding tightening on gallery page
galleryHtml = galleryHtml.replace(
  '<section class="service-hero">',
  '<section class="service-hero" style="padding-bottom: 36px;">'
);

// Update container classes to exact requested list
const oldTabsContainerRegex = /<div class="portfolio-tabs\s+[^"]*">/;
const newTabsContainerTag = '<div class="portfolio-tabs flex flex-nowrap overflow-x-auto whitespace-nowrap w-full scrollbar-hide py-4 px-4 gap-3">';
galleryHtml = galleryHtml.replace(oldTabsContainerRegex, newTabsContainerTag);

// Ensure the spacer hack at the end is <div class="w-4 shrink-0" aria-hidden="true"></div> (without sm:hidden)
galleryHtml = galleryHtml.replace(
  /<div class="w-4 shrink-0[^"]*" aria-hidden="true"><\/div>/,
  '<div class="w-4 shrink-0" aria-hidden="true"></div>'
);

fs.writeFileSync(galleryPath, galleryHtml, 'utf8');
console.log('Updated gallery.html with pt-8 spacing, exact container classes, and active desktop spacer');

// 2. Update styles.css
const stylesPath = path.join(projectRoot, 'styles.css');
let styles = fs.readFileSync(stylesPath, 'utf8');

// Add utilities if missing
let utilityAdditions = '';
if (!styles.includes('.flex-nowrap')) {
  utilityAdditions += `
.flex-nowrap {
  flex-wrap: nowrap !important;
}
`;
}
if (!styles.includes('.pt-8')) {
  utilityAdditions += `
.pt-8 {
  padding-top: 2rem !important;
}
`;
}
if (!styles.includes('.mt-8')) {
  utilityAdditions += `
.mt-8 {
  margin-top: 2rem !important;
}
`;
}

if (utilityAdditions) {
  styles += utilityAdditions;
}

// Update #gallery-portfolio and .portfolio-tabs styling
const oldGalleryTabsCssRegex = /\/\* Horizontal Scrollable Gallery Filter Bar \*\/[\s\S]*?\.portfolio-tabs::?-webkit-scrollbar/;
const newGalleryTabsCss = `/* Horizontal Scrollable Gallery Filter Bar */
#gallery-portfolio {
  padding-top: 2rem !important; /* pt-8: 32px standard spacing so filters sit right below the banner */
  overflow: visible !important;
}

#gallery-portfolio .container {
  overflow: visible !important;
}

#gallery-portfolio .portfolio-tabs-container {
  width: 100%;
  margin-top: 0 !important;
  margin-bottom: 24px;
  position: relative;
  overflow: visible;
}

/* Ensure scrolling tabs span full viewport width on mobile without container edge clamping */
@media (max-width: 768px) {
  #gallery-portfolio .portfolio-tabs-container {
    margin-left: -20px;
    margin-right: -20px;
    width: calc(100% + 40px);
    max-width: 100vw;
  }
}

.portfolio-tabs {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  gap: 12px; /* gap-3 */
  padding: 16px 16px; /* py-4 px-4 */
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  scroll-behavior: smooth;
  cursor: grab;
}

.portfolio-tabs.grabbing {
  cursor: grabbing;
  user-select: none;
}

.portfolio-tabs::-webkit-scrollbar`;

styles = styles.replace(oldGalleryTabsCssRegex, newGalleryTabsCss);
fs.writeFileSync(stylesPath, styles, 'utf8');
console.log('Updated styles.css with flex-nowrap, pt-8, mt-8, and portfolio-tabs styles');

// 3. Update script.js for desktop mousewheel and drag scrolling
const scriptPath = path.join(projectRoot, 'script.js');
let script = fs.readFileSync(scriptPath, 'utf8');

if (!script.includes('// Desktop mouse wheel horizontal scrolling')) {
  const oldActiveBtnRegex = /\/\/ Default active state is "All Catalogs"[\s\S]*?applyFilter\(activeBtn\.getAttribute\("data-filter"\)\);\s*\}/;
  const newActiveBtnWithScroll = `// Desktop mouse wheel & drag horizontal scrolling for 18 category filter tabs
  const tabsContainer = document.querySelector(".portfolio-tabs");
  if (tabsContainer) {
    tabsContainer.addEventListener("wheel", (e) => {
      if (e.deltaY !== 0 && tabsContainer.scrollWidth > tabsContainer.clientWidth) {
        e.preventDefault();
        tabsContainer.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    tabsContainer.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - tabsContainer.offsetLeft;
      scrollStart = tabsContainer.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
      isDown = false;
      tabsContainer.classList.remove("grabbing");
    });

    tabsContainer.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      tabsContainer.classList.add("grabbing");
      const x = e.pageX - tabsContainer.offsetLeft;
      const walk = (x - startX) * 1.5;
      tabsContainer.scrollLeft = scrollStart - walk;
    });
  }

  // Default active state is "All Catalogs"
  const activeBtn = document.querySelector(".portfolio-tab-btn.active");
  if (activeBtn) {
    applyFilter(activeBtn.getAttribute("data-filter"));
  }`;

  script = script.replace(oldActiveBtnRegex, newActiveBtnWithScroll);
  fs.writeFileSync(scriptPath, script, 'utf8');
  console.log('Updated script.js with desktop mousewheel and drag horizontal scrolling');
}
