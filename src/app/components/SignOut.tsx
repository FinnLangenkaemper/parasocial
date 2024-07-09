'use client'

import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation";

export default function SignOut() {
    const router = useRouter()

    async function signOutUser() {
        const { error } = await supabase.auth.signOut();
        console.log("sign out user error", error);
        router.push("/login");
      }

    return (
        <button onClick={() => signOutUser()}>Sign out</button>
    )
}