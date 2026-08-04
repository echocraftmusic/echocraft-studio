(() => {
    const mobileQuery = window.matchMedia('(max-width: 600px)');

    document.querySelectorAll('.carouselArrow').forEach((button) => {
        const track = document.getElementById(button.dataset.carousel);
        if (!track) return;

        const updateButtons = () => {
            if (!mobileQuery.matches) {
                button.disabled = false;
                return;
            }

            const group = document.querySelectorAll(`[data-carousel="${button.dataset.carousel}"]`);
            const atStart = track.scrollLeft <= 4;
            const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;

            group.forEach((control) => {
                control.disabled = control.classList.contains('prev') ? atStart : atEnd;
            });
        };

        button.addEventListener('click', () => {
            const card = track.firstElementChild;
            const gap = 16;
            const distance = card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.86;
            track.scrollBy({
                left: button.classList.contains('next') ? distance : -distance,
                behavior: 'smooth'
            });
        });

        track.addEventListener('scroll', updateButtons, { passive: true });
        window.addEventListener('resize', updateButtons);
        updateButtons();
    });
})();
