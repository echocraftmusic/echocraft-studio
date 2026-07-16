/* ==========================================
   ECHO CRAFT PARTICIPATION PROGRAM
   PARTNER PASSWORD SETUP
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const supabaseClient =
            window.echoCraftSupabase;

        const form =
            document.querySelector(
                "#partnerSetupForm"
            );

        const newPasswordInput =
            document.querySelector(
                "#partnerNewPassword"
            );

        const confirmPasswordInput =
            document.querySelector(
                "#partnerConfirmPassword"
            );

        const newPasswordToggle =
            document.querySelector(
                "#partnerNewPasswordToggle"
            );

        const confirmPasswordToggle =
            document.querySelector(
                "#partnerConfirmPasswordToggle"
            );

        const newPasswordError =
            document.querySelector(
                "#partnerNewPasswordError"
            );

        const confirmPasswordError =
            document.querySelector(
                "#partnerConfirmPasswordError"
            );

        const setupButton =
            document.querySelector(
                "#partnerSetupButton"
            );

        const alertBox =
            document.querySelector(
                "#partnerSetupAlert"
            );

        const alertMessage =
            document.querySelector(
                "#partnerSetupAlertMessage"
            );


        /* ======================================
           ALERT
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

            alertBox.hidden =
                false;

        }


        function hideAlert() {

            if (alertBox) {
                alertBox.hidden = true;
            }

        }


        /* ======================================
           LOADING STATE
        ====================================== */

        function setLoadingState(
            isLoading
        ) {

            if (!setupButton) {
                return;
            }

            setupButton.disabled =
                isLoading;

            setupButton.classList.toggle(
                "isLoading",
                isLoading
            );

        }


        /* ======================================
           PASSWORD VISIBILITY
        ====================================== */

        function connectPasswordToggle(
            button,
            input
        ) {

            button?.addEventListener(
                "click",
                () => {

                    if (!input) {
                        return;
                    }

                    const isPassword =
                        input.type ===
                        "password";

                    input.type =
                        isPassword
                            ? "text"
                            : "password";

                    button.setAttribute(
                        "aria-pressed",
                        String(isPassword)
                    );

                    button.setAttribute(
                        "aria-label",
                        isPassword
                            ? "Hide password"
                            : "Show password"
                    );

                    const icon =
                        button.querySelector("i");

                    icon?.classList.toggle(
                        "fa-eye",
                        !isPassword
                    );

                    icon?.classList.toggle(
                        "fa-eye-slash",
                        isPassword
                    );

                }
            );

        }


        connectPasswordToggle(
            newPasswordToggle,
            newPasswordInput
        );

        connectPasswordToggle(
            confirmPasswordToggle,
            confirmPasswordInput
        );


        /* ======================================
           VALIDATION
        ====================================== */

        function clearErrors() {

            if (newPasswordError) {
                newPasswordError.textContent =
                    "";
            }

            if (confirmPasswordError) {
                confirmPasswordError.textContent =
                    "";
            }

            hideAlert();

        }


        function validatePasswords() {

            clearErrors();

            const newPassword =
                newPasswordInput
                    ?.value || "";

            const confirmPassword =
                confirmPasswordInput
                    ?.value || "";

            let isValid = true;

            if (
                newPassword.length < 8
            ) {

                if (newPasswordError) {

                    newPasswordError.textContent =
                        "Password must contain at least eight characters.";

                }

                isValid = false;

            }

            if (
                !confirmPassword
            ) {

                if (confirmPasswordError) {

                    confirmPasswordError.textContent =
                        "Confirm your password.";

                }

                isValid = false;

            } else if (
                newPassword !==
                confirmPassword
            ) {

                if (confirmPasswordError) {

                    confirmPasswordError.textContent =
                        "The passwords do not match.";

                }

                isValid = false;

            }

            return {
                isValid,
                password:
                    newPassword
            };

        }


        /* ======================================
           VERIFY INVITATION SESSION
        ====================================== */

        if (!supabaseClient) {

            showAlert(
                "The secure account service could not be loaded."
            );

            form
                ?.querySelectorAll(
                    "input, button"
                )
                .forEach(element => {

                    element.disabled =
                        true;

                });

            return;

        }


        const {
            data: sessionData,
            error: sessionError
        } =
            await supabaseClient.auth
                .getSession();


        if (
            sessionError ||
            !sessionData?.session
        ) {

            showAlert(
                "This invitation link is invalid or has expired. Contact Echo Craft for a new invitation."
            );

            form
                ?.querySelectorAll(
                    "input, button"
                )
                .forEach(element => {

                    element.disabled =
                        true;

                });

            return;

        }


        /* ======================================
           SUBMIT PASSWORD
        ====================================== */

        form?.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const validation =
                    validatePasswords();

                if (!validation.isValid) {
                    return;
                }

                setLoadingState(true);

                try {

                    const {
                        error
                    } =
                        await supabaseClient.auth
                            .updateUser({
                                password:
                                    validation.password
                            });


                    if (error) {
                        throw error;
                    }


                    window.location.replace(
                        "dashboard.html"
                    );

                } catch (error) {

                    console.error(
                        "Partner password setup failed:",
                        error
                    );

                    showAlert(
                        error?.message ||
                        "Your password could not be created. Please try again."
                    );

                } finally {

                    setLoadingState(false);

                }

            }
        );

    }
);