import { creators } from "@/config/creators";
import { supabase } from "@/lib/supabase";
import { error } from "console";
import { useSubbedData } from "@/hooks/custom-hooks";
import { useState, useEffect } from "react";
import {
  checkSubscribed,
  handleSubscribe,
  handleUnsubscribe,
} from "@/utils/user-funcs";

const Following = ({ userId}: { userId: string | undefined }) => {
  const { subbedArr, loading, setLoading } = useSubbedData(userId)


  const handleSubscribe = async (creator: string, subbed: String[] | null, userId: string | undefined ) => {
    


    if(userId !== undefined && subbed !== null) {
        setLoading(true)
        const updatedSubbed = [...subbed, creator];

    const { error } = await supabase
      .from("users")
      .update({ subbed: updatedSubbed })
      .eq("user_id", userId);

    if (error) console.log(error);

    setLoading(false)
    } else {
        console.error('User is not logged in, cannot subscribe')
    }
  };


  //unsubscribes you from the creator 
  const handleUnsubscribe = async (creator: string, subbed: String[] | null, userId: string | undefined) => {

    if(userId !== undefined) { 
        setLoading(true)
        const updatedSubbed = subbed?.filter((item) => item !== creator);

        const { error } = await supabase
        .from("users")
        .update({ subbed: updatedSubbed })
        .eq("user_id", userId);

        if (error) console.log(error);
        setLoading(false)
    } else {
        console.error('User is not logged in, cannot unsubscribe')
    }
    
    
  };
  console.log(subbedArr)

  //checks if you are subbed to a creator
  const checkSubscribed = (creator: string, subbed: String[] | null) => {
    let isSubbed = false;
    subbedArr?.map((item) => {
      if (item === creator) {
        isSubbed = true;  
      }
    }); return isSubbed }

  return (
    <div className="">
      <h2 className="py-2">Supported Creators</h2>
      <div className="p-12 flex gap-4">
        {creators.map((item, index) => {
          const creator = item.creator;

          return (
            <button
              onClick={() => {
{}                checkSubscribed(creator, subbedArr)
                  ? handleUnsubscribe(creator, subbedArr, userId)
                  : handleSubscribe(creator, subbedArr, userId);
              }}
              className="border-2 p-2 rounded-lg"
              key={index}
            >
              {item.creator + " "}
              {checkSubscribed(creator, subbedArr) ? "subbed" : "not subbed"}
              {loading ? 'loading...' : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Following;
