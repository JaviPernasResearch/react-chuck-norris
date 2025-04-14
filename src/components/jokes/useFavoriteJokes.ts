import { favoriteJokesState } from "@/state/favoriteJokesState";
import { FavoriteJoke } from "@/models/joke";
import { useAtom } from "jotai";


export const useFavoriteJokes = () => {
  const [favoriteJokesList, setfavoriteJokesList] = useAtom(favoriteJokesState);

  const handleAddFavorite = (FavoriteJoke: FavoriteJoke) => {
    setfavoriteJokesList((prev) => [...prev, FavoriteJoke]);
  };

  const handleRemoveFavorite = (id: string) => {
    const updatedJokes = favoriteJokesList.filter((joke) => joke.id !== id);
    setfavoriteJokesList(updatedJokes);
  };

  const isFavorite = (id: string) => {
    return favoriteJokesList.some(joke => joke.id === id);
  };


  return (
    {
      favoriteJokesList,
      handleAddFavorite,
      handleRemoveFavorite,
      isFavorite,
    }
    
  )
}
