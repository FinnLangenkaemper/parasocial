import { creators } from "@/config/creators";
import { supabase } from "@/lib/supabase";
import { error } from "console";
import { useState, useEffect } from "react";
import {
  checkSubscribed,
  handleSubscribe,
  handleUnsubscribe,
} from "@/utils/user-funcs";

const Following = ({ userId, subbed }: { userId: string | undefined, subbed: string[] }) => {

  const handleSubscribe = async (creator: string, subbed: string[], userId: string | undefined ) => {
    console.log(subbed)


    if(userId !== undefined) {
        const updatedSubbed = [...subbed, creator];

    const { error } = await supabase
      .from("users")
      .update({ subbed: updatedSubbed })
      .eq("user_id", userId);

    if (error) console.log(error);
    } else {
        console.error('User is not logged in, cannot subscribe')
    }
  };


  //unsubscribes you from the creator 
  const handleUnsubscribe = async (creator: string, subbed: string[], userId: string | undefined) => {

    if(userId !== undefined) { 
        const updatedSubbed = subbed.filter((item) => item !== creator);

        const { error } = await supabase
        .from("users")
        .update({ subbed: updatedSubbed })
        .eq("user_id", userId);

        if (error) console.log(error);
    } else {
        console.error('User is not logged in, cannot unsubscribe')
    }
    
    
  };

  //checks if you are subbed to a creator
  const checkSubscribed = (creator: string, subbed: string[]) => {
    let isSubbed = false;
    subbed.map((item) => {
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
                checkSubscribed(creator, subbed)
                  ? handleUnsubscribe(creator, subbed, userId)
                  : handleSubscribe(creator, subbed, userId);
              }}
              className="border-2 p-2 rounded-lg"
              key={index}
            >
              {item.creator + " "}
              {checkSubscribed(creator, subbed) ? "subbed" : "not subbed"}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Following;
