document.addEventListener("DOMContentLoaded", function () {
    const banners = document.querySelectorAll(".banner");

    banners.forEach(banner => {
        banner.addEventListener("click", function () {
            const link = this.getAttribute("data-link");
            window.location.href = link;
        });
    });
});
