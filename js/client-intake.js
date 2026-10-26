document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#clientIntakeForm");
    const submitButton = document.querySelector("#submitIntake");
    const errorMessage = document.querySelector("#intakeError");
    const formState = document.querySelector("#intakeFormState");
    const successState = document.querySelector("#intakeSuccessState");
    const supabaseClient = window.echoCraftSupabase;

    const value = selector =>
        document.querySelector(selector)?.value.trim() || null;

    const urlParameters =
        new URLSearchParams(window.location.search);

    const referralAlias =
        (
            urlParameters.get("ref") ||
            urlParameters.get("partner") ||
            localStorage.getItem(
                "echoCraftReferralAlias"
            ) ||
            ""
        )
        .trim()
        .toLowerCase();

    if (referralAlias) {
        localStorage.setItem(
            "echoCraftReferralAlias",
            referralAlias
        );
    }

    form?.addEventListener("submit", async event => {
        event.preventDefault();

        if (!supabaseClient) {
            errorMessage.textContent =
                "The secure form is temporarily unavailable.";
            errorMessage.hidden = false;
            return;
        }

        const challengeToken = form?.querySelector('[name="cf-turnstile-response"]')?.value?.trim();
        if (!challengeToken) {
            errorMessage.textContent = "Please complete the security verification.";
            errorMessage.hidden = false;
            return;
        }

        submitButton.disabled = true;
        submitButton.querySelector(".submitDefault").hidden = true;
        submitButton.querySelector(".submitLoading").hidden = false;
        errorMessage.hidden = true;

        const payload = {
            full_name: value("#fullName"),
            email: value("#email"),
            phone: value("#phone"),
            preferred_contact: value("#preferredContact"),
            business_name: value("#businessName"),
            website_url: value("#websiteUrl"),
            project_type: value("#projectType"),
            budget_range: value("#budgetRange"),
            desired_launch_date: value("#desiredLaunchDate"),
            project_description: value("#projectDescription"),
            reference_links: value("#referenceLinks")
        };

        try {
            const { data, error } = await supabaseClient.functions.invoke(
                "submit-client-intake",
                {
                    body: {
                        ...payload,
                        turnstile_token: challengeToken,
                        website_confirm: document.querySelector("#websiteConfirm")?.value || ""
                    }
                }
            );
            if (error) throw error;

            if (!data?.success) {
                throw new Error(
                    data?.message ||
                    "Submission was not confirmed."
                );
            }

            formState.hidden = true;
            successState.hidden = false;
            localStorage.removeItem(
                "echoCraftReferralAlias"
            );
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } catch (error) {
            console.error(
                "Client intake submission failed:",
                error
            );

            errorMessage.textContent =
                "Your information could not be submitted. Please try again or contact Echo Craft directly.";

            errorMessage.hidden = false;
        } finally {
            window.turnstile?.reset();
            submitButton.disabled = false;
            submitButton.querySelector(".submitDefault").hidden = false;
            submitButton.querySelector(".submitLoading").hidden = true;
        }
    });
});