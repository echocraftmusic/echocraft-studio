/* ==========================================
   EC Framework v1.0
   Main
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Current Year
    const year = document.querySelector("#year");

    if(year){
        year.textContent = new Date().getFullYear();
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", e => {

            const target = document.querySelector(link.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });

        });

    });

    // Submit the contact form without leaving the Echo Craft website.
    const contactForm = document.querySelector("#contactForm");
    const formStatus = document.querySelector("#formStatus");

    if(contactForm && formStatus){

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const defaultButtonText = submitButton?.textContent.trim() || "Start Your Project";

        contactForm.addEventListener("submit", async event => {

            event.preventDefault();

            formStatus.hidden = true;
            formStatus.classList.remove("isError");

            if(submitButton){
                submitButton.disabled = true;
                submitButton.textContent = "Sending...";
            }

            try {

                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: new FormData(contactForm),
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if(!response.ok){
                    throw new Error("Form submission failed");
                }

                contactForm.reset();
                formStatus.querySelector("h3").textContent = "✓ Thank You!";
                formStatus.querySelector("p").textContent =
                    "Your message has been sent. We'll be in touch soon.";
                formStatus.hidden = false;
                formStatus.focus({ preventScroll: true });

            } catch(error) {

                console.error("Contact form submission failed:", error);
                formStatus.classList.add("isError");
                formStatus.querySelector("h3").textContent = "Message Not Sent";
                formStatus.querySelector("p").textContent =
                    "Something went wrong. Please try again or email creating@echocraft.studio.";
                formStatus.hidden = false;
                formStatus.focus({ preventScroll: true });

            } finally {

                if(submitButton){
                    submitButton.disabled = false;
                    submitButton.textContent = defaultButtonText;
                }

            }

        });

    }

});
