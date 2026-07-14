/*
==========================================================
EC FRAMEWORK
REFERRAL PAGE CONTROLLER
Version 1.0
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("Referrals Ready");

    renderReferralStats();

    const referralForm = document.getElementById("newReferralForm");

    if (referralForm) {

        referralForm.addEventListener("submit", function (e) {

            e.preventDefault();

            window.ecReferrals.add({

                name: document.getElementById("referralName").value,

                business: document.getElementById("referralBusiness").value,

                email: document.getElementById("referralEmail").value,

                status: document.getElementById("referralStatus").value

            });

            renderReferralStats();

            this.reset();

            document
                .querySelector("[data-close-modal]")
                .click();

        });

    }

});

function renderReferralStats() {

    if (!window.ecReferrals) return;

    const referrals = window.ecReferrals.getAll();

    const cards = document.querySelectorAll(".statCard span");

    if (cards.length < 4) return;

    const active =
        referrals.filter(r => r.status === "Active").length;

    const pending =
        referrals.filter(r => r.status === "Pending").length;

    cards[0].textContent = referrals.length;
    cards[1].textContent = active;
    cards[2].textContent = pending;
    cards[3].textContent = referrals.length;

}