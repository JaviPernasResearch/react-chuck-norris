'use client'

import { Typography, List, ListItem, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCustomJoke } from './AddCustomJoke';
import { useFavoriteJokes } from './useFavoriteJokes';

export const CustomJokesList = () => {
    const {favoriteJokesList, handleAddFavorite, handleRemoveFavorite} = useFavoriteJokes();

    const customJokesList = favoriteJokesList.filter(joke => 'isCustom' in joke);

    if (customJokesList.length === 0) {
        return (
            <Typography color="text.secondary">
                "No custom jokes yet. Create some using the form!"
            </Typography>
        );
    }

    return (
        <>
            <AddCustomJoke onJokeAdd={handleAddFavorite} />
            
            {customJokesList.length === 0 ? (
                <Typography color="text.secondary">
                    "No custom jokes yet. Create some using the form!"
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
                    {customJokesList.map((joke) => (
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