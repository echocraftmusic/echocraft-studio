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
            const {
                data,
                error
            } = await supabaseClient.rpc(
                "submit_client_intake",
                {
                    p_full_name:
                        payload.full_name,

                    p_email:
                        payload.email,

                    p_phone:
                        payload.phone,

                    p_preferred_contact:
                        payload.preferred_contact,

                    p_business_name:
                        payload.business_name,

                    p_website_url:
                        payload.website_url,

                    p_project_type:
                        payload.project_type,

                    p_budget_range:
                        payload.budget_range,

                    p_desired_launch_date:
                        payload.desired_launch_date,

                    p_project_description:
                        payload.project_description,

                    p_reference_links:
                        payload.reference_links,

                    p_referral_alias:
                        referralAlias || null
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
            submitButton.disabled = false;
            submitButton.querySelector(".submitDefault").hidden = false;
            submitButton.querySelector(".submitLoading").hidden = true;
        }
    });
});