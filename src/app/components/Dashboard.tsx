import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VideoCard from "./VideoCard";

const Dashboard = ({ userId, subbed }: { userId: string | undefined, subbed: string[] }) => {
  const [creatorData, setCreatorData]: any = useState();

  console.log('hello')
  //fetches youtube data for subbed creators
useEffect(() => {
    const fetchVideoData = async () => {
      if (subbed.length > 0) {
        const promises = subbed.map(async (creator) => {
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
    };

    fetchVideoData();
  }, [subbed]); 

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
