/* ==========================================
   ECHO CRAFT PARTICIPATION PROGRAM
   PARTNER LOGIN AUTHENTICATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.querySelector(
            "#partnerLoginForm"
        );

    const emailInput =
        document.querySelector(
            "#partnerEmail"
        );

    const passwordInput =
        document.querySelector(
            "#partnerPassword"
        );

    const emailError =
        document.querySelector(
            "#partnerEmailError"
        );

    const passwordError =
        document.querySelector(
            "#partnerPasswordError"
        );

    const alertBox =
        document.querySelector(
            "#partnerLoginAlert"
        );

    const alertMessage =
        document.querySelector(
            "#partnerLoginAlertMessage"
        );

    const loginButton =
        document.querySelector(
            "#partnerLoginButton"
        );

    const togglePasswordButton =
        document.querySelector(
            "#partnerTogglePasswordButton"
        );

    const forgotPasswordButton =
        document.querySelector(
            "#partnerForgotPasswordButton"
        );

    const supabaseClient =
        window.echoCraftSupabase;


    /* ======================================
       HELPERS
    ====================================== */

    function showAlert(message) {

        if (
            !alertBox ||
            !alertMessage
        ) {
            return;
        }

        alertMessage.textContent =
            message;

        alertBox.hidden = false;

    }

    function hideAlert() {

        if (!alertBox) {
            return;
        }

        alertBox.hidden = true;

    }

    function clearErrors() {

        if (emailError) {
            emailError.textContent = "";
        }

        if (passwordError) {
            passwordError.textContent = "";
        }

        hideAlert();

    }

    function setLoadingState(isLoading) {

        if (!loginButton) {
            return;
        }

        loginButton.disabled =
            isLoading;

        loginButton.classList.toggle(
            "isLoading",
            isLoading
        );

    }

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        );

    }


    /* ======================================
       PASSWORD VISIBILITY
    ====================================== */

    togglePasswordButton?.addEventListener(
        "click",
        () => {

            const isPassword =
                passwordInput.type ===
                "password";

            passwordInput.type =
                isPassword
                    ? "text"
                    : "password";

            togglePasswordButton.setAttribute(
                "aria-pressed",
                String(isPassword)
            );

            togglePasswordButton.setAttribute(
                "aria-label",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );

            const icon =
                togglePasswordButton.querySelector(
                    "i"
                );

            if (icon) {

                icon.classList.toggle(
                    "fa-eye",
                    !isPassword
                );

                icon.classList.toggle(
                    "fa-eye-slash",
                    isPassword
                );

            }

        }
    );


    /* ======================================
       FIELD CLEANUP
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
       SUPABASE CHECK
    ====================================== */

    if (!supabaseClient) {

        showAlert(
            "The secure partner login system could not be loaded. Please refresh the page."
        );

        if (loginButton) {
            loginButton.disabled = true;
        }

        return;

    }


    /* ======================================
       EXISTING SESSION CHECK
    ====================================== */

    async function checkExistingSession() {

        const {
            data,
            error
        } =
            await supabaseClient.auth
                .getSession();

        if (error) {
            return;
        }

        if (data?.session) {

            window.location.href =
                "dashboard.html";

        }

    }

    checkExistingSession();


    /* ======================================
       LOGIN
    ====================================== */

    form?.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            clearErrors();

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            const password =
                passwordInput.value;

            let hasError = false;

            if (!email) {

                if (emailError) {
                    emailError.textContent =
                        "Enter your email address.";
                }

                hasError = true;

            } else if (
                !isValidEmail(email)
            ) {

                if (emailError) {
                    emailError.textContent =
                        "Enter a valid email address.";
                }

                hasError = true;

            }

            if (!password) {

                if (passwordError) {
                    passwordError.textContent =
                        "Enter your password.";
                }

                hasError = true;

            }

            if (hasError) {
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
                            email,
                            password
                        });

                if (error) {
                    throw error;
                }

                if (!data?.user) {

                    throw new Error(
                        "No partner account was returned."
                    );

                }

                const {
    data: partner,
    error: partnerError
} =
    await supabaseClient
        .from("partners")
        .select(
            "id, status, profile_id"
        )
        .eq(
            "profile_id",
            data.user.id
        )
        .maybeSingle();

                if (partnerError) {
                    throw partnerError;
                }

                if (!partner) {

                    await supabaseClient.auth
                        .signOut();

                    showAlert(
                        "This login is not connected to an approved Echo Craft partner account."
                    );

                    return;

                }

               if (
    partner.status !==
    "active"
) {

                    await supabaseClient.auth
                        .signOut();

                    showAlert(
                        "This partner account has not been approved."
                    );

                    return;

                }


                window.location.href =
                    "dashboard.html";

            } catch (error) {

                console.error(
                    "Partner login failed:",
                    error
                );

                const message =
                    String(
                        error?.message || ""
                    ).toLowerCase();

                if (
                    message.includes(
                        "invalid login credentials"
                    )
                ) {

                    showAlert(
                        "The email or password is incorrect."
                    );

                } else if (
                    message.includes(
                        "email not confirmed"
                    )
                ) {

                    showAlert(
                        "Please confirm your email address before signing in."
                    );

                } else {

                    showAlert(
                        "Partner access could not be verified. Please try again."
                    );

                }

            } finally {

                setLoadingState(false);

            }

        }
    );


    /* ======================================
       FORGOT PASSWORD
    ====================================== */

    forgotPasswordButton?.addEventListener(
        "click",
        async () => {

            clearErrors();

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();

            if (!email) {

                if (emailError) {
                    emailError.textContent =
                        "Enter your email address first.";
                }

                emailInput.focus();

                return;

            }

            if (!isValidEmail(email)) {

                if (emailError) {
                    emailError.textContent =
                        "Enter a valid email address.";
                }

                emailInput.focus();

                return;

            }

            forgotPasswordButton.disabled =
                true;

            try {

                const redirectUrl =
                    `${window.location.origin}/partners/reset-password.html`;

                const {
                    error
                } =
                    await supabaseClient.auth
                        .resetPasswordForEmail(
                            email,
                            {
                                redirectTo:
                                    redirectUrl
                            }
                        );

                if (error) {
                    throw error;
                }

                showAlert(
                    "Password reset instructions have been sent to your email."
                );

            } catch (error) {

                console.error(
                    "Partner password reset failed:",
                    error
                );

                showAlert(
                    "Password reset instructions could not be sent. Please try again."
                );

            } finally {

                forgotPasswordButton.disabled =
                    false;

            }

        }
    );

});