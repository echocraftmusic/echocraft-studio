/* ==========================================
   EC Framework v1.0
   Main
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Current Year
    const year = document.querySelector("#year");

    if(year){
        year.textContent = new Date().getFullYear();
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", e => {

            const target = document.querySelector(link.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });

        });

    });

});