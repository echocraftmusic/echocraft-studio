/*
==========================================================
EC FRAMEWORK
PROJECT ENGINE
Version 1.0
==========================================================
*/

class ECProjectEngine{

    constructor(){

        this.storage = window.ecStorage;

        this.key = "projects";

        this.projects = this.storage.load(this.key,[]);

    }

    getAll(){

        return this.projects;

    }

    get(id){

        return this.projects.find(project=>project.id===id);

    }

    add(project){

        project.id = this.generateID();

        project.created = new Date().toISOString();

        project.updated = project.created;

        project.stage = project.stage || "New Lead";

        project.status = project.status || "Active";

        this.projects.push(project);

        this.save();

        return project;

    }

    update(id,data){

        const project = this.get(id);

        if(!project) return false;

        Object.assign(project,data);

        project.updated = new Date().toISOString();

        this.save();

        return true;

    }

    delete(id){

        this.projects = this.projects.filter(

            project=>project.id!==id

        );

        this.save();

    }

    move(id,newStage){

        const project = this.get(id);

        if(!project) return false;

        project.stage = newStage;

        project.updated = new Date().toISOString();

        this.save();

        return true;

    }

    byStage(stage){

        return this.projects.filter(

            project=>project.stage===stage

        );

    }

    search(term){

        term = term.toLowerCase();

        return this.projects.filter(project=>{

            return(

                (project.name||"").toLowerCase().includes(term) ||

                (project.client||"").toLowerCase().includes(term) ||

                (project.description||"").toLowerCase().includes(term)

            );

        });

    }

    count(){

        return this.projects.length;

    }

    save(){

        this.storage.save(this.key,this.projects);

    }

    generateID(){

        return "PR-" +

            Date.now().toString().slice(-6) +

            "-" +

            Math.floor(Math.random()*900+100);

    }

}

/* ==========================================================
   GLOBAL INSTANCE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    window.ecProjects = new ECProjectEngine();

});