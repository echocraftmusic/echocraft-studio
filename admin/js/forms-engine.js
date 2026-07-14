/*
==========================================================
EC FRAMEWORK
FORM ENGINE
Version 1.0
==========================================================
*/

class ECFormEngine {

    constructor(form){

        this.form = form;

        this.fields = [...form.querySelectorAll(".ec-input, .ec-select, .ec-textarea")];

        this.initialize();

    }

    initialize(){

        this.fields.forEach(field=>{

            field.addEventListener("blur",()=>{

                this.validateField(field);

            });

            field.addEventListener("input",()=>{

                field.classList.remove("ec-invalid");
                field.classList.remove("ec-valid");

            });

        });

        this.form.addEventListener("submit",(e)=>{

            if(!this.validateForm()){

                e.preventDefault();

            }

        });

    }

    validateForm(){

        let valid = true;

        this.fields.forEach(field=>{

            if(!this.validateField(field)){

                valid = false;

            }

        });

        return valid;

    }

    validateField(field){

        if(field.hasAttribute("required")){

            if(field.value.trim()===""){

                field.classList.add("ec-invalid");
                field.classList.remove("ec-valid");

                return false;

            }

        }

        field.classList.remove("ec-invalid");
        field.classList.add("ec-valid");

        return true;

    }

    reset(){

        this.form.reset();

        this.fields.forEach(field=>{

            field.classList.remove("ec-valid");
            field.classList.remove("ec-invalid");

        });

    }

}

/* ==========================================================
   AUTO INITIALIZE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    document.querySelectorAll(".ec-form").forEach(form=>{

        new ECFormEngine(form);

    });

});