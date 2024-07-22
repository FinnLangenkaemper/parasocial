"use client";
import { supabase } from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";


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
            appearance={{ 
                theme: ThemeSupa,
                variables: {
                    default: {
                      colors: {
                        brand: '#0FB800',
                        brandAccent: '#00CD14',
                        brandButtonText: 'black',
                        inputBorder: '#0FB800',
                        defaultButtonText: 'black',
                      },
                      radii: {
                        borderRadiusButton: '10px',
                        buttonBorderRadius: '10px',
                        inputBorderRadius: '10px',
                      }
                    },
            }}}
            theme="dark"
            providers={["google"]}
            view="sign_in"/>
        </div>
    )

};

export default Login;
