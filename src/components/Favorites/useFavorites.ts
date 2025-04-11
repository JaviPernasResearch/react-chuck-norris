import { favoriteJokesState } from "@/state/favoriteJokesState";
import { FavoriteJoke } from "@/models/joke";
import { useAtom } from "jotai";


export const useFavorites = () => {
  const [favoriteJokesList, setfavoriteJokesList] = useAtom(favoriteJokesState);

  const addFavorite = (FavoriteJoke: FavoriteJoke) => {
          setfavoriteJokesList((prev) => [...prev, FavoriteJoke]);
      };
  
    const removeFavorite = (id: string) => {
        const updatedJokes = favoriteJokesList.filter((joke) => joke.id !== id);
        setfavoriteJokesList(updatedJokes);
    };
    
    const isFavorite = (id: string) => {
          return favoriteJokesList.some(joke => joke.id === id);
    };


  return (
    {
      favoriteJokesList,
      addFavorite,
      removeFavorite,
      isFavorite,
    }
    
  )
}
