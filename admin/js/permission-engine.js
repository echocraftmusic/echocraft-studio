/*
==========================================================
EC FRAMEWORK
PERMISSION ENGINE
Version 1.0
==========================================================
*/

class ECPermissionEngine {

    constructor() {

        this.roles = {

            administrator: [
                "*"
            ],

            manager: [
                "dashboard",
                "clients",
                "projects",
                "quotes",
                "portfolio",
                "analytics",
                "referrals"
            ],

            staff: [
                "dashboard",
                "clients",
                "projects",
                "quotes"
            ],

            client: [
                "dashboard",
                "projects"
            ],

            referral: [
                "dashboard",
                "referrals"
            ]

        };

        this.currentRole = "administrator";

    }

    setRole(role) {

        if (!this.roles[role]) return false;

        this.currentRole = role;

        return true;

    }

    getRole() {

        return this.currentRole;

    }

    can(permission) {

        const permissions = this.roles[this.currentRole];

        if (!permissions) return false;

        if (permissions.includes("*")) {

            return true;

        }

        return permissions.includes(permission);

    }

    hideUnauthorized() {

        document.querySelectorAll("[data-permission]")

            .forEach(element => {

                const permission =

                    element.dataset.permission;

                if (!this.can(permission)) {

                    element.style.display = "none";

                }

            });

    }

    protectPage(page) {

        if (this.can(page)) {

            return true;

        }

        document.body.innerHTML = `

            <div style="
                display:flex;
                align-items:center;
                justify-content:center;
                height:100vh;
                background:#111;
                color:#fff;
                font-family:Arial,sans-serif;
                text-align:center;
                padding:40px;
            ">

                <div>

                    <h1 style="color:#d8b45d;">
                        Access Denied
                    </h1>

                    <p>
                        You do not have permission
                        to access this module.
                    </p>

                </div>

            </div>

        `;

        return false;

    }

    listPermissions(role = this.currentRole) {

        return this.roles[role] || [];

    }

}

/* ==========================================================
   GLOBAL INSTANCE
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    window.ecPermissions =

        new ECPermissionEngine();

    window.ecPermissions.hideUnauthorized();

});