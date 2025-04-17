"use client";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {Box, Button, CircularProgress, Paper, Typography} from "@mui/material";
import { useFavoriteGifs } from "./useFavoriteGifs";
import { getRandomChuckNorrisGif } from "@/utils/chuckNorrisGifsApi";
import { useQuery } from "@tanstack/react-query";


export const RandomChuckNorrisGifGenerator = () => {

    const {handleAddChuckNorrisGif} = useFavoriteGifs();

    const { data, isLoading, refetch } = useQuery({
        ...getRandomChuckNorrisGif(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const handleNewGif = () => {
        refetch();
    };

    const handleAddToFavorites = () => {
        if (data) {
            handleAddChuckNorrisGif(data);
        }
    };
   
    return (
        <Box>
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 2,
                    width: 400,
                    height: 400,
                }}
            >
                <Typography variant="h6">Random Chuck Norris Gif</Typography>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        borderRadius: 12,
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                    }}
                >
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        data ? (
                            <Box
                                component="img"
                                src={data.gifUrl}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                                alt="Random Chuck Norris gif"
                            />
                        ) : null
                    )}
                </Box>
            </Paper>
            <Box
                sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}
            >
                <Button
                    onClick={handleNewGif}
                    variant="contained"
                    endIcon={<AutorenewIcon />}
                >
                    New Chuck Norris Gif
                </Button>
                <Button
                    onClick={handleAddToFavorites}
                    variant="outlined"
                    endIcon={<FavoriteBorderIcon />}
                    disabled={isLoading || !data}
                >
                    Add to Favorites
                </Button>
            </Box>
        </Box>
    );
};
