"use client"

import ChucksAppBar from '@/components/default/Navbar'
import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import {ChuckNorrisGifsTable} from '@/components/gifs/ChuckNorrisGifsTable'
import {RandomChuckNorrisGifGenerator} from "@/components/gifs/RandomChuckNorrisGifGenerator";
import { useAuthRedirect } from '@/components/auth/useAuthRedirect'

export default function GifsPage() {

    useAuthRedirect();

    return (
    <>
        <ChucksAppBar/>
            <Box
                sx={{
                    display: "flex",
                    height: (theme) =>
                        `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h1">Random Gifs</Typography>
                    <Box
                        sx={{
                            my: 4,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <RandomChuckNorrisGifGenerator/>
                    </Box>
                </Container>
                <Box sx={{display: "flex", minHeight: "100%"}}>
                    <ChuckNorrisGifsTable/>
                </Box>
            </Box>
    </>
  )
}