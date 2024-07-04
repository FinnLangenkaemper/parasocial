import { fetchYoutubeData } from "@/utils/api-funcs";
import { supabase } from "@/lib/supabase";
import { creators } from "@/config/creators";

export const setCreatorData = async () => {
    
    creators.map(async (creator: any, index: any) => {
        const youtubeData = await fetchYoutubeData(creator.youtube);

        const { data, error } = await supabase
            .from("creators")
            .update({
                youtube: youtubeData,
            })
            .eq("id", index);

        if (data) console.log(data);
        if (error) console.log(error);
    })}
  
