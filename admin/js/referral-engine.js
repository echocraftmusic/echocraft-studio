/*
==========================================================
EC FRAMEWORK
REFERRAL ENGINE
Version 1.0
==========================================================
*/

class ECReferralEngine{

    constructor(){

        this.storage = window.ecStorage;

        this.key = "referrals";

        this.referrals = this.storage.load(this.key,[]);

    }

    getAll(){

        return this.referrals;

    }

    get(id){

        return this.referrals.find(referral=>referral.id===id);

    }

    add(partner){

        partner.id = this.generateID();

        partner.referralCode = this.generateCode();

        partner.clicks = 0;
        partner.quotes = 0;
        partner.clients = 0;
        partner.sales = 0;
        partner.commission = 0;

        partner.created = new Date().toISOString();

        this.referrals.push(partner);

        this.save();

        return partner;

    }

    update(id,data){

        const partner = this.get(id);

        if(!partner) return false;

        Object.assign(partner,data);

        this.save();

        return true;

    }

    delete(id){

        this.referrals = this.referrals.filter(

            partner=>partner.id!==id

        );

        this.save();

    }

    addClick(id){

        const partner = this.get(id);

        if(!partner) return;

        partner.clicks++;

        this.save();

    }

    addQuote(id){

        const partner = this.get(id);

        if(!partner) return;

        partner.quotes++;

        this.save();

    }

    addClient(id){

        const partner = this.get(id);

        if(!partner) return;

        partner.clients++;

        this.save();

    }

    completeSale(id,saleAmount,commissionPercent=10){

        const partner = this.get(id);

        if(!partner) return false;

        partner.sales++;

        partner.commission +=

            Number(saleAmount) *

            (commissionPercent/100);

        this.save();

        return true;

    }

    totalCommission(){

        return this.referrals.reduce(

            (sum,partner)=>

                sum + Number(partner.commission),

            0

        );

    }

    save(){

        this.storage.save(this.key,this.referrals);

    }

    generateID(){

        return "RF-" +

            Date.now().toString().slice(-6) +

            "-" +

            Math.floor(Math.random()*900+100);

    }

    generateCode(){

        return Math.random()

            .toString(36)

            .substring(2,8)

            .toUpperCase();

    }

}

/* ==========================================================
   GLOBAL INSTANCE
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    window.ecReferrals = new ECReferralEngine();

});