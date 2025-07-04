// Line 1 - script.js
document.addEventListener("DOMContentLoaded", () => {
  loadPartial("header", "/assets/header.html");
  loadPartial("footer", "/assets/footer.html");

});

function loadPartial(id, url) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    })
    .catch(error => console.error(`Error loading ${url}:`, error));
}
