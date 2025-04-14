"use client"

import ChucksAppBar from '@/components/default/Navbar'
import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import {CatPicTable} from '@/components/cats/CatPicTable'
import {RandomCatPicGenerator} from "@/components/cats/RandomCatPicGenerator";
import { useAuthRedirect } from '@/components/auth/useAuthRedirect'

export default function CatsPage() {

const { user } = useAuthRedirect();

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
                    <Typography variant="h1">Random Cats</Typography>
                    <Box
                        sx={{
                            my: 4,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <RandomCatPicGenerator/>
                    </Box>
                </Container>
                <Box sx={{display: "flex", minHeight: "100%"}}>
                    <CatPicTable/>
                </Box>
            </Box>
    </>
  )
}