import { fetchYoutubeData, fetchRedditData } from "@/utils/api-funcs";
import { supabase } from "@/lib/supabase";
import { creators } from "@/config/creators";

export const setCreatorData = async () => {
    
    creators.map(async (creator: any, index: any) => {
        const youtubeData = await fetchYoutubeData(creator.youtube);
        const redditData = await fetchRedditData(creator.reddit)

        console.log(redditData)

        const { data, error } = await supabase
            .from("creators")
            .update({
                youtube: youtubeData,
                reddit: redditData,
            })
            .eq("id", index);

        if (data) console.log(data);
        if (error) console.log(error);
    })}
  
