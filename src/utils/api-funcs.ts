import axios from "axios";
import type { YoutubeVideo, RedditPost } from "@/types/types";


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
        console.error('Error fetching the latest Youtube video:', error);
      }
    };


export async function fetchRedditData(subredditName: string) {
    try {
        const redditEndpoint = 'https://www.reddit.com/';
        const subredditEndpoint = `r/${subredditName}/`;
        const params = {
            sort: 'top',        // sort by top posts
            t: 'day',           // within the last day
            limit: 1            // limit to 1 result (the hottest post)
        };

        // Make GET request to Reddit API
        const response = await axios.get(`${redditEndpoint}${subredditEndpoint}top.json`, {
            params: params
        });

        // Extract the hottest post from the response
        const hottestPost = response.data.data.children[0].data; // access the first post in the top posts
// access the first post in the search results
  
          // Store information of latest reddit post as an object 
          const postDetails: RedditPost = {
            title: hottestPost.title,
            url: 'www.reddit.com' + hottestPost.permalink,
            thumbnail: hottestPost.thumbnail,
            author: hottestPost.author,
            subreddit: hottestPost.subreddit
          }

          return postDetails

      } catch (error) {
          console.error('Error fetching data from Reddit API:', error);
      }
  }