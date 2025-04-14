import { favoriteJokesState } from "@/state/favoriteJokesState";
import { FavoriteJoke } from "@/models/joke";
import { useAtom } from "jotai";
import { useAuth } from "@/context/AuthContext";
import { favoriteJokesService } from "@/services/favoriteJokesService";
import { useEffect } from "react";
import { toast } from "sonner";

export const useFavoriteJokes = () => {
  const [favoriteJokesList, setFavoriteJokesList] = useAtom(favoriteJokesState);
  const { user } = useAuth();

  // Load jokes from Firestore on initial mount
  useEffect(() => {
    const loadFavoriteJokes = async () => {
      if (!user) return;
      try {
        const jokes = await favoriteJokesService.getFavoriteJokes(user.uid);
        setFavoriteJokesList(jokes);
      } catch (error) {
        toast.error("Error loading favorite jokes");
      }
    };

    loadFavoriteJokes();
  }, [user]);

  const handleAddFavorite = async (favoriteJoke: FavoriteJoke) => {
    if (!user) {
      
      toast.error("Please login to add favorites");
      return;
    }

    try {
      // Update Firestore
      await favoriteJokesService.addFavoriteJoke({
        ...favoriteJoke,
        userId: user.uid
      });
      // Update local state
      setFavoriteJokesList((prev) => [...prev, favoriteJoke]);
      toast.success("Joke added to favorites");
    } catch (error) {
      console.error('Error details:', error);
      toast.error("Error adding to favorites");
    }
  };

  const handleRemoveFavorite = async (id: string) => {
    try {
      // Update Firestore
      await favoriteJokesService.removeFavoriteJoke(id);
      // Update local state
      const updatedJokes = favoriteJokesList.filter((joke) => joke.id !== id);
      setFavoriteJokesList(updatedJokes);
      toast.success("Joke removed from favorites");
    } catch (error) {
      toast.error("Error removing from favorites");
    }
  };

  const isFavorite = (id: string) => {
    return favoriteJokesList.some(joke => joke.id === id);
  };

  return {
    favoriteJokesList,
    handleAddFavorite,
    handleRemoveFavorite,
    isFavorite,
  };
};