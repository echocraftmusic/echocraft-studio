/*
==========================================================
EC FRAMEWORK
EDIT ENGINE
Version 1.0
==========================================================
*/

class ECEditEngine {

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

    client(id, data) {

        const updated = window.ecClients.update(id, data);

        if (!updated) return false;

        if (window.ecActivity) {

            window.ecActivity.add(
                "client",
                "Client Updated",
                data.name || id
            );

        }

        this.refresh();

        return true;

    }

    /* ======================================================
       PROJECT
    ====================================================== */

    project(id, data) {

        const updated = window.ecProjects.update(id, data);

        if (!updated) return false;

        if (window.ecActivity) {

            window.ecActivity.add(
                "project",
                "Project Updated",
                data.name || id
            );

        }

        this.refresh();

        return true;

    }

    /* ======================================================
       QUOTE
    ====================================================== */

    quote(id, data) {

        const updated = window.ecQuotes.update(id, data);

        if (!updated) return false;

        if (window.ecActivity) {

            window.ecActivity.add(
                "quote",
                "Quote Updated",
                data.name || id
            );

        }

        this.refresh();

        return true;

    }

    /* ======================================================
       REFERRAL
    ====================================================== */

    referral(id, data) {

        const updated = window.ecReferrals.update(id, data);

        if (!updated) return false;

        if (window.ecActivity) {

            window.ecActivity.add(
                "referral",
                "Referral Updated",
                data.name || id
            );

        }

        this.refresh();

        return true;

    }

    /* ======================================================
       PORTFOLIO
    ====================================================== */

    portfolio(id, data) {

        const updated = window.ecPortfolio.update(id, data);

        if (!updated) return false;

        if (window.ecActivity) {

            window.ecActivity.add(
                "portfolio",
                "Portfolio Updated",
                data.title || id
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

    window.ecEdit = new ECEditEngine();

});