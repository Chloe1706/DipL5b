

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

    const bodyContents = document.querySelectorAll(".body-content");

    const bodyContentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                bodyContentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

    bodyContents.forEach((section, index) => {
        section.style.setProperty("--stagger-index", index);
        bodyContentObserver.observe(section);
    });

    // Text blocks — fade up
    const textBlocks = document.querySelectorAll(".text-block");
    const textBlockObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                textBlockObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    textBlocks.forEach(block => textBlockObserver.observe(block));

    // Image blocks — fade up with slight delay (handled via CSS transition-delay)
    const imageBlocks = document.querySelectorAll(".image-block");
    const imageBlockObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                imageBlockObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    imageBlocks.forEach(block => imageBlockObserver.observe(block));

    // Artwork figures — alternating left/right slide in
    const artworks = document.querySelectorAll(".artwork");
    const artworkObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("artwork-in-view");
                artworkObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

    artworks.forEach((artwork, index) => {
        artwork.style.setProperty("--artwork-index", index);
        artworkObserver.observe(artwork);
    });

    const sourceItems = document.querySelectorAll(".source-item");

    const sourceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("source-in-view");
                sourceObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -30px 0px"
    });

    sourceItems.forEach((item, index) => {
        item.style.setProperty("--source-index", index);
        sourceObserver.observe(item);
    });
});
