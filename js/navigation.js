/* ==========================================
   ECHO CRAFT MOBILE NAVIGATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (!menuToggle || !mobileMenu) {
        return;
    }

    const menuIcon =
        menuToggle.querySelector("i");

    function openMenu() {

        mobileMenu.classList.add("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        if (menuIcon) {
            menuIcon.classList.remove(
                "fa-bars"
            );

            menuIcon.classList.add(
                "fa-xmark"
            );
        }

    }

    function closeMenu() {

        mobileMenu.classList.remove("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        if (menuIcon) {
            menuIcon.classList.remove(
                "fa-xmark"
            );

            menuIcon.classList.add(
                "fa-bars"
            );
        }

    }

    function toggleMenu() {

        const isOpen =
            mobileMenu.classList.contains(
                "is-open"
            );

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    }

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-controls",
        "mobileMenu"
    );

    menuToggle.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            toggleMenu();

        }
    );

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

    document.addEventListener(
        "click",
        event => {

            const clickedInsideMenu =
                mobileMenu.contains(
                    event.target
                );

            const clickedToggle =
                menuToggle.contains(
                    event.target
                );

            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {
                closeMenu();
            }

        }
    );

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 768) {
                closeMenu();
            }

        }
    );

});