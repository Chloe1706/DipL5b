

document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll(".parallax-header");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                const header = entry.target;
                const overlay = header.querySelector(".header-overlay");

                if (entry.isIntersecting) {
                    // restart animation reliably by forcing reflow (optional)
                    // header.classList.remove("is-visible");
                    // void header.offsetWidth;

                    header.classList.add("is-visible");
                    if (overlay) overlay.classList.add("is-visible");
                } else {
                    header.classList.remove("is-visible");
                    if (overlay) overlay.classList.remove("is-visible");
                }
            });
        },
        {
            threshold: 0.6
        }
    );

    headers.forEach(header => observer.observe(header));
});
