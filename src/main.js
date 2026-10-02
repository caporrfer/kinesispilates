// Content, navigation and contact links work without JavaScript.
const year = document.querySelector("#copyright-year");
if (year) year.textContent = String(new Date().getFullYear());

// Progressive enhancement: navigation stays visible if JavaScript is unavailable.
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");
const mobileViewport = window.matchMedia("(max-width: 760px)");
const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
};
menuToggle.hidden = false;
navigation.classList.add("is-enhanced");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuToggle.getAttribute("aria-expanded") === "true"
  ) {
    closeMenu();
    menuToggle.focus();
  }
});
mobileViewport.addEventListener("change", closeMenu);

// No personal data is stored or sent before the visitor opens WhatsApp.
const planner = document.querySelector("#contact-planner");
planner.hidden = false;
planner.nextElementSibling.hidden = true;
planner.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = new FormData(planner);
  const message = `Hola, me gustaría informarme sobre Kinesis Pilates.\nMe interesa: ${values.get("modality")}.\nDisponibilidad: ${values.get("availability")}.\n¿Podéis indicarme horarios, tarifas y plazas disponibles?`;
  window.location.assign(
    `https://wa.me/34639532865?text=${encodeURIComponent(message)}`,
  );
});

const dialog = document.querySelector("#photo-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogCaption = document.querySelector("#dialog-caption");
if (typeof dialog.showModal === "function") {
  document.querySelectorAll(".gallery-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      dialogImage.src = link.href;
      dialogImage.alt = link.querySelector("img").alt;
      dialogCaption.textContent = link.dataset.caption;
      dialog.showModal();
      document.body.classList.add("photo-open");
    });
  });
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () =>
    document.body.classList.remove("photo-open"),
  );
}
