'use client'

import { Container, Typography, List, ListItem, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ChucksAppBar from "@/components/default/Navbar";
import { useAtom } from 'jotai';
import { favoriteJokesState } from '@/state/favoriteJokesState';

export default function FavoritesPage() {
    const [favoriteJokesList, setfavoriteJokesList] = useAtom(favoriteJokesState);
    
    const removeFavorite = (id: string) => {
        const updatedJokes = favoriteJokesList.filter((joke) => joke.id !== id);
        setfavoriteJokesList(updatedJokes);
    };

    return (
        <>
            <ChucksAppBar/>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    My Favorite Chuck Norris Jokes
                </Typography>
                {favoriteJokesList.length === 0 ? (
                    <Typography color="text.secondary">
                        No favorite jokes yet. Add some from the home page!
                    </Typography>
                ) : (
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
                )}
            </Container>
        </>
    );
}