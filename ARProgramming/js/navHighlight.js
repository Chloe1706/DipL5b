const sections = document.querySelectorAll("section.section-major");
const navLinks = document.querySelectorAll(".ar-sidebar-list a");
const sidebar = document.querySelector(".ar-sidebar");
const heroBlock = document.querySelector(".main-body");
const finalSection = document.querySelector("#s09");
const navbar = document.querySelector(".navbar");

function updateSidebarPosition() {
    const heroBottom = heroBlock.getBoundingClientRect().bottom;
    const navbarHeight = navbar.offsetHeight;
    const sidebarHeight = sidebar.offsetHeight;
    const s09Top = finalSection.getBoundingClientRect().top;

    // Pin below hero while visible, otherwise sit just below navbar
    const normalTop = Math.max(heroBottom, navbarHeight);

    // As s09 approaches, slide the sidebar upward so it clears before that section
    if (s09Top < normalTop + sidebarHeight) {
        sidebar.style.top = (s09Top - sidebarHeight) + "px";
    } else {
        sidebar.style.top = normalTop + "px";
    }
}

window.addEventListener("scroll", () => {
    updateSidebarPosition();

    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

updateSidebarPosition();
