"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter()


    supabase.auth.onAuthStateChange(async (event) => {
        if(event !== "SIGNED_OUT") {
            console.log('signed in')
            router.push('/')
        } else {
            console.log('signed out')
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
            view="sign_up"/>
        </div>
    )

};

export default Login;
