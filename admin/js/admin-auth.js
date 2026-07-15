/* ==========================================
   ECHO CRAFT CONTROL CENTER
   REAL SUPABASE ADMIN AUTHENTICATION
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    /* ======================================
       ELEMENTS
    ====================================== */

    const form = document.querySelector("#adminLoginForm");

    const emailInput = document.querySelector("#adminEmail");
    const passwordInput = document.querySelector("#adminPassword");

    const emailError = document.querySelector("#adminEmailError");
    const passwordError = document.querySelector("#adminPasswordError");

    const loginAlert = document.querySelector("#loginAlert");
    const loginAlertMessage = document.querySelector(
        "#loginAlertMessage"
    );

    const loginButton = document.querySelector("#adminLoginButton");

    const togglePasswordButton = document.querySelector(
        "#togglePasswordButton"
    );

    const forgotPasswordButton = document.querySelector(
        "#forgotPasswordButton"
    );

    const currentYear = document.querySelector("#currentYear");

    const supabaseClient = window.echoCraftSupabase;


    /* ======================================
       CURRENT YEAR
    ====================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* ======================================
       HELPERS
    ====================================== */

    function showAlert(message) {

        if (!loginAlert || !loginAlertMessage) {
            return;
        }

        loginAlertMessage.textContent = message;
        loginAlert.hidden = false;

    }

    function hideAlert() {

        if (!loginAlert) {
            return;
        }

        loginAlert.hidden = true;

    }

    function clearFieldErrors() {

        if (emailError) {
            emailError.textContent = "";
        }

        if (passwordError) {
            passwordError.textContent = "";
        }

    }

    function setLoadingState(isLoading) {

        if (!loginButton) {
            return;
        }

        loginButton.disabled = isLoading;

        loginButton.classList.toggle(
            "isLoading",
            isLoading
        );

    }

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }

    function getDashboardUrl() {

        return new URL(
            "dashboard.html",
            window.location.href
        ).href;

    }

    function getPasswordResetUrl() {

        return new URL(
            "reset-password.html",
            window.location.href
        ).href;

    }


    /* ======================================
       VERIFY SUPABASE
    ====================================== */

    if (!supabaseClient) {

        console.error(
            "Echo Craft Supabase client is unavailable."
        );

        showAlert(
            "Secure authentication could not be loaded. Please refresh the page."
        );

        return;

    }


    /* ======================================
       CHECK APPROVED ADMIN PROFILE
    ====================================== */

    async function getApprovedAdminProfile(userId) {

        const {
            data: profile,
            error
        } = await supabaseClient
            .from("profiles")
            .select(
                "id, full_name, email, role, status"
            )
            .eq("id", userId)
            .maybeSingle();

        if (error) {

            console.error(
                "Unable to read administrator profile:",
                error
            );

            return null;

        }

        if (!profile) {
            return null;
        }

        const isApprovedAdmin =
            profile.role === "admin" &&
            profile.status === "approved";

        if (!isApprovedAdmin) {
            return null;
        }

        return profile;

    }


    /* ======================================
       EXISTING SESSION CHECK
    ====================================== */

    async function checkExistingSession() {

        try {

            const {
                data,
                error
            } = await supabaseClient.auth.getUser();

            if (error || !data.user) {
                return;
            }

            const profile =
                await getApprovedAdminProfile(
                    data.user.id
                );

            if (!profile) {

                await supabaseClient.auth.signOut();

                return;

            }

            window.location.replace(
                getDashboardUrl()
            );

        } catch (error) {

            console.error(
                "Existing session check failed:",
                error
            );

        }

    }


    /* ======================================
       PASSWORD VISIBILITY
    ====================================== */

    if (
        togglePasswordButton &&
        passwordInput
    ) {

        togglePasswordButton.addEventListener(
            "click",
            () => {

                const passwordIsHidden =
                    passwordInput.type === "password";

                passwordInput.type =
                    passwordIsHidden
                        ? "text"
                        : "password";

                togglePasswordButton.setAttribute(
                    "aria-pressed",
                    String(passwordIsHidden)
                );

                togglePasswordButton.setAttribute(
                    "aria-label",
                    passwordIsHidden
                        ? "Hide password"
                        : "Show password"
                );

                const icon =
                    togglePasswordButton.querySelector("i");

                if (icon) {

                    icon.classList.toggle(
                        "fa-eye",
                        !passwordIsHidden
                    );

                    icon.classList.toggle(
                        "fa-eye-slash",
                        passwordIsHidden
                    );

                }

                passwordInput.focus();

            }
        );

    }


    /* ======================================
       LIVE FIELD CLEANUP
    ====================================== */

    emailInput?.addEventListener(
        "input",
        () => {

            if (emailError) {
                emailError.textContent = "";
            }

            hideAlert();

        }
    );

    passwordInput?.addEventListener(
        "input",
        () => {

            if (passwordError) {
                passwordError.textContent = "";
            }

            hideAlert();

        }
    );


    /* ======================================
       FORM VALIDATION
    ====================================== */

    function validateForm() {

        clearFieldErrors();
        hideAlert();

        let isValid = true;

        const email =
            emailInput
                ? emailInput.value.trim()
                : "";

        const password =
            passwordInput
                ? passwordInput.value
                : "";

        if (!email) {

            if (emailError) {
                emailError.textContent =
                    "Administrator email is required.";
            }

            isValid = false;

        } else if (!isValidEmail(email)) {

            if (emailError) {
                emailError.textContent =
                    "Enter a valid administrator email.";
            }

            isValid = false;

        }

        if (!password) {

            if (passwordError) {
                passwordError.textContent =
                    "Password is required.";
            }

            isValid = false;

        } else if (password.length < 8) {

            if (passwordError) {
                passwordError.textContent =
                    "Password must contain at least 8 characters.";
            }

            isValid = false;

        }

        if (!isValid) {

            if (
                (!email || !isValidEmail(email)) &&
                emailInput
            ) {

                emailInput.focus();

            } else {

                passwordInput?.focus();

            }

        }

        return {
            isValid,
            email,
            password
        };

    }


    /* ======================================
       PASSWORD RECOVERY
    ====================================== */

    if (forgotPasswordButton) {

        forgotPasswordButton.addEventListener(
            "click",
            async () => {

                clearFieldErrors();
                hideAlert();

                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";

                if (!email) {

                    if (emailError) {
                        emailError.textContent =
                            "Enter your administrator email first.";
                    }

                    emailInput?.focus();

                    return;

                }

                if (!isValidEmail(email)) {

                    if (emailError) {
                        emailError.textContent =
                            "Enter a valid email address.";
                    }

                    emailInput?.focus();

                    return;

                }

                forgotPasswordButton.disabled = true;

                try {

                    const { error } =
                        await supabaseClient.auth
                            .resetPasswordForEmail(
                                email,
                                {
                                    redirectTo:
                                        getPasswordResetUrl()
                                }
                            );

                    if (error) {
                        throw error;
                    }

                    showAlert(
                        "Password recovery instructions have been sent. Open only the newest email."
                    );

                } catch (error) {

                    console.error(
                        "Password recovery error:",
                        error
                    );

                    showAlert(
                        "Unable to send password recovery instructions. Please try again."
                    );

                } finally {

                    forgotPasswordButton.disabled = false;

                }

            }
        );

    }


    /* ======================================
       REAL ADMIN LOGIN
    ====================================== */

    if (form) {

        form.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                const validation = validateForm();

                if (!validation.isValid) {
                    return;
                }

                setLoadingState(true);

                try {

                    const {
                        data,
                        error
                    } =
                        await supabaseClient.auth
                            .signInWithPassword({
                                email: validation.email,
                                password: validation.password
                            });

                    if (error) {
                        throw error;
                    }

                    if (!data.user) {

                        throw new Error(
                            "No authenticated user was returned."
                        );

                    }

                    const profile =
                        await getApprovedAdminProfile(
                            data.user.id
                        );

                    if (!profile) {

                        await supabaseClient.auth.signOut();

                        showAlert(
                            "This account is not authorized for administrator access."
                        );

                         return;

                    }

                    window.location.replace(
                        getDashboardUrl()
                    );

                } catch (error) {

                    console.error(
                        "Control Center login error:",
                        error
                    );

                    showAlert(
                        "Unable to sign in. Verify your email and password, then try again."
                    );

                } finally {

                    setLoadingState(false);

                }

            }
        );

    }


    /* ======================================
       INITIALIZE
    ====================================== */

    await checkExistingSession();

});