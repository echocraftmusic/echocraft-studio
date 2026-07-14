/*
==========================================================
EC FRAMEWORK
RELATIONSHIP ENGINE
Version 1.0
==========================================================
*/

class ECRelationshipEngine {

    constructor() {

        this.clients = window.ecClients;
        this.projects = window.ecProjects;
        this.quotes = window.ecQuotes;
        this.referrals = window.ecReferrals;
        this.portfolio = window.ecPortfolio;

    }

    /* ======================================================
       CLIENT RELATIONSHIPS
    ====================================================== */

    getClientProjects(clientId) {

        if (!this.projects) return [];

        return this.projects.getAll().filter(project =>
            project.clientId === clientId
        );

    }

    getClientQuotes(clientId) {

        if (!this.quotes) return [];

        return this.quotes.getAll().filter(quote =>
            quote.clientId === clientId
        );

    }

    getClientPortfolio(clientId) {

        if (!this.portfolio) return [];

        return this.portfolio.getAll().filter(item =>
            item.clientId === clientId
        );

    }

    getClientSummary(clientId) {

        const client = this.clients
            ? this.clients.get(clientId)
            : null;

        const projects = this.getClientProjects(clientId);
        const quotes = this.getClientQuotes(clientId);
        const portfolio = this.getClientPortfolio(clientId);

        return {

            client,

            projects,

            quotes,

            portfolio,

            projectCount: projects.length,

            quoteCount: quotes.length,

            portfolioCount: portfolio.length,

            quoteValue: quotes.reduce(
                (total, quote) =>
                    total + Number(quote.total || 0),
                0
            )

        };

    }

    /* ======================================================
       PROJECT RELATIONSHIPS
    ====================================================== */

    getProjectClient(projectId) {

        if (!this.projects || !this.clients) return null;

        const project = this.projects.get(projectId);

        if (!project || !project.clientId) return null;

        return this.clients.get(project.clientId);

    }

    getProjectQuotes(projectId) {

        if (!this.quotes) return [];

        return this.quotes.getAll().filter(quote =>
            quote.projectId === projectId
        );

    }

    getProjectPortfolio(projectId) {

        if (!this.portfolio) return [];

        return this.portfolio.getAll().filter(item =>
            item.projectId === projectId
        );

    }

    getProjectSummary(projectId) {

        const project = this.projects
            ? this.projects.get(projectId)
            : null;

        const client = this.getProjectClient(projectId);
        const quotes = this.getProjectQuotes(projectId);
        const portfolio = this.getProjectPortfolio(projectId);

        return {

            project,

            client,

            quotes,

            portfolio,

            quoteCount: quotes.length,

            portfolioCount: portfolio.length,

            quoteValue: quotes.reduce(
                (total, quote) =>
                    total + Number(quote.total || 0),
                0
            )

        };

    }

    /* ======================================================
       QUOTE RELATIONSHIPS
    ====================================================== */

    getQuoteClient(quoteId) {

        if (!this.quotes || !this.clients) return null;

        const quote = this.quotes.get(quoteId);

        if (!quote || !quote.clientId) return null;

        return this.clients.get(quote.clientId);

    }

    getQuoteProject(quoteId) {

        if (!this.quotes || !this.projects) return null;

        const quote = this.quotes.get(quoteId);

        if (!quote || !quote.projectId) return null;

        return this.projects.get(quote.projectId);

    }

    approveQuoteAndCreateProject(quoteId) {

        if (!this.quotes || !this.projects) return false;

        const quote = this.quotes.get(quoteId);

        if (!quote) return false;

        this.quotes.approve(quoteId);

        if (quote.projectId) {

            return this.projects.get(quote.projectId);

        }

        const project = this.projects.add({

            name: quote.project || quote.title || "New Project",

            clientId: quote.clientId || "",

            client: quote.client || "",

            description: quote.description || "",

            value: Number(quote.total || 0),

            stage: "Discovery",

            status: "Active",

            quoteId: quote.id

        });

        quote.projectId = project.id;
        quote.updated = new Date().toISOString();

        this.quotes.save();

        return project;

    }

    /* ======================================================
       REFERRAL RELATIONSHIPS
    ====================================================== */

    getReferralClients(referralId) {

        if (!this.clients) return [];

        return this.clients.getAll().filter(client =>
            client.referralId === referralId
        );

    }

    getReferralQuotes(referralId) {

        if (!this.quotes) return [];

        return this.quotes.getAll().filter(quote =>
            quote.referralId === referralId
        );

    }

    completeReferralSale(
        referralId,
        quoteId,
        commissionPercent = 10
    ) {

        if (!this.referrals || !this.quotes) return false;

        const quote = this.quotes.get(quoteId);

        if (!quote) return false;

        if (quote.status !== "Approved") {

            return false;

        }

        if (quote.commissionRecorded) {

            return false;

        }

        const completed = this.referrals.completeSale(

            referralId,

            Number(quote.total || 0),

            commissionPercent

        );

        if (!completed) return false;

        quote.commissionRecorded = true;
        quote.referralId = referralId;
        quote.updated = new Date().toISOString();

        this.quotes.save();

        return true;

    }

    /* ======================================================
       PORTFOLIO RELATIONSHIPS
    ====================================================== */

    promoteProjectToPortfolio(projectId, data = {}) {

        if (!this.projects || !this.portfolio) return false;

        const project = this.projects.get(projectId);

        if (!project) return false;

        const existing = this.portfolio.getAll().find(item =>
            item.projectId === projectId
        );

        if (existing) return existing;

        return this.portfolio.add({

            projectId: project.id,

            clientId: project.clientId || "",

            title: data.title || project.name,

            client: data.client || project.client || "",

            category: data.category || project.category || "General",

            description:
                data.description ||
                project.description ||
                "",

            image: data.image || "",

            video: data.video || "",

            status: "Draft",

            featured: false,

            views: 0

        });

    }

}

/* ==========================================================
   GLOBAL INSTANCE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    window.ecRelationships =
        new ECRelationshipEngine();

});