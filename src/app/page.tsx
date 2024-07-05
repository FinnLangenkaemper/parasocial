"use client";

import { supabase } from "@/lib/supabase";
import { setCreatorData } from "@/scripts/populateDbRunner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginRedirect } from "@/hooks/login-redirect";
import Dashboard from "./components/Dashboard";
import type { User } from "@supabase/supabase-js";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("reload");
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data.user);
          let userData = value.data.user
          setUser(userData);

          console.log(user)

          const populateUsers = async () => {
            const { error } = await supabase
            .from("users")
            .insert({ user_id: userData.id });

            if(error) console.log("populate users error", error)
          }
          populateUsers()
         
        } else {
          router.push("/login");
          console.log("no user is logged in");
        }
      });
    }

    getUserData();
  }, [router]);

  console.log(user)

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    console.log("sign out user error", error);
    router.push("/login");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCreatorData();
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Dashboard userId={user?.id}/>
      <button onClick={() => signOutUser()}>sign out</button>
    </div>
  );
}
