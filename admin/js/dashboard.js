/* ==========================================
   ECHO CRAFT CONTROL CENTER
   DASHBOARD + LIVE ECPP APPLICATION REVIEW
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    /* ======================================
       SUPABASE
    ====================================== */

    const supabaseClient =
        window.echoCraftSupabase;


    /* ======================================
       DASHBOARD ELEMENTS
    ====================================== */

    const sidebar = document.querySelector(
        "#controlCenterSidebar"
    );

    const menuButton = document.querySelector(
        "#dashboardMenuButton"
    );

    const menuCloseButton = document.querySelector(
        "#dashboardMenuCloseButton"
    );

    const sidebarOverlay = document.querySelector(
        "#dashboardSidebarOverlay"
    );

    const refreshButton = document.querySelector(
        "#dashboardRefreshButton"
    );

    const systemNotice = document.querySelector(
        "#dashboardSystemNotice"
    );

    const dismissSystemNoticeButton =
        document.querySelector(
            "#dismissSystemNotice"
        );

    const logoutButton = document.querySelector(
        "#adminLogoutButton"
    );

    const dashboardCurrentYear =
        document.querySelector(
            "#dashboardCurrentYear"
        );

    const toast = document.querySelector(
        "#dashboardToast"
    );

    const toastMessage = document.querySelector(
        "#dashboardToastMessage"
    );

    const applicationCount =
        document.querySelector(
            "#applicationCount"
        );

    const applicationNavigationCount =
        document.querySelector(
            "#applicationNavigationCount"
        );

    const activePartnerCount =
        document.querySelector(
            "#activePartnerCount"
        );

    const referralVisitCount =
        document.querySelector(
            "#referralVisitCount"
        );

    const pendingCommissionTotal =
        document.querySelector(
            "#pendingCommissionTotal"
        );

    const applicationsSection =
        document.querySelector(
            "#partnerApplications"
        );

    const partnersTableBody =
        document.querySelector(
            "#activePartners tbody"
        );

    const referralsSection =
        document.querySelector(
            "#referralActivity"
        );

    const commissionsSection =
        document.querySelector(
            "#commissions"
        );

    const payoutsSection =
        document.querySelector(
            "#payouts"
        );

    const comingSoonButtons =
        document.querySelectorAll(
            "[data-coming-soon], [data-coming-soon-action]"
        );

    const navigationLinks =
        document.querySelectorAll(
            '.controlCenterNavLink[href^="#"]'
        );


    /* ======================================
       APPLICATION REVIEW ELEMENTS
    ====================================== */

    const applicationReviewModal =
        document.querySelector(
            "#applicationReviewModal"
        );

    const applicationReviewBackdrop =
        document.querySelector(
            "#applicationReviewBackdrop"
        );

    const closeApplicationReviewButton =
        document.querySelector(
            "#closeApplicationReview"
        );

    const cancelApplicationReviewButton =
        document.querySelector(
            "#cancelApplicationReview"
        );

    const saveApplicationReviewButton =
        document.querySelector(
            "#saveApplicationReview"
        );

    const reviewApplicantName =
        document.querySelector(
            "#reviewApplicantName"
        );

    const reviewApplicantEmail =
        document.querySelector(
            "#reviewApplicantEmail"
        );

    const reviewApplicantPhone =
        document.querySelector(
            "#reviewApplicantPhone"
        );

    const reviewApplicantBusiness =
        document.querySelector(
            "#reviewApplicantBusiness"
        );

    const reviewApplicantWebsite =
        document.querySelector(
            "#reviewApplicantWebsite"
        );

    const reviewApplicantSocial =
        document.querySelector(
            "#reviewApplicantSocial"
        );

    const reviewApplicationSubmitted =
        document.querySelector(
            "#reviewApplicationSubmitted"
        );

    const reviewApplicationUpdated =
        document.querySelector(
            "#reviewApplicationUpdated"
        );

    const reviewApplicantAudience =
        document.querySelector(
            "#reviewApplicantAudience"
        );

    const reviewApplicantReason =
        document.querySelector(
            "#reviewApplicantReason"
        );

    const reviewApplicantStrategy =
        document.querySelector(
            "#reviewApplicantStrategy"
        );

    const reviewApplicationStatus =
        document.querySelector(
            "#reviewApplicationStatus"
        );

    const reviewApplicationStatusSelect =
        document.querySelector(
            "#reviewApplicationStatusSelect"
        );

    const reviewApplicationNotes =
        document.querySelector(
            "#reviewApplicationNotes"
        );

    /* ======================================
       PARTNER DETAILS ELEMENTS
    ====================================== */

    const partnerDetailsModal =
        document.querySelector(
            "#partnerDetailsModal"
        );

    const partnerDetailsBackdrop =
        document.querySelector(
            "#partnerDetailsBackdrop"
        );

    const closePartnerDetailsButton =
        document.querySelector(
            "#closePartnerDetails"
        );

    const closePartnerDetailsFooterButton =
        document.querySelector(
            "#closePartnerDetailsFooter"
        );

    const savePartnerDetailsButton =
        document.querySelector(
            "#savePartnerDetails"
        );

    const partnerDetailsName =
        document.querySelector(
            "#partnerDetailsName"
        );

    const partnerDetailsEmail =
        document.querySelector(
            "#partnerDetailsEmail"
        );

    const partnerDetailsStatus =
        document.querySelector(
            "#partnerDetailsStatus"
        );

    const partnerDetailsVisits =
        document.querySelector(
            "#partnerDetailsVisits"
        );

    const partnerDetailsClients =
        document.querySelector(
            "#partnerDetailsClients"
        );

    const partnerDetailsCommissionTotal =
        document.querySelector(
            "#partnerDetailsCommissionTotal"
        );

    const partnerDetailsCommissionRate =
        document.querySelector(
            "#partnerDetailsCommissionRate"
        );

    const partnerDetailsBusiness =
        document.querySelector(
            "#partnerDetailsBusiness"
        );

    const partnerDetailsReferralCode =
        document.querySelector(
            "#partnerDetailsReferralCode"
        );

const partnerDetailsReferralAliasInput =
    document.querySelector(
        "#partnerDetailsReferralAliasInput"
    );

const checkPartnerAliasButton =
    document.querySelector(
        "#checkPartnerAliasButton"
    );

const partnerAliasMessage =
    document.querySelector(
        "#partnerAliasMessage"
    );

const partnerDetailsReferralLink =
    document.querySelector(
        "#partnerDetailsReferralLink"
    );
    const partnerDetailsApprovedAt =
        document.querySelector(
            "#partnerDetailsApprovedAt"
        );

    const partnerDetailsActivatedAt =
        document.querySelector(
            "#partnerDetailsActivatedAt"
        );

    const partnerDetailsStatusSelect =
        document.querySelector(
            "#partnerDetailsStatusSelect"
        );

    const partnerDetailsCommissionRateInput =
        document.querySelector(
            "#partnerDetailsCommissionRateInput"
        );

    const copyPartnerReferralCodeButton =
        document.querySelector(
            "#copyPartnerReferralCode"
        );

    const copyPartnerReferralLinkButton =
    document.querySelector(
        "#copyPartnerReferralLink"
    );

        /* ======================================
       PARTNER QR CODE ELEMENTS
    ====================================== */

    const partnerQrEmptyState =
        document.querySelector(
            "#partnerQrEmptyState"
        );

    const partnerQrGeneratedState =
        document.querySelector(
            "#partnerQrGeneratedState"
        );

    const partnerQrCanvas =
        document.querySelector(
            "#partnerQrCanvas"
        );

    const partnerQrLinkLabel =
        document.querySelector(
            "#partnerQrLinkLabel"
        );

    const generatePartnerQrButton =
        document.querySelector(
            "#generatePartnerQrButton"
        );

    const regeneratePartnerQrButton =
        document.querySelector(
            "#regeneratePartnerQrButton"
        );

    const downloadPartnerQrButton =
        document.querySelector(
            "#downloadPartnerQrButton"
        );

    /* ======================================
       STATE
    ====================================== */

    let toastTimer = null;

    let loadedApplications = [];

    let loadedPartners = [];

    let selectedApplication = null;

    let selectedPartner = null;

        let generatedPartnerQrLink = "";
        
    /* ======================================
       CURRENT YEAR
    ====================================== */

    if (dashboardCurrentYear) {

        dashboardCurrentYear.textContent =
            new Date().getFullYear();

    }


    /* ======================================
       TOAST MESSAGE
    ====================================== */

    function showToast(message) {

        if (!toast || !toastMessage) {
            return;
        }

        if (toastTimer) {

            window.clearTimeout(
                toastTimer
            );

        }

        toastMessage.textContent =
            message;

        toast.hidden = false;

        toastTimer =
            window.setTimeout(() => {

                toast.hidden = true;

            }, 3600);

    }


    /* ======================================
       FORMAT HELPERS
    ====================================== */

    function escapeHtml(value) {

        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }

        function formatCurrency(value) {

        return new Intl.NumberFormat(
            "en-US",
            {
                style: "currency",
                currency: "USD"
            }
        ).format(
            Number(value || 0)
        );

    }

    function formatDate(value) {

        if (!value) {
            return "—";
        }

        return new Intl.DateTimeFormat(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        ).format(
            new Date(value)
        );

    }

    function formatDateTime(value) {

        if (!value) {
            return "—";
        }

        return new Intl.DateTimeFormat(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            }
        ).format(
            new Date(value)
        );

    }

    function formatStatus(status) {

        return String(status || "")
            .replaceAll("_", " ")
            .replace(
                /\b\w/g,
                letter =>
                    letter.toUpperCase()
            );

    }

    function statusClass(status) {

        const safeStatus =
            String(status || "")
                .toLowerCase()
                .replaceAll("_", "-");

        return `status-${safeStatus}`;

    }


    /* ======================================
       MOBILE SIDEBAR
    ====================================== */

    function openSidebar() {

        if (!sidebar || !sidebarOverlay) {
            return;
        }

        sidebar.classList.add("isOpen");

        sidebarOverlay.classList.add(
            "isVisible"
        );

        document.body.style.overflow =
            "hidden";

        menuButton?.setAttribute(
            "aria-expanded",
            "true"
        );

    }

    function closeSidebar() {

        if (!sidebar || !sidebarOverlay) {
            return;
        }

        sidebar.classList.remove("isOpen");

        sidebarOverlay.classList.remove(
            "isVisible"
        );

        document.body.style.overflow = "";

        menuButton?.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    menuButton?.addEventListener(
        "click",
        openSidebar
    );

    menuCloseButton?.addEventListener(
        "click",
        closeSidebar
    );

    sidebarOverlay?.addEventListener(
        "click",
        closeSidebar
    );

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 980) {

                closeSidebar();

            }

        }
    );


    /* ======================================
       DASHBOARD NAVIGATION
    ====================================== */

    navigationLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetSelector =
                    link.getAttribute("href");

                const targetSection =
                    document.querySelector(
                        targetSelector
                    );

                if (!targetSection) {
                    return;
                }

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                navigationLinks.forEach(
                    navigationLink => {

                        navigationLink.classList.remove(
                            "active"
                        );

                    }
                );

                link.classList.add(
                    "active"
                );

                if (
                    window.innerWidth <= 980
                ) {

                    closeSidebar();

                }

            }
        );

    });


    /* ======================================
       REVIEW MODAL HELPERS
    ====================================== */

    function setLinkContent(
        element,
        value,
        fallback
    ) {

        if (!element) {
            return;
        }

        if (!value) {

            element.textContent =
                fallback;

            element.removeAttribute(
                "href"
            );

            element.classList.add(
                "isUnavailable"
            );

            return;

        }

        element.textContent =
            value;

        element.href =
            value;

        element.classList.remove(
            "isUnavailable"
        );

    }

        function updateReviewStatusBadge(
        status
    ) {

        if (!reviewApplicationStatus) {
            return;
        }

        reviewApplicationStatus.className =
            `ec-status ${statusClass(status)}`;

        reviewApplicationStatus.textContent =
            formatStatus(status);

    }

    function openApplicationReview(
        applicationId
    ) {

        const application =
            loadedApplications.find(
                item =>
                    item.id === applicationId
            );

        if (
            !application ||
            !applicationReviewModal
        ) {
            return;
        }

        selectedApplication =
            application;

        if (reviewApplicantName) {

            reviewApplicantName.textContent =
                application.full_name ||
                "Applicant";

        }

        if (reviewApplicantEmail) {

            reviewApplicantEmail.textContent =
                application.email ||
                "No email provided";

            reviewApplicantEmail.href =
                application.email
                    ? `mailto:${application.email}`
                    : "#";

        }

        if (reviewApplicantPhone) {

            reviewApplicantPhone.textContent =
                application.phone ||
                "Not provided";

        }

        if (reviewApplicantBusiness) {

            reviewApplicantBusiness.textContent =
                application.business_name ||
                "Independent";

        }

        setLinkContent(
            reviewApplicantWebsite,
            application.website_url,
            "Not provided"
        );

        setLinkContent(
            reviewApplicantSocial,
            application.social_media_url,
            "Not provided"
        );

        if (reviewApplicationSubmitted) {

            reviewApplicationSubmitted.textContent =
                formatDateTime(
                    application.created_at
                );

        }

        if (reviewApplicationUpdated) {

            reviewApplicationUpdated.textContent =
                formatDateTime(
                    application.updated_at
                );

        }

        if (reviewApplicantAudience) {

            reviewApplicantAudience.textContent =
                application.audience_description ||
                "No audience description was provided.";

        }

        if (reviewApplicantReason) {

            reviewApplicantReason.textContent =
                application.partnership_reason ||
                "No response provided.";

        }

        if (reviewApplicantStrategy) {

            reviewApplicantStrategy.textContent =
                application.referral_strategy ||
                "No response provided.";

        }

        updateReviewStatusBadge(
            application.status
        );

        if (
            reviewApplicationStatusSelect
        ) {

            reviewApplicationStatusSelect.value =
                application.status;

        }

        if (reviewApplicationNotes) {

            reviewApplicationNotes.value =
                application.admin_notes || "";

        }

        applicationReviewModal.classList.add(
            "isOpen"
        );

        applicationReviewModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "applicationReviewOpen"
        );

        closeApplicationReviewButton?.focus();

    }

    function closeApplicationReview() {

        if (!applicationReviewModal) {
            return;
        }

        applicationReviewModal.classList.remove(
            "isOpen"
        );

        applicationReviewModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "applicationReviewOpen"
        );

        selectedApplication = null;

    }

    closeApplicationReviewButton?.addEventListener(
        "click",
        closeApplicationReview
    );

    cancelApplicationReviewButton?.addEventListener(
        "click",
        closeApplicationReview
    );

    applicationReviewBackdrop?.addEventListener(
        "click",
        closeApplicationReview
    );

        reviewApplicationStatusSelect?.addEventListener(
        "change",
        () => {

            updateReviewStatusBadge(
                reviewApplicationStatusSelect.value
            );

        }
    );


    /* ======================================
       PARTNER DETAILS HELPERS
    ====================================== */

    function cleanPartnerAlias(value) {

    return String(value || "")
        .trim()
        .toLowerCase();

}

function getPartnerReferralLink(partner) {

    const alias =
        cleanPartnerAlias(
            partner?.referral_slug
        );

    if (!alias) {
        return "";
    }

    return `https://echocraft.studio/${alias}`;

}

function updatePartnerAliasMessage(
    message,
    state = ""
) {

    if (!partnerAliasMessage) {
        return;
    }

    partnerAliasMessage.textContent =
        message;

    partnerAliasMessage.classList.remove(
        "isAvailable",
        "isUnavailable",
        "isChecking"
    );

    if (state) {

        partnerAliasMessage.classList.add(
            state
        );

    }

}

function updatePartnerReferralPreview(
    alias
) {

    const cleanedAlias =
        cleanPartnerAlias(alias);

    const referralLink =
        cleanedAlias
            ? `https://echocraft.studio/${cleanedAlias}`
            : "https://echocraft.studio/partner";

    if (partnerDetailsReferralLink) {

        partnerDetailsReferralLink.textContent =
            referralLink;

        partnerDetailsReferralLink.href =
            cleanedAlias
                ? referralLink
                : "#";

    }

}

async function checkPartnerAliasAvailability() {

    if (
        !selectedPartner ||
        !supabaseClient ||
        !partnerDetailsReferralAliasInput
    ) {
        return false;
    }

    const requestedAlias =
        cleanPartnerAlias(
            partnerDetailsReferralAliasInput.value
        );

    partnerDetailsReferralAliasInput.value =
        requestedAlias;

    updatePartnerReferralPreview(
        requestedAlias
    );

    checkPartnerAliasButton.disabled =
        true;

    updatePartnerAliasMessage(
        "Checking alias availability...",
        "isChecking"
    );

    try {

        const {
            data: availabilityResult,
            error: availabilityError
        } = await supabaseClient.rpc(
            "check_partner_referral_alias",
            {
                p_partner_id:
                    selectedPartner.id,

                p_alias:
                    requestedAlias
            }
        );

        if (availabilityError) {
            throw availabilityError;
        }

        if (
            availabilityResult?.available ===
            true
        ) {

            updatePartnerAliasMessage(
                availabilityResult.message ||
                "This referral alias is available.",
                "isAvailable"
            );

            return true;

        }

        updatePartnerAliasMessage(
            availabilityResult?.message ||
            "That referral alias is unavailable.",
            "isUnavailable"
        );

        return false;

    } catch (error) {

        console.error(
            "Unable to check referral alias:",
            error
        );

        updatePartnerAliasMessage(
            "Unable to check this alias right now.",
            "isUnavailable"
        );

        return false;

    } finally {

        checkPartnerAliasButton.disabled =
            false;

    }

}
    /* ======================================
       PARTNER QR CODE HELPERS
    ====================================== */

    function resetPartnerQrCode() {

        generatedPartnerQrLink = "";

        if (partnerQrCanvas) {

            partnerQrCanvas.innerHTML = "";

        }

        if (partnerQrLinkLabel) {

            partnerQrLinkLabel.textContent =
                "https://echocraft.studio/partner";

        }

        if (partnerQrEmptyState) {

            partnerQrEmptyState.hidden =
                false;

        }

        if (partnerQrGeneratedState) {

            partnerQrGeneratedState.hidden =
                true;

        }

    }

    function getCurrentPartnerReferralLink() {

        const currentAlias =
            cleanPartnerAlias(
                partnerDetailsReferralAliasInput
                    ?.value ||
                selectedPartner?.referral_slug
            );

        if (!currentAlias) {
            return "";
        }

        return `https://echocraft.studio/${currentAlias}`;

    }

    function generatePartnerQrCode() {

        const referralLink =
            getCurrentPartnerReferralLink();

        if (!referralLink) {

            showToast(
                "Enter a referral alias before generating a QR code."
            );

            partnerDetailsReferralAliasInput
                ?.focus();

            return;

        }

        if (
            typeof window.QRCode !== "function" ||
            !partnerQrCanvas
        ) {

            showToast(
                "The QR code generator could not be loaded."
            );

            return;

        }

        generatedPartnerQrLink =
            referralLink;

        partnerQrCanvas.innerHTML = "";

        new window.QRCode(
            partnerQrCanvas,
            {
                text:
                    referralLink,

                width:
                    136,

                height:
                    136,

                colorDark:
                    "#000000",

                colorLight:
                    "#ffffff",

                correctLevel:
                    window.QRCode.CorrectLevel.H
            }
        );

        if (partnerQrLinkLabel) {

            partnerQrLinkLabel.textContent =
                referralLink;

        }

        if (partnerQrEmptyState) {

            partnerQrEmptyState.hidden =
                true;

        }

        if (partnerQrGeneratedState) {

            partnerQrGeneratedState.hidden =
                false;

        }

        showToast(
            "Referral QR code generated."
        );

    }

    function downloadPartnerQrCode() {

        if (
            !partnerQrCanvas ||
            !generatedPartnerQrLink
        ) {

            showToast(
                "Generate the QR code before downloading it."
            );

            return;

        }

        const qrCanvas =
            partnerQrCanvas.querySelector(
                "canvas"
            );

        const qrImage =
            partnerQrCanvas.querySelector(
                "img"
            );

        let imageSource = "";

        if (qrCanvas) {

            imageSource =
                qrCanvas.toDataURL(
                    "image/png"
                );

        } else if (qrImage) {

            imageSource =
                qrImage.src;

        }

        if (!imageSource) {

            showToast(
                "The QR image is not ready yet."
            );

            return;

        }

        const currentAlias =
            cleanPartnerAlias(
                partnerDetailsReferralAliasInput
                    ?.value ||
                selectedPartner?.referral_slug ||
                "partner"
            );

        const downloadLink =
            document.createElement(
                "a"
            );

        downloadLink.href =
            imageSource;

        downloadLink.download =
            `echo-craft-${currentAlias}-referral-qr.png`;

        document.body.appendChild(
            downloadLink
        );

        downloadLink.click();

        downloadLink.remove();

        showToast(
            "Referral QR code downloaded."
        );

    }
function updatePartnerStatusBadge(status) {

    
        if (!partnerDetailsStatus) {
            return;
        }

        partnerDetailsStatus.className =
            `ec-status ${statusClass(status)}`;

        partnerDetailsStatus.textContent =
            formatStatus(status);

    }

    function openPartnerDetails(partnerId) {

        const partner =
            loadedPartners.find(
                item => item.id === partnerId
            );

        if (!partner || !partnerDetailsModal) {
            return;
        }

        selectedPartner = partner;

        const referralLink =
            getPartnerReferralLink(partner);

        if (partnerDetailsName) {

            partnerDetailsName.textContent =
                partner.full_name || "Partner";

        }

        if (partnerDetailsEmail) {

            partnerDetailsEmail.textContent =
                partner.email ||
                "No email provided";

            partnerDetailsEmail.href =
                partner.email
                    ? `mailto:${partner.email}`
                    : "#";

        }

        updatePartnerStatusBadge(
            partner.status
        );

        if (partnerDetailsVisits) {

            partnerDetailsVisits.textContent =
                partner.referral_count || 0;

        }

        if (partnerDetailsClients) {

            partnerDetailsClients.textContent =
                partner.client_count || 0;

        }

        if (partnerDetailsCommissionTotal) {

            partnerDetailsCommissionTotal.textContent =
                formatCurrency(
                    partner.commission_total
                );

        }

        if (partnerDetailsCommissionRate) {

            partnerDetailsCommissionRate.textContent =
                `${Number(
                    partner.commission_rate || 0
                )}%`;

        }

        if (partnerDetailsBusiness) {

            partnerDetailsBusiness.textContent =
                partner.business_name ||
                "Independent";

        }

        if (partnerDetailsReferralCode) {

            partnerDetailsReferralCode.textContent =
                partner.referral_code || "—";

        }

        if (partnerDetailsReferralAliasInput) {

    partnerDetailsReferralAliasInput.value =
        cleanPartnerAlias(
            partner.referral_slug
        );

}

updatePartnerReferralPreview(
    partner.referral_slug
);

updatePartnerAliasMessage(
    "Use letters, numbers, or hyphens. The first person to claim an alias keeps it."
);

resetPartnerQrCode();

if (partnerDetailsApprovedAt) {

            partnerDetailsApprovedAt.textContent =
                formatDateTime(
                    partner.approved_at
                );

        }

        if (partnerDetailsActivatedAt) {

            partnerDetailsActivatedAt.textContent =
                formatDateTime(
                    partner.activated_at
                );

        }

        if (partnerDetailsStatusSelect) {

            partnerDetailsStatusSelect.value =
                partner.status;

        }

        if (partnerDetailsCommissionRateInput) {

            partnerDetailsCommissionRateInput.value =
                Number(
                    partner.commission_rate || 0
                );

        }

        partnerDetailsModal.classList.add(
            "isOpen"
        );

        partnerDetailsModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "partnerDetailsOpen"
        );

        closePartnerDetailsButton?.focus();

    }

    function closePartnerDetails() {

    if (!partnerDetailsModal) {
        return;
    }

    partnerDetailsModal.classList.remove(
        "isOpen"
    );

    partnerDetailsModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "partnerDetailsOpen"
    );

    resetPartnerQrCode();

    selectedPartner = null;

}

    async function copyPartnerValue(
        value,
        label
    ) {

        if (!value) {

            showToast(
                `${label} is unavailable.`
            );

            return;

        }

        try {

            await navigator.clipboard.writeText(
                value
            );

            showToast(
                `${label} copied.`
            );

        } catch (error) {

            console.error(
                `Unable to copy ${label}:`,
                error
            );

            showToast(
                `Unable to copy ${label}.`
            );

        }

    }

    closePartnerDetailsButton?.addEventListener(
        "click",
        closePartnerDetails
    );

    closePartnerDetailsFooterButton?.addEventListener(
        "click",
        closePartnerDetails
    );

    partnerDetailsBackdrop?.addEventListener(
        "click",
        closePartnerDetails
    );

    partnerDetailsStatusSelect?.addEventListener(
        "change",
        () => {

            updatePartnerStatusBadge(
                partnerDetailsStatusSelect.value
            );

        }
    );

    copyPartnerReferralCodeButton?.addEventListener(
        "click",
        () => {

            copyPartnerValue(
                selectedPartner?.referral_code,
                "Referral code"
            );

        }
    );

checkPartnerAliasButton?.addEventListener(
    "click",
    checkPartnerAliasAvailability
);

partnerDetailsReferralAliasInput?.addEventListener(
    "input",
    () => {

        const cleanedAlias =
            cleanPartnerAlias(
                partnerDetailsReferralAliasInput.value
            );

        updatePartnerReferralPreview(
            cleanedAlias
        );

        updatePartnerAliasMessage(
            "Click Check to confirm whether this alias is available."
        );

        resetPartnerQrCode();

    }
);

generatePartnerQrButton?.addEventListener(
    "click",
    generatePartnerQrCode
);

regeneratePartnerQrButton?.addEventListener(
    "click",
    generatePartnerQrCode
);

downloadPartnerQrButton?.addEventListener(
    "click",
    downloadPartnerQrCode
);

    copyPartnerReferralLinkButton?.addEventListener(
    "click",
    () => {

        const currentAlias =
            cleanPartnerAlias(
                partnerDetailsReferralAliasInput
                    ?.value ||
                selectedPartner?.referral_slug
            );

        const currentReferralLink =
            currentAlias
                ? `https://echocraft.studio/${currentAlias}`
                : "";

        copyPartnerValue(
            currentReferralLink,
            "Referral link"
        );

    }
);

/* ======================================
   DELETE APPLICATIONS
====================================== */

async function deleteApplications(
    applicationIds
) {

    if (
        !supabaseClient ||
        !applicationIds.length
    ) {
        return;
    }

    const applicationsToDelete =
        loadedApplications.filter(
            application =>
                applicationIds.includes(
                    application.id
                )
        );

    const protectedApplication =
        applicationsToDelete.find(
            application =>
                application.status ===
                "approved"
        );

    if (protectedApplication) {

        showToast(
            "Approved applications cannot be deleted from application cleanup."
        );

        return;

    }

    const confirmed =
        window.confirm(
            applicationIds.length === 1
                ? "Permanently delete this application?"
                : `Permanently delete ${applicationIds.length} selected applications?`
        );

    if (!confirmed) {
        return;
    }

    try {

        for (
            const applicationId
            of applicationIds
        ) {

            const {
                data: deleteResult,
                error: deleteError
            } = await supabaseClient.rpc(
                "delete_partner_application",
                {
                    p_application_id:
                        applicationId
                }
            );

            if (deleteError) {
                throw deleteError;
            }

            if (
                !deleteResult ||
                deleteResult.success !== true
            ) {

                throw new Error(
                    "Application deletion was not confirmed."
                );

            }

        }

        showToast(
            applicationIds.length === 1
                ? "Application deleted."
                : `${applicationIds.length} applications deleted.`
        );

        await loadDashboardData(false);

    } catch (error) {

        console.error(
            "Unable to delete application:",
            error
        );

        const errorMessage =
            String(
                error?.message || ""
            );

        if (
            errorMessage.includes(
                "Approved applications"
            )
        ) {

            showToast(
                "Approved applications cannot be deleted here."
            );

        } else {

            showToast(
                "Unable to delete the selected application."
            );

        }

    }

}


/* ======================================
   RENDER APPLICATIONS
====================================== */

function renderApplications(
    applications
) {

    const existingState =
        applicationsSection?.querySelector(
            ".dashboardEmptyState"
        );

    if (
        !applicationsSection ||
        !existingState
    ) {
        return;
    }

    if (!applications.length) {

        existingState.innerHTML = `
            <span class="dashboardEmptyStateIcon">
                <i class="fa-solid fa-user-check"></i>
            </span>

            <h3>No Applications Yet</h3>

            <p>
                New public partner applications
                will appear here automatically.
            </p>

            <a
                class="primaryDashboardButton"
                href="../partners/apply.html"
            >
                Preview Application Page
            </a>
        `;

        return;
    }

    existingState.innerHTML = `
        <div class="applicationCleanupToolbar">

            <button
                id="deleteSelectedApplications"
                class="applicationBulkDeleteButton"
                type="button"
                disabled
            >
                <i class="fa-solid fa-trash-can"></i>

                Delete Selected

                <span id="selectedApplicationCount">
                    0
                </span>
            </button>

        </div>

        <div class="ec-table-wrapper">

            <table class="ec-table">

                <thead>

                    <tr>

                        <th class="applicationCheckboxColumn">

                            <input
                                id="selectAllApplications"
                                type="checkbox"
                                aria-label="Select all deletable applications"
                            >

                        </th>

                        <th>Applicant</th>
                        <th>Business</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    ${applications.map(
                        application => {

                            const isApproved =
                                application.status ===
                                "approved";

                            return `
                                <tr>

                                    <td class="applicationCheckboxColumn">

                                        <input
                                            class="applicationSelectCheckbox"
                                            type="checkbox"
                                            value="${escapeHtml(
                                                application.id
                                            )}"
                                            aria-label="Select ${escapeHtml(
                                                application.full_name
                                            )}"
                                            ${isApproved
                                                ? "disabled"
                                                : ""}
                                        >

                                    </td>

                                    <td>

                                        <strong>
                                            ${escapeHtml(
                                                application.full_name
                                            )}
                                        </strong>

                                        <small>
                                            ${escapeHtml(
                                                application.email
                                            )}
                                        </small>

                                    </td>

                                    <td>
                                        ${escapeHtml(
                                            application.business_name ||
                                            "Independent"
                                        )}
                                    </td>

                                    <td>

                                        <span
                                            class="ec-status ${statusClass(
                                                application.status
                                            )}"
                                        >
                                            ${escapeHtml(
                                                formatStatus(
                                                    application.status
                                                )
                                            )}
                                        </span>

                                    </td>

                                    <td>
                                        ${formatDate(
                                            application.created_at
                                        )}
                                    </td>

                                    <td>

                                        <div class="applicationRowActions">

                                            <button
                                                class="applicationReviewButton"
                                                type="button"
                                                data-application-id="${escapeHtml(
                                                    application.id
                                                )}"
                                            >
                                                <i class="fa-solid fa-magnifying-glass"></i>

                                                Review
                                            </button>

                                            <button
                                                class="applicationDeleteButton"
                                                type="button"
                                                data-application-id="${escapeHtml(
                                                    application.id
                                                )}"
                                                aria-label="Delete ${escapeHtml(
                                                    application.full_name
                                                )}"
                                                title="${isApproved
                                                    ? "Approved applications are protected"
                                                    : "Delete application"}"
                                                ${isApproved
                                                    ? "disabled"
                                                    : ""}
                                            >
                                                <i class="fa-solid fa-trash-can"></i>
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            `;

                        }
                    ).join("")}

                </tbody>

            </table>

        </div>
    `;


    const selectAllCheckbox =
        existingState.querySelector(
            "#selectAllApplications"
        );

    const deleteSelectedButton =
        existingState.querySelector(
            "#deleteSelectedApplications"
        );

    const selectedCount =
        existingState.querySelector(
            "#selectedApplicationCount"
        );

    const selectableCheckboxes =
        Array.from(
            existingState.querySelectorAll(
                ".applicationSelectCheckbox:not(:disabled)"
            )
        );


    function updateSelectedApplications() {

        const checkedCheckboxes =
            selectableCheckboxes.filter(
                checkbox =>
                    checkbox.checked
            );

        if (selectedCount) {

            selectedCount.textContent =
                String(
                    checkedCheckboxes.length
                );

        }

        if (deleteSelectedButton) {

            deleteSelectedButton.disabled =
                checkedCheckboxes.length === 0;

        }

        if (selectAllCheckbox) {

            selectAllCheckbox.checked =
                selectableCheckboxes.length > 0 &&
                checkedCheckboxes.length ===
                    selectableCheckboxes.length;

            selectAllCheckbox.indeterminate =
                checkedCheckboxes.length > 0 &&
                checkedCheckboxes.length <
                    selectableCheckboxes.length;

        }

    }


    existingState
        .querySelectorAll(
            ".applicationReviewButton"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openApplicationReview(
                        button.dataset.applicationId
                    );

                }
            );

        });


    existingState
        .querySelectorAll(
            ".applicationDeleteButton:not(:disabled)"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    await deleteApplications([
                        button.dataset.applicationId
                    ]);

                }
            );

        });


    selectableCheckboxes.forEach(
        checkbox => {

            checkbox.addEventListener(
                "change",
                updateSelectedApplications
            );

        }
    );


    selectAllCheckbox?.addEventListener(
        "change",
        () => {

            selectableCheckboxes.forEach(
                checkbox => {

                    checkbox.checked =
                        selectAllCheckbox.checked;

                }
            );

            updateSelectedApplications();

        }
    );


    deleteSelectedButton?.addEventListener(
        "click",
        async () => {

            const selectedIds =
                selectableCheckboxes
                    .filter(
                        checkbox =>
                            checkbox.checked
                    )
                    .map(
                        checkbox =>
                            checkbox.value
                    );

            await deleteApplications(
                selectedIds
            );

        }
    );

}

        /* ======================================
       RENDER PARTNERS
    ====================================== */

    function renderPartners(partners) {

        if (!partnersTableBody) {
            return;
        }

        if (!partners.length) {

            partnersTableBody.innerHTML = `
                <tr>

                    <td
                        class="ec-table-empty"
                        colspan="7"
                    >

                        <h3>No Active Partners</h3>

                        <p>
                            Approved partners will appear
                            here automatically.
                        </p>

                    </td>

                </tr>
            `;

            return;
        }

        partnersTableBody.innerHTML =
            partners.map(partner => `

                <tr>

                    <td>

                        <strong>
                            ${escapeHtml(
                                partner.full_name
                            )}
                        </strong>

                        <small>
                            ${escapeHtml(
                                partner.email
                            )}
                        </small>

                    </td>

                    <td>
                        ${escapeHtml(
                            partner.referral_code
                        )}
                    </td>

                    <td>

                        <span
                            class="ec-status ${statusClass(
                                partner.status
                            )}"
                        >
                            ${escapeHtml(
                                formatStatus(
                                    partner.status
                                )
                            )}
                        </span>

                    </td>

                    <td>
                        ${partner.referral_count || 0}
                    </td>

                    <td>
                        ${partner.client_count || 0}
                    </td>

                    <td>
                        ${formatCurrency(
                            partner.commission_total
                        )}
                    </td>

                    <td>

                        <button
                            class="partnerViewButton"
                            type="button"
                            data-partner-id="${escapeHtml(
                                partner.id
                            )}"
                        >
                            <i class="fa-solid fa-eye"></i>
                            View
                        </button>

                    </td>

                </tr>

            `).join("");

        partnersTableBody
            .querySelectorAll(
                ".partnerViewButton"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        openPartnerDetails(
                            button.dataset.partnerId
                        );

                    }
                );

            });

    }


    /* ======================================
       RENDER COMPACT RECORD LISTS
    ====================================== */

    function renderCompactRecords(
        section,
        records,
        emptyTitle,
        emptyText,
        renderer
    ) {

        const state =
            section?.querySelector(
                ".dashboardEmptyState"
            );

        if (!state) {
            return;
        }

        if (!records.length) {

            const heading =
                state.querySelector("h3");

            const paragraph =
                state.querySelector("p");

            if (heading) {

                heading.textContent =
                    emptyTitle;

            }

            if (paragraph) {

                paragraph.textContent =
                    emptyText;

            }

            return;
        }

        state.innerHTML = `
            <div class="dashboardRecordList">

                ${records.map(
                    renderer
                ).join("")}

            </div>
        `;

    }


    /* ======================================
       SAVE APPLICATION REVIEW
    ====================================== */

    saveApplicationReviewButton?.addEventListener(
        "click",
        async () => {

            if (
                !selectedApplication ||
                !supabaseClient
            ) {
                return;
            }

            const selectedStatus =
                reviewApplicationStatusSelect
                    ?.value || "pending";

            const administratorNotes =
                reviewApplicationNotes
                    ?.value.trim() || null;

            saveApplicationReviewButton.disabled =
                true;

            saveApplicationReviewButton.classList.add(
                "isLoading"
            );

            try {

                /* ==================================
                   APPROVAL AUTOMATION
                ================================== */

                if (selectedStatus === "approved") {

                    const confirmed =
                        window.confirm(
                            "Approve this application and create an active partner with unique referral credentials?"
                        );

                    if (!confirmed) {

                        saveApplicationReviewButton.disabled =
                            false;

                        saveApplicationReviewButton.classList.remove(
                            "isLoading"
                        );

                        return;

                    }

                    const {
    data: onboardingResult,
    error: onboardingError
} =
    await supabaseClient.functions.invoke(
        "approve-partner-onboarding",
        {
            body: {
                application_id:
                    selectedApplication.id,

                administrator_notes:
                    administratorNotes
            }
        }
    );

if (onboardingError) {
    throw onboardingError;
}

if (
    !onboardingResult ||
    onboardingResult.success !== true ||
    !onboardingResult.partner
) {

    throw new Error(
        onboardingResult?.message ||
        "Partner onboarding did not return a valid confirmation."
    );

}

const approvedPartner =
    onboardingResult.partner;

closeApplicationReview();

showToast(
    onboardingResult.invited
        ? `Application approved. ${approvedPartner.email} was invited to create a partner password.`
        : `Application approved. The existing login for ${approvedPartner.email} was connected.`
);
                    await loadDashboardData(false);

                    return;

                }


                /* ==================================
                   STANDARD STATUS UPDATE
                ================================== */

                const {
                    data: userData,
                    error: userError
                } =
                    await supabaseClient.auth
                        .getUser();

                if (
                    userError ||
                    !userData.user
                ) {

                    throw new Error(
                        "Administrator session is unavailable."
                    );

                }

                const reviewedStatuses = [
                    "reviewing",
                    "declined",
                    "withdrawn"
                ];

                const hasBeenReviewed =
                    reviewedStatuses.includes(
                        selectedStatus
                    );

                const updatePayload = {

                    status:
                        selectedStatus,

                    admin_notes:
                        administratorNotes,

                    reviewed_by:
                        hasBeenReviewed
                            ? userData.user.id
                            : null,

                    reviewed_at:
                        hasBeenReviewed
                            ? new Date().toISOString()
                            : null

                };

                const {
                    data: updatedApplication,
                    error: updateError
                } = await supabaseClient
                    .from(
                        "partner_applications"
                    )
                    .update(
                        updatePayload
                    )
                    .eq(
                        "id",
                        selectedApplication.id
                    )
                    .select(
                        `
                        id,
                        full_name,
                        email,
                        phone,
                        business_name,
                        website_url,
                        social_media_url,
                        audience_description,
                        partnership_reason,
                        referral_strategy,
                        status,
                        admin_notes,
                        reviewed_by,
                        reviewed_at,
                        created_at,
                        updated_at
                        `
                    )
                    .single();

                if (updateError) {
                    throw updateError;
                }

                loadedApplications =
                    loadedApplications.map(
                        application => {

                            if (
                                application.id ===
                                updatedApplication.id
                            ) {

                                return updatedApplication;

                            }

                            return application;

                        }
                    );

                selectedApplication =
                    updatedApplication;

                renderApplications(
                    loadedApplications
                );

                               closeApplicationReview();

                showToast(
                    "Application review saved successfully."
                );

                await loadDashboardData(false);

            } catch (error) {

                console.error(
                    "Unable to save application review:",
                    error
                );

                const errorMessage =
                    String(
                        error?.message || ""
                    );

                if (
                    errorMessage.includes(
                        "partner record already exists"
                    )
                ) {

                    showToast(
                        "A partner already exists for this email address."
                    );

                } else if (
                    errorMessage.includes(
                        "withdrawn application"
                    )
                ) {

                    showToast(
                        "A withdrawn application cannot be approved."
                    );

                } else {

                    showToast(
                        "Unable to save the application review."
                    );

                }

            } finally {

                saveApplicationReviewButton.disabled =
                    false;

                saveApplicationReviewButton.classList.remove(
                    "isLoading"
                );

            }

        }
    );


    /* ======================================
           /* ======================================
       SAVE PARTNER DETAILS
    ====================================== */

    savePartnerDetailsButton?.addEventListener(
        "click",
        async () => {

            if (
                !selectedPartner ||
                !supabaseClient
            ) {
                return;
            }

            const selectedStatus =
                partnerDetailsStatusSelect
                    ?.value || "active";

            const commissionRate =
                Number(
                    partnerDetailsCommissionRateInput
                        ?.value || 0
                );

            const requestedAlias =
                cleanPartnerAlias(
                    partnerDetailsReferralAliasInput
                        ?.value
                );

            if (
                Number.isNaN(commissionRate) ||
                commissionRate < 0 ||
                commissionRate > 100
            ) {

                showToast(
                    "Commission rate must be between 0 and 100."
                );

                return;

            }

            if (!requestedAlias) {

                updatePartnerAliasMessage(
                    "Enter a referral alias before saving.",
                    "isUnavailable"
                );

                partnerDetailsReferralAliasInput
                    ?.focus();

                return;

            }

            savePartnerDetailsButton.disabled =
                true;

            savePartnerDetailsButton.classList.add(
                "isLoading"
            );

            try {

                /* ==================================
                   CHECK ALIAS AVAILABILITY
                ================================== */

                const aliasIsAvailable =
                    await checkPartnerAliasAvailability();

                if (!aliasIsAvailable) {

                    partnerDetailsReferralAliasInput
                        ?.focus();

                    return;

                }


                /* ==================================
                   SAVE UNIQUE REFERRAL ALIAS
                ================================== */

                const {
                    data: aliasResult,
                    error: aliasError
                } = await supabaseClient.rpc(
                    "set_partner_referral_alias",
                    {
                        p_partner_id:
                            selectedPartner.id,

                        p_alias:
                            requestedAlias
                    }
                );

                if (aliasError) {
                    throw aliasError;
                }

                if (
                    !aliasResult ||
                    aliasResult.success !== true
                ) {

                    throw new Error(
                        "The referral alias was not saved."
                    );

                }


                /* ==================================
                   SAVE STATUS AND COMMISSION RATE
                ================================== */

                const {
                    data: updatedPartner,
                    error: updateError
                } = await supabaseClient
                    .from("partners")
                    .update({

                        status:
                            selectedStatus,

                        commission_rate:
                            commissionRate

                    })
                    .eq(
                        "id",
                        selectedPartner.id
                    )
                    .select(
                        `
                        id,
                        application_id,
                        full_name,
                        email,
                        business_name,
                        referral_code,
                        referral_slug,
                        commission_rate,
                        status,
                        approved_at,
                        activated_at,
                        created_at,
                        updated_at
                        `
                    )
                    .single();

                if (updateError) {
                    throw updateError;
                }

                loadedPartners =
                    loadedPartners.map(
                        partner => {

                            if (
                                partner.id ===
                                updatedPartner.id
                            ) {

                                return {
                                    ...partner,
                                    ...updatedPartner,

                                    referral_slug:
                                        aliasResult
                                            .referral_alias
                                };

                            }

                            return partner;

                        }
                    );

                selectedPartner = {
                    ...selectedPartner,
                    ...updatedPartner,

                    referral_slug:
                        aliasResult.referral_alias
                };

                updatePartnerStatusBadge(
                    updatedPartner.status
                );

                if (
                    partnerDetailsCommissionRate
                ) {

                    partnerDetailsCommissionRate
                        .textContent =
                            `${Number(
                                updatedPartner
                                    .commission_rate ||
                                0
                            )}%`;

                }

                updatePartnerReferralPreview(
                    aliasResult.referral_alias
                );

                closePartnerDetails();

                showToast(
                    `Partner saved. Short link: echocraft.studio/${aliasResult.referral_alias}`
                );

                await loadDashboardData(false);

            } catch (error) {

                console.error(
                    "Unable to save partner details:",
                    error
                );

                const errorMessage =
                    String(
                        error?.message || ""
                    );

                if (
                    errorMessage.includes(
                        "already taken"
                    ) ||
                    errorMessage.includes(
                        "just claimed"
                    )
                ) {

                    updatePartnerAliasMessage(
                        "That alias is already taken. Try adding a number.",
                        "isUnavailable"
                    );

                    showToast(
                        "That referral alias is already taken."
                    );

                } else if (
                    errorMessage.includes(
                        "reserved"
                    )
                ) {

                    updatePartnerAliasMessage(
                        "That alias is reserved by Echo Craft.",
                        "isUnavailable"
                    );

                    showToast(
                        "That referral alias cannot be used."
                    );

                } else {

                    showToast(
                        "Unable to save partner details."
                    );

                }

            } finally {

                savePartnerDetailsButton.disabled =
                    false;

                savePartnerDetailsButton.classList.remove(
                    "isLoading"
                );

            }

        }
    );
    
    /* ======================================
       LOAD LIVE ECPP DATA
    ====================================== */

    async function loadDashboardData(
        showSuccessMessage = false
    ) {

        if (!supabaseClient) {

            showToast(
                "Supabase could not be loaded."
            );

            return;

        }

        refreshButton?.setAttribute(
            "disabled",
            "true"
        );

        const refreshIcon =
            refreshButton?.querySelector("i");

        refreshIcon?.classList.add(
            "fa-spin"
        );

        try {
            
const [
    applicationsResult,
    partnersResult,
    referralsResult,
    referralVisitsResult,
    commissionsResult,
    payoutsResult
] = await Promise.all([

                supabaseClient
                    .from(
                        "partner_applications"
                    )
                    .select(
                        `
                        id,
                        full_name,
                        email,
                        phone,
                        business_name,
                        website_url,
                        social_media_url,
                        audience_description,
                        partnership_reason,
                        referral_strategy,
                        status,
                        admin_notes,
                        reviewed_by,
                        reviewed_at,
                        created_at,
                        updated_at
                        `
                    )
                    .order(
                        "created_at",
                        {
                            ascending: false
                        }
                    )
                    .limit(50),

                supabaseClient
                    .from("partners")
                    .select(
                        `
                        id,
                        full_name,
                        email,
                        business_name,
                        referral_code,
                        referral_slug,
                        status,
                        commission_rate,
                        approved_at,
                        activated_at,
                        created_at
                        `
                    )
                    .order(
                        "created_at",
                        {
                            ascending: false
                        }
                    ),

supabaseClient
    .from("referrals")
    .select(
        `
        id,
        prospective_client_name,
        project_type,
        status,
        created_at,
        partner_id
        `
    )
    .order(
        "created_at",
        {
            ascending: false
        }
    )
    .limit(50),

supabaseClient.rpc(
    "get_admin_referral_visits",
    {
        p_limit: 100
    }
),

supabaseClient
    .from("commissions")
                        .select(
                        `
                        id,
                        commission_amount,
                        status,
                        created_at,
                        partner_id
                        `
                    )
                    .order(
                        "created_at",
                        {
                            ascending: false
                        }
                    )
                    .limit(50),

                supabaseClient
                    .from("payouts")
                    .select(
                        `
                        id,
                        amount,
                        status,
                        scheduled_for,
                        processed_at,
                        created_at,
                        partner_id
                        `
                    )
                    .order(
                        "created_at",
                        {
                            ascending: false
                        }
                    )
                    .limit(50)

            ]);

            const results = [
    applicationsResult,
    partnersResult,
    referralsResult,
    referralVisitsResult,
    commissionsResult,
    payoutsResult
];

            const failedResult =
                results.find(
                    result => result.error
                );

            if (failedResult?.error) {

                throw failedResult.error;

            }

            loadedApplications =
                applicationsResult.data || [];

            const partners =
                partnersResult.data || [];

            const referrals =
    referralsResult.data || [];

const referralVisits =
    referralVisitsResult.data || [];

const commissions =
    commissionsResult.data || [];

            const payouts =
                payoutsResult.data || [];

            const pendingApplications =
                loadedApplications.filter(
                    application =>
                        application.status ===
                            "pending" ||
                        application.status ===
                            "reviewing"
                );

            const activePartners =
                partners.filter(
                    partner =>
                        partner.status === "active"
                );

            const pendingCommissionAmount =
                commissions
                    .filter(
                        commission =>
                            commission.status ===
                                "pending" ||
                            commission.status ===
                                "approved" ||
                            commission.status ===
                                "payable"
                    )
                    .reduce(
                        (
                            total,
                            commission
                        ) =>
                            total +
                            Number(
                                commission
                                    .commission_amount ||
                                0
                            ),
                        0
                    );
                    
                /* ==================================
               UPDATE DASHBOARD TOTALS
            ================================== */

            if (applicationCount) {

                applicationCount.textContent =
                    pendingApplications.length;

            }

            if (applicationNavigationCount) {

                applicationNavigationCount.textContent =
                    pendingApplications.length;

            }

            if (activePartnerCount) {

                activePartnerCount.textContent =
                    activePartners.length;

            }

            if (referralVisitCount) {

    referralVisitCount.textContent =
        referralVisits.length;

}
            if (pendingCommissionTotal) {

                pendingCommissionTotal.textContent =
                    formatCurrency(
                        pendingCommissionAmount
                    );

            }


            /* ==================================
               UPDATE REFERRAL STAT LABEL
            ================================== */

            const referralCard =
                referralVisitCount?.closest(
                    ".dashboardStatCard"
                );

            const referralLabel =
                referralCard?.querySelector(
                    ".dashboardStatLabel"
                );

            const referralSmall =
                referralCard?.querySelector(
                    "small"
                );

            if (referralLabel) {

    referralLabel.textContent =
        "Referral Visits";

}

if (referralSmall) {

    referralSmall.textContent =
        "Verified partner-link visits";

}
        

            /* ==================================
               BUILD PARTNER SUMMARY DATA
            ================================== */

            const partnerData =
                partners.map(
                    partner => {

                        const partnerReferrals =
    referrals.filter(
        referral =>
            referral.partner_id ===
            partner.id
    );

const partnerReferralVisits =
    referralVisits.filter(
        visit =>
            visit.partner_id ===
            partner.id
    );

const partnerCommissions =
    commissions.filter(
        commission =>
            commission.partner_id ===
            partner.id
    );

                        return {

                            ...partner,

                            referral_count:
    partnerReferralVisits.length,

                            client_count:
                                partnerReferrals.filter(
                                    referral =>
                                        referral.status ===
                                        "won"
                                ).length,

                            commission_total:
                                partnerCommissions.reduce(
                                    (
                                        total,
                                        commission
                                    ) =>
                                        total +
                                        Number(
                                            commission
                                                .commission_amount ||
                                            0
                                        ),
                                    0
                                )

                        };

                    }
                );

            loadedPartners =
                partnerData;


            /* ==================================
               RENDER DASHBOARD RECORDS
            ================================== */

            renderApplications(
                loadedApplications
            );

            renderPartners(
                partnerData.filter(
                    partner =>
                        partner.status ===
                        "active"
                )
            );

            renderCompactRecords(
                referralsSection,
                referrals,
                "Waiting for Activity",
                "Referral activity will appear here automatically.",
                referral => `
                    <article class="dashboardRecordItem">

                        <div>

                            <strong>
                                ${escapeHtml(
                                    referral
                                        .prospective_client_name ||
                                    "Unnamed Referral"
                                )}
                            </strong>

                            <span>
                                ${escapeHtml(
                                    referral.project_type ||
                                    "Project not specified"
                                )}
                            </span>

                        </div>

                        <div>

                            <span
                                class="ec-status ${statusClass(
                                    referral.status
                                )}"
                            >
                                ${escapeHtml(
                                    formatStatus(
                                        referral.status
                                    )
                                )}
                            </span>

                            <small>
                                ${formatDate(
                                    referral.created_at
                                )}
                            </small>

                        </div>

                    </article>
                `
            );

            renderCompactRecords(
                commissionsSection,
                commissions,
                "No Commissions Yet",
                "Commission records will appear after a qualifying paid project.",
                commission => `
                    <article class="dashboardRecordItem">

                        <div>

                            <strong>
                                ${formatCurrency(
                                    commission
                                        .commission_amount
                                )}
                            </strong>

                            <span>
                                Partner commission
                            </span>

                        </div>
                        
                              <div>

                            <span
                                class="ec-status ${statusClass(
                                    commission.status
                                )}"
                            >
                                ${escapeHtml(
                                    formatStatus(
                                        commission.status
                                    )
                                )}
                            </span>

                            <small>
                                ${formatDate(
                                    commission.created_at
                                )}
                            </small>

                        </div>

                    </article>
                `
            );

            renderCompactRecords(
                payoutsSection,
                payouts,
                "No Payouts Yet",
                "Completed partner payments will appear here.",
                payout => `
                    <article class="dashboardRecordItem">

                        <div>

                            <strong>
                                ${formatCurrency(
                                    payout.amount
                                )}
                            </strong>

                            <span>
                                Partner payout
                            </span>

                        </div>

                        <div>

                            <span
                                class="ec-status ${statusClass(
                                    payout.status
                                )}"
                            >
                                ${escapeHtml(
                                    formatStatus(
                                        payout.status
                                    )
                                )}
                            </span>

                            <small>
                                ${formatDate(
                                    payout.processed_at ||
                                    payout.scheduled_for ||
                                    payout.created_at
                                )}
                            </small>

                        </div>

                    </article>
                `
            );


            /* ==================================
               UPDATE SYSTEM NOTICE
            ================================== */

            const noticeTitle =
                systemNotice?.querySelector(
                    "strong"
                );

            const noticeText =
                systemNotice?.querySelector(
                    "p"
                );

            if (noticeTitle) {

                noticeTitle.textContent =
                    "Control Center Connected";

            }

            if (noticeText) {

                noticeText.textContent =
                    "Secure Supabase access is active. Live ECPP records, application review, and partner management tools are connected.";

            }

            if (showSuccessMessage) {

                showToast(
                    "Live ECPP records refreshed."
                );

            }

        } catch (error) {

            console.error(
                "Unable to load dashboard data:",
                error
            );

            showToast(
                "Unable to load live ECPP records."
            );

        } finally {

            refreshButton?.removeAttribute(
                "disabled"
            );

            refreshIcon?.classList.remove(
                "fa-spin"
            );

        }

    }


    /* ======================================
       DASHBOARD BUTTON ACTIONS
    ====================================== */

    dismissSystemNoticeButton?.addEventListener(
        "click",
        () => {

            systemNotice?.classList.add(
                "isHidden"
            );

            showToast(
                "System notice dismissed."
            );

        }
    );

    refreshButton?.addEventListener(
        "click",
        () => {

            loadDashboardData(true);

        }
    );

    comingSoonButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const featureName =
                        button.dataset
                            .comingSoon ||
                        button.dataset
                            .comingSoonAction ||
                        "This feature";

                    showToast(
                        `${featureName} is planned for a future Control Center module.`
                    );

                }
            );

        }
    );


    /* ======================================
       DYNAMIC COMING-SOON ACTIONS
    ====================================== */

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-coming-soon-action]"
                );

            if (!button) {
                return;
            }

            const featureName =
                button.dataset
                    .comingSoonAction ||
                "This feature";

            showToast(
                `${featureName} is planned for a future Control Center module.`
            );

        }
    );      
    
        /* ======================================
       REAL SUPABASE LOGOUT
    ====================================== */

    logoutButton?.addEventListener(
        "click",
        async () => {

            const confirmed =
                window.confirm(
                    "Sign out of the Echo Craft Control Center?"
                );

            if (!confirmed) {
                return;
            }

            logoutButton.disabled =
                true;

            try {

                if (!supabaseClient) {

                    throw new Error(
                        "Supabase client is unavailable."
                    );

                }

                const {
                    error
                } =
                    await supabaseClient
                        .auth
                        .signOut();

                if (error) {
                    throw error;
                }

                window.location.replace(
                    "login.html"
                );

            } catch (error) {

                console.error(
                    "Control Center logout failed:",
                    error
                );

                logoutButton.disabled =
                    false;

                showToast(
                    "Unable to sign out securely."
                );

            }

        }
    );


    /* ======================================
       KEYBOARD SUPPORT
    ====================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            if (
                partnerDetailsModal
                    ?.classList
                    .contains("isOpen")
            ) {

                closePartnerDetails();

                return;

            }

            if (
                applicationReviewModal
                    ?.classList
                    .contains("isOpen")
            ) {

                closeApplicationReview();

                return;

            }

            closeSidebar();

        }
    );


    /* ======================================
       VERIFY SUPABASE CONNECTION
    ====================================== */

    if (!supabaseClient) {

        console.error(
            "Echo Craft Supabase client is unavailable."
        );

        showToast(
            "Supabase could not be loaded."
        );

        return;

    }

        /* ======================================
       INITIAL LIVE LOAD
    ====================================== */

    await loadDashboardData(false);

});

