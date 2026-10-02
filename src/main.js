// Content, navigation and contact links work without JavaScript.
const year = document.querySelector("#copyright-year");
if (year) year.textContent = String(new Date().getFullYear());
