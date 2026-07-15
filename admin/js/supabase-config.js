<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="robots"
        content="noindex, nofollow, noarchive"
    >

    <title>Echo Craft Studio</title>

    <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
    >

    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
    >

    <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
    >

    <style>

        :root {
            --ec-black: #050505;
            --ec-panel: #151311;
            --ec-gold: #d4af37;
            --ec-gold-light: #efd477;
            --ec-white: #ffffff;
            --ec-text: #d8d4ce;
            --ec-muted: #9d978f;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            min-height: 100vh;

            display: grid;
            place-items: center;

            padding: 24px;

            background:
                radial-gradient(
                    circle at 50% 25%,
                    rgba(212, 175, 55, 0.12),
                    transparent 34%
                ),
                linear-gradient(
                    145deg,
                    #050505,
                    #0c0a08 52%,
                    #050505
                );

            color: var(--ec-white);

            font-family:
                "Inter",
                Arial,
                sans-serif;
        }

        .referralRouter {
            width: min(620px, 100%);

            padding: 50px 34px;

            border: 1px solid rgba(212, 175, 55, 0.22);
            border-radius: 26px;

            background:
                linear-gradient(
                    145deg,
                    rgba(24, 21, 18, 0.98),
                    rgba(9, 9, 8, 0.99)
                );

            text-align: center;

            box-shadow:
                0 34px 90px rgba(0, 0, 0, 0.58);
        }

        .referralRouterLogo {
            display: grid;
            place-items: center;

            width: 86px;
            height: 86px;

            margin: 0 auto 24px;

            border: 1px solid rgba(212, 175, 55, 0.24);
            border-radius: 24px;

            background: rgba(212, 175, 55, 0.07);
        }

        .referralRouterLogo img {
            width: 66px;
            height: 66px;

            object-fit: contain;
        }

        .referralEyebrow {
            margin-bottom: 12px;

            color: var(--ec-gold);

            font-size: 0.67rem;
            font-weight: 800;
            letter-spacing: 0.2em;
            text-transform: uppercase;
        }

        .referralRouter h1 {
            margin-bottom: 14px;

            font-family:
                "Cormorant Garamond",
                Georgia,
                serif;

            font-size: clamp(2.7rem, 8vw, 4.4rem);
            font-weight: 600;
            line-height: 0.95;
        }

        .referralRouter p {
            max-width: 470px;

            margin: 0 auto;

            color: var(--ec-muted);

            font-size: 0.86rem;
            line-height: 1.75;
        }

        .referralLoader {
            display: flex;
            justify-content: center;
            gap: 8px;

            margin: 28px 0 0;
        }

        .referralLoader span {
            width: 8px;
            height: 8px;

            border-radius: 50%;

            background: var(--ec-gold);

            animation:
                referralPulse
                1.1s
                ease-in-out
                infinite;
        }

        .referralLoader span:nth-child(2) {
            animation-delay: 0.16s;
        }

        .referralLoader span:nth-child(3) {
            animation-delay: 0.32s;
        }

        .referralHomeButton {
            display: none;
            align-items: center;
            justify-content: center;

            min-height: 48px;

            margin: 28px auto 0;
            padding: 0 24px;

            border: 1px solid var(--ec-gold);
            border-radius: 999px;

            background:
                linear-gradient(
                    135deg,
                    var(--ec-gold-light),
                    var(--ec-gold)
                );

            color: #111111;

            font-size: 0.78rem;
            font-weight: 800;
            text-decoration: none;
        }

        .referralRouter.isError
        .referralLoader {
            display: none;
        }

        .referralRouter.isError
        .referralHomeButton {
            display: inline-flex;
        }

        @keyframes referralPulse {

            0%,
            100% {
                opacity: 0.35;
                transform: translateY(0);
            }

            50% {
                opacity: 1;
                transform: translateY(-6px);
            }

        }

    </style>

</head>

<body>

    <main
        id="referralRouter"
        class="referralRouter"
    >

        <div class="referralRouterLogo">

            <img
                src="/images/branding/logos/ec-gold-logo.png"
                alt="Echo Craft Studio"
            >

        </div>

        <p class="referralEyebrow">
            Echo Craft Studio
        </p>

        <h1 id="referralRouterTitle">
            Connecting You
        </h1>

        <p id="referralRouterMessage">
            Verifying your referral link and preparing the Echo Craft experience.
        </p>

        <div
            id="referralLoader"
            class="referralLoader"
            aria-label="Loading"
        >

            <span></span>
            <span></span>
            <span></span>

        </div>

        <a
            id="referralHomeButton"
            class="referralHomeButton"
            href="/"
        >
            Return to Echo Craft Studio
        </a>

    </main>


    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

    <script src="/admin/js/supabase-config.js"></script>

    <script>

        document.addEventListener(
            "DOMContentLoaded",
            async () => {

                const router =
                    document.querySelector(
                        "#referralRouter"
                    );

                const title =
                    document.querySelector(
                        "#referralRouterTitle"
                    );

                const message =
                    document.querySelector(
                        "#referralRouterMessage"
                    );

                function showStandard404() {

                    router?.classList.add(
                        "isError"
                    );

                    if (title) {

                        title.textContent =
                            "Page Not Found";

                    }

                    if (message) {

                        message.textContent =
                            "The page you requested does not exist, or the referral link is no longer active.";

                    }

                    document.title =
                        "Page Not Found | Echo Craft Studio";

                }

                try {

                    const pathname =
                        decodeURIComponent(
                            window.location.pathname
                        );

                    const pathParts =
                        pathname
                            .split("/")
                            .filter(Boolean);

                    if (pathParts.length !== 1) {

                        showStandard404();

                        return;

                    }

                    const referralAlias =
                        String(pathParts[0] || "")
                            .trim()
                            .toLowerCase();

                    if (
                        referralAlias.length < 2 ||
                        referralAlias.length > 30 ||
                        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/
                            .test(referralAlias)
                    ) {

                        showStandard404();

                        return;

                    }

                    const supabaseClient =
                        window.echoCraftSupabase;

                    if (!supabaseClient) {

                        throw new Error(
                            "Supabase client is unavailable."
                        );

                    }

                    const {
                        data: referralResult,
                        error: referralError
                    } = await supabaseClient.rpc(
                        "resolve_partner_referral",
                        {
                            p_alias:
                                referralAlias,

                            p_referrer_url:
                                document.referrer || null,

                            p_user_agent:
                                navigator.userAgent || null
                        }
                    );

                    if (referralError) {

                        throw referralError;

                    }

                    if (
                        !referralResult ||
                        referralResult.success !== true
                    ) {

                        showStandard404();

                        return;

                    }

                    const referralRecord = {

                        partnerId:
                            referralResult.partner_id,

                        referralAlias:
                            referralResult.referral_alias,

                        referralCode:
                            referralResult.referral_code,

                        capturedAt:
                            new Date().toISOString()

                    };

                    window.localStorage.setItem(
                        "echoCraftReferral",
                        JSON.stringify(
                            referralRecord
                        )
                    );

                    document.cookie =
                        `echo_craft_referral=${encodeURIComponent(
                            referralResult.referral_alias
                        )}; Max-Age=2592000; Path=/; SameSite=Lax; Secure`;

                    if (title) {

                        title.textContent =
                            "Referral Confirmed";

                    }

                    if (message) {

                        message.textContent =
                            "Your referral has been recorded. Redirecting you to Echo Craft Studio.";

                    }

                    const destination =
                        String(
                            referralResult.destination_url ||
                            "/"
                        );

                    const safeDestination =
                        destination.startsWith("/") &&
                        !destination.startsWith("//")
                            ? destination
                            : "/";

                    const redirectUrl =
                        new URL(
                            safeDestination,
                            window.location.origin
                        );

                    redirectUrl.searchParams.set(
                        "ref",
                        referralResult.referral_alias
                    );

                    window.setTimeout(
                        () => {

                            window.location.replace(
                                redirectUrl.href
                            );

                        },
                        900
                    );

                } catch (error) {

                    console.error(
                        "Referral routing failed:",
                        error
                    );

                    showStandard404();

                }

            }
        );

    </script>

</body>

</html>
