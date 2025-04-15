import { favoriteJokesState } from "@/state/favoriteJokesState";
import { CreateFavoriteJoke } from "@/models/joke";
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
        console.error('Error details:', error);
        toast.error("Error loading favorite jokes");
      }
    };

    loadFavoriteJokes();
  }, [user, setFavoriteJokesList]);

  const handleAddFavorite = async (joke: CreateFavoriteJoke) => {
    if (!user) {
      
      toast.error("Please login to add favorites");
      return;
    }

    try {
      // Update Firestore
      const favoriteJoke = await favoriteJokesService.addFavoriteJoke(joke, user.uid);
      // Update local state
      setFavoriteJokesList((prev) => [...prev, favoriteJoke]);
      toast.success("Joke added to favorites");
    } catch (error) {
      console.error('Error details:', error);
      toast.error("Error adding to favorites");
    }
  };

  const handleRemoveFavorite = async (dataId: string) => {
    try {
      // Update Firestore
      await favoriteJokesService.removeFavoriteJoke(dataId);
      // Update local state
      const updatedJokes = favoriteJokesList.filter((joke) => joke.dataId !== dataId);
      setFavoriteJokesList(updatedJokes);
      toast.success("Joke removed from favorites");
    } catch (error) {;
      console.error('Error details:', error);
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