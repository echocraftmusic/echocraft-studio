/*
==========================================================
EC FRAMEWORK
FRAMEWORK ROUTER
Version 1.0
==========================================================
*/

class ECRouter {

    constructor(){

        this.currentPage = "";

        this.initialize();

    }

    initialize(){

        this.currentPage = this.getCurrentPage();

        this.highlightNavigation();

        this.initializeBreadcrumb();

    }

    getCurrentPage(){

        return window.location.pathname
            .split("/")
            .pop()
            .replace(".html","");

    }

    highlightNavigation(){

        document.querySelectorAll(".sidebar nav a").forEach(link=>{

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if(!href) return;

            if(href.includes(this.currentPage)){

                link.classList.add("active");

            }

        });

    }

    initializeBreadcrumb(){

        const crumb = document.querySelector(".ec-current-page");

        if(!crumb) return;

        crumb.textContent =
            this.currentPage
                .replace(/-/g," ")
                .replace(/\b\w/g,l=>l.toUpperCase());

    }

    navigate(url){

        window.location.href = url;

    }

    refresh(){

        location.reload();

    }

}

/* ==========================================================
   GLOBAL ROUTER
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    window.ecRouter = new ECRouter();

});