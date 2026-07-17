/* ==========================================
   ECHO CRAFT PARTICIPATION PROGRAM
   PUBLIC PARTNER APPLICATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       ELEMENTS
    ====================================== */

    const form = document.querySelector(
        "#partnerApplicationForm"
    );

    const fullNameInput = document.querySelector(
        "#applicantFullName"
    );

    const emailInput = document.querySelector(
        "#applicantEmail"
    );

    const phoneInput = document.querySelector(
        "#applicantPhone"
    );

    const businessNameInput = document.querySelector(
        "#applicantBusinessName"
    );

    const websiteInput = document.querySelector(
        "#applicantWebsite"
    );

    const socialMediaInput = document.querySelector(
        "#applicantSocialMedia"
    );

    const audienceInput = document.querySelector(
        "#applicantAudience"
    );

    const partnershipReasonInput = document.querySelector(
        "#applicantPartnershipReason"
    );

    const referralStrategyInput = document.querySelector(
        "#applicantReferralStrategy"
    );

    const agreementInput = document.querySelector(
        "#applicationAgreement"
    );

    const fullNameError = document.querySelector(
        "#applicantFullNameError"
    );

   const activationDeadlineAgreementInput =
    document.querySelector(
        "#activationDeadlineAgreement"
    );

    const emailError = document.querySelector(
        "#applicantEmailError"
    );

    const phoneError = document.querySelector(
        "#applicantPhoneError"
    );

    const businessNameError = document.querySelector(
        "#applicantBusinessNameError"
    );

    const websiteError = document.querySelector(
        "#applicantWebsiteError"
    );

    const socialMediaError = document.querySelector(
        "#applicantSocialMediaError"
    );

    const audienceError = document.querySelector(
        "#applicantAudienceError"
    );

    const partnershipReasonError = document.querySelector(
        "#applicantPartnershipReasonError"
    );

    const referralStrategyError = document.querySelector(
        "#applicantReferralStrategyError"
    );

    const agreementError = document.querySelector(
        "#applicationAgreementError"
    );

   const activationDeadlineAgreementError =
    document.querySelector(
        "#activationDeadlineAgreementError"
    );

const activationNoticeOverlay =
    document.querySelector(
        "#activationNoticeOverlay"
    );

const activationNoticeCheckbox =
    document.querySelector(
        "#activationNoticeCheckbox"
    );

const activationNoticeButton =
    document.querySelector(
        "#activationNoticeButton"
    );

    const applicationAlert = document.querySelector(
        "#applicationAlert"
    );

    const applicationAlertMessage = document.querySelector(
        "#applicationAlertMessage"
    );

    const submitButton = document.querySelector(
        "#applicationSubmitButton"
    );

    const supabaseClient =
        window.echoCraftSupabase;


    /* ======================================
       HELPERS
    ====================================== */

    function showAlert(
        message,
        type = "error"
    ) {

        if (
            !applicationAlert ||
            !applicationAlertMessage
        ) {
            return;
        }

        applicationAlertMessage.textContent =
            message;

        applicationAlert.hidden = false;

        applicationAlert.classList.toggle(
            "isSuccess",
            type === "success"
        );

        applicationAlert.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

    function hideAlert() {

        if (!applicationAlert) {
            return;
        }

        applicationAlert.hidden = true;

        applicationAlert.classList.remove(
            "isSuccess"
        );

    }

function openActivationNotice() {

    if (!activationNoticeOverlay) {
        return;
    }

    if (activationNoticeCheckbox) {
        activationNoticeCheckbox.checked = false;
    }

    if (activationNoticeButton) {
        activationNoticeButton.disabled = true;
    }

    activationNoticeOverlay.hidden = false;

    document.body.classList.add(
        "applicationModalOpen"
    );

    window.setTimeout(() => {
        activationNoticeCheckbox?.focus();
    }, 100);

}

function closeActivationNotice() {

    if (
        !activationNoticeCheckbox?.checked ||
        !activationNoticeOverlay
    ) {
        return;
    }

    activationNoticeOverlay.hidden = true;

    document.body.classList.remove(
        "applicationModalOpen"
    );

}
   
    function setLoadingState(isLoading) {

        if (!submitButton) {
            return;
        }

        submitButton.disabled = isLoading;

        submitButton.classList.toggle(
            "isLoading",
            isLoading
        );

    }

    function clearErrors() {

        const errors = [
            fullNameError,
            emailError,
            phoneError,
            businessNameError,
            websiteError,
            socialMediaError,
            audienceError,
            partnershipReasonError,
            referralStrategyError,
            agreementError
        ];

        errors.forEach(errorElement => {

            if (errorElement) {
                errorElement.textContent = "";
            }

        });

    }

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }

    function normalizeUrl(value) {

        const trimmedValue =
            value.trim();

        if (!trimmedValue) {
            return "";
        }

        if (
            /^https?:\/\//i.test(
                trimmedValue
            )
        ) {
            return trimmedValue;
        }

        return `https://${trimmedValue}`;

    }

    function isValidUrl(value) {

        if (!value) {
            return true;
        }

        try {

            const url =
                new URL(
                    normalizeUrl(value)
                );

            return (
                url.protocol === "http:" ||
                url.protocol === "https:"
            );

        } catch {
            return false;
        }

    }

    function getValue(input) {

        return input
            ? input.value.trim()
            : "";

    }

    function focusFirstInvalidField(
        invalidFields
    ) {

        const firstInvalid =
            invalidFields.find(Boolean);

        firstInvalid?.focus();

    }


    /* ======================================
       LIVE ERROR CLEANUP
    ====================================== */

    const fieldConnections = [

        [fullNameInput, fullNameError],
        [emailInput, emailError],
        [phoneInput, phoneError],
        [businessNameInput, businessNameError],
        [websiteInput, websiteError],
        [socialMediaInput, socialMediaError],
        [audienceInput, audienceError],
        [
            partnershipReasonInput,
            partnershipReasonError
        ],
        [
            referralStrategyInput,
            referralStrategyError
        ]

    ];

    fieldConnections.forEach(
        ([input, errorElement]) => {

            input?.addEventListener(
                "input",
                () => {

                    if (errorElement) {
                        errorElement.textContent = "";
                    }

                    hideAlert();

                }
            );

        }
    );

    agreementInput?.addEventListener(
        "change",
        () => {

            if (agreementError) {
                agreementError.textContent = "";
            }

            hideAlert();

        }
    );


    /* ======================================
       FORM VALIDATION
    ====================================== */

    function validateForm() {

        clearErrors();
        hideAlert();

        const invalidFields = [];

        const fullName =
            getValue(fullNameInput);

        const email =
            getValue(emailInput);

        const phone =
            getValue(phoneInput);

        const businessName =
            getValue(businessNameInput);

        const website =
            getValue(websiteInput);

        const socialMedia =
            getValue(socialMediaInput);

        const audienceDescription =
            getValue(audienceInput);

        const partnershipReason =
            getValue(
                partnershipReasonInput
            );

        const referralStrategy =
            getValue(
                referralStrategyInput
            );

        if (!fullName) {

            if (fullNameError) {
                fullNameError.textContent =
                    "Enter your full name.";
            }

            invalidFields.push(
                fullNameInput
            );

        } else if (
            fullName.length < 2
        ) {

            if (fullNameError) {
                fullNameError.textContent =
                    "Enter at least 2 characters.";
            }

            invalidFields.push(
                fullNameInput
            );

        }

        if (!email) {

            if (emailError) {
                emailError.textContent =
                    "Enter your email address.";
            }

            invalidFields.push(
                emailInput
            );

        } else if (
            !isValidEmail(email)
        ) {

            if (emailError) {
                emailError.textContent =
                    "Enter a valid email address.";
            }

            invalidFields.push(
                emailInput
            );

        }

        if (
            website &&
            !isValidUrl(website)
        ) {

            if (websiteError) {
                websiteError.textContent =
                    "Enter a valid website address.";
            }

            invalidFields.push(
                websiteInput
            );

        }

        if (
            socialMedia &&
            !isValidUrl(socialMedia)
        ) {

            if (socialMediaError) {
                socialMediaError.textContent =
                    "Enter a valid social-media address.";
            }

            invalidFields.push(
                socialMediaInput
            );

        }

        if (!partnershipReason) {

            if (partnershipReasonError) {

                partnershipReasonError.textContent =
                    "Explain why you would like to join.";

            }

            invalidFields.push(
                partnershipReasonInput
            );

        } else if (
            partnershipReason.length < 20
        ) {

            if (partnershipReasonError) {

                partnershipReasonError.textContent =
                    "Please provide at least 20 characters.";

            }

            invalidFields.push(
                partnershipReasonInput
            );

        }

        if (!referralStrategy) {

            if (referralStrategyError) {

                referralStrategyError.textContent =
                    "Explain how you will introduce potential clients.";

            }

            invalidFields.push(
                referralStrategyInput
            );

        } else if (
            referralStrategy.length < 20
        ) {

            if (referralStrategyError) {

                referralStrategyError.textContent =
                    "Please provide at least 20 characters.";

            }

            invalidFields.push(
                referralStrategyInput
            );

        }

        if (!agreementInput?.checked) {

            if (agreementError) {

                agreementError.textContent =
                    "You must accept the application terms.";

            }

            invalidFields.push(
                agreementInput
            );

        }

        if (invalidFields.length > 0) {

            focusFirstInvalidField(
                invalidFields
            );

            return {
                isValid: false
            };

        }

        return {
            isValid: true,

            data: {
                applicant_full_name:
                    fullName,

                applicant_email:
                    email.toLowerCase(),

                applicant_phone:
                    phone || null,

                applicant_business_name:
                    businessName || null,

                applicant_website_url:
                    website
                        ? normalizeUrl(website)
                        : null,

                applicant_social_media_url:
                    socialMedia
                        ? normalizeUrl(
                            socialMedia
                        )
                        : null,

                applicant_audience_description:
                    audienceDescription || null,

                applicant_partnership_reason:
                    partnershipReason,

                applicant_referral_strategy:
                    referralStrategy
            }
        };

    }


    /* ======================================
       SUPABASE CONNECTION CHECK
    ====================================== */

    if (!supabaseClient) {

        console.error(
            "Echo Craft Supabase client is unavailable."
        );

        showAlert(
            "The secure application system could not be loaded. Please refresh the page."
        );

        if (submitButton) {
            submitButton.disabled = true;
        }

        return;

    }


    /* ======================================
       SUBMIT APPLICATION
    ====================================== */

    form?.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const validation =
                validateForm();

            if (!validation.isValid) {
                return;
            }

            setLoadingState(true);

            try {

                const turnstileToken =
    document.querySelector(
        '[name="cf-turnstile-response"]'
    )?.value || "";

if (!turnstileToken) {

    showAlert(
        "Complete the security verification before submitting."
    );

    window.turnstile?.reset();

    return;

}

const {
    data,
    error
} = await supabaseClient.functions.invoke(
    "submit-partner-application",
    {
        body: {
            ...validation.data,
            turnstile_token:
                turnstileToken,
            website_confirm:
                ""
        }
    }
);


                if (error) {
    throw error;
}

if (!data?.success) {

    throw new Error(
        data?.message ||
        "The application could not be submitted."
    );

}
                if (!data) {

                    throw new Error(
                        "No application confirmation was returned."
                    );

                }

                form.reset();
                clearErrors();

               showAlert(
    "Your application has been submitted successfully. Please watch your email for the next step. If your application is approved, you must use the activation link within 24 hours to create your password. Check your spam or junk folder if you do not see the email. If the link expires, contact Echo Craft administration for a new link.",
    "success"
);

                if (submitButton) {

                    submitButton.disabled = true;

                    window.setTimeout(() => {

                        submitButton.disabled = false;

                    }, 5000);

                }

            } catch (error) {

                console.error(
                    "Partner application submission failed:",
                    error
                );

                const errorMessage =
                    String(
                        error?.message || ""
                    ).toLowerCase();

                if (
                    errorMessage.includes(
                        "active application already exists"
                    )
                ) {

                    showAlert(
                        "An active application already exists for this email address. Echo Craft will contact you after it has been reviewed."
                    );

                } else if (
                    errorMessage.includes(
                        "full name"
                    )
                ) {

                    showAlert(
                        "Please review your full name and try again."
                    );

                } else if (
                    errorMessage.includes(
                        "email"
                    )
                ) {

                    showAlert(
                        "Please review your email address and try again."
                    );

                } else if (
                    errorMessage.includes(
                        "partnership reason"
                    )
                ) {

                    showAlert(
                        "Please provide more detail about why you would like to join."
                    );

                } else if (
                    errorMessage.includes(
                        "referral strategy"
                    )
                ) {

                    showAlert(
                        "Please provide more detail about how you will introduce potential clients."
                    );

                } else {

                    showAlert(
                        "Your application could not be submitted. Please review the form and try again."
                    );

                }

            } finally {

    setLoadingState(false);

    window.turnstile?.reset();

}

        }
    );

});
