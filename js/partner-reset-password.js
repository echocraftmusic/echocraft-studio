/* ==========================================
   ECHO CRAFT PARTICIPATION PROGRAM
   PARTNER PASSWORD RESET
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    const supabaseClient =
        window.echoCraftSupabase;

    const form =
        document.querySelector(
            "#partnerResetPasswordForm"
        );

    const newPasswordInput =
        document.querySelector(
            "#partnerNewPassword"
        );

    const confirmPasswordInput =
        document.querySelector(
            "#partnerConfirmPassword"
        );

    const newPasswordError =
        document.querySelector(
            "#partnerNewPasswordError"
        );

    const confirmPasswordError =
        document.querySelector(
            "#partnerConfirmPasswordError"
        );

    const alertBox =
        document.querySelector(
            "#partnerResetAlert"
        );

    const alertMessage =
        document.querySelector(
            "#partnerResetAlertMessage"
        );

    const resetButton =
        document.querySelector(
            "#partnerResetPasswordButton"
        );

    function showAlert(message) {

        if (!alertBox || !alertMessage) {
            return;
        }

        alertMessage.textContent =
            message;

        alertBox.hidden = false;

    }

    function clearMessages() {

        if (newPasswordError) {
            newPasswordError.textContent = "";
        }

        if (confirmPasswordError) {
            confirmPasswordError.textContent = "";
        }

        if (alertBox) {
            alertBox.hidden = true;
        }

    }

    function setLoading(isLoading) {

        if (!resetButton) {
            return;
        }

        resetButton.disabled =
            isLoading;

        resetButton.classList.toggle(
            "isLoading",
            isLoading
        );

    }

    if (!supabaseClient) {

        showAlert(
            "The secure password system could not be loaded. Please refresh the page."
        );

        if (resetButton) {
            resetButton.disabled = true;
        }

        return;

    }

    const {
        data: sessionData
    } =
        await supabaseClient.auth
            .getSession();

    if (!sessionData?.session) {

        showAlert(
            "This password link is invalid or has expired. Return to Partner Login and request a new password reset email."
        );

        if (resetButton) {
            resetButton.disabled = true;
        }

        return;

    }

    newPasswordInput?.addEventListener(
        "input",
        clearMessages
    );

    confirmPasswordInput?.addEventListener(
        "input",
        clearMessages
    );

    form?.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            clearMessages();

            const newPassword =
                newPasswordInput.value;

            const confirmPassword =
                confirmPasswordInput.value;

            let hasError = false;

            if (newPassword.length < 8) {

                newPasswordError.textContent =
                    "Use at least 8 characters.";

                hasError = true;

            }

            if (!confirmPassword) {

                confirmPasswordError.textContent =
                    "Confirm your new password.";

                hasError = true;

            } else if (
                newPassword !==
                confirmPassword
            ) {

                confirmPasswordError.textContent =
                    "The passwords do not match.";

                hasError = true;

            }

            if (hasError) {
                return;
            }

            setLoading(true);

            try {

                const {
                    error
                } =
                    await supabaseClient.auth
                        .updateUser({
                            password:
                                newPassword
                        });

                if (error) {
                    throw error;
                }

                await supabaseClient.auth
                    .signOut();

                window.location.replace(
                    "login.html?password=updated"
                );

            } catch (error) {

                console.error(
                    "Partner password update failed:",
                    error
                );

                showAlert(
                    "Your password could not be updated. Request a new password reset email and try again."
                );

            } finally {

                setLoading(false);

            }

        }
    );

});
