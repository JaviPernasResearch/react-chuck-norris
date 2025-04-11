'use client'

import { Typography, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAtom } from 'jotai';
import { favoriteJokesState } from '@/state/favoriteJokesState';

export const FavoriteJokesList = () => {
    const [favoriteJokesList, setfavoriteJokesList] = useAtom(favoriteJokesState);
    
    const removeFavorite = (id: string) => {
        const updatedJokes = favoriteJokesList.filter((joke) => joke.id !== id);
        setfavoriteJokesList(updatedJokes);
    };

    if (favoriteJokesList.length === 0) {
        return (
            <Typography color="text.secondary">
                No favorite jokes yet. Add some from the home page!
            </Typography>
        );
    }

    return (
        <List>
            {favoriteJokesList.map((joke) => (
                <ListItem
                    key={joke.id}
                    sx={{
                        bgcolor: 'background.paper',
                        mb: 2,
                        borderRadius: 1,
                        boxShadow: 1,
                    }}
                    secondaryAction={
                        <IconButton 
                            edge="end" 
                            onClick={() => removeFavorite(joke.id)}
                            aria-label="delete"
                        >
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <Typography>{joke.value}</Typography>
                </ListItem>
            ))}
        </List>
    );
};