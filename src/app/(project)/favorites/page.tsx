'use client'

import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import ChucksAppBar from "@/components/default/Navbar";
import { useState } from 'react';
import { FavoriteJokesList } from '@/components/jokes/FavoriteJokesList';
import { ColorTable } from '@/components/color/colorTable';
import { CatPicTable } from '@/components/cats/CatPicTable';

type FavoriteTabType = 'jokes' | 'cats' | 'colors';

export default function FavoritesPage() {
    const [activeTab, setActiveTab] = useState<FavoriteTabType>('jokes');

    const handleTabChange = (_event: React.SyntheticEvent, newValue: FavoriteTabType) => {
        setActiveTab(newValue);
    };

    return (
        <>
            <ChucksAppBar/>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    My Favorites
                </Typography>
                
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs 
                        value={activeTab} 
                        onChange={handleTabChange}
                        aria-label="favorites content tabs"
                    >
                        <Tab label="Chuck Norris Jokes" value="jokes" />
                        <Tab label="Cat Pictures" value="cats" />
                        <Tab label="Colors" value="colors" />
                    </Tabs>
                </Box>

                {activeTab === 'jokes' && <FavoriteJokesList />}
                {activeTab === 'cats' && <CatPicTable />}
                {activeTab === 'colors' && <ColorTable />}
            </Container>
        </>
    );
}