/*
==========================================================
EC FRAMEWORK
ACTIVITY ENGINE
Version 1.0
==========================================================
*/

class ECActivityEngine {

    constructor() {

        this.storage = window.ecStorage;

        this.key = "activity";

        this.activities = this.storage.load(this.key, []);

    }

    add(type, title, description = "", data = {}) {

        const activity = {

            id: this.generateID(),

            type,

            title,

            description,

            data,

            created: new Date().toISOString()

        };

        this.activities.unshift(activity);

        if (this.activities.length > 500) {

            this.activities.length = 500;

        }

        this.save();

        return activity;

    }

    getAll() {

        return this.activities;

    }

    latest(limit = 10) {

        return this.activities.slice(0, limit);

    }

    byType(type) {

        return this.activities.filter(activity =>
            activity.type === type
        );

    }

    clear() {

        this.activities = [];

        this.save();

    }

    save() {

        this.storage.save(this.key, this.activities);

    }

    generateID() {

        return "AC-" +

            Date.now().toString().slice(-6) +

            "-" +

            Math.floor(Math.random() * 900 + 100);

    }

    /* ======================================================
       SHORTCUTS
    ====================================================== */

    clientAdded(name) {

        return this.add(

            "client",

            "New Client",

            `${name} was added.`

        );

    }

    projectCreated(name) {

        return this.add(

            "project",

            "Project Created",

            `${name} was created.`

        );

    }

    quoteCreated(name) {

        return this.add(

            "quote",

            "Quote Created",

            `${name} quote was generated.`

        );

    }

    quoteApproved(name) {

        return this.add(

            "quote",

            "Quote Approved",

            `${name} quote approved.`

        );

    }

    referralJoined(name) {

        return this.add(

            "referral",

            "Referral Partner",

            `${name} joined the referral network.`

        );

    }

    saleCompleted(name, amount) {

        return this.add(

            "sale",

            "Sale Completed",

            `${name} • $${Number(amount).toLocaleString()}`

        );

    }

    portfolioPublished(name) {

        return this.add(

            "portfolio",

            "Portfolio Published",

            `${name} is now live.`

        );

    }

}

/* ==========================================================
   GLOBAL INSTANCE
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    window.ecActivity = new ECActivityEngine();

});