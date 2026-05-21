document.addEventListener("DOMContentLoaded", () => {
    const revealEls = document.querySelectorAll(
        ".artwork-section, .step, .final-context"
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach((el) => revealObserver.observe(el));
});
