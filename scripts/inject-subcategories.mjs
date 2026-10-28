import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve('c:/Users/ammar/OneDrive/Documents/Interior Designing/link-decor-interior-designing');

// 1. Update styles.css with subcategory styles if not present
const stylesPath = path.join(projectRoot, 'styles.css');
let styles = fs.readFileSync(stylesPath, 'utf8');

if (!styles.includes('.subcategory-grid')) {
  const subcategoryCss = `
/* Sub-Category Catalog Showcase Grid */
.subcategory-section {
  margin-top: 56px;
  margin-bottom: 56px;
}

.subcategory-header {
  text-align: center;
  margin-bottom: 32px;
}

.subcategory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
}

@media (max-width: 768px) {
  .subcategory-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
`;
  styles += subcategoryCss;
  fs.writeFileSync(stylesPath, styles, 'utf8');
  console.log('Appended subcategory styles to styles.css');
}

// Subcategory Data Definitions
const pageSubcategories = {
  'services/ceilings.html': {
    eyebrow: 'Comprehensive Catalog',
    title: 'Ceiling Sub-Categories & Material Options',
    subtitle: 'Choose from our specialized ceiling systems fabricated with rust-resistant framing and coastal moisture barriers in Karachi.',
    items: [
      {
        name: 'Gypsum Board 8x4 Ceiling',
        badge: 'Standard 8x4',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        desc: 'Authentic 8ft x 4ft Boral & Elephant moisture-resistant gypsum boards suspended on heavy 24-gauge GI framing with seamless joint tape and level-5 putty finish.',
        features: [
          'Anti-sag moisture barrier for Karachi humidity',
          'Heavy rust-proof galvanized GI channels',
          'Seamless jointing ready for luxury emulsion paint'
        ],
        ctaText: 'Get a Quote for Gypsum Board 8x4'
      },
      {
        name: '2x2 Ceiling',
        badge: 'Commercial Grid',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        desc: 'Commercial 2ft x 2ft acoustic mineral fiber tiles laid on exposed aluminum T-grid suspension systems for fast plenum and AC duct access.',
        features: [
          'Instant access to above-ceiling wiring and AC ducts',
          'High sound absorption (NRC 0.65) for offices',
          'Rapid, cost-effective commercial installation'
        ],
        ctaText: 'Get a Quote for 2x2 Ceilings'
      },
      {
        name: 'PVC Panel Ceiling',
        badge: '100% Waterproof',
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
        desc: '100% waterproof interlocking hollow-core PVC ceiling planks with tongue-and-groove joints designed specifically for wet and damp spaces.',
        features: [
          'Zero mold, water swelling, or peeling paint',
          'Termite-proof, fire-retardant & fully washable',
          'Ideal for bathrooms, kitchens & seaside balconies'
        ],
        ctaText: 'Get a Quote for PVC Panel Ceilings'
      },
      {
        name: 'Modern False Ceiling',
        badge: 'Designer Lighting',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
        desc: 'High-end architectural 3D layered drop ceilings featuring magnetic track light profiles, floating island designs, and wooden accents.',
        features: [
          'Bespoke CAD 3D layout engineered per room size',
          'Concealed warm/cool dual-circuit ambient cove lighting',
          'Luxury living, drawing room & master suite showstoppers'
        ],
        ctaText: 'Get a Quote for Modern False Ceilings'
      }
    ]
  },

  'services/flooring.html': {
    eyebrow: 'Complete Flooring Catalog',
    title: 'Flooring Sub-Categories & Surface Finishes',
    subtitle: 'Select the ideal resilient flooring surface for your home or commercial office in Karachi, from waterproof SPC to natural wood planks.',
    items: [
      {
        name: 'SPC Flooring',
        badge: 'Stone Polymer Core',
        image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80',
        desc: '5mm to 6.5mm rigid stone-polymer composite core planks with built-in IXPE acoustic underlayment and scratch-resistant ceramic wear layer.',
        features: [
          '100% waterproof and termite-proof guarantee',
          'German Uniclic floating click-lock installation',
          'Commercial 0.5mm scratch & pet-proof wear layer'
        ],
        ctaText: 'Get a Quote for SPC Flooring'
      },
      {
        name: 'Wood Flooring',
        badge: 'German Laminate & Hardwood',
        image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80',
        desc: 'German-grade HDF laminate and semi-solid engineered natural oak hardwood planks with rich grain textures and wax-sealed edges.',
        features: [
          'AC4 commercial durability rating with rich wood grains',
          'Micro-beveled edges for authentic plank character',
          'Warm, acoustic underfoot comfort for luxury living'
        ],
        ctaText: 'Get a Quote for Wood Flooring'
      },
      {
        name: 'Vinyl Flooring',
        badge: 'Commercial Heavy-Duty',
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
        desc: 'Heavy-duty 2mm to 3mm flexible heterogeneous vinyl rolls with PUR surface coating for continuous, joint-free hygienic floor coverage.',
        features: [
          'Seamless anti-microbial surface with easy wet mopping',
          'High resistance against heavy foot traffic and stains',
          'Cost-effective solution for clinics, schools & offices'
        ],
        ctaText: 'Get a Quote for Vinyl Flooring'
      },
      {
        name: 'Vinyle Tiles',
        badge: 'LVT Stone & Marble',
        image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
        desc: 'Luxury Vinyl Tiles (LVT) in square marble, terrazzo, and geometric slate stone textures with peel-and-stick or pressure-sensitive glue.',
        features: [
          'Realistic Italian marble and slate stone looks',
          'No cold ceramic chill, no grout line cracking',
          'Individual tile replacement without tearing up whole floor'
        ],
        ctaText: 'Get a Quote for Vinyle Tiles'
      }
    ]
  },

  'services/wallpapers.html': {
    eyebrow: 'Imported Wall Coverings',
    title: 'Wallpaper Sub-Categories & Bespoke Art',
    subtitle: 'From European luxury vinyls to custom panoramic wall murals, discover premium wall styling options across Karachi.',
    items: [
      {
        name: 'Imported Wall Papers',
        badge: 'European & Korean',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
        desc: 'Luxury European, Turkish, and Korean heavyweight vinyl wallpapers in modern damask, metallic foil, and abstract minimalist patterns.',
        features: [
          'Washable vinyl surface resilient against humidity',
          'UV-resistant colorfast inks that do not fade',
          'Over 500+ modern catalogs available for home selection'
        ],
        ctaText: 'Get a Quote for Imported Wall Papers'
      },
      {
        name: 'Fabric Wall Paper',
        badge: 'Luxury Textile',
        image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
        desc: 'Rich velvet, linen weave, and woven silk textile wall coverings backed with non-woven breathable acoustic backing.',
        features: [
          'Luxurious tactile texture and room sound dampening',
          'Breathable material preventing trapped wall moisture',
          'Stunning feature walls for master beds & VIP lounges'
        ],
        ctaText: 'Get a Quote for Fabric Wall Paper'
      },
      {
        name: 'Customize Wall Picture',
        badge: 'Custom Panoramic',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        desc: 'Full-wall panoramic custom murals printed to your exact wall dimensions in ultra-high resolution (landscape, botanical, 3D architecture).',
        features: [
          'Zero seam distortion scaled to your exact wall size',
          'Non-toxic odorless eco-solvent archival pigments',
          'Dramatically expands visual depth in living rooms'
        ],
        ctaText: 'Get a Quote for Customize Wall Picture'
      },
      {
        name: 'Graphic Art',
        badge: 'Modern Geometrics',
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
        desc: 'Contemporary vector graphics, isometric line patterns, and Scandinavian modern wall art treatments for youth rooms and studio lofts.',
        features: [
          'High-contrast crisp vector lines and bold color palettes',
          'Matte non-glare finish under spotlight illumination',
          'Vibrant modern energy for bedrooms and home offices'
        ],
        ctaText: 'Get a Quote for Graphic Art'
      },
      {
        name: 'Texture Point',
        badge: 'Tactile Relief',
        image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
        desc: 'Embossed structural texture points, stone stipple effects, and tactile relief wall coatings that play with ambient raking light.',
        features: [
          'Conceals minor wall undulations and plaster flaws',
          'Durable scuff-resistant and scrubbable surface',
          'Subtle architectural depth for minimalist interiors'
        ],
        ctaText: 'Get a Quote for Texture Point'
      }
    ]
  },

  'services/wall-paneling.html': {
    eyebrow: 'Architectural Wall Treatments',
    title: 'Wall Paneling Sub-Categories & Louvers',
    subtitle: 'Transform bland walls with architectural fluted WPC louvers and waterproof high-gloss PVC marble slabs.',
    items: [
      {
        name: 'WPC Panel',
        badge: 'Fluted Louvers',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
        desc: 'High-density Wood Polymer Composite (WPC) fluted vertical louvers and slats with natural woodgrain foil laminations.',
        features: [
          '100% termite-proof and moisture-resistant composite',
          'Acoustic sound absorption and cable concealment',
          'Concealed clip installation for TV walls & bed backdrops'
        ],
        ctaText: 'Get a Quote for WPC Panels'
      },
      {
        name: 'PVC Panel',
        badge: 'Waterproof & UV Marble',
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
        desc: 'UV high-gloss PVC marble sheets (8ft x 4ft) and interlocking hollow fluted panels offering complete waterproof wall encapsulation.',
        features: [
          'Permanently seals damp seepage walls (seelan proof)',
          'High-gloss Italian Statuario & Calacatta marble look',
          'Lightweight, fire-retardant, and zero maintenance'
        ],
        ctaText: 'Get a Quote for PVC Panels'
      }
    ]
  },

  'services/window-blinds.html': {
    eyebrow: 'Window & Glass Solutions',
    title: 'Blinds & Glass Treatment Sub-Categories',
    subtitle: 'Engineered for Karachi heat and sunlight control, customized to exact window dimensions.',
    items: [
      {
        name: 'Window Blinds',
        badge: 'Zebra & Roller Blinds',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        desc: 'Custom-measured Zebra dual-sheer blinds, 100% Blackout roller shades, and vertical aluminum blinds with heavy-duty chain or motorized controls.',
        features: [
          'Smooth light filtering and 100% room-darkening options',
          'Dust-repellent polyester fabric engineered for longevity',
          'Heavy-gauge aluminum cassette and bottom weight bar'
        ],
        ctaText: 'Get a Quote for Window Blinds'
      },
      {
        name: 'Glass Paper',
        badge: 'Privacy & Heat Control',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
        desc: 'Frosted architectural glass films, decorative patterned papers, and solar heat control window films.',
        features: [
          'Rejects up to 78% solar heat and 99% UV rays',
          'Creates daytime two-way privacy for glass partitions',
          'Clean, bubble-free professional application and removal'
        ],
        ctaText: 'Get a Quote for Glass Paper'
      }
    ]
  }
};

function buildSubcategoryHtml(categoryConfig) {
  const cardsHtml = categoryConfig.items.map(item => {
    const encodedName = encodeURIComponent(item.name);
    const waUrl = `https://wa.me/923132663450?text=Hi%20Link%20Decor%2C%20I%20am%20interested%20in%20your%20${encodedName}%20services.%20Can%20I%20get%20a%20quote%3F`;
    const featuresList = item.features.map(f => `<li><span class="material-symbols-outlined">check_circle</span> ${f}</li>`).join('\n              ');

    return `
        <!-- Sub-Category Card: ${item.name} -->
        <article class="service-card">
          <div class="service-card-media">
            <img src="${item.image}" alt="${item.name} - Link Decor Karachi" loading="lazy">
            <span class="service-badge">${item.badge}</span>
          </div>
          <div class="service-card-body">
            <h3 class="service-card-title">${item.name}</h3>
            <p class="service-card-desc">${item.desc}</p>
            <ul class="service-features-list">
              ${featuresList}
            </ul>
            <div class="service-card-footer" style="margin-top:auto; padding-top:16px;">
              <a href="${waUrl}" class="btn btn-whatsapp w-full py-2.5 px-4 text-sm font-medium flex items-center justify-center gap-2" data-whatsapp data-service="${item.name}" target="_blank" rel="noopener noreferrer">
                <span class="material-symbols-outlined text-lg" style="font-size:19px;line-height:1;display:inline-flex;align-items:center;">chat</span>
                <span>${item.ctaText}</span>
              </a>
            </div>
          </div>
        </article>`;
  }).join('\n');

  return `
      <!-- Dedicated Sub-Categories Showcase -->
      <div class="subcategory-section">
        <div class="subcategory-header">
          <span class="section-eyebrow">${categoryConfig.eyebrow}</span>
          <h2>${categoryConfig.title}</h2>
          <p class="section-subtitle">${categoryConfig.subtitle}</p>
        </div>

        <div class="subcategory-grid">
${cardsHtml}
        </div>
      </div>
`;
}

// Inject into the 5 pages
for (const [relPath, config] of Object.entries(pageSubcategories)) {
  const filePath = path.join(projectRoot, relPath);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove previous subcategory-section if any
  content = content.replace(/<!-- Dedicated Sub-Categories Showcase -->[\s\S]*?<!-- Pricing Table -->/, '<!-- Pricing Table -->');

  const subcategoryHtml = buildSubcategoryHtml(config);

  // Insert immediately before <!-- Pricing Table -->
  content = content.replace('<!-- Pricing Table -->', `${subcategoryHtml}\n      <!-- Pricing Table -->`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Injected ${config.items.length} sub-categories into ${relPath}`);
}
