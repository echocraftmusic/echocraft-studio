/*
==========================================================
EC FRAMEWORK
QUOTES PAGE CONTROLLER
Version 1.0
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("Quotes Ready");

    renderQuoteStats();

});

function renderQuoteStats() {

    if (!window.ecQuotes) return;

    const quotes = window.ecQuotes.getAll();

    const cards =
        document.querySelectorAll(".statCard span");

    if (cards.length < 4) return;

    const drafts =
        quotes.filter(q => q.status === "Draft").length;

    const pending =
        quotes.filter(q => q.status === "Pending").length;

    const approved =
        quotes.filter(q => q.status === "Approved").length;

    let total = 0;

    quotes.forEach(q => {

        total += Number(q.total);

    });

    cards[0].textContent = drafts;

    cards[1].textContent = pending;

    cards[2].textContent = approved;

    cards[3].textContent =
        "$" + total.toLocaleString();

}

/* ==========================================================
   SAVE NEW QUOTE
========================================================== */

const quoteForm = document.getElementById("newQuoteForm");

if (quoteForm) {

    quoteForm.addEventListener("submit", function (e) {

        e.preventDefault();

        window.ecQuotes.add({

            client: document.getElementById("quoteClient").value,

            project: document.getElementById("quoteProject").value,

            total: document.getElementById("quoteTotal").value,

            status: document.getElementById("quoteStatus").value

        });

        renderQuoteStats();

        this.reset();

        document
            .querySelector('[data-close-modal]')
            .click();

    });

}