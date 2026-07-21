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
       CLIENTS & LEADS ELEMENTS
    ====================================== */

    const clientNavigationCount = document.querySelector("#clientNavigationCount");
    const clientTotalCount = document.querySelector("#clientTotalCount");
    const activeClientCount = document.querySelector("#activeClientCount");
    const openLeadCount = document.querySelector("#openLeadCount");
    const clientQuotedValue = document.querySelector("#clientQuotedValue");
    const clientsEmptyState = document.querySelector("#clientsEmptyState");
    const clientsTableWrapper = document.querySelector("#clientsTableWrapper");
    const clientsTableBody = document.querySelector("#clientsTableBody");
    const clientSearchInput = document.querySelector("#clientSearchInput");
    const clientStatusFilter = document.querySelector("#clientStatusFilter");
    const addClientLeadButton = document.querySelector("#addClientLeadButton");
    const copyClientIntakeLink = document.querySelector("#copyClientIntakeLink");

    const clientEditorModal = document.querySelector("#clientEditorModal");
    const clientEditorBackdrop = document.querySelector("#clientEditorBackdrop");
    const closeClientEditorButton = document.querySelector("#closeClientEditor");
    const cancelClientEditorButton = document.querySelector("#cancelClientEditor");
    const clientEditorForm = document.querySelector("#clientEditorForm");
    const clientEditorTitle = document.querySelector("#clientEditorTitle");
    const archiveClientButton = document.querySelector("#archiveClientButton");
    const saveClientRecordButton = document.querySelector("#saveClientRecord");

    const clientFields = {
        id: document.querySelector("#clientRecordId"),
        full_name: document.querySelector("#clientFullName"),
        email: document.querySelector("#clientEmail"),
        phone: document.querySelector("#clientPhone"),
        preferred_contact: document.querySelector("#clientPreferredContact"),
        business_name: document.querySelector("#clientBusinessName"),
        website_url: document.querySelector("#clientWebsiteUrl"),
        project_type: document.querySelector("#clientProjectType"),
        status: document.querySelector("#clientStatus"),
        lead_source: document.querySelector("#clientLeadSource"),
        referral_partner_id: document.querySelector("#clientReferralPartnerId"),
        original_referral_partner_id: document.querySelector("#clientOriginalReferralPartnerId"),
        original_referral_partner_name: document.querySelector("#clientOriginalReferralPartnerName"),
        budget_range: document.querySelector("#clientBudgetRange"),
        desired_launch_date: document.querySelector("#clientDesiredLaunchDate"),
        quoted_price: document.querySelector("#clientQuotedPrice"),
        deposit_amount: document.querySelector("#clientDepositAmount"),
        final_payment_amount: document.querySelector("#clientFinalPaymentAmount"),
        payment_status: document.querySelector("#clientPaymentStatus"),
        follow_up_date: document.querySelector("#clientFollowUpDate"),
        project_description: document.querySelector("#clientProjectDescription"),
        reference_links: document.querySelector("#clientReferenceLinks"),
        admin_notes: document.querySelector("#clientAdminNotes")
    };

    const clientReferralAttributionMessage =
        document.querySelector("#clientReferralAttributionMessage");

    const clientLeadSourceSelect =
        document.querySelector("#clientLeadSource");

    const clientReferralPartnerSelect =
        document.querySelector("#clientReferralPartnerId");


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
    
    
const resendPartnerActivationLinkButton =
    document.querySelector(
        "#resendPartnerActivationLink"
    );

const removePartnerFromProgramButton =
    document.querySelector(
        "#removePartnerFromProgram"
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

    let loadedClients = [];

    let selectedClient = null;

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

        const dateOnlyMatch =
            String(value).match(
                /^(\d{4})-(\d{2})-(\d{2})$/
            );

        const dateValue =
            dateOnlyMatch
                ? new Date(
                    Number(dateOnlyMatch[1]),
                    Number(dateOnlyMatch[2]) - 1,
                    Number(dateOnlyMatch[3])
                )
                : new Date(value);

        return new Intl.DateTimeFormat(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        ).format(dateValue);

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

        if (resendPartnerActivationLinkButton) {

            resendPartnerActivationLinkButton.hidden =
                partner.has_password === true;

        }

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

                        <span
                            class="partnerActivationBadge ${
                                partner.has_password
                                    ? "isActivated"
                                    : "isNotActivated"
                            }"
                            title="${
                                partner.has_password
                                    ? (
                                        partner.last_sign_in_at
                                            ? `Last signed in ${formatDateTime(
                                                partner.last_sign_in_at
                                            )}`
                                            : "Password created"
                                    )
                                    : "Password setup has not been completed"
                            }"
                        >

                            <i
                                class="fa-solid ${
                                    partner.has_password
                                        ? "fa-circle-check"
                                        : "fa-circle-exclamation"
                                }"
                            ></i>

                            ${
                                partner.has_password
                                    ? "Activated"
                                    : "Not Activated"
                            }

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
       SEND NEW PARTNER ACTIVATION LINK
    ====================================== */

resendPartnerActivationLinkButton?.addEventListener(
    "click",
    async () => {

        if (
            !selectedPartner ||
            !supabaseClient
        ) {
            return;
        }

        if (!selectedPartner.application_id) {

            showToast(
                "This partner is not connected to an application record."
            );

            return;

        }

        const partnerEmail =
            selectedPartner.email ||
            "this partner";

        const confirmed =
            window.confirm(
                `Send a new activation link to ${partnerEmail}?`
            );

        if (!confirmed) {
            return;
        }

        resendPartnerActivationLinkButton.disabled =
            true;

        const defaultContent =
            resendPartnerActivationLinkButton
                .querySelector(
                    ".resendActivationDefault"
                );

        const loadingContent =
            resendPartnerActivationLinkButton
                .querySelector(
                    ".resendActivationLoading"
                );

        if (defaultContent) {
            defaultContent.hidden = true;
        }

        if (loadingContent) {
            loadingContent.hidden = false;
        }

        try {

            const {
                data: resendResult,
                error: resendError
            } =
                await supabaseClient.functions
                    .invoke(
                        "approve-partner-onboarding",
                        {
                            body: {
                                action:
                                    "resend_activation",

                                application_id:
                                    selectedPartner
                                        .application_id
                            }
                        }
                    );

            if (resendError) {
                throw resendError;
            }

            if (
                !resendResult ||
                resendResult.success !== true
            ) {

                throw new Error(
                    resendResult?.message ||
                    "The activation link was not sent."
                );

            }

            showToast(
                `A new activation link was sent to ${partnerEmail}.`
            );

        } catch (error) {

            console.error(
                "Unable to resend partner activation:",
                error
            );

            showToast(
                "The new activation link could not be sent."
            );

        } finally {

            resendPartnerActivationLinkButton.disabled =
                false;

            if (defaultContent) {
                defaultContent.hidden = false;
            }

            if (loadingContent) {
                loadingContent.hidden = true;
            }

        }

    }
);


    /* ======================================
   REMOVE PARTNER FROM PROGRAM
====================================== */

removePartnerFromProgramButton?.addEventListener(
    "click",
    async () => {

        if (
            !selectedPartner ||
            !supabaseClient
        ) {
            return;
        }

        const partnerName =
            selectedPartner.full_name ||
            "this partner";

        const confirmed =
            window.confirm(
                `Remove ${partnerName} from the Echo Craft Partner Program?\n\nTheir account will be closed, but referral and financial history will be preserved.`
            );

        if (!confirmed) {
            return;
        }

        removePartnerFromProgramButton.disabled =
            true;

        removePartnerFromProgramButton.classList.add(
            "isLoading"
        );

        try {

            const {
                data: removalResult,
                error: removalError
            } = await supabaseClient.rpc(
                "remove_partner_from_program",
                {
                    p_partner_id:
                        selectedPartner.id
                }
            );

            if (removalError) {
                throw removalError;
            }

            if (
                !removalResult ||
                removalResult.success !== true
            ) {

                throw new Error(
                    "Partner removal was not confirmed."
                );

            }

            closePartnerDetails();

            showToast(
                `${partnerName} was removed from the partner program.`
            );

            selectedPartner = null;

            await loadDashboardData(false);

        } catch (error) {

            console.error(
                "Unable to remove partner:",
                error
            );

            showToast(
                "Unable to remove this partner from the program."
            );

        } finally {

            removePartnerFromProgramButton.disabled =
                false;

            removePartnerFromProgramButton.classList.remove(
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
       CLIENTS & LEADS
    ====================================== */

    function formatClientLabel(value) {
        return String(value || "—")
            .replaceAll("_", " ")
            .replace(/\b\w/g, letter => letter.toUpperCase());
    }


    function populateClientPartnerOptions() {

        if (!clientReferralPartnerSelect) {
            return;
        }

        const selectedValue =
            clientReferralPartnerSelect.value;

        clientReferralPartnerSelect.innerHTML = `
            <option value="">
                No referral partner
            </option>

            ${loadedPartners
                .filter(
                    partner =>
                        partner.status === "active"
                )
                .map(
                    partner => `
                        <option
                            value="${escapeHtml(partner.id)}"
                        >
                            ${escapeHtml(
                                partner.full_name ||
                                partner.business_name ||
                                partner.email
                            )}
                        </option>
                    `
                )
                .join("")}
        `;

        if (
            selectedValue &&
            Array.from(
                clientReferralPartnerSelect.options
            ).some(
                option =>
                    option.value === selectedValue
            )
        ) {

            clientReferralPartnerSelect.value =
                selectedValue;

        }

    }

    function selectedPartnerName() {

        const selectedOption =
            clientReferralPartnerSelect
                ?.selectedOptions?.[0];

        if (
            !selectedOption ||
            !selectedOption.value
        ) {
            return null;
        }

        return selectedOption.textContent.trim();

    }

    function updateReferralAttributionControl() {

        if (
            !clientReferralPartnerSelect ||
            !clientReferralAttributionMessage
        ) {
            return;
        }

        const isPartnerReferral =
            clientLeadSourceSelect?.value ===
            "partner_referral";

        const originalPartnerId =
            clientFields
                .original_referral_partner_id
                ?.value || "";

        if (originalPartnerId) {

            clientReferralPartnerSelect.value =
                originalPartnerId;

            clientReferralPartnerSelect.disabled =
                true;

            clientReferralAttributionMessage
                .textContent =
                    "Referral attribution is locked to protect commission credit.";

            clientReferralAttributionMessage
                .classList.add(
                    "isLocked"
                );

            return;

        }

        clientReferralPartnerSelect.disabled =
            !isPartnerReferral;

        clientReferralPartnerSelect.required =
            isPartnerReferral;

        clientReferralAttributionMessage
            .classList.remove(
                "isLocked"
            );

        clientReferralAttributionMessage
            .textContent =
                isPartnerReferral
                    ? "Select the partner who referred this client. It will lock after the first save."
                    : "Choose Partner Referral as the lead source to assign a partner.";

        if (!isPartnerReferral) {

            clientReferralPartnerSelect.value =
                "";

        }

    }

    function clientPayloadFromForm() {
        const payload = {};

        Object.entries(clientFields).forEach(([key, element]) => {

            if (
                !element ||
                key === "id" ||
                key === "original_referral_partner_id" ||
                key === "original_referral_partner_name"
            ) {
                return;
            }

            let value =
                element.value?.trim?.() ??
                element.value;

            if (
                [
                    "quoted_price",
                    "deposit_amount",
                    "final_payment_amount"
                ].includes(key)
            ) {

                value =
                    value === ""
                        ? 0
                        : Number(value);

            } else if (value === "") {

                value = null;

            }

            payload[key] = value;

        });

        payload.referral_partner_name =
            payload.referral_partner_id
                ? selectedPartnerName()
                : null;

        return payload;
    }

    function resetClientForm() {
        clientEditorForm?.reset();
        if (clientFields.id) clientFields.id.value = "";
        if (clientFields.status) clientFields.status.value = "lead";
        if (clientFields.payment_status) clientFields.payment_status.value = "not_quoted";
        if (clientFields.lead_source) clientFields.lead_source.value = "direct_contact";
        if (clientFields.original_referral_partner_id) clientFields.original_referral_partner_id.value = "";
        if (clientFields.original_referral_partner_name) clientFields.original_referral_partner_name.value = "";
        selectedClient = null;
        populateClientPartnerOptions();
        updateReferralAttributionControl();
        if (archiveClientButton) archiveClientButton.hidden = true;
        if (clientEditorTitle) clientEditorTitle.textContent = "Add Client or Lead";
    }

    function openClientEditor(clientId = "") {
        resetClientForm();

        if (clientId) {
            const record = loadedClients.find(client => client.id === clientId);
            if (!record) return;

            selectedClient = record;
            if (clientEditorTitle) clientEditorTitle.textContent = "Edit Client or Lead";
            if (archiveClientButton) archiveClientButton.hidden = record.status === "archived";

            Object.entries(clientFields).forEach(([key, element]) => {

                if (!element) {
                    return;
                }

                if (
                    key === "original_referral_partner_id"
                ) {

                    element.value =
                        record.original_referral_partner_id ||
                        record.referral_partner_id ||
                        "";

                    return;

                }

                if (
                    key === "original_referral_partner_name"
                ) {

                    element.value =
                        record.original_referral_partner_name ||
                        record.referral_partner_name ||
                        "";

                    return;

                }

                element.value =
                    record[key] ?? "";

            });

            populateClientPartnerOptions();

            if (
                record.referral_partner_id
            ) {

                clientReferralPartnerSelect.value =
                    record.referral_partner_id;

            }

            updateReferralAttributionControl();

        }

        clientEditorModal?.classList.add("isOpen");
        clientEditorModal?.setAttribute("aria-hidden", "false");
        document.body.classList.add("clientEditorOpen");
        window.setTimeout(() => clientFields.full_name?.focus(), 50);
    }

    function closeClientEditor() {
        clientEditorModal?.classList.remove("isOpen");
        clientEditorModal?.setAttribute("aria-hidden", "true");
        document.body.classList.remove("clientEditorOpen");
        selectedClient = null;
    }

    function renderClients() {
        const query = String(clientSearchInput?.value || "").trim().toLowerCase();
        const statusFilter = clientStatusFilter?.value || "";

        const filtered = loadedClients.filter(client => {
            const matchesStatus = !statusFilter || client.status === statusFilter;
            const haystack = [
                client.full_name,
                client.email,
                client.business_name,
                client.project_type,
                client.project_description
            ].join(" ").toLowerCase();

            return matchesStatus && (!query || haystack.includes(query));
        });

        const activeStatuses = [
            "deposit_paid",
            "in_production",
            "awaiting_final_payment"
        ];

        const leadStatuses = [
            "lead",
            "consultation",
            "quote_sent"
        ];

        clientNavigationCount && (clientNavigationCount.textContent = String(
            loadedClients.filter(client => client.status !== "archived").length
        ));
        clientTotalCount && (clientTotalCount.textContent = String(loadedClients.length));
        activeClientCount && (activeClientCount.textContent = String(
            loadedClients.filter(client => activeStatuses.includes(client.status)).length
        ));
        openLeadCount && (openLeadCount.textContent = String(
            loadedClients.filter(client => leadStatuses.includes(client.status)).length
        ));
        clientQuotedValue && (clientQuotedValue.textContent = formatCurrency(
            loadedClients.reduce((sum, client) => sum + Number(client.quoted_price || 0), 0)
        ));

        if (!filtered.length) {

            if (clientsEmptyState) {

                clientsEmptyState.hidden =
                    false;

            }

            if (clientsTableWrapper) {

                clientsTableWrapper.hidden =
                    true;

            }

            return;

        }

        if (clientsEmptyState) {

            clientsEmptyState.hidden =
                true;

        }

        if (clientsTableWrapper) {

            clientsTableWrapper.hidden =
                false;

        }

        clientsTableBody.innerHTML = filtered.map(client => `
            <tr>
                <td>
                    <strong>${escapeHtml(client.full_name || "Unnamed Client")}</strong>
                    <small>${escapeHtml(client.business_name || client.email || "No business listed")}</small>
                </td>
                <td>${escapeHtml(formatClientLabel(client.project_type))}</td>
                <td>
                    <span class="ec-status ${statusClass(client.status)}">
                        ${escapeHtml(formatClientLabel(client.status))}
                    </span>
                </td>
                <td>${formatCurrency(client.quoted_price)}</td>
                <td>${escapeHtml(formatClientLabel(client.payment_status))}</td>
                <td>${formatDate(client.follow_up_date)}</td>
                <td>
                    <button
                        class="clientEditButton"
                        type="button"
                        data-client-id="${escapeHtml(client.id)}"
                    >
                        <i class="fa-solid fa-pen-to-square"></i>
                        Open
                    </button>
                </td>
            </tr>
        `).join("");

        clientsTableBody.querySelectorAll(".clientEditButton").forEach(button => {
            button.addEventListener("click", () => openClientEditor(button.dataset.clientId));
        });
    }

    async function loadClients() {
        const { data, error } = await supabaseClient
            .from("clients_leads")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        loadedClients = data || [];
        renderClients();
    }

    addClientLeadButton?.addEventListener("click", () => openClientEditor());
    closeClientEditorButton?.addEventListener("click", closeClientEditor);
    cancelClientEditorButton?.addEventListener("click", closeClientEditor);
    clientEditorBackdrop?.addEventListener("click", closeClientEditor);
    clientSearchInput?.addEventListener("input", renderClients);
    clientStatusFilter?.addEventListener("change", renderClients);

    clientLeadSourceSelect?.addEventListener(
        "change",
        updateReferralAttributionControl
    );

    copyClientIntakeLink?.addEventListener("click", async () => {
        const intakeUrl = new URL("../client-intake.html", window.location.href).href;

        try {
            await navigator.clipboard.writeText(intakeUrl);
            showToast("Client intake link copied.");
        } catch (error) {
            window.prompt("Copy this client intake link:", intakeUrl);
        }
    });

    clientEditorForm?.addEventListener("submit", async event => {
        event.preventDefault();

        if (!supabaseClient) return;

        const payload = clientPayloadFromForm();

        if (!payload.full_name || !payload.email) {
            showToast("Client name and email are required.");
            return;
        }

        if (
            payload.lead_source ===
                "partner_referral" &&
            !payload.referral_partner_id
        ) {

            showToast(
                "Select the referral partner before saving."
            );

            clientReferralPartnerSelect
                ?.focus();

            return;

        }

        if (
            selectedClient
                ?.original_referral_partner_id &&
            payload.referral_partner_id !==
                selectedClient
                    .original_referral_partner_id
        ) {

            showToast(
                "Referral attribution is locked and cannot be changed from this form."
            );

            return;

        }

        saveClientRecordButton.disabled = true;
        saveClientRecordButton.querySelector(".clientSaveDefault")?.setAttribute("hidden", "");
        saveClientRecordButton.querySelector(".clientSaveLoading")?.removeAttribute("hidden");

        try {
            let result;

            if (selectedClient?.id) {
                const updatePayload = {
                    ...payload
                };

                if (
                    selectedClient
                        .original_referral_partner_id
                ) {

                    delete updatePayload
                        .referral_partner_id;

                    delete updatePayload
                        .referral_partner_name;

                }

                result = await supabaseClient
                    .from("clients_leads")
                    .update(updatePayload)
                    .eq("id", selectedClient.id)
                    .select("*")
                    .single();
            } else {
                result = await supabaseClient
                    .from("clients_leads")
                    .insert({
                        ...payload,

                        original_referral_partner_id:
                            payload
                                .referral_partner_id ||
                            null,

                        original_referral_partner_name:
                            payload
                                .referral_partner_name ||
                            null,

                        referral_attribution_source:
                            payload
                                .referral_partner_id
                                ? "admin_manual"
                                : null,

                        referral_attributed_at:
                            payload
                                .referral_partner_id
                                ? new Date()
                                    .toISOString()
                                : null,

                        created_by:
                            window
                                .echoCraftAdmin
                                ?.id ||
                            null
                    })
                    .select("*")
                    .single();
            }

            if (result.error) throw result.error;

            closeClientEditor();
            await loadClients();
            showToast(selectedClient ? "Client record updated." : "Client or lead added.");
        } catch (error) {
            console.error("Unable to save client record:", error);
            showToast("Unable to save the client record.");
        } finally {
            saveClientRecordButton.disabled = false;
            saveClientRecordButton.querySelector(".clientSaveDefault")?.removeAttribute("hidden");
            saveClientRecordButton.querySelector(".clientSaveLoading")?.setAttribute("hidden", "");
        }
    });

    archiveClientButton?.addEventListener("click", async () => {
        if (!selectedClient?.id) return;

        const confirmed = window.confirm(
            `Archive ${selectedClient.full_name || "this record"}? The history will be preserved.`
        );

        if (!confirmed) return;

        try {
            const { error } = await supabaseClient
                .from("clients_leads")
                .update({ status: "archived" })
                .eq("id", selectedClient.id);

            if (error) throw error;

            closeClientEditor();
            await loadClients();
            showToast("Client record archived.");
        } catch (error) {
            console.error("Unable to archive client record:", error);
            showToast("Unable to archive this record.");
        }
    });

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
    activationStatusesResult,
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
                        application_id,
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

supabaseClient.rpc(
    "get_admin_partner_activation_statuses"
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
    activationStatusesResult,
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

const activationStatuses =
    activationStatusesResult.data || [];

const activationStatusByPartnerId =
    new Map(
        activationStatuses.map(
            activation => [
                activation.partner_id,
                activation
            ]
        )
    );

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

                        const activationStatus =
                            activationStatusByPartnerId.get(
                                partner.id
                            ) || {};

                        return {

                            ...partner,

                            has_password:
                                activationStatus
                                    .has_password ===
                                    true,

                            last_sign_in_at:
                                activationStatus
                                    .last_sign_in_at ||
                                null,

                            email_confirmed_at:
                                activationStatus
                                    .email_confirmed_at ||
                                null,

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

            populateClientPartnerOptions();


            /* ==================================
               RENDER DASHBOARD RECORDS
            ================================== */

            await loadClients();

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
                clientEditorModal
                    ?.classList
                    .contains("isOpen")
            ) {

                closeClientEditor();

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



/* ==========================================
   CLIENTS & LEADS BUTTON FALLBACK
   Ensures the editor opens even if an earlier
   async dashboard task delays normal binding.
========================================== */

document.addEventListener("click", event => {

    const addButton =
        event.target.closest("#addClientLeadButton");

    if (!addButton) {
        return;
    }

    const modal =
        document.querySelector("#clientEditorModal");

    const form =
        document.querySelector("#clientEditorForm");

    const title =
        document.querySelector("#clientEditorTitle");

    const archiveButton =
        document.querySelector("#archiveClientButton");

    if (!modal) {
        console.error(
            "Client editor modal was not found."
        );

        return;
    }

    form?.reset();

    const recordId =
        document.querySelector("#clientRecordId");

    const status =
        document.querySelector("#clientStatus");

    const paymentStatus =
        document.querySelector("#clientPaymentStatus");

    const leadSource =
        document.querySelector("#clientLeadSource");

    if (recordId) {
        recordId.value = "";
    }

    if (status) {
        status.value = "lead";
    }

    if (paymentStatus) {
        paymentStatus.value = "not_quoted";
    }

    if (leadSource) {
        leadSource.value = "direct_contact";
    }

    if (title) {
        title.textContent =
            "Add Client or Lead";
    }

    if (archiveButton) {
        archiveButton.hidden = true;
    }

    modal.classList.add("isOpen");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "clientEditorOpen"
    );

    window.setTimeout(
        () =>
            document
                .querySelector("#clientFullName")
                ?.focus(),
        50
    );

});


/* ==========================================
   CLIENT FORM LOSS PROTECTION
   - Clicking outside does not close the form
   - Unsaved entries are stored locally
   - Draft is restored when reopening
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.querySelector("#clientEditorForm");

    const modal =
        document.querySelector("#clientEditorModal");

    const backdrop =
        document.querySelector("#clientEditorBackdrop");

    const closeButton =
        document.querySelector("#closeClientEditor");

    const cancelButton =
        document.querySelector("#cancelClientEditor");

    const saveButton =
        document.querySelector("#saveClientRecord");

    const draftKey =
        "echoCraftClientLeadDraft";

    let formIsDirty = false;

    function getDraftPayload() {

        if (!form) {
            return {};
        }

        const payload = {};

        form
            .querySelectorAll(
                "input:not([type='hidden']), select, textarea"
            )
            .forEach(field => {

                if (!field.id) {
                    return;
                }

                payload[field.id] = field.value;

            });

        return payload;

    }

    function saveDraft() {

        if (!form) {
            return;
        }

        const recordId =
            document.querySelector(
                "#clientRecordId"
            )?.value;

        if (recordId) {
            return;
        }

        localStorage.setItem(
            draftKey,
            JSON.stringify(
                getDraftPayload()
            )
        );

    }

    function restoreDraft() {

        if (!form) {
            return;
        }

        const recordId =
            document.querySelector(
                "#clientRecordId"
            )?.value;

        if (recordId) {
            return;
        }

        const savedDraft =
            localStorage.getItem(
                draftKey
            );

        if (!savedDraft) {
            return;
        }

        try {

            const payload =
                JSON.parse(savedDraft);

            Object.entries(payload)
                .forEach(
                    ([fieldId, value]) => {

                        const field =
                            document.getElementById(
                                fieldId
                            );

                        if (field) {
                            field.value =
                                value ?? "";
                        }

                    }
                );

            formIsDirty = true;

        } catch (error) {

            console.error(
                "Unable to restore client draft:",
                error
            );

        }

    }

    function clearDraft() {

        localStorage.removeItem(
            draftKey
        );

        formIsDirty = false;

    }

    function requestClose() {

        if (!formIsDirty) {

            modal?.classList.remove(
                "isOpen"
            );

            modal?.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "clientEditorOpen"
            );

            return;

        }

        const confirmed =
            window.confirm(
                "You have unsaved client information. Close this form anyway?\n\nYour draft will remain saved and can be restored when you reopen the form."
            );

        if (!confirmed) {
            return;
        }

        modal?.classList.remove(
            "isOpen"
        );

        modal?.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "clientEditorOpen"
        );

    }

    form?.addEventListener(
        "input",
        () => {

            formIsDirty = true;

            saveDraft();

        }
    );

    form?.addEventListener(
        "change",
        () => {

            formIsDirty = true;

            saveDraft();

        }
    );

    backdrop?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopImmediatePropagation();

        },
        true
    );

    closeButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopImmediatePropagation();

            requestClose();

        },
        true
    );

    cancelButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopImmediatePropagation();

            requestClose();

        },
        true
    );

    document
        .querySelector(
            "#addClientLeadButton"
        )
        ?.addEventListener(
            "click",
            () => {

                window.setTimeout(
                    restoreDraft,
                    80
                );

            }
        );

    saveButton?.addEventListener(
        "click",
        () => {

            window.setTimeout(
                () => {

                    const modalStillOpen =
                        modal?.classList.contains(
                            "isOpen"
                        );

                    if (!modalStillOpen) {
                        clearDraft();
                    }

                },
                900
            );

        }
    );

});
