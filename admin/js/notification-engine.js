/*
==========================================================
EC FRAMEWORK
NOTIFICATION ENGINE
Version 1.0
==========================================================
*/

class ECNotificationEngine {

    constructor(){

        this.createContainer();

    }

    createContainer(){

        this.container = document.querySelector(".ec-notifications");

        if(!this.container){

            this.container = document.createElement("div");
            this.container.className = "ec-notifications";

            document.body.appendChild(this.container);

        }

    }

    show(title,message,type="info",duration=4000){

        const icons = {

            success:"fa-circle-check",
            warning:"fa-triangle-exclamation",
            danger:"fa-circle-xmark",
            info:"fa-circle-info"

        };

        const card = document.createElement("div");

        card.className = `ec-notification ec-${type}`;

        card.innerHTML = `

            <div class="ec-notification-icon">

                <i class="fa-solid ${icons[type] || icons.info}"></i>

            </div>

            <div class="ec-notification-content">

                <h4 class="ec-notification-title">${title}</h4>

                <p class="ec-notification-message">${message}</p>

            </div>

            <button class="ec-notification-close">

                <i class="fa-solid fa-xmark"></i>

            </button>

            <div class="ec-notification-progress"></div>

        `;

        this.container.appendChild(card);

        const close = ()=>{

            card.style.animation="ecNotificationOut .30s forwards";

            setTimeout(()=>{

                card.remove();

            },300);

        };

        card.querySelector(".ec-notification-close")
            .addEventListener("click",close);

        setTimeout(close,duration);

    }

    success(title,message){

        this.show(title,message,"success");

    }

    warning(title,message){

        this.show(title,message,"warning");

    }

    danger(title,message){

        this.show(title,message,"danger");

    }

    info(title,message){

        this.show(title,message,"info");

    }

}

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    window.ecNotify = new ECNotificationEngine();

});