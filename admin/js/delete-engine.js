/*
==========================================================
EC FRAMEWORK
DELETE ENGINE
Version 1.0
==========================================================
*/

class ECDeleteEngine {

    constructor() {

        this.refresh = () => {

            if (window.ecRender) {

                window.ecRender.refresh();

            }

            if (window.ecDashboard) {

                window.ecDashboard.refresh();

            }

        };

    }

    /* ======================================================
       CLIENT
    ====================================================== */

    client(id) {

        const client = window.ecClients.get(id);

        if (!client) return false;

        window.ecClients.delete(id);

        if (window.ecActivity) {

            window.ecActivity.add(

                "client",

                "Client Deleted",

                client.name || id

            );

        }

        this.refresh();

        return true;

    }

    /* ======================================================
       PROJECT
    ====================================================== */

    project(id) {

        const project = window.ecProjects.get(id);

        if (!project) return false;

        window.ecProjects.delete(id);

        if (window.ecActivity) {

            window.ecActivity.add(

                "project",

                "Project Deleted",

                project.name || id

            );

        }

        this.refresh();

        return true;

    }

    /* ======================================================
       QUOTE
    ====================================================== */

    quote(id) {

        const quote = window.ecQuotes.get(id);

        if (!quote) return false;

        window.ecQuotes.delete(id);

        if (window.ecActivity) {

            window.ecActivity.add(

                "quote",

                "Quote Deleted",

                quote.name || quote.id

            );

        }

        this.refresh();

        return true;

    }

    /* ======================================================
       REFERRAL
    ====================================================== */

    referral(id) {

        const partner = window.ecReferrals.get(id);

        if (!partner) return false;

        window.ecReferrals.delete(id);

        if (window.ecActivity) {

            window.ecActivity.add(

                "referral",

                "Referral Partner Removed",

                partner.name || id

            );

        }

        this.refresh();

        return true;

    }

    /* ======================================================
       PORTFOLIO
    ====================================================== */

    portfolio(id) {

        const item = window.ecPortfolio.get(id);

        if (!item) return false;

        window.ecPortfolio.delete(id);

        if (window.ecActivity) {

            window.ecActivity.add(

                "portfolio",

                "Portfolio Item Deleted",

                item.title || id

            );

        }

        this.refresh();

        return true;

    }

}

/* ==========================================================
   GLOBAL INSTANCE
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    window.ecDelete = new ECDeleteEngine();

});