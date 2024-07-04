"use client"

import { supabase } from "@/lib/supabase";
import { setCreatorData } from "@/scripts/populateDbRunner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [ user, setUser ] = useState({})

  useEffect(() => {
    console.log('reload')
      async function getUserData() {
          await supabase.auth.getUser().then((value) => {
              if(value.data?.user) {
                  console.log(value.data.user)
                  setUser(value.data.user)
              } else {
                console.log('no user is logged in')
              }
          })
      }

      getUserData()
  }, [])


    async function signOutUser() {
        console.log(user)
        const { error } = await supabase.auth.signOut()
        console.log('sign out user error', error )
        setTimeout(() => router.push('/login'), 200)
    }

  useEffect(() => {
    const interval = setInterval(() => {
      setCreatorData();
    }, 180 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []); 

  return (
    <div>
      <h1>
        Dashboard
      </h1>
      <button onClick={() => signOutUser()}>
        sign out
      </button>
    </div>
  );
}
