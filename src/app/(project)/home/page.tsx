'use client'

import React, {useEffect} from 'react';
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import Container from "@mui/material/Container";
import ChucksAppBar from "@/components/default/Navbar";
import {Typography} from "@mui/material";
import {Box} from "@mui/system";
import {RandomJoke} from "@/components/jokes/RandomJokeGenerator";
import { AddCustomJoke } from '@/components/jokes/AddCustomJoke';
import { useFavoriteJokes } from '@/components/jokes/useFavoriteJokes';


export default function Page() {
    const {user} = useAuth();
    const router = useRouter();

    const {handleAddFavorite} = useFavoriteJokes();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);


    return (
        <>
            <ChucksAppBar/>
                <Typography variant="h1">Home</Typography>
                <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                    sx={{
                        my: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: '100%', // Add this line
                    }}
                >
                    <RandomJoke/>
                </Box>
                <Box
                    sx={{
                        my: 4,
                        display: "block",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: '40%', // Add this line
                    }}
                >
                    <AddCustomJoke onJokeAdd={handleAddFavorite} />
                </Box>
            </Container>
        </>
    );
}
