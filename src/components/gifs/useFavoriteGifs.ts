import { CreateFavoriteChuckNorrisGif } from '@/models/chuckNorrisGif';
import { useAtom } from 'jotai';
import {chuckNorrisGifsState} from '@/state/chuckNorrisGifsState';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { favoriteChuckNorrisGifService } from '@/services/favoriteChuckNorrisGifService';
import { toast } from 'sonner';

export const useFavoriteGifs = () => {
  const [chuckNorrisGifsList, setchuckNorrisGifsList] = useAtom(chuckNorrisGifsState);
  const { user } = useAuth();

  // Load gifs from Firestore on initial mount
  useEffect(() => {
    const loadFavoriteChuckNorrisGifs = async () => {
      if (!user) return;
      try {
        const gifs = await favoriteChuckNorrisGifService.getFavoriteChuckNorrisGifs(user.uid);
        setchuckNorrisGifsList(gifs);
      } catch (error) {
        console.error('Error details:', error);
        toast.error("Error loading favorite Chuck Norris gifs");
      }
    };

    loadFavoriteChuckNorrisGifs();
  }, [user, setchuckNorrisGifsList]);

  const isSavedChuckNorrisGif = (id: string): boolean => {
    return chuckNorrisGifsList.some(chuckGif => chuckGif.id === id);
  };

  const handleAddChuckNorrisGif = async (chuckGif: CreateFavoriteChuckNorrisGif) => {
    if (!user) {
      toast.error("Please login to add favorites");
      return;
    }

    if (!isSavedChuckNorrisGif(chuckGif.id)) {
      try {
        // Add to Firestore
        const savedChuckGif = await favoriteChuckNorrisGifService.addFavoriteChuckNorrisGifs(chuckGif, user.uid);
        // Update local state
        setchuckNorrisGifsList((prev) => [...prev, savedChuckGif]);
        toast.success("Gif added to favorites");
      } catch (error) {
        console.error('Error details:', error);
        toast.error("Error removing gif from favorites");
      }
    }
  };

  const handleRemoveChuckNorrisGif = async (dataId: string) => {
    if (!user) return;

    try {
      // Remove from Firestore
      await favoriteChuckNorrisGifService.removeFavoriteChuckNorrisGif(dataId);
      // Update local state
      setchuckNorrisGifsList(prev => prev.filter(chuckGif => chuckGif.dataId !== dataId));
      toast.success("Gif removed from favorites");
    } catch (error) {
      console.error('Error details:', error);
      toast.error("Error removing gif from favorite");    }
  };


  return (
    {
      chuckNorrisGifsList,
      handleAddChuckNorrisGif,
      handleRemoveChuckNorrisGif
    }
  )
}
