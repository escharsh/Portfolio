/**
 * Portfolio interactions: navigation and testimonials slider.
 */
(function () {
  "use strict";

  const select = (selector, all = false) => {
    const elements = document.querySelectorAll(selector);
    return all ? [...elements] : elements[0] || null;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMobileNavigation = () => {
    const navbar = select("#navbar");
    const toggle = select(".mobile-nav-toggle");

    if (navbar?.classList.contains("navbar-mobile")) {
      navbar.classList.remove("navbar-mobile");
      toggle?.classList.replace("bi-x", "bi-list");
    }
  };

  // Toggle the mobile navigation menu.
  select(".mobile-nav-toggle")?.addEventListener("click", function () {
    const navbar = select("#navbar");
    if (!navbar) return;

    navbar.classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  // Switch between the portfolio sections when a navigation link is clicked.
  select("#navbar .nav-link", true).forEach((link) => {
    link.addEventListener("click", function (event) {
      const target = select(this.hash);
      if (!target) return;

      event.preventDefault();

      const header = select("#header");
      const sections = select("section", true);
      select("#navbar .nav-link", true).forEach((item) => {
        item.classList.toggle("active", item === this);
      });

      closeMobileNavigation();
      if (!header) return;

      if (this.hash === "#header") {
        header.classList.remove("header-top");
        sections.forEach((section) => section.classList.remove("section-show"));
        scrollToTop();
        return;
      }

      const showTarget = () => {
        sections.forEach((section) => section.classList.remove("section-show"));
        target.classList.add("section-show");
      };

      if (!header.classList.contains("header-top")) {
        header.classList.add("header-top");
        window.setTimeout(showTarget, 350);
      } else {
        showTarget();
      }

      scrollToTop();
    });
  });

  // Open a section directly when the page loads with a section hash.
  window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (!hash) return;

    const target = select(hash);
    if (!target) return;

    select("#header")?.classList.add("header-top");
    select("#navbar .nav-link", true).forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === hash);
    });

    window.setTimeout(() => target.classList.add("section-show"), 350);
    scrollToTop();
  });

  // Responsive testimonials carousel.
  const testimonialsSlider = select(".testimonials-slider");
  if (testimonialsSlider && typeof Swiper !== "undefined") {
    new Swiper(testimonialsSlider, {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: testimonialsSlider.querySelector(".swiper-pagination"),
        type: "bullets",
        clickable: true
      },
      navigation: {
        nextEl: testimonialsSlider.querySelector(".swiper-button-next"),
        prevEl: testimonialsSlider.querySelector(".swiper-button-prev")
      },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 20 }
      },
      a11y: { enabled: true }
    });
  }
})();
