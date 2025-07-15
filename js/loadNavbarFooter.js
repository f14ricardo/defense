/*!
  * Ricardo Rodrigues dos Santos (ricardoinforodri@gmail.com)
  * Copyright 2025 Instituto Defense
  * Licensed Instituto Defense Public License v1.0 (https://f14ricardo.github.io/defense/)
  * Description: Load Navbar and Footer from external files
  */

document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;
    const base = path.includes("/html/") ? "../" : "./";

    fetch(base + "html/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        });

    fetch(base + "html/footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
        });
});
