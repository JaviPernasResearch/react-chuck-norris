import { ChuckNorrisGif } from "@/models/chuckNorrisGif";
import { QueryData } from "@/models/queryData";
import axios from "axios";
import { toast } from "sonner";

const TENOR_API = "https://g.tenor.com/v1/search";
const TENOR_API_KEY = "LIVDSRZULELA"; // <- insert your actual key here


const CHUCK_QUERIES = [
  "Chuck Norris",
  "Chuck Norris meme",
  "Chuck Norris karate",
  "Chuck Norris funny"
];

const getRandomQuery = () => 
  CHUCK_QUERIES[Math.floor(Math.random() * CHUCK_QUERIES.length)];

const _getRandomChuckNorrisGif = async (): Promise<ChuckNorrisGif>  => {
  try {
    console.log("HOLA MUNDO")
    const res = await axios.get(TENOR_API, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        q: getRandomQuery(),
        key: TENOR_API_KEY,
        limit: 1,
        media_filter: "minimal",
        pos: Math.floor(Math.random() * 50), // Random position to get different results
      },
    });

      // Get a random result from the array
      // const randomIndex = Math.floor(Math.random() * res.data.results.length);
      const raw = res.data.results[0];
  
  
      const gif: ChuckNorrisGif = {
        id: raw.id,
        description: raw.content_description,
        gifUrl: raw.media[0].gif.url,
        previewUrl: raw.media[0].gif.preview,
        pageUrl: raw.itemurl,
      };

    // gif.url is the full-resolution version (may be heavy).
    // mediumgif.url is optimized for most cases.
    // tinygif.url works great in compact UIs.
  
      return gif;
    } catch (error) {
      console.error(error);
      toast.error("Error getting Chuck Norris GIF");
      throw error;
    }
  };
    
  export const getRandomChuckNorrisGif = (): QueryData<ChuckNorrisGif> => ({
    queryKey: ["randomChuckNorrisGif"],
    queryFn: () => _getRandomChuckNorrisGif(),
  });