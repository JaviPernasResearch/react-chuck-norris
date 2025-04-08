'use client'

import { Container, Typography, List, ListItem, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFavorites } from '@/context/FavoritesContext';
import ChucksAppBar from "@/components/default/Navbar";

export default function FavoritesPage() {
    //You're just destructuring the properties you need from the full context object. 
    // But yes — the context also includes addFavorite and isFavorite, so you could get them too
    const { favorites, removeFavorite } = useFavorites();

    return (
        <>
            <ChucksAppBar/>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    My Favorite Chuck Norris Jokes
                </Typography>
                {favorites.length === 0 ? (
                    <Typography color="text.secondary">
                        No favorite jokes yet. Add some from the home page!
                    </Typography>
                ) : (
                    <List>
                        {favorites.map((joke) => (
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