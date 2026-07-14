/*
==========================================================
EC FRAMEWORK
DASHBOARD ENGINE
Version 1.0
==========================================================
*/

class ECDashboardEngine{

    constructor(){

        this.analytics = window.ecAnalytics;

        this.initialize();

    }

    initialize(){

        document.addEventListener("DOMContentLoaded",()=>{

            this.refresh();

        });

    }

    refresh(){

        if(!this.analytics) return;

        const data = this.analytics.dashboard();

        this.updateStat("clients",data.clients);

        this.updateStat("projects",data.projects);

        this.updateStat("quotes",data.quotes);

        this.updateStat("quoteValue","$"+data.quoteValue.toLocaleString());

        this.updateStat("referrals",data.referrals);

        this.updateStat("commissions","$"+data.commissions.toLocaleString());

        this.updateStat("portfolio",data.portfolio);

        this.updateStat("featuredPortfolio",data.featuredPortfolio);

    }

    updateStat(name,value){

        document.querySelectorAll(

            `[data-stat="${name}"]`

        ).forEach(element=>{

            element.textContent = value;

        });

    }

    refreshClients(){

        this.updateStat(

            "clients",

            window.ecClients.count()

        );

    }

    refreshProjects(){

        this.updateStat(

            "projects",

            window.ecProjects.count()

        );

    }

    refreshQuotes(){

        this.updateStat(

            "quotes",

            window.ecQuotes.count()

        );

        this.updateStat(

            "quoteValue",

            "$"+window.ecQuotes.totalValue().toLocaleString()

        );

    }

    refreshPortfolio(){

        this.updateStat(

            "portfolio",

            window.ecPortfolio.count()

        );

        this.updateStat(

            "featuredPortfolio",

            window.ecPortfolio.featured().length

        );

    }

    refreshReferrals(){

        this.updateStat(

            "referrals",

            window.ecReferrals.getAll().length

        );

        this.updateStat(

            "commissions",

            "$"+window.ecReferrals.totalCommission().toLocaleString()

        );

    }

}

/* ==========================================================
   GLOBAL INSTANCE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    window.ecDashboard = new ECDashboardEngine();

});