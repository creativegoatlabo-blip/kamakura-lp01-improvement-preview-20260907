(() => {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const root = document.documentElement;
  if (preference.matches || !("IntersectionObserver" in window)) {
    root.dataset.scrollMotion = "off";
    return;
  }

  const targets = new Set();
  let observer;

  const reveal = (element, immediately = false) => {
    if (immediately) element.classList.add("reveal-immediate");
    element.dataset.revealState = "visible";
    observer?.unobserve(element);
  };

  const stopMotion = () => {
    observer?.disconnect();
    targets.forEach((element) => reveal(element, true));
    root.dataset.scrollMotion = "off";
  };

  const prepare = (selector, kind, stagger = 0) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      targets.add(element);
      element.dataset.reveal = kind;
      element.style.setProperty("--reveal-delay", `${Math.min(index * stagger, 280)}ms`);
      element.dataset.revealState = "pending";
    });
  };

  const splitHeading = (heading) => {
    const fragment = document.createDocumentFragment();
    let line;
    let index = 0;
    const nextLine = () => {
      const mask = document.createElement("span");
      mask.className = "motion-line";
      line = document.createElement("span");
      line.className = "motion-line__inner";
      line.style.setProperty("--line-index", index++);
      mask.append(line);
      fragment.append(mask);
    };
    nextLine();
    [...heading.childNodes].forEach((node) => {
      if (node.nodeName === "BR") nextLine();
      else line.append(node);
    });
    heading.replaceChildren(fragment);
  };

  try {
    document.querySelectorAll("main h1, main h2").forEach(splitHeading);
    prepare("main h1, main h2", "title");
    prepare("main .section-label", "label");
    prepare(".hero__main-image, .point-row > img", "image");
    prepare(".concept__visuals > img", "image", 110);
    prepare(".product-card", "image", 110);
    prepare(".hero__lede, .point-copy, .voice", "group");
    prepare(".decision-strip > div", "group", 70);
    prepare(".step-list > li", "group", 70);

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach((element) => observer.observe(element));
    root.dataset.scrollMotion = "on";

    // Finishing a reveal never hides the content again, including on back-scroll.
    preference.addEventListener("change", (event) => {
      if (event.matches) stopMotion();
    });
    window.addEventListener("beforeprint", stopMotion);
    document.addEventListener("focusin", (event) => {
      const target = event.target.closest("[data-reveal]");
      if (target) reveal(target, true);
    });
  } catch {
    // A visual enhancement must not make content or the booking preview unusable.
    stopMotion();
  }
})();
