'use client'

import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { BouncingDVD } from "@/components/functionality/BouncingDVDProps";
import { RandomJoke } from "@/components/functionality/RandomJoke";

export default function NotFound() {
  return (
    <>
        <BouncingDVD />
        <Container
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
        }}
        >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: "error.main", mb: 4 }} />
        <Typography variant="h1" component="h1" gutterBottom>
            404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
            Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Even Chuck Norris couldn't find the page you're looking for.
        </Typography>
        
        <RandomJoke variant="404" />

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
            component={Link}
            href="/"
            variant="contained"
            color="primary"
            size="large"
            >
            Go Back Home
            </Button>
        </Box>
        </Container>
    </>
  );
}