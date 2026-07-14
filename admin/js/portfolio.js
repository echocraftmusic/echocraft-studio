/*
==========================================================
EC FRAMEWORK
PORTFOLIO PAGE CONTROLLER
Version 1.0
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio Ready");

    renderPortfolioStats();

    const portfolioForm = document.getElementById("newPortfolioForm");

    if (portfolioForm) {

        portfolioForm.addEventListener("submit", function (e) {

            e.preventDefault();

            window.ecPortfolio.add({

                title: document.getElementById("portfolioTitle").value,

                category: document.getElementById("portfolioCategory").value,

                media: document.getElementById("portfolioMedia").value,

                featured: document.getElementById("portfolioFeatured").checked

            });

            renderPortfolioStats();

            this.reset();

            document
                .querySelector("[data-close-modal]")
                .click();

        });

    }

});

function renderPortfolioStats() {

    if (!window.ecPortfolio) return;

    const items = window.ecPortfolio.getAll();

    const cards = document.querySelectorAll(".statCard span");

    if (cards.length < 4) return;

    const featured =
        items.filter(item => item.featured).length;

    const categories =
        [...new Set(items.map(item => item.category))].length;

    cards[0].textContent = items.length;
    cards[1].textContent = featured;
    cards[2].textContent = categories;
    cards[3].textContent = items.length;

}