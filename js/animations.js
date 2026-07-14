/* ==========================================
   EC Framework v1.0
   Animations
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
        ".fade-up, .fade-in, .zoom-in, .slide-left, .slide-right"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach((element) => observer.observe(element));

});