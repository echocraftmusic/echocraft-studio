document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#clientIntakeForm");
    const submitButton = document.querySelector("#submitIntake");
    const errorMessage = document.querySelector("#intakeError");
    const formState = document.querySelector("#intakeFormState");
    const successState = document.querySelector("#intakeSuccessState");
    const supabaseClient = window.echoCraftSupabase;

    const value = selector => document.querySelector(selector)?.value.trim() || null;

    form?.addEventListener("submit", async event => {
        event.preventDefault();

        if (!supabaseClient) {
            errorMessage.textContent = "The secure form is temporarily unavailable.";
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
            reference_links: value("#referenceLinks"),
            lead_source: "website_intake",
            status: "lead",
            payment_status: "not_quoted"
        };

        try {
            const { error } = await supabaseClient
                .from("clients_leads")
                .insert(payload);

            if (error) throw error;

            formState.hidden = true;
            successState.hidden = false;
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            console.error("Client intake submission failed:", error);
            errorMessage.textContent = "Your information could not be submitted. Please try again or contact Echo Craft directly.";
            errorMessage.hidden = false;
        } finally {
            submitButton.disabled = false;
            submitButton.querySelector(".submitDefault").hidden = false;
            submitButton.querySelector(".submitLoading").hidden = true;
        }
    });
});