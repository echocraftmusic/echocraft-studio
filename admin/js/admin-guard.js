/* ==========================================
   ECHO CRAFT CONTROL CENTER
   ADMIN DASHBOARD SECURITY GUARD
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    const supabaseClient = window.echoCraftSupabase;

    const loginUrl = new URL(
        "login.html",
        window.location.href
    ).href;


    /* ======================================
       PAGE VISIBILITY
    ====================================== */

    function revealDashboard() {

        document.documentElement.classList.remove(
            "adminAuthPending"
        );

        document.body?.classList.add(
            "adminAuthVerified"
        );

    }


    /* ======================================
       RETURN TO LOGIN
    ====================================== */

    async function returnToLogin(
        shouldSignOut = false
    ) {

        try {

            if (shouldSignOut && supabaseClient) {

                await supabaseClient.auth.signOut();

            }

        } catch (error) {

            console.error(
                "Unable to clear administrator session:",
                error
            );

        } finally {

            window.location.replace(loginUrl);

        }

    }


    /* ======================================
       VERIFY SUPABASE
    ====================================== */

    if (!supabaseClient) {

        console.error(
            "Echo Craft Supabase client is unavailable."
        );

        await returnToLogin(false);

        return;

    }


    /* ======================================
       VERIFY AUTHENTICATED USER
    ====================================== */

    try {

        const {
            data: userData,
            error: userError
        } = await supabaseClient.auth.getUser();

        if (
            userError ||
            !userData ||
            !userData.user
        ) {

            await returnToLogin(false);

            return;

        }


        /* ==================================
           VERIFY APPROVED ADMIN PROFILE
        ================================== */

        const {
            data: profile,
            error: profileError
        } = await supabaseClient
            .from("profiles")
            .select(
                "id, full_name, email, role, status"
            )
            .eq("id", userData.user.id)
            .maybeSingle();

        if (
            profileError ||
            !profile ||
            profile.role !== "admin" ||
            profile.status !== "approved"
        ) {

            if (profileError) {

                console.error(
                    "Unable to verify administrator profile:",
                    profileError
                );

            }

            await returnToLogin(true);

            return;

        }


        /* ==================================
           STORE VERIFIED ADMIN INFORMATION
        ================================== */

        window.echoCraftAdmin = {
            id: profile.id,
            fullName: profile.full_name,
            email: profile.email,
            role: profile.role,
            status: profile.status
        };


        /* ==================================
           REVEAL PROTECTED DASHBOARD
        ================================== */

        revealDashboard();


        /* ==================================
           WATCH FOR SESSION CHANGES
        ================================== */

        supabaseClient.auth.onAuthStateChange(
            (event, session) => {

                if (
                    event === "SIGNED_OUT" ||
                    !session
                ) {

                    window.location.replace(
                        loginUrl
                    );

                }

            }
        );

    } catch (error) {

        console.error(
            "Administrator authentication guard failed:",
            error
        );

        await returnToLogin(true);

    }

});