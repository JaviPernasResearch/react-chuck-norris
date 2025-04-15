import { CreateFavoriteCatPic } from '@/models/catPic';
import { useAtom } from 'jotai';
import {catPicsState} from '@/state/catPicsState';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { favoriteCatsService } from '@/services/favoriteCatPicsService';
import { toast } from 'sonner';

export const useFavoriteCats = () => {
  const [catPicsList, setCatPicsList] = useAtom(catPicsState);
  const { user } = useAuth();

  // Load cats from Firestore on initial mount
  useEffect(() => {
    const loadFavoriteCatPics = async () => {
      if (!user) return;
      try {
        const cats = await favoriteCatsService.getFavoriteCats(user.uid);
        setCatPicsList(cats);
      } catch (error) {
        console.error('Error details:', error);
        toast.error("Error loading favorite cats");
      }
    };

    loadFavoriteCatPics();
  }, [user, setCatPicsList]);

  const isSavedCatPic = (id: string): boolean => {
    return catPicsList.some(catPic => catPic.id === id);
  };

  const handleAddCatPic = async (catPic: CreateFavoriteCatPic) => {
    if (!user) {
      toast.error("Please login to add favorites");
      return;
    }

    if (!isSavedCatPic(catPic.id)) {
      try {
        // Add to Firestore
        const savedCatPic = await favoriteCatsService.addFavoriteCat(catPic, user.uid);
        // Update local state
        setCatPicsList((prev) => [...prev, savedCatPic]);
        toast.success("Cat added to favorites");
      } catch (error) {
        console.error('Error details:', error);
        toast.error("Error removing cat from favorites");
      }
    }
  };

  const handleRemoveCatPic = async (dataId: string) => {
    if (!user) return;

    try {
      // Remove from Firestore
      await favoriteCatsService.removeFavoriteCat(dataId);
      // Update local state
      setCatPicsList(prev => prev.filter(catPic => catPic.dataId !== dataId));
      toast.success("Cat removed from favorites");
    } catch (error) {
      console.error('Error details:', error);
      toast.error("Error removing cat from favorite");    }
  };


  return (
    {
      catPicsList,
      handleAddCatPic,
      handleRemoveCatPic
    }
  )
}
