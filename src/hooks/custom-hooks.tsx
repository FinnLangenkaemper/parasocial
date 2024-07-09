import { useEffect, useState } from "react";
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
export const useSubbedData = (userId: string | undefined) => {
  const [ subbedArr, setSubbedArr ] = useState<String[] | null>(null)
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    const checkedSubbed = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("subbed")
        .eq("user_id", userId);

      if (error) {
        console.log("error while checking subbed", error);
      }

      if (data && data[0] !== undefined) {
          const subbed = data[0].subbed;
          console.log(subbed)
          setSubbedArr(subbed)
      }
    };

    if(userId !== undefined) { //only runs once user id has been established
       checkedSubbed()
    }

  }, [loading])

  return { subbedArr, loading, setLoading }
}
