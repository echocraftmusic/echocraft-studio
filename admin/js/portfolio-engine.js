/*
==========================================================
EC FRAMEWORK
PORTFOLIO ENGINE
Version 1.0
==========================================================
*/

class PortfolioEngine {

    constructor() {

        this.storageKey = "ec_portfolio";

        this.items = this.load();

    }

    load() {

        const data = localStorage.getItem(this.storageKey);

        return data ? JSON.parse(data) : [];

    }

    save() {

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(this.items)
        );

    }

    getAll() {

        return this.items;

    }

    add(data) {

        const item = {

            id: crypto.randomUUID(),

            title: data.title || "",

            category: data.category || "Website",

            featured: data.featured || false,

            media: data.media || "",

            created: new Date().toLocaleDateString()

        };

        this.items.push(item);

        this.save();

        return item;

    }

    count() {

        return this.items.length;

    }

}

window.ecPortfolio = new PortfolioEngine();