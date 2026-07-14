/*
==========================================================
EC FRAMEWORK
QUOTE ENGINE
Version 1.0
==========================================================
*/

class QuoteEngine {

    constructor() {

        this.storageKey = "ec_quotes";

        this.quotes = this.load();

    }

    load() {

        const data = localStorage.getItem(this.storageKey);

        return data ? JSON.parse(data) : [];

    }

    save() {

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(this.quotes)
        );

    }

    getAll() {

        return this.quotes;

    }

    add(data) {

        const quote = {

            id: crypto.randomUUID(),

            quoteNumber:
                "EC-" +
                String(this.quotes.length + 1).padStart(4, "0"),

            client: data.client || "",

            project: data.project || "",

            total: Number(data.total || 0),

            status: data.status || "Draft",

            created: new Date().toLocaleDateString()

        };

        this.quotes.push(quote);

        this.save();

        return quote;

    }

    update(id, updates) {

        const quote = this.quotes.find(q => q.id === id);

        if (!quote) return;

        Object.assign(quote, updates);

        this.save();

    }

    delete(id) {

        this.quotes =
            this.quotes.filter(q => q.id !== id);

        this.save();

    }

    count() {

        return this.quotes.length;

    }

}

window.ecQuotes = new QuoteEngine();
