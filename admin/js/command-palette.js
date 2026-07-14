/*
==========================================================
EC FRAMEWORK
COMMAND PALETTE
Version 1.0
==========================================================
*/

class ECCommandPalette{

    constructor(){

        this.commands = [];

        this.visible = false;

        this.build();

        this.registerDefaults();

        this.events();

    }

    build(){

        this.container = document.createElement("div");

        this.container.className = "ec-command-overlay";

        this.container.innerHTML = `

            <div class="ec-command">

                <input
                    type="text"
                    class="ec-command-search"
                    placeholder="Type a command..."
                >

                <div class="ec-command-results"></div>

            </div>

        `;

        document.body.appendChild(this.container);

        this.search =
            this.container.querySelector(".ec-command-search");

        this.results =
            this.container.querySelector(".ec-command-results");

    }

    register(name,action){

        this.commands.push({

            name,

            action

        });

    }

    registerDefaults(){

        this.register("Dashboard",()=>{

            location.href="../dashboard.html";

        });

        this.register("Clients",()=>{

            location.href="clients.html";

        });

        this.register("Projects",()=>{

            location.href="projects.html";

        });

        this.register("Quotes",()=>{

            location.href="quotes.html";

        });

        this.register("Referral Network",()=>{

            location.href="referrals.html";

        });

        this.register("Portfolio",()=>{

            location.href="portfolio.html";

        });

        this.register("Analytics",()=>{

            location.href="analytics.html";

        });

        this.register("Settings",()=>{

            location.href="../settings.html";

        });

    }

    events(){

        document.addEventListener("keydown",(e)=>{

            if(e.ctrlKey && e.key.toLowerCase()==="k"){

                e.preventDefault();

                this.toggle();

            }

            if(e.key==="Escape"){

                this.hide();

            }

        });

        this.search.addEventListener("input",()=>{

            this.render();

        });

    }

    toggle(){

        this.visible ? this.hide() : this.show();

    }

    show(){

        this.visible = true;

        this.container.classList.add("active");

        this.search.value="";

        this.render();

        this.search.focus();

    }

    hide(){

        this.visible = false;

        this.container.classList.remove("active");

    }

    render(){

        const value = this.search.value.toLowerCase();

        this.results.innerHTML="";

        this.commands

            .filter(command=>

                command.name.toLowerCase().includes(value)

            )

            .forEach(command=>{

                const row = document.createElement("div");

                row.className="ec-command-item";

                row.textContent = command.name;

                row.onclick=()=>{

                    this.hide();

                    command.action();

                };

                this.results.appendChild(row);

            });

    }

}

/* ==========================================================
   GLOBAL
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    window.ecCommand = new ECCommandPalette();

});