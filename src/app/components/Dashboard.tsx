import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VideoCard from "./VideoCard";
import { useSubbedData } from "@/hooks/custom-hooks";

const Dashboard = ({ userId  }: { userId: string | undefined  }) => {
  const { subbedArr } = useSubbedData(userId)  
  
  const [creatorData, setCreatorData]: any = useState();

  console.log('hello')
  //fetches youtube data for subbed creators
useEffect(() => {
    const fetchVideoData = async () => {
      if(subbedArr){
      if (subbedArr.length > 0) {
        const promises = subbedArr.map(async (creator) => {
          const { data, error } = await supabase
            .from('creators')
            .select('creator, youtube')
            .eq('creator', creator);


          if (error) {
            console.log(`Error while fetching video data for ${creator}`, error);
            return null
          }
          return data[0];
        });

        const results = await Promise.all(promises);
        setCreatorData(results.filter(Boolean)); // Remove null results
      }
    };}

    fetchVideoData();
  }, [subbedArr]); 

  if(creatorData) console.log(creatorData)

  return (
    <div className="py-6">
      <h1 className="py-4">Dashboard</h1>
      <div className='flex gap-12'>
        {creatorData !== undefined &&
          creatorData.map((data: any, index: number) => {
            return <VideoCard key={index} creator={data.creator} url={data.youtube.videoUrl} thumbnail={data.youtube.thumbnailUrl} title={data.youtube.title}/>
          })
        }
      </div>
    </div>
  );
};

export default Dashboard;
