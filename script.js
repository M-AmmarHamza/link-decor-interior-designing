/**
 * Link Decor - Lead Generation & WhatsApp Engine
 * Consultative Selling Architecture for Karachi Interior Designing
 */

const WHATSAPP_NUMBER = "923132663450";

function buildWhatsAppUrl(message, phone = WHATSAPP_NUMBER) {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

function initWhatsAppCTAs() {
  const buttons = document.querySelectorAll("[data-whatsapp]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute("data-service");
      const customMessage = btn.getAttribute("data-message");
      
      let message = "Hi Link Decor, I would like to book a free consultation for interior designing in Karachi.";
      
      if (serviceName) {
        message = `Hi Link Decor, I am interested in your ${serviceName} services. Can I get a quote?`;
      } else if (customMessage) {
        message = customMessage;
      }
      
      const url = buildWhatsAppUrl(message);
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

function initMobileMenu() {
  const toggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector(".nav-links");
  if (!toggle || !nav) return;

  function openMenu() {
    nav.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    const icon = toggle.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = "close";
    document.body.classList.add("mobile-menu-open");
  }

  function closeMenu() {
    nav.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    const icon = toggle.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = "menu";
    document.body.classList.remove("mobile-menu-open");
  }

  function toggleMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (nav.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Toggle button event listeners
  toggle.addEventListener("click", toggleMenu);

  // Close when clicking any nav link inside drawer
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Prevent clicks inside nav drawer from closing it
  nav.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Close when clicking anywhere outside header & nav
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("active")) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      closeMenu();
    }
  });

  // Close drawer if resized to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && nav.classList.contains("active")) {
      closeMenu();
    }
  }, { passive: true });
}

function initPortfolioFilter() {
  const tabButtons = document.querySelectorAll(".portfolio-tab-btn");
  const cards = document.querySelectorAll(".portfolio-card");
  if (!tabButtons.length || !cards.length) return;

  function applyFilter(filter) {
    cards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        card.style.display = "block";
        card.style.opacity = "1";
      } else {
        card.style.display = "none";
        card.style.opacity = "0";
      }
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.getAttribute("data-filter");
      applyFilter(filter);

      // Smooth scroll the clicked button into view horizontally if near edge
      try {
        button.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
      } catch (e) {}
    });
  });

  // Desktop mouse wheel & drag horizontal scrolling for 18 category filter tabs
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
  }
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      faqItems.forEach((i) => i.classList.remove("open"));
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });
}

function initLeadCalculator() {
  const quoteForm = document.getElementById("quote-calculator-form");
  if (!quoteForm) return;

  quoteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (quoteForm.querySelector('[name="name"]')?.value || "").trim();
    const service = quoteForm.querySelector('[name="service"]')?.value || "General Interior Consultation";
    const area = quoteForm.querySelector('[name="area"]')?.value || "Karachi";
    const sqft = (quoteForm.querySelector('[name="sqft"]')?.value || "").trim();
    const details = (quoteForm.querySelector('[name="notes"]')?.value || "").trim();

    let msg = `Hi Link Decor, I am requesting a quotation for interior designing in Karachi.\n\n`;
    if (name) msg += `*Name:* ${name}\n`;
    msg += `*Service Required:* ${service}\n`;
    msg += `*Location / Area:* ${area}\n`;
    if (sqft) msg += `*Estimated Area:* ${sqft} Sq.ft\n`;
    if (details) msg += `*Requirements:* ${details}\n`;
    msg += `\nPlease provide estimated rates and consultation availability.`;

    const url = buildWhatsAppUrl(msg);
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

// Global initialization
function init() {
  initWhatsAppCTAs();
  initHeaderScroll();
  initMobileMenu();
  initPortfolioFilter();
  initFaqAccordion();
  initLeadCalculator();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}