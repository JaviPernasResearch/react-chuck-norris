import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import { FavoriteJokesList } from '@/components/jokes/FavoriteJokesList';
import { ColorTable } from '@/components/color/ColorTable';
import { CatPicTable } from '@/components/cats/CatPicTable';
import { CustomJokesList } from '@/components/jokes/CustomJokesList';
import { ChuckNorrisGifsTable } from '../gifs/ChuckNorrisGifsTable';

export type FavoriteTabType = 'favJokes' |'customJokes' | 'cats' | 'colors' | 'gifs';

interface FavoritesNavProps {
    activeTab: FavoriteTabType;
    onTabChange: (event: React.SyntheticEvent, newValue: FavoriteTabType) => void;
}

export const FavoritesNav = ({ activeTab, onTabChange }: FavoritesNavProps) => {
    
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    My Favorites
                </Typography>
                
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs 
                        value={activeTab} 
                        onChange={onTabChange}
                        aria-label="favorites content tabs"
                    >
                        <Tab label="Favorite Jokes" value="favJokes" />
                        <Tab label="Custom Jokes" value="customJokes" />
                        <Tab label="Colors" value="colors" />
                        <Tab label="Cat Pictures" value="cats" />
                        <Tab label="Chuck Norris Gifs" value="gifs" />
                    </Tabs>
                </Box>

                {activeTab === 'favJokes' && <FavoriteJokesList />}
                {activeTab === 'customJokes' && <CustomJokesList />}
                {activeTab === 'cats' && <CatPicTable />}
                {activeTab === 'colors' && <ColorTable />}
                {activeTab === 'gifs' && <ChuckNorrisGifsTable />}
        </Container>
        
    );
};