"use client";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {Box, Button, Paper, Typography} from "@mui/material";
import {useState} from "react";
import {useAtom} from "jotai";
import {colorsState} from "@/state/colorsState";
import { RandomColor } from "@/models/randomColor";
import { v4 as uuidv4 } from 'uuid';
import { useFavoriteColors } from "./useFavoriteColors";

export const RandomColorGenerator: React.FC = () => {
    const [currentColor, setCurrentColor] = useState(getRandomColor());
    
    const onNewRandomColor = () => {
        setCurrentColor(getRandomColor());
    };

    const {handleAddColor} = useFavoriteColors();

    const handleAddToFavorites = () => {
        if (currentColor) {
            handleAddColor(currentColor);
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
                <Typography variant="h6">{`Random Color ${currentColor.hex}`}</Typography>
                <Box
                    sx={{
                        backgroundColor: currentColor.hex,
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        borderRadius: 12,
                    }}
                />
            </Paper>
            <Box
                sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}
            >
                <Button
                    onClick={onNewRandomColor}
                    variant="contained"
                    endIcon={<AutorenewIcon />}
                >
                    New Random Color
                </Button>
                <Button
                    onClick={handleAddToFavorites}
                    variant="outlined"
                    endIcon={<FavoriteBorderIcon />}
                >
                    Add Color to List
                </Button>
            </Box>
        </Box>
    );
};

function getRandomColor(): RandomColor {
    const letters = "0123456789ABCDEF";
    let hex = "#";
    for (let i = 0; i < 6; i++) {
        hex += letters[Math.floor(Math.random() * 16)];
    }

    //Create Random Color object
    const color: RandomColor = {
        id: uuidv4(),
        hex: hex,
    };
    return color;
}
