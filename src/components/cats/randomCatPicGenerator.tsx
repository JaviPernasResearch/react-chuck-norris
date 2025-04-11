"use client";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {Box, Button, CircularProgress, Paper, Typography} from "@mui/material";
import { useCats } from "./useCats";
import { getRandomCatPic } from "@/utils/catPicsApi";
import { useQuery } from "@tanstack/react-query";


export const RandomCatPicGenerator = () => {

    const {addCatPic} = useCats();

    const { data, isLoading, refetch } = useQuery({
        ...getRandomCatPic(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const handleNewCat = () => {
        refetch();
    };

    const handleAddToFavorites = () => {
        if (data?.data) {
            addCatPic(data.data);
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
                <Typography variant="h6">Random Cat Picture</Typography>
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
                        data?.data && (
                            <Box
                                component="img"
                                src={data.data.url}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                                alt="Random cat"
                            />
                        )
                    )}
                </Box>
            </Paper>
            <Box
                sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}
            >
                <Button
                    onClick={handleNewCat}
                    variant="contained"
                    endIcon={<AutorenewIcon />}
                >
                    New Random Cat
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
