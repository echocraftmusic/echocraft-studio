/*
==========================================================
EC FRAMEWORK
ANALYTICS ENGINE
Version 1.0
==========================================================
*/

class ECAnalyticsEngine{

    constructor(){

        this.clients = window.ecClients;
        this.projects = window.ecProjects;
        this.quotes = window.ecQuotes;
        this.referrals = window.ecReferrals;
        this.portfolio = window.ecPortfolio;

    }

    dashboard(){

        return{

            clients: this.totalClients(),

            projects: this.totalProjects(),

            quotes: this.totalQuotes(),

            quoteValue: this.quoteValue(),

            referrals: this.totalReferrals(),

            commissions: this.totalCommissions(),

            portfolio: this.totalPortfolio(),

            featuredPortfolio: this.featuredPortfolio()

        };

    }

    totalClients(){

        return this.clients ? this.clients.count() : 0;

    }

    totalProjects(){

        return this.projects ? this.projects.count() : 0;

    }

    totalQuotes(){

        return this.quotes ? this.quotes.count() : 0;

    }

    quoteValue(){

        return this.quotes ? this.quotes.totalValue() : 0;

    }

    totalReferrals(){

        return this.referrals ?

            this.referrals.getAll().length : 0;

    }

    totalCommissions(){

        return this.referrals ?

            this.referrals.totalCommission() : 0;

    }

    totalPortfolio(){

        return this.portfolio ?

            this.portfolio.count() : 0;

    }

    featuredPortfolio(){

        return this.portfolio ?

            this.portfolio.featured().length : 0;

    }

    export(){

        return{

            generated:new Date().toISOString(),

            dashboard:this.dashboard()

        };

    }

}

/* ==========================================================
   GLOBAL INSTANCE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    window.ecAnalytics = new ECAnalyticsEngine();

});