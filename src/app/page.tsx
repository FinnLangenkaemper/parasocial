"use client"

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import axios from "axios";
import creatorsData from '@/config/creators.json'
import type { YoutubeVideo } from "@/types/types";



const ytKey = 'AIzaSyDx7EuHw-2SF9fEd2cg1CtzDdNmAyuylww'
const ytUsername = creatorsData.xqc.youtube
const channelId = 'UCmDTrq0LNgPodDOFZiSbsww'

export default function Home() {
  const [ ytData, setYtData ] = useState<YoutubeVideo | null>(null)

  console.log(ytKey)

  useEffect(() => {
    const fetchLatestVideo = async () => {
      console.log('run')
      try {
        // Step 1: Get Channel ID
        
        console.log('channel id', channelId)

        
        // Step 2: Get Most Recent Video
        const videoResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&key=${ytKey}`
        );
        const videoData = videoResponse.data.items[0];
        const videoDetails: YoutubeVideo = {
          videoId: videoData.id.videoId,
          title: videoData.snippet.title,
          thumbnailUrl: videoData.snippet.thumbnails.high.url,
        };
        console.log(videoDetails)
        setYtData(videoDetails);
        fetchLatestVideo()
      } catch (error) {
        console.error('Error fetching the latest video:', error);
      }
    };

    

    const interval = setInterval(fetchLatestVideo, 50000); // 5 minutes

    return () => clearInterval(interval);
  }, []);


  /*const setCreatorContent = async () => {
    const { data, error } = await supabase
      .from('creators')
      .insert({
          youtube: ytData,
      })
  }*/

  return (
    <div>
      Hello
      {ytData?.title}
    </div>
  );
}
