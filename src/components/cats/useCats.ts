import { CatPic } from '@/models/catPic';
import { useAtom } from 'jotai';
import {catPicsState} from '@/state/catPicsState';

export const useCats = () => {
  const [catPicsList, setcatPicsList] = useAtom(catPicsState);

  const isSavedCatPic = (id: string): boolean => {
    return catPicsList.some(catPic => catPic.id === id);
  };

  const addCatPic = (catPic: CatPic) => {
    if (!isSavedCatPic(catPic.id)) {
      setcatPicsList((prev) => [...prev, catPic]);
    }
    return;

  };

  const removeCatPic = (id: string) => {
    setcatPicsList(prev => prev.filter(catPic => catPic.id !== id));
  };


  return (
    {
      catPicsList,
      addCatPic,
      removeCatPic,
      isSavedCatPic,
    }
  )
}
