"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { fetchRedditData } from "@/utils/api-funcs";

const Login = () => {
    const router = useRouter()

    supabase.auth.onAuthStateChange(async (event) => {
        console.log(event)
        if(event === "SIGNED_IN") { 
            router.push('/')
        } else {
            router.push('/login')
        }
    })


    return (
        <div className="auth w-[400px]">
            <Auth 
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa}}
            theme="dark"
            providers={["github", "google"]}
            view="sign_in"/>
        </div>
    )

};

export default Login;
