/**
 * Link Decor - Lead Generation & WhatsApp Engine
 * Consultative Selling Architecture for Karachi Interior Designing
 */

const WHATSAPP_NUMBER = "923161013991";

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
      const customMessage = btn.getAttribute("data-message");
      const serviceName = btn.getAttribute("data-service");
      
      let message = "Hi Link Decor, I would like to book a free consultation for interior designing in Karachi.";
      
      if (customMessage) {
        message = customMessage;
      } else if (serviceName) {
        message = `Hi Link Decor, I need details and a quote for ${serviceName} at my location in Karachi.`;
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

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.innerHTML = isOpen 
      ? '<span class="material-symbols-outlined">close</span>'
      : '<span class="material-symbols-outlined">menu</span>';
  });

  // Close when clicking nav link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<span class="material-symbols-outlined">menu</span>';
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!headerContains(e.target) && nav.classList.contains("active")) {
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<span class="material-symbols-outlined">menu</span>';
    }
  });

  function headerContains(target) {
    const header = document.querySelector(".site-header");
    return header && header.contains(target);
  }
}

function initPortfolioFilter() {
  const tabButtons = document.querySelectorAll(".portfolio-tab-btn");
  const cards = document.querySelectorAll(".portfolio-card");
  if (!tabButtons.length || !cards.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

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
    });
  });
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
document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppCTAs();
  initHeaderScroll();
  initMobileMenu();
  initPortfolioFilter();
  initFaqAccordion();
  initLeadCalculator();
});
