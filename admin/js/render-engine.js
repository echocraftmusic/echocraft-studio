/*
==========================================================
EC FRAMEWORK
RENDER ENGINE
Version 1.0
==========================================================
*/

class ECRenderEngine{

    refresh(){

        this.renderDashboard();

        this.renderClients();

        this.renderProjects();

        this.renderQuotes();

        this.renderReferrals();

        this.renderPortfolio();

    }

    renderDashboard(){

        if(window.ecDashboard){

            window.ecDashboard.refresh();

        }

    }

    renderClients(){

        const container = document.querySelector("[data-client-list]");

        if(!container || !window.ecClients) return;

        const clients = window.ecClients.getAll();

        container.innerHTML = "";

        if(clients.length===0){

            container.innerHTML = "<p>No Clients</p>";

            return;

        }

        clients.forEach(client=>{

            container.insertAdjacentHTML(

                "beforeend",

                `
                <div class="ec-card">

                    <h3>${client.name}</h3>

                    <p>${client.company || ""}</p>

                </div>
                `

            );

        });

    }

    renderProjects(){

        const board=document.querySelector("[data-project-board]");

        if(!board || !window.ecProjects) return;

        console.log("Projects:",window.ecProjects.count());

    }

    renderQuotes(){

        console.log("Quotes Ready");

    }

    renderReferrals(){

        console.log("Referrals Ready");

    }

    renderPortfolio(){

        console.log("Portfolio Ready");

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    window.ecRender=new ECRenderEngine();

    window.ecRender.refresh();

});