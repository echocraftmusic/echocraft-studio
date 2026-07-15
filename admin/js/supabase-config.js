/* ==========================================
   ECHO CRAFT CONTROL CENTER
   SUPABASE CONFIGURATION
========================================== */

/*
 * This file uses Echo Craft's public
 * Supabase project URL and publishable key.
 *
 * Never place a secret key or service-role
 * key inside this public website file.
 */

const ECHO_CRAFT_SUPABASE_URL =
    "https://jryqukxridujdqfuqinz.supabase.co";

const ECHO_CRAFT_SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_1Uyu1Lfzwolx26MvLEHbQg_NXNHzTLW";


/* ==========================================
   CREATE SUPABASE CLIENT
========================================== */

if (
    !window.supabase ||
    typeof window.supabase.createClient !== "function"
) {

    throw new Error(
        "Supabase library failed to load."
    );

}

window.echoCraftSupabase =
    window.supabase.createClient(
        ECHO_CRAFT_SUPABASE_URL,
        ECHO_CRAFT_SUPABASE_PUBLISHABLE_KEY,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            }
        }
    );
    