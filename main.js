
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // MENU MOBILE
  const burger = $(".burger");
  const menu = $("#menu");

  if (burger && menu) {
    const closeMenu = () => {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Apri il menu");
    };

    burger.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(isOpen));
      burger.setAttribute("aria-label", isOpen ? "Chiudi il menu" : "Apri il menu");
    });

    $$("#menu a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // ANIMAZIONI ALLO SCROLL
  const revealItems = $$(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("in"));
  }

  // GALLERIA E LIGHTBOX
  const lightbox = $("#lb");
  const lightboxImage = $("#lbImg");
  const lightboxCaption = $("#lbCap");
  const closeButton = lightbox ? $(".close", lightbox) : null;
  let lastFocused = null;

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    if (lastFocused) lastFocused.focus();
  };

  if (lightbox && lightboxImage && lightboxCaption) {
    $$(".tile").forEach(tile => {
      tile.addEventListener("click", () => {
        const tileClass = Array.from(tile.classList)
          .find(name => /^t[1-5]$/.test(name));

        if (!tileClass) return;

        lastFocused = tile;
        lightboxImage.className = `lb-img ${tileClass}`;
        lightboxCaption.textContent =
          tile.dataset.cap || "Immagine dimostrativa";

        lightbox.hidden = false;

        if (closeButton) closeButton.focus();
      });
    });

    lightbox.addEventListener("click", event => {
      if (event.target === lightbox || event.target === closeButton) {
        closeLightbox();
      }
    });

    if (closeButton) {
      closeButton.addEventListener("click", closeLightbox);
    }

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeLightbox();
    });
  }

  // MODULO DIMOSTRATIVO
  // Non invia e non salva alcun dato.
  const form = $("#quote");
  const formMessage = $("#formMsg");

  if (form && formMessage) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      let valid = true;

      $$("input, select, textarea", form).forEach(field => {
        const value = field.value.trim();
        const isEmail = field.type === "email";

        const invalid = field.required &&
          (!value || (
            isEmail &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ));

        field.classList.toggle("err", invalid);
        field.setAttribute("aria-invalid", String(invalid));

        if (invalid) valid = false;
      });

      if (!valid) {
        formMessage.textContent =
          "Controlla i campi evidenziati: inserisci tutti i dati richiesti.";
        return;
      }

      formMessage.textContent =
        "Modulo compilato correttamente. Questa è una demo: i dati NON sono stati inviati.";

      form.reset();

      $$("input, select, textarea", form).forEach(field => {
        field.classList.remove("err");
        field.setAttribute("aria-invalid", "false");
      });
    });

    $$("input, select, textarea", form).forEach(field => {
      field.addEventListener("input", () => {
        field.classList.remove("err");
        field.setAttribute("aria-invalid", "false");
      });

      field.addEventListener("change", () => {
        field.classList.remove("err");
        field.setAttribute("aria-invalid", "false");
      });
    });
  }
})();

