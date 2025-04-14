import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { CreateFavoriteJoke, FavoriteJoke } from '@/models/joke';

interface AddCustomJokeProps {
    onJokeAdd: (joke: CreateFavoriteJoke) => void;
}

export const AddCustomJoke: React.FC<AddCustomJokeProps> = ({ onJokeAdd }) => {
    const [jokeText, setJokeText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!jokeText.trim()) return;

        const newJoke: CreateFavoriteJoke = {
            id: uuidv4(),
            value: jokeText.trim(),
            isCustom: true,
        };

        onJokeAdd(newJoke);
        setJokeText('');
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mb: 4, display: 'flex', gap: 2 }}
        >
            <TextField
                fullWidth
                label="Enter your own joke"
                value={jokeText}
                onChange={(e) => setJokeText(e.target.value)}
                multiline
                rows={2}
            />
            <Button 
                type="submit"
                variant="contained"
                disabled={!jokeText.trim()}
                sx={{ alignSelf: 'stretch' }}
            >
                Add Joke
            </Button>
        </Box>
    );
};