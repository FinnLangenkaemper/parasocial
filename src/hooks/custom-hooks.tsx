import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const useLoginRedirect = () => {
  const router = useRouter();

  useEffect(() => { 
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data.user);
        } else {
          router.push("/login");
          console.log("no user is logged in");
        }
      });
    }

    getUserData();
  }, [router]);
};
