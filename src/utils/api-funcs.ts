import axios from "axios";
import type { YoutubeVideo } from "@/types/types";


export const fetchYoutubeData = async ( channelId: string) => {
      
      const key = 'AIzaSyBzlGDjJqAYuxLahs2l3Bshk87ELTgvAR0'

      try {
        const videoResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&key=${key}`
        ); //fetching youtube api video data
        const videoData = videoResponse.data.items[0];
      
        const videoUrl = `https://www.youtube.com/watch?v=${videoData.id.videoId}`

        const videoDetails: YoutubeVideo = {
          videoUrl: videoUrl,
          title: videoData.snippet.title,
          thumbnailUrl: videoData.snippet.thumbnails.high.url,
          channelName : videoData.snippet.channelTitle,
        };
        
        console.log('result from api call', videoDetails)
        return videoDetails 
      } catch (error) {
        console.error('Error fetching the latest video:', error);
      }
    };
