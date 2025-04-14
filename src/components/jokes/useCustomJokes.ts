import { CustomJoke } from '@/models/joke';
import { favoriteJokesState } from '@/state/favoriteJokesState';
import { useAtom } from 'jotai';
import React from 'react'

export const useCustomJokes = () => {
    const [favoriteJokesList, setfavoriteJokesList] = useAtom(favoriteJokesState);
    
    const handleAddCustomJoke = (joke: CustomJoke) => {
        setfavoriteJokesList(prev => [...prev, joke]);
        };

        
  return (
    {handleAddCustomJoke}
  )
}

