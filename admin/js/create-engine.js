/*
==========================================================
EC FRAMEWORK
CREATE ENGINE
Version 1.0
==========================================================
*/

class ECCreateEngine {

    constructor() {

        this.render = window.ecRender;

    }

    /* ======================================================
       CLIENT
    ====================================================== */

    client(data) {

        const client = window.ecClients.add(data);

        if (window.ecActivity) {

            window.ecActivity.clientAdded(client.name);

        }

        this.refresh();

        return client;

    }

    /* ======================================================
       PROJECT
    ====================================================== */

    project(data) {

        const project = window.ecProjects.add(data);

        if (window.ecActivity) {

            window.ecActivity.projectCreated(project.name);

        }

        this.refresh();

        return project;

    }

    /* ======================================================
       QUOTE
    ====================================================== */

    quote(data) {

        const quote = window.ecQuotes.add(data);

        if (window.ecActivity) {

            window.ecActivity.quoteCreated(

                quote.client || quote.name || "Quote"

            );

        }

        this.refresh();

        return quote;

    }

    /* ======================================================
       REFERRAL
    ====================================================== */

    referral(data) {

        const partner = window.ecReferrals.add(data);

        if (window.ecActivity) {

            window.ecActivity.referralJoined(

                partner.name || "Referral Partner"

            );

        }

        this.refresh();

        return partner;

    }

    /* ======================================================
       PORTFOLIO
    ====================================================== */

    portfolio(data) {

        const item = window.ecPortfolio.add(data);

        if (window.ecActivity) {

            window.ecActivity.portfolioPublished(

                item.title || "Portfolio Item"

            );

        }

        this.refresh();

        return item;

    }

    /* ======================================================
       REFRESH
    ====================================================== */

    refresh() {

        if (window.ecDashboard) {

            window.ecDashboard.refresh();

        }

        if (window.ecRender) {

            window.ecRender.refresh();

        }

    }

}

/* ==========================================================
   GLOBAL INSTANCE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    window.ecCreate = new ECCreateEngine();

});