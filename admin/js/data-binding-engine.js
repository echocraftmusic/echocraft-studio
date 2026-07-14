/*
==========================================================
EC FRAMEWORK
DATA BINDING ENGINE
Version 1.0
==========================================================
*/

class ECDataBindingEngine{

    constructor(){

        this.bindings = [];

    }

    register(selector, callback){

        this.bindings.push({

            selector,

            callback

        });

    }

    refresh(){

        this.bindings.forEach(binding=>{

            document.querySelectorAll(binding.selector)

                .forEach(element=>{

                    binding.callback(element);

                });

        });

    }

    bindText(selector, value){

        document.querySelectorAll(selector)

            .forEach(element=>{

                element.textContent = value;

            });

    }

    bindHTML(selector, value){

        document.querySelectorAll(selector)

            .forEach(element=>{

                element.innerHTML = value;

            });

    }

    bindValue(selector, value){

        document.querySelectorAll(selector)

            .forEach(element=>{

                element.value = value;

            });

    }

    bindCount(selector, collection){

        const count = Array.isArray(collection)

            ? collection.length

            : 0;

        this.bindText(selector, count);

    }

    bindCurrency(selector, amount){

        this.bindText(

            selector,

            "$" + Number(amount).toLocaleString()

        );

    }

    bindDate(selector, date){

        const formatted =

            new Date(date).toLocaleDateString();

        this.bindText(selector, formatted);

    }

    clear(selector){

        document.querySelectorAll(selector)

            .forEach(element=>{

                element.innerHTML = "";

            });

    }

}

/* ==========================================================
   GLOBAL INSTANCE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    window.ecBind = new ECDataBindingEngine();

});