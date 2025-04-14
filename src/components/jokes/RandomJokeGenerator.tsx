import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Box, Button, Paper, Skeleton, Typography, IconButton} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getRandomJoke} from "@/utils/jokesApi";
import {CreateFavoriteJoke} from "@/models/joke";
import { useFavoriteJokes } from "./useFavoriteJokes";


export const RandomJoke: React.FC<{ variant?: '404' }> = ({ variant }) => {
    
    const {isFavorite, handleAddFavorite, handleRemoveFavorite} = useFavoriteJokes();

    const {isLoading, data, refetch} = useQuery({
        ...getRandomJoke(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const onNewJokeButton = () => {
        refetch();
    };

    const handleFavoriteClick = () => {
        if (!data?.data) return;
        
        const joke: CreateFavoriteJoke = {
            id : data.data.id,
            value: data.data.value,
            isCustom: false
        };
        
        if (isFavorite(joke.id)) {
            handleRemoveFavorite(joke.id);
        } else {
            handleAddFavorite(joke);
        }
    };

    if (variant === '404') {
        return (
            <Box>
                <Paper sx={{padding: 2, maxWidth: 600, margin: 'auto'}}>
                    {isLoading ? (
                        <Skeleton sx={{width: "100%"}}/>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography>{data?.data.value}</Typography>
                        </Box>
                    )}
                </Paper>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                        onClick={onNewJokeButton}
                        variant="contained"
                        color="secondary"
                        endIcon={<AutorenewIcon/>}
                    >
                        New Joke
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <Box>
            <Paper sx={{padding: 2, width: 600}}>
                {isLoading ? (
                    <Skeleton sx={{width: "100%"}}/>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography>{data?.data.value}</Typography>
                        <IconButton onClick={handleFavoriteClick} color="primary">
                            {data?.data && isFavorite(data.data.id) ? 
                                <FavoriteIcon /> : 
                                <FavoriteBorderIcon />
                            }
                        </IconButton>
                    </Box>
                )}
            </Paper>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row-reverse",
                    marginTop: 2,
                }}
            >
                <Button
                    onClick={onNewJokeButton}
                    variant="contained"
                    endIcon={<AutorenewIcon/>}
                >
                    New Joke
                </Button>
            </Box>
        </Box>
    );
};
