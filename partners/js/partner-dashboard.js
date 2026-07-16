/* ==========================================
   ECHO CRAFT PARTICIPATION PROGRAM
   PARTNER DASHBOARD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const supabaseClient =
        window.echoCraftSupabase;

    const loader =
        document.querySelector(
            "#partnerDashboardLoader"
        );

    const dashboardApp =
        document.querySelector(
            "#partnerDashboardApp"
        );

    const sidebar =
        document.querySelector(
            "#partnerSidebar"
        );

    const sidebarBackdrop =
        document.querySelector(
            "#partnerSidebarBackdrop"
        );

    const menuButton =
        document.querySelector(
            "#partnerMenuButton"
        );

    const sidebarCloseButton =
        document.querySelector(
            "#partnerSidebarCloseButton"
        );

    const logoutButton =
        document.querySelector(
            "#partnerLogoutButton"
        );

    const refreshButton =
        document.querySelector(
            "#partnerRefreshButton"
        );

        const sidebarInitials =
    document.querySelector(
        "#partnerSidebarInitials"
    );

    const sidebarName =
        document.querySelector(
            "#partnerSidebarName"
        );

    const sidebarEmail =
        document.querySelector(
            "#partnerSidebarEmail"
        );

    const welcomeName =
        document.querySelector(
            "#partnerWelcomeName"
        );

    const commissionRate =
        document.querySelector(
            "#partnerCommissionRate"
        );

    const visitCount =
        document.querySelector(
            "#partnerVisitCount"
        );

    const qualifiedReferralCount =
        document.querySelector(
            "#partnerQualifiedReferralCount"
        );

    const convertedClientCount =
        document.querySelector(
            "#partnerConvertedClientCount"
        );

    const totalEarned =
        document.querySelector(
            "#partnerTotalEarned"
        );

    const referralLinkInput =
        document.querySelector(
            "#partnerReferralLink"
        );

    const referralAliasText =
        document.querySelector(
            "#partnerReferralAliasText"
        );

    const copyLinkButton =
        document.querySelector(
            "#partnerCopyLinkButton"
        );

    const qrCodeContainer =
        document.querySelector(
            "#partnerQrCode"
        );

    const downloadQrButton =
        document.querySelector(
            "#partnerDownloadQrButton"
        );

    const activityTableBody =
        document.querySelector(
            "#partnerActivityTableBody"
        );

    const commissionTableBody =
        document.querySelector(
            "#partnerCommissionTableBody"
        );

    const payoutTableBody =
        document.querySelector(
            "#partnerPayoutTableBody"
        );

    const toast =
        document.querySelector(
            "#partnerToast"
        );

    const toastMessage =
        document.querySelector(
            "#partnerToastMessage"
        );

    let currentReferralLink = "";
    let toastTimer = null;


    /* ======================================
       HELPERS
    ====================================== */

    function showToast(message) {

        if (
            !toast ||
            !toastMessage
        ) {
            return;
        }

        toastMessage.textContent =
            message;

        toast.hidden = false;

        window.clearTimeout(
            toastTimer
        );

        toastTimer =
            window.setTimeout(() => {

                toast.hidden = true;

            }, 3000);

    }

    function showDashboard() {

        if (loader) {
            loader.hidden = true;
        }

        if (dashboardApp) {
            dashboardApp.hidden = false;
        }

    }

    function formatCurrency(value) {

        const number =
            Number(value || 0);

        return new Intl.NumberFormat(
            "en-US",
            {
                style: "currency",
                currency: "USD"
            }
        ).format(number);

    }

    function formatDate(value) {

        if (!value) {
            return "—";
        }

        const date =
            new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "—";
        }

        return date.toLocaleString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            }
        );

    }

    function getInitials(fullName) {

    const nameParts =
        String(fullName || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if (!nameParts.length) {
        return "EC";
    }

    if (nameParts.length === 1) {

        return nameParts[0]
            .slice(0, 2)
            .toUpperCase();

    }

    return (
        nameParts[0][0] +
        nameParts[nameParts.length - 1][0]
    ).toUpperCase();

}

    function getFirstName(fullName) {

        const value =
            String(fullName || "")
                .trim();

        if (!value) {
            return "Partner";
        }

        return value.split(/\s+/)[0];

    }

    function getSourceLabel(referrerUrl) {

        if (!referrerUrl) {
            return "Direct Visit";
        }

        try {

            const url =
                new URL(referrerUrl);

            return url.hostname
                .replace(/^www\./, "");

        } catch {

            return "External Source";

        }

    }

    function getStatusBadge(
        status
    ) {

        const normalizedStatus =
            String(
                status || "pending"
            ).toLowerCase();

        let className =
            "partnerStatusBadge";

        if (
            normalizedStatus ===
            "pending"
        ) {
            className += " isPending";
        }

        if (
            normalizedStatus ===
            "paid"
        ) {
            className += " isPaid";
        }

        return `
            <span class="${className}">
                ${normalizedStatus}
            </span>
        `;

    }


    /* ======================================
       SIDEBAR
    ====================================== */

    function openSidebar() {

        sidebar?.classList.add(
            "isOpen"
        );

        if (sidebarBackdrop) {
            sidebarBackdrop.hidden = false;
        }

    }

    function closeSidebar() {

        sidebar?.classList.remove(
            "isOpen"
        );

        if (sidebarBackdrop) {
            sidebarBackdrop.hidden = true;
        }

    }

    menuButton?.addEventListener(
        "click",
        openSidebar
    );

    sidebarCloseButton?.addEventListener(
        "click",
        closeSidebar
    );

    sidebarBackdrop?.addEventListener(
        "click",
        closeSidebar
    );

    document
        .querySelectorAll(
            ".partnerNavigationLink"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".partnerNavigationLink"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "isActive"
                            );

                        });

                    link.classList.add(
                        "isActive"
                    );

                    closeSidebar();

                }
            );

        });


    /* ======================================
       SECURITY CHECK
    ====================================== */

    if (!supabaseClient) {

        window.location.href =
            "login.html";

        return;

    }

    async function requirePartnerSession() {

        const {
            data,
            error
        } =
            await supabaseClient.auth
                .getSession();

        if (
            error ||
            !data?.session
        ) {

            window.location.href =
                "login.html";

            return null;

        }

        return data.session;

    }

        /* ======================================
       SAFE DISPLAY HELPERS
    ====================================== */

    function escapeHtml(value) {

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /* ======================================
       DASHBOARD DISPLAY
    ====================================== */

    function renderPartnerInformation(
        partner
    ) {

        const fullName =
            partner?.full_name ||
            const initials =
    getInitials(fullName);
            "Echo Craft Partner";

        const email =
            partner?.email ||
            "";

        const firstName =
            getFirstName(fullName);

        const rate =
            Number(
                partner?.commission_rate || 0
            );
            
            if (sidebarInitials) {

    sidebarInitials.textContent =
        initials;

}

        if (sidebarName) {
            sidebarName.textContent =
                fullName;
        }

        if (sidebarEmail) {
            sidebarEmail.textContent =
                email;
        }

        if (welcomeName) {
            welcomeName.textContent =
                firstName;
        }

        if (commissionRate) {

            commissionRate.textContent =
                `${rate}% commission rate`;

        }

        const referralSlug =
            partner?.referral_slug ||
            partner?.referral_code ||
            "";

        currentReferralLink =
            referralSlug
                ? `${window.location.origin}/${referralSlug}`
                : "";

        if (referralLinkInput) {

            referralLinkInput.value =
                currentReferralLink ||
                "Referral link unavailable";

        }

        if (referralAliasText) {

            referralAliasText.textContent =
                referralSlug
                    ? `Your referral alias is ${referralSlug}`
                    : "Your referral alias has not been assigned.";

        }

        createQrCode();

    }


    function renderMetrics(
        visits,
        referrals,
        commissions
    ) {

        const qualifiedReferrals =
            referrals.filter(referral => {

                const status =
                    String(
                        referral?.status || ""
                    ).toLowerCase();

                return ![
                    "new",
                    "pending",
                    "rejected",
                    "declined"
                ].includes(status);

            });

        const convertedClients =
            referrals.filter(referral => {

                const status =
                    String(
                        referral?.status || ""
                    ).toLowerCase();

                return [
                    "converted",
                    "client",
                    "paid",
                    "completed"
                ].includes(status);

            });

        const earnedTotal =
            commissions.reduce(
                (total, commission) => {

                    return total +
                        Number(
                            commission
                                ?.commission_amount ||
                            0
                        );

                },
                0
            );

        if (visitCount) {

            visitCount.textContent =
                String(visits.length);

        }

        if (qualifiedReferralCount) {

            qualifiedReferralCount.textContent =
                String(
                    qualifiedReferrals.length
                );

        }

        if (convertedClientCount) {

            convertedClientCount.textContent =
                String(
                    convertedClients.length
                );

        }

        if (totalEarned) {

            totalEarned.textContent =
                formatCurrency(
                    earnedTotal
                );

        }

    }


    function renderActivity(
        visits
    ) {

        if (!activityTableBody) {
            return;
        }

        if (!visits.length) {

            activityTableBody.innerHTML = `
                <tr>
                    <td
                        colspan="4"
                        class="partnerEmptyTable"
                    >
                        No referral activity has been recorded yet.
                    </td>
                </tr>
            `;

            return;

        }

        activityTableBody.innerHTML =
            visits.map(visit => {

                const destination =
                    visit?.destination_path ||
                    "/";

                const source =
                    getSourceLabel(
                        visit?.referrer_url
                    );

                return `
                    <tr>

                        <td>
                            ${escapeHtml(
                                formatDate(
                                    visit?.visited_at
                                )
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                destination
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                source
                            )}
                        </td>

                        <td>
                            ${getStatusBadge(
                                "verified"
                            )}
                        </td>

                    </tr>
                `;

            }).join("");

    }


    function renderCommissions(
        commissions
    ) {

        if (!commissionTableBody) {
            return;
        }

        if (!commissions.length) {

            commissionTableBody.innerHTML = `
                <tr>
                    <td
                        colspan="4"
                        class="partnerEmptyTable"
                    >
                        No commissions have been recorded yet.
                    </td>
                </tr>
            `;

            return;

        }

        commissionTableBody.innerHTML =
            commissions.map(commission => {

                const client =
                    commission?.client_name ||
                    "Referred Client";

                const project =
                    commission?.project_name ||
                    "Echo Craft Project";

                return `
                    <tr>

                        <td>
                            ${escapeHtml(client)}
                        </td>

                        <td>
                            ${escapeHtml(project)}
                        </td>

                        <td>
                            ${escapeHtml(
                                formatCurrency(
                                    commission
                                        ?.commission_amount
                                )
                            )}
                        </td>

                        <td>
                            ${getStatusBadge(
                                commission?.status
                            )}
                        </td>

                    </tr>
                `;

            }).join("");

    }


    function renderPayouts(
        payouts
    ) {

        if (!payoutTableBody) {
            return;
        }

        if (!payouts.length) {

            payoutTableBody.innerHTML = `
                <tr>
                    <td
                        colspan="4"
                        class="partnerEmptyTable"
                    >
                        No payouts have been recorded yet.
                    </td>
                </tr>
            `;

            return;

        }

        payoutTableBody.innerHTML =
            payouts.map(payout => {

                const payoutDate =
                    payout?.processed_at ||
                    payout?.scheduled_for ||
                    payout?.created_at;

                const method =
                    payout?.payment_method ||
                    "Echo Craft Payment";

                return `
                    <tr>

                        <td>
                            ${escapeHtml(
                                formatDate(
                                    payoutDate
                                )
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                formatCurrency(
                                    payout?.amount
                                )
                            )}
                        </td>

                        <td>
                            ${escapeHtml(method)}
                        </td>

                        <td>
                            ${getStatusBadge(
                                payout?.status
                            )}
                        </td>

                    </tr>
                `;

            }).join("");

    }


    /* ======================================
       QR CODE
    ====================================== */

    function createQrCode() {

        if (
            !qrCodeContainer ||
            !currentReferralLink
        ) {
            return;
        }

        qrCodeContainer.innerHTML = "";

        if (
            typeof window.QRCode !==
            "function"
        ) {
            return;
        }

        new window.QRCode(
            qrCodeContainer,
            {
                text:
                    currentReferralLink,

                width: 166,
                height: 166,

                colorDark:
                    "#000000",

                colorLight:
                    "#ffffff",

                correctLevel:
                    window.QRCode
                        .CorrectLevel.H
            }
        );

    }


    /* ======================================
       LOAD LIVE DATA
    ====================================== */

    async function loadDashboard() {

        refreshButton?.classList.add(
            "isLoading"
        );

        try {

            const session =
                await requirePartnerSession();

            if (!session) {
                return;
            }

            const {
                data,
                error
            } =
                await supabaseClient.rpc(
                    "get_partner_dashboard"
                );

            if (error) {
                throw error;
            }

            const partner =
                data?.partner || {};

            const visits =
                Array.isArray(data?.visits)
                    ? data.visits
                    : [];

            const referrals =
                Array.isArray(data?.referrals)
                    ? data.referrals
                    : [];

            const commissions =
                Array.isArray(
                    data?.commissions
                )
                    ? data.commissions
                    : [];

            const payouts =
                Array.isArray(data?.payouts)
                    ? data.payouts
                    : [];

            renderPartnerInformation(
                partner
            );

            renderMetrics(
                visits,
                referrals,
                commissions
            );

            renderActivity(
                visits
            );

            renderCommissions(
                commissions
            );

            renderPayouts(
                payouts
            );

            showDashboard();

        } catch (error) {

            console.error(
                "Partner dashboard failed to load:",
                error
            );

            await supabaseClient.auth
                .signOut();

            window.location.href =
                "login.html";

        } finally {

            refreshButton?.classList.remove(
                "isLoading"
            );

        }

    }


    /* ======================================
       BUTTONS
    ====================================== */

    refreshButton?.addEventListener(
        "click",
        async () => {

            await loadDashboard();

            showToast(
                "Partner information refreshed."
            );

        }
    );


    copyLinkButton?.addEventListener(
        "click",
        async () => {

            if (!currentReferralLink) {

                showToast(
                    "Your referral link is not available yet."
                );

                return;

            }

            try {

                await navigator.clipboard
                    .writeText(
                        currentReferralLink
                    );

                showToast(
                    "Referral link copied."
                );

            } catch {

                referralLinkInput?.select();

                document.execCommand(
                    "copy"
                );

                showToast(
                    "Referral link copied."
                );

            }

        }
    );


    downloadQrButton?.addEventListener(
        "click",
        () => {

            const qrImage =
                qrCodeContainer
                    ?.querySelector("img");

            const qrCanvas =
                qrCodeContainer
                    ?.querySelector("canvas");

            let imageUrl = "";

            if (qrImage?.src) {

                imageUrl =
                    qrImage.src;

            } else if (qrCanvas) {

                imageUrl =
                    qrCanvas.toDataURL(
                        "image/png"
                    );

            }

            if (!imageUrl) {

                showToast(
                    "The QR code is not ready yet."
                );

                return;

            }

            const downloadLink =
                document.createElement("a");

            downloadLink.href =
                imageUrl;

            downloadLink.download =
                "echo-craft-referral-qr.png";

            document.body.appendChild(
                downloadLink
            );

            downloadLink.click();

            downloadLink.remove();

        }
    );


    logoutButton?.addEventListener(
        "click",
        async () => {

            await supabaseClient.auth
                .signOut();

            window.location.href =
                "login.html";

        }
    );


    /* ======================================
       START DASHBOARD
    ====================================== */

    loadDashboard();

});

