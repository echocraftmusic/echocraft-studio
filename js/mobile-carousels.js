/* ==========================================
   Echo Craft Mobile Carousels
   Featured Work • Creative Services • Process
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const carouselSections = document.querySelectorAll(
        "[data-mobile-carousel]"
    );

    carouselSections.forEach(section => {

        const track = section.querySelector(
            "[data-carousel-track]"
        );

        const previousButton = section.querySelector(
            "[data-carousel-previous]"
        );

        const nextButton = section.querySelector(
            "[data-carousel-next]"
        );

        if (!track || !previousButton || !nextButton) {
            return;
        }

        const getCards = () => {
            return Array.from(track.children).filter(card => {
                return card.nodeType === 1;
            });
        };

        const getCardStep = () => {

            const cards = getCards();

            if (cards.length === 0) {
                return track.clientWidth;
            }

            const firstCard = cards[0];

            const trackStyles =
                window.getComputedStyle(track);

            const gap =
                parseFloat(trackStyles.columnGap) ||
                parseFloat(trackStyles.gap) ||
                0;

            return firstCard.getBoundingClientRect().width + gap;
        };

        const scrollCarousel = direction => {

            const distance = getCardStep();

            track.scrollBy({
                left: distance * direction,
                behavior: "smooth"
            });

        };

        previousButton.addEventListener("click", () => {
            scrollCarousel(-1);
        });

        nextButton.addEventListener("click", () => {
            scrollCarousel(1);
        });

        const updateButtons = () => {

            const maximumScroll =
                track.scrollWidth - track.clientWidth;

            const currentScroll =
                Math.abs(track.scrollLeft);

            previousButton.disabled =
                currentScroll <= 5;

            nextButton.disabled =
                currentScroll >= maximumScroll - 5;

        };

        track.addEventListener(
            "scroll",
            updateButtons,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateButtons
        );

        updateButtons();

    });

});
