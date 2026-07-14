/*
==========================================================
EC FRAMEWORK
Core JavaScript
Version 1.0
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSidebar();

    initializeTables();

    initializeTooltips();

    initializeSearch();

    initializeNotifications();

});

/* =======================================================
   SIDEBAR
======================================================= */

function initializeSidebar(){

    const current = window.location.pathname.split("/").pop();

    document.querySelectorAll(".sidebar nav a").forEach(link=>{

        const href = link.getAttribute("href");

        if(!href) return;

        if(href.endsWith(current)){

            link.classList.add("active");

        }

    });

}

/* =======================================================
   TABLES
======================================================= */

function initializeTables(){

    document.querySelectorAll(".ec-table tbody tr").forEach(row=>{

        row.addEventListener("mouseenter",()=>{

            row.classList.add("hover");

        });

        row.addEventListener("mouseleave",()=>{

            row.classList.remove("hover");

        });

    });

}

/* =======================================================
   SEARCH PLACEHOLDER
======================================================= */

function initializeSearch(){

    document.querySelectorAll(".ec-search").forEach(input=>{

        input.addEventListener("input",()=>{

            console.log("Future search:",input.value);

        });

    });

}

/* =======================================================
   TOOLTIPS PLACEHOLDER
======================================================= */

function initializeTooltips(){

    console.log("Tooltips Ready");

}

/* =======================================================
   NOTIFICATIONS PLACEHOLDER
======================================================= */

function initializeNotifications(){

    console.log("Notification Center Ready");

}

/* =======================================================
   FUTURE MODULES
======================================================= */

// Clients

// Projects

// Quotes

// Referral Network

// Portfolio

// Analytics

// Settings