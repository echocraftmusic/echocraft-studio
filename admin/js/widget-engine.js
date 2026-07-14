/*
==========================================================
EC FRAMEWORK
WIDGET ENGINE
Version 1.0
==========================================================
*/

class ECWidgetEngine {

    constructor() {

        this.refresh();

    }

    refresh() {

        this.renderClientCount();
        this.renderProjectCount();
        this.renderQuoteCount();
        this.renderRevenue();
        this.renderReferralCount();
        this.renderPortfolioCount();
        this.renderRecentActivity();

    }

    renderClientCount() {

        this.setWidget(

            "clients",

            window.ecClients
                ? window.ecClients.count()
                : 0

        );

    }

    renderProjectCount() {

        this.setWidget(

            "projects",

            window.ecProjects
                ? window.ecProjects.count()
                : 0

        );

    }

    renderQuoteCount() {

        this.setWidget(

            "quotes",

            window.ecQuotes
                ? window.ecQuotes.count()
                : 0

        );

    }

    renderRevenue() {

        const total = window.ecQuotes
            ? window.ecQuotes.totalValue()
            : 0;

        this.setWidget(

            "revenue",

            "$" + total.toLocaleString()

        );

    }

    renderReferralCount() {

        this.setWidget(

            "referrals",

            window.ecReferrals
                ? window.ecReferrals.getAll().length
                : 0

        );

    }

    renderPortfolioCount() {

        this.setWidget(

            "portfolio",

            window.ecPortfolio
                ? window.ecPortfolio.count()
                : 0

        );

    }

    renderRecentActivity() {

        const container = document.querySelector(

            "[data-widget='activity']"

        );

        if (!container) return;

        container.innerHTML = "";

        if (!window.ecActivity) {

            container.innerHTML = "<p>No activity.</p>";

            return;

        }

        const activity = window.ecActivity.latest(8);

        if (activity.length === 0) {

            container.innerHTML = "<p>No activity yet.</p>";

            return;

        }

        activity.forEach(item => {

            container.insertAdjacentHTML(

                "beforeend",

                `
                <div class="ec-widget-activity">

                    <strong>${item.title}</strong>

                    <p>${item.description}</p>

                    <small>${new Date(item.created).toLocaleString()}</small>

                </div>
                `

            );

        });

    }

    setWidget(name, value) {

        document.querySelectorAll(

            `[data-widget="${name}"]`

        ).forEach(widget => {

            widget.textContent = value;

        });

    }

}

/* ==========================================================
   GLOBAL INSTANCE
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    window.ecWidgets = new ECWidgetEngine();

});