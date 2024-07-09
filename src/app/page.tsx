"use client"

import { supabase } from "@/lib/supabase";
import { setCreatorData } from "@/scripts/populateDbRunner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import Following from "./components/Following";
import Dashboard from "./components/Dashboard"

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [ loading, setLoading ] =  useState(false) 
  const router = useRouter();

 /*useEffect(() => {
    const checkedSubbed = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("users")
        .select("subbed")
        .eq("user_id", user?.id);

      if (error) {
        console.log("error while checking subbed", error);
      }

      if (data && data[0] !== undefined) {
          const subbed = data[0].subbed;
          setLoading(false)
          setSubbedArr(subbed)
      }
    };

    if(user?.id) { //only runs once user id has been established
       checkedSubbed()
    }

  }, [user?.id]);*/

  //if(subbedArr) console.log(subbedArr)



  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data.user);
          let userData = value.data.user;
          setUser(userData);

          const checkUserExists = async() => {
            const { data, error } = await supabase
              .from('users')
              .select('user_id')
              .eq('user_id', userData.id)

          if(error || data![0] === undefined) {  const populateUsers = async () => {
              const { error } = await supabase
                .from("users")
                .insert({ user_id: userData.id, subbed: [] });

              if (error) console.log("populate users error", error);
            };
            populateUsers();}
          }
           

           checkUserExists()
          

        } else {
          router.push("/login");
          console.log("no user is logged in");
        }
      });
    }

    getUserData();
    console.log(user?.id)
  }, [router]);


  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    console.log("sign out user error", error);
    router.push("/login");
  }

  /*useEffect(() => {
    const interval = setInterval(() => {
      setCreatorData();
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);*/

  return (
    <>
    {user?.id ?  (
      <div>
        
        <h1> {user?.email} </h1>
        <Following userId={user?.id}/>
        <Dashboard userId={user?.id}/>
        <button onClick={() => signOutUser()}>sign out</button>
      </div>) : null}
    
    </>

  );
}
