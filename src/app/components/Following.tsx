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
