import { useAtom } from 'jotai';
import { colorsState } from '@/state/colorsState';
import { useAuth } from '@/context/AuthContext';
import { favoriteColorsService } from '@/services/favoriteColorsService';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { CreateFavoriteColor } from '@/models/randomColor';

export const useFavoriteColors = () => {
  const [colorsList, setColorsList] = useAtom(colorsState);
  const { user } = useAuth();

  useEffect(() => {
    const loadFavoriteColors = async () => {
      if (!user) return;
      try {
        const colors = await favoriteColorsService.getFavoriteColors(user.uid);
        setColorsList(colors);
      } catch (error) {
        console.error('Error details:', error);
        toast.error("Error loading favorite colors");
      }
    };

    loadFavoriteColors();
  }, [user, setColorsList]);

  const isSavedColor = (hex: string): boolean => {
    return colorsList.some(color => color.hex === hex);
  };

  const handleAddColor = async (color: CreateFavoriteColor) => {
    if (!user) {
      toast.error("Please login to add favorites");
      return;
    }

    if (!isSavedColor(color.hex)) {
      try {
        // Add to Firestore
        const savedColor = await favoriteColorsService.addFavoriteColor(color, user.uid);
        // Update local state
        setColorsList((prev) => [...prev, savedColor]);
        toast.success("Color added to favorites");
      } catch (error) {
        console.error('Error details:', error);
        toast.error("Error adding color to favorites");
      }
    }
  };

  const handleRemoveColor = async (dataId: string) => {
    if (!user) return;

    try {
      // Remove from Firestore
      await favoriteColorsService.removeFavoriteColor(dataId);
      // Update local state
      setColorsList(prev => prev.filter(color => color.dataId !== dataId));
      toast.success("Color removed from favorites");
    } catch (error) {
      console.error('Error details:', error);
      toast.error("Error removing color from favorites");
    }
  };
  
  return {
    colorsList,
    handleAddColor,
    handleRemoveColor,
    isSavedColor,
  };
};