/*
==========================================================
EC FRAMEWORK
STORAGE ENGINE
Version 1.0
==========================================================
*/

class ECStorage {

    constructor(namespace = "ecframework"){

        this.namespace = namespace;

    }

    key(name){

        return `${this.namespace}.${name}`;

    }

    save(name,data){

        try{

            localStorage.setItem(
                this.key(name),
                JSON.stringify(data)
            );

            return true;

        }catch(error){

            console.error("Storage Save Error",error);

            return false;

        }

    }

    load(name,defaultValue=[]){

        try{

            const data = localStorage.getItem(this.key(name));

            if(data===null){

                return defaultValue;

            }

            return JSON.parse(data);

        }catch(error){

            console.error("Storage Load Error",error);

            return defaultValue;

        }

    }

    remove(name){

        localStorage.removeItem(this.key(name));

    }

    exists(name){

        return localStorage.getItem(this.key(name)) !== null;

    }

    clear(){

        Object.keys(localStorage).forEach(key=>{

            if(key.startsWith(this.namespace+".")){

                localStorage.removeItem(key);

            }

        });

    }

    export(){

        const output={};

        Object.keys(localStorage).forEach(key=>{

            if(key.startsWith(this.namespace+".")){

                output[key]=JSON.parse(localStorage.getItem(key));

            }

        });

        return output;

    }

    import(data){

        Object.entries(data).forEach(([key,value])=>{

            localStorage.setItem(

                key,

                JSON.stringify(value)

            );

        });

    }

}

/* ==========================================================
   GLOBAL STORAGE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    window.ecStorage = new ECStorage();

});