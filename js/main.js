(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky header shadow on scroll
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");

  function closeMenu() {
    mainNav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    mainNav.classList.add("open");
    menuToggle.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("menu-open");
  }

  menuToggle.addEventListener("click", function () {
    if (mainNav.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (e) {
    if (!mainNav.classList.contains("open")) return;
    if (mainNav.contains(e.target) || menuToggle.contains(e.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mainNav.classList.contains("open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Smooth-scroll to any same-page anchor link (nav, hero, card links)
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href").slice(1);
      var target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Smooth-scroll to the hash target on arrival from another page (e.g. collections.html#necklaces)
  if (window.location.hash) {
    var hashTarget = document.getElementById(window.location.hash.slice(1));
    if (hashTarget) {
      window.requestAnimationFrame(function () {
        hashTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  // Scroll-reveal animation
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }
})();
