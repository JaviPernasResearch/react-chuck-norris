import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

export const FavoritesNav = ({ onTabChange }: { onTabChange: (tab: 'jokes' | 'cats') => void }) => {
    const [value, setValue] = useState<'jokes' | 'cats'>('jokes');

    const handleChange = (event: React.SyntheticEvent, newValue: 'jokes' | 'cats') => {
        setValue(newValue);
        onTabChange(newValue);
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Favorite Jokes" value="jokes" />
                <Tab label="Favorite Cats" value="cats" />
            </Tabs>
        </Box>
        
    );
};