document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // animate once
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: "0px 0px -50px 0px"
    });

    sections.forEach(section => {
        observer.observe(section);
    });

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

    const sourceItems = document.querySelectorAll(".source-item");

    const sourceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("source-in-view");
                sourceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -30px 0px" });

    sourceItems.forEach((item, index) => {
        item.style.setProperty("--source-index", index);
        sourceObserver.observe(item);
    });

});