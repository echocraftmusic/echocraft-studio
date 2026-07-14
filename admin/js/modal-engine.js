/*
==========================================================
EC FRAMEWORK
MODAL ENGINE
Version 1.0
==========================================================
*/

class ECModalEngine {

    constructor(){

        this.initialize();

    }

    initialize(){

        document.addEventListener("click",(e)=>{

            const openButton = e.target.closest("[data-modal]");

            if(openButton){

                this.open(openButton.dataset.modal);

            }

            const closeButton = e.target.closest("[data-close-modal]");

            if(closeButton){

                this.close(closeButton.closest(".ec-modal-overlay"));

            }

            if(e.target.classList.contains("ec-modal-overlay")){

                this.close(e.target);

            }

        });

        document.addEventListener("keydown",(e)=>{

            if(e.key==="Escape"){

                document.querySelectorAll(".ec-modal-overlay.active").forEach(modal=>{

                    this.close(modal);

                });

            }

        });

    }

    open(id){

        const modal = document.getElementById(id);

        if(!modal) return;

        modal.classList.add("active");

        document.body.style.overflow="hidden";

    }

    close(modal){

        if(!modal) return;

        modal.classList.remove("active");

        document.body.style.overflow="";

    }

    closeAll(){

        document.querySelectorAll(".ec-modal-overlay.active").forEach(modal=>{

            modal.classList.remove("active");

        });

        document.body.style.overflow="";

    }

}

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    window.ecModal = new ECModalEngine();

});