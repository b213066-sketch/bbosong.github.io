(function () {
  const header = document.querySelector("header.site");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setMenu(open) {
    if (!header || !toggle) return;
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(!header.classList.contains("is-open"));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      setMenu(false);
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    return;
  }

  const targets = document.querySelectorAll(
    ".hero__copy, .hero__media, .split > div, .stats > div, .work, blockquote, .faq, .close"
  );

  targets.forEach(function (el) {
    el.classList.add("will-reveal");
  });

  function reveal(el) {
    el.classList.add("reveal");
    el.classList.remove("will-reveal");
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });

  window.setTimeout(function () {
    document.querySelectorAll(".will-reveal").forEach(reveal);
  }, 700);
})();
