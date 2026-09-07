const dialog = document.querySelector("#preview-dialog");
const closeButton = document.querySelector(".dialog-close");
const year = document.querySelector("#year");
const hero = document.querySelector(".hero");
const stickyCta = document.querySelector(".sticky-cta");
const previewForm = document.querySelector(".preview-form");

year.textContent = String(new Date().getFullYear());

previewForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
    return;
  }

  dialog.setAttribute("open", "");
});

closeButton.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

const heroObserver = new IntersectionObserver(([entry]) => {
  stickyCta.classList.toggle("is-visible", !entry.isIntersecting);
});

heroObserver.observe(hero);
