

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelectorAll(".nav-links");

    toggle.addEventListener("click", () => {
        links.forEach(list => list.classList.toggle("is-open"));
    });
});
