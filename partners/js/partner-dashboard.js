/* ==========================================
   ECHO CRAFT PARTICIPATION PROGRAM
   PARTNER DASHBOARD
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const $ = selector => document.querySelector(selector);
    const supabaseClient = window.echoCraftSupabase;

    const loader = $("#partnerDashboardLoader");
    const dashboardApp = $("#partnerDashboardApp");
    const sidebar = $("#partnerSidebar");
    const sidebarBackdrop = $("#partnerSidebarBackdrop");
    const menuButton = $("#partnerMenuButton");
    const sidebarCloseButton = $("#partnerSidebarCloseButton");
    const logoutButton = $("#partnerLogoutButton");
    const refreshButton = $("#partnerRefreshButton");
    const sidebarInitials = $("#partnerSidebarInitials");
    const sidebarName = $("#partnerSidebarName");
    const sidebarEmail = $("#partnerSidebarEmail");
    const welcomeName = $("#partnerWelcomeName");
    const commissionRate = $("#partnerCommissionRate");
    const visitCount = $("#partnerVisitCount");
    const qualifiedReferralCount = $("#partnerQualifiedReferralCount");
    const convertedClientCount = $("#partnerConvertedClientCount");
    const totalEarned = $("#partnerTotalEarned");
    const referralAliasInput = $("#partnerReferralAliasInput");
    const checkAliasButton = $("#partnerCheckAliasButton");
    const saveAliasButton = $("#partnerSaveAliasButton");
    const referralAliasMessage = $("#partnerReferralAliasMessage");
    const referralLinkInput = $("#partnerReferralLink");
    const referralAliasText = $("#partnerReferralAliasText");
    const copyLinkButton = $("#partnerCopyLinkButton");
    const qrCodeContainer = $("#partnerQrCode");
    const downloadQrButton = $("#partnerDownloadQrButton");
    const activityTableBody = $("#partnerActivityTableBody");
    const commissionTableBody = $("#partnerCommissionTableBody");
    const payoutTableBody = $("#partnerPayoutTableBody");
    const toast = $("#partnerToast");
    const toastMessage = $("#partnerToastMessage");

    let currentPartnerId = "";
    let currentReferralAlias = "";
    let currentReferralLink = "";
    let checkedReferralAlias = "";
    let toastTimer = null;

    function showToast(message) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message;
        toast.hidden = false;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { toast.hidden = true; }, 3000);
    }

    function showDashboard() {
        if (loader) loader.hidden = true;
        if (dashboardApp) dashboardApp.hidden = false;
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value || 0));
    }

    function formatDate(value) {
        if (!value) return "—";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "—";
        return date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
    }

    function escapeHtml(value) {
        return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
    }

    function getInitials(fullName) {
        const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
        if (!parts.length) return "EC";
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    function getFirstName(fullName) {
        const value = String(fullName || "").trim();
        return value ? value.split(/\s+/)[0] : "Partner";
    }

    function getSourceLabel(referrerUrl) {
        if (!referrerUrl) return "Direct Visit";
        try { return new URL(referrerUrl).hostname.replace(/^www\./, ""); }
        catch { return "External Source"; }
    }

    function getStatusBadge(status) {
        const normalized = String(status || "pending").toLowerCase();
        let className = "partnerStatusBadge";
        if (normalized === "pending") className += " isPending";
        if (normalized === "paid") className += " isPaid";
        return `<span class="${className}">${escapeHtml(normalized)}</span>`;
    }

    function cleanReferralAlias(value) {
        return String(value || "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
            .slice(0, 50);
    }

    function setAliasMessage(message, state = "") {
        if (!referralAliasMessage) return;
        referralAliasMessage.textContent = message;
        referralAliasMessage.classList.remove("isChecking", "isAvailable", "isUnavailable", "isSaved");
        if (state) referralAliasMessage.classList.add(state);
    }

    function updateReferralLinkDisplay(alias) {
        currentReferralAlias = cleanReferralAlias(alias);
        currentReferralLink = currentReferralAlias ? `${window.location.origin}/${currentReferralAlias}` : "";
        if (referralLinkInput) referralLinkInput.value = currentReferralLink || "Referral link unavailable";
        if (referralAliasText) referralAliasText.textContent = currentReferralAlias ? `Your public referral name is ${currentReferralAlias}` : "Your public referral name has not been assigned.";
        createQrCode();
    }

    function openSidebar() {
        sidebar?.classList.add("isOpen");
        if (sidebarBackdrop) sidebarBackdrop.hidden = false;
    }

    function closeSidebar() {
        sidebar?.classList.remove("isOpen");
        if (sidebarBackdrop) sidebarBackdrop.hidden = true;
    }

    menuButton?.addEventListener("click", openSidebar);
    sidebarCloseButton?.addEventListener("click", closeSidebar);
    sidebarBackdrop?.addEventListener("click", closeSidebar);

    document.querySelectorAll(".partnerNavigationLink").forEach(link => {
        link.addEventListener("click", () => {
            document.querySelectorAll(".partnerNavigationLink").forEach(item => item.classList.remove("isActive"));
            link.classList.add("isActive");
            closeSidebar();
        });
    });

    if (!supabaseClient) {
        window.location.href = "login.html";
        return;
    }

    async function requirePartnerSession() {
        const { data, error } = await supabaseClient.auth.getSession();
        if (error || !data?.session) {
            window.location.href = "login.html";
            return null;
        }
        return data.session;
    }

    async function checkReferralAliasAvailability() {
        if (!currentPartnerId || !referralAliasInput) return false;

        const requestedAlias = cleanReferralAlias(referralAliasInput.value);
        referralAliasInput.value = requestedAlias;
        checkedReferralAlias = "";
        if (saveAliasButton) saveAliasButton.disabled = true;

        if (!requestedAlias) {
            setAliasMessage("Enter a public referral name before checking availability.", "isUnavailable");
            referralAliasInput.focus();
            return false;
        }

        if (requestedAlias.length < 3) {
            setAliasMessage("Your public referral name must contain at least 3 characters.", "isUnavailable");
            referralAliasInput.focus();
            return false;
        }

        if (checkAliasButton) checkAliasButton.disabled = true;
        setAliasMessage("Checking whether this referral name is available...", "isChecking");

        try {
            const { data, error } = await supabaseClient.rpc("check_partner_referral_alias", {
                p_partner_id: currentPartnerId,
                p_alias: requestedAlias
            });

            if (error) throw error;

            if (data?.available === true) {
                checkedReferralAlias = requestedAlias;
                setAliasMessage(data.message || "This public referral name is available. Click Save Name to use it.", "isAvailable");
                if (saveAliasButton) saveAliasButton.disabled = false;
                return true;
            }

            setAliasMessage(data?.message || "That public referral name is already in use. Add numbers or choose another name.", "isUnavailable");
            return false;
        } catch (error) {
            console.error("Unable to check referral name:", error);
            setAliasMessage("The referral name could not be checked right now.", "isUnavailable");
            return false;
        } finally {
            if (checkAliasButton) checkAliasButton.disabled = false;
        }
    }

    async function saveReferralAlias() {
        if (!currentPartnerId || !checkedReferralAlias || !referralAliasInput) return;

        const aliasToSave = checkedReferralAlias;
        if (cleanReferralAlias(referralAliasInput.value) !== aliasToSave) {
            checkedReferralAlias = "";
            if (saveAliasButton) saveAliasButton.disabled = true;
            setAliasMessage("The name changed after it was checked. Check availability again.", "isUnavailable");
            return;
        }

        if (checkAliasButton) checkAliasButton.disabled = true;
        if (saveAliasButton) saveAliasButton.disabled = true;
        setAliasMessage("Saving your public referral name...", "isChecking");

        try {
            const { data, error } = await supabaseClient.rpc("set_partner_referral_alias", {
                p_partner_id: currentPartnerId,
                p_alias: aliasToSave
            });

            if (error) throw error;
            if (!data || data.success !== true) throw new Error(data?.message || "The referral name was not saved.");

            const savedAlias = cleanReferralAlias(data.referral_alias || aliasToSave);
            checkedReferralAlias = "";
            referralAliasInput.value = savedAlias;
            updateReferralLinkDisplay(savedAlias);
            setAliasMessage("Your public referral name has been saved. Your link and QR code are updated.", "isSaved");
            showToast("Public referral name saved.");
        } catch (error) {
            console.error("Unable to save referral name:", error);
            const message = String(error?.message || "").toLowerCase();
            if (message.includes("already taken") || message.includes("just claimed")) {
                setAliasMessage("That public referral name was just claimed. Add numbers or choose another name.", "isUnavailable");
            } else if (message.includes("reserved")) {
                setAliasMessage("That name is reserved by Echo Craft. Choose another public referral name.", "isUnavailable");
            } else {
                setAliasMessage("Your referral name could not be saved right now.", "isUnavailable");
            }
        } finally {
            if (checkAliasButton) checkAliasButton.disabled = false;
            if (saveAliasButton) saveAliasButton.disabled = true;
        }
    }

    referralAliasInput?.addEventListener("input", () => {
        referralAliasInput.value = cleanReferralAlias(referralAliasInput.value);
        checkedReferralAlias = "";
        if (saveAliasButton) saveAliasButton.disabled = true;
        setAliasMessage("Click Check Name to confirm whether this public referral name is available.");
    });

    checkAliasButton?.addEventListener("click", checkReferralAliasAvailability);
    saveAliasButton?.addEventListener("click", saveReferralAlias);

    function renderPartnerInformation(partner) {
        const fullName = partner?.full_name || "Echo Craft Partner";
        const email = partner?.email || "";
        const alias = cleanReferralAlias(partner?.referral_slug || partner?.referral_code || "");

        currentPartnerId = partner?.id || "";
        if (sidebarInitials) sidebarInitials.textContent = getInitials(fullName);
        if (sidebarName) sidebarName.textContent = fullName;
        if (sidebarEmail) sidebarEmail.textContent = email;
        if (welcomeName) welcomeName.textContent = getFirstName(fullName);
        if (commissionRate) commissionRate.textContent = `${Number(partner?.commission_rate || 0)}% commission rate`;
        if (referralAliasInput) referralAliasInput.value = alias;
        checkedReferralAlias = "";
        if (saveAliasButton) saveAliasButton.disabled = true;
        updateReferralLinkDisplay(alias);
        setAliasMessage(alias ? "This is your current public referral name. Enter a different name and check availability to change it." : "Choose a unique public referral name. Your legal name will not appear in your referral link.");
    }

    function renderMetrics(visits, referrals, commissions) {
        const qualified = referrals.filter(item => !["new", "pending", "rejected", "declined"].includes(String(item?.status || "").toLowerCase()));
        const converted = referrals.filter(item => ["converted", "client", "paid", "completed"].includes(String(item?.status || "").toLowerCase()));
        const earned = commissions.reduce((sum, item) => sum + Number(item?.commission_amount || 0), 0);
        if (visitCount) visitCount.textContent = String(visits.length);
        if (qualifiedReferralCount) qualifiedReferralCount.textContent = String(qualified.length);
        if (convertedClientCount) convertedClientCount.textContent = String(converted.length);
        if (totalEarned) totalEarned.textContent = formatCurrency(earned);
    }

    function renderActivity(visits) {
        if (!activityTableBody) return;
        if (!visits.length) {
            activityTableBody.innerHTML = '<tr><td colspan="4" class="partnerEmptyTable">No referral activity has been recorded yet.</td></tr>';
            return;
        }
        activityTableBody.innerHTML = visits.map(visit => `<tr><td>${escapeHtml(formatDate(visit?.visited_at))}</td><td>${escapeHtml(visit?.destination_path || "/")}</td><td>${escapeHtml(getSourceLabel(visit?.referrer_url))}</td><td>${getStatusBadge("verified")}</td></tr>`).join("");
    }

    function renderCommissions(commissions) {
        if (!commissionTableBody) return;
        if (!commissions.length) {
            commissionTableBody.innerHTML = '<tr><td colspan="4" class="partnerEmptyTable">No commissions have been recorded yet.</td></tr>';
            return;
        }
        commissionTableBody.innerHTML = commissions.map(item => `<tr><td>${escapeHtml(item?.client_name || "Referred Client")}</td><td>${escapeHtml(item?.project_name || "Echo Craft Project")}</td><td>${escapeHtml(formatCurrency(item?.commission_amount))}</td><td>${getStatusBadge(item?.status)}</td></tr>`).join("");
    }

    function renderPayouts(payouts) {
        if (!payoutTableBody) return;
        if (!payouts.length) {
            payoutTableBody.innerHTML = '<tr><td colspan="4" class="partnerEmptyTable">No payouts have been recorded yet.</td></tr>';
            return;
        }
        payoutTableBody.innerHTML = payouts.map(item => `<tr><td>${escapeHtml(formatDate(item?.processed_at || item?.scheduled_for || item?.created_at))}</td><td>${escapeHtml(formatCurrency(item?.amount))}</td><td>${escapeHtml(item?.payment_method || "Echo Craft Payment")}</td><td>${getStatusBadge(item?.status)}</td></tr>`).join("");
    }

    function createQrCode() {
        if (!qrCodeContainer) return;
        qrCodeContainer.innerHTML = "";
        if (!currentReferralLink || typeof window.QRCode !== "function") return;
        new window.QRCode(qrCodeContainer, {
            text: currentReferralLink,
            width: 166,
            height: 166,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: window.QRCode.CorrectLevel.H
        });
    }

    async function loadDashboard() {
        refreshButton?.classList.add("isLoading");
        try {
            const session = await requirePartnerSession();
            if (!session) return;

            const { data, error } = await supabaseClient.rpc("get_partner_dashboard");
            if (error) throw error;

            const partner = data?.partner || {};
            const visits = Array.isArray(data?.visits) ? data.visits : [];
            const referrals = Array.isArray(data?.referrals) ? data.referrals : [];
            const commissions = Array.isArray(data?.commissions) ? data.commissions : [];
            const payouts = Array.isArray(data?.payouts) ? data.payouts : [];

            renderPartnerInformation(partner);
            renderMetrics(visits, referrals, commissions);
            renderActivity(visits);
            renderCommissions(commissions);
            renderPayouts(payouts);
            showDashboard();
        } catch (error) {
            console.error("Partner dashboard failed to load:", error);
            await supabaseClient.auth.signOut();
            window.location.href = "login.html";
        } finally {
            refreshButton?.classList.remove("isLoading");
        }
    }

    refreshButton?.addEventListener("click", async () => {
        await loadDashboard();
        showToast("Partner information refreshed.");
    });

    copyLinkButton?.addEventListener("click", async () => {
        if (!currentReferralLink) {
            showToast("Your referral link is not available yet.");
            return;
        }
        try {
            await navigator.clipboard.writeText(currentReferralLink);
        } catch {
            referralLinkInput?.select();
            document.execCommand("copy");
        }
        showToast("Referral link copied.");
    });

    downloadQrButton?.addEventListener("click", () => {
        const image = qrCodeContainer?.querySelector("img");
        const canvas = qrCodeContainer?.querySelector("canvas");
        const imageUrl = image?.src || canvas?.toDataURL("image/png") || "";
        if (!imageUrl) {
            showToast("The QR code is not ready yet.");
            return;
        }
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `echo-craft-${currentReferralAlias || "partner"}-referral-qr.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
    });

    logoutButton?.addEventListener("click", async () => {
        await supabaseClient.auth.signOut();
        window.location.href = "login.html";
    });

    loadDashboard();
});
