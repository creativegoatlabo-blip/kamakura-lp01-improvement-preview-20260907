const dialog = document.querySelector("#preview-dialog");
const closeButton = document.querySelector(".dialog-close");
const year = document.querySelector("#year");
const hero = document.querySelector(".hero");
const heroBooking = document.querySelector(".hero-booking");
const stickyCta = document.querySelector(".sticky-cta");
const previewForm = document.querySelector(".preview-form");

year.textContent = String(new Date().getFullYear());

document.querySelectorAll("[data-scroll-to]").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.hash = button.dataset.scrollTo;
  });
});

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

const reservation = document.querySelector("#reservation-preview");
const refreshSticky = () => {
  const bookingBounds = (heroBooking || hero).getBoundingClientRect();
  const reservationBounds = reservation.getBoundingClientRect();
  const reservationInView = reservationBounds.top < window.innerHeight && reservationBounds.bottom > 0;
  const showSticky = bookingBounds.bottom < 0 && !reservationInView;
  stickyCta.classList.toggle("is-visible", showSticky);
  stickyCta.inert = !showSticky;
};

const heroObserver = new IntersectionObserver(refreshSticky);
heroObserver.observe(heroBooking || hero);
heroObserver.observe(reservation);
