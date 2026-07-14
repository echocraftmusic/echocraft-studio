/*
==========================================================
EC FRAMEWORK
CLIENT ENGINE
Version 1.0
==========================================================
*/

class ECClientEngine{

    constructor(){

        this.storage = window.ecStorage;

        this.key = "clients";

        this.clients = this.storage.load(this.key,[]);

    }

    getAll(){

        return this.clients;

    }

    get(id){

        return this.clients.find(client=>client.id===id);

    }

    add(client){

        client.id = this.generateID();

        client.created = new Date().toISOString();

        client.updated = client.created;

        client.status = client.status || "Lead";

        this.clients.push(client);

        this.save();

        return client;

    }

    update(id,data){

        const client = this.get(id);

        if(!client) return false;

        Object.assign(client,data);

        client.updated = new Date().toISOString();

        this.save();

        return true;

    }

    delete(id){

        this.clients = this.clients.filter(

            client=>client.id!==id

        );

        this.save();

    }

    search(term){

        term = term.toLowerCase();

        return this.clients.filter(client=>{

            return (

                (client.name||"").toLowerCase().includes(term) ||

                (client.company||"").toLowerCase().includes(term) ||

                (client.email||"").toLowerCase().includes(term)

            );

        });

    }

    count(){

        return this.clients.length;

    }

    save(){

        this.storage.save(this.key,this.clients);

    }

    generateID(){

        return "CL-" +

            Date.now().toString().slice(-6) +

            "-" +

            Math.floor(Math.random()*900+100);

    }

}

/* ==========================================================
   GLOBAL INSTANCE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    window.ecClients = new ECClientEngine();

});