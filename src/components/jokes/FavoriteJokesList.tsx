'use client'

import { Typography, List, ListItem, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { AddCustomJoke } from './AddCustomJoke';
import { useFavoriteJokes } from './useFavoriteJokes';

export const FavoriteJokesList = () => {
    
    const {favoriteJokesList, handleAddFavorite,handleRemoveFavorite} = useFavoriteJokes();

    if (favoriteJokesList.length === 0) {
        return (
            <Typography color="text.secondary">
                No favorite jokes yet. Add some from the home page!
            </Typography>
        );
    }

    return (
        <>
            <AddCustomJoke onJokeAdd={handleAddFavorite} />
            
            {favoriteJokesList.length === 0 ? (
                <Typography color="text.secondary">
                    No favorite jokes yet. Add some Chuck Norris jokes or create your own!
                </Typography>
            ) : (
            <Box
                    sx={{
                        maxHeight: '60vh',
                        overflow: 'auto',
                        bgcolor: 'background.default',
                        borderRadius: 2,
                        boxShadow: 2,
                        p: 2,
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#888',
                            borderRadius: '4px',
                            '&:hover': {
                                background: '#555',
                            },
                        },
                    }}
                >
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
                                    <>
                                        {'isCustom' in joke ? (
                                            <EmojiEmotionsIcon
                                                sx={{ mr: 1, color: 'primary.main' }}
                                            />
                                        ) : (
                                            <SentimentSatisfiedIcon
                                                sx={{ mr: 1, color: 'secondary.main' }}
                                            />
                                        )}
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleRemoveFavorite(joke.id)}
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                            >
                                <Typography>{joke.value}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </>
    );
};