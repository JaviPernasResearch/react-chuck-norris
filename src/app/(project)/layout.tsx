"use client"

import CssBaseline from "@mui/material/CssBaseline";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Head from "next/head";
import {RecoilRoot} from "recoil";
import {Toaster} from "sonner";
import {AuthContextProvider} from "@/context/AuthContext";

export default function ProjectLayout({
                                          children,
                                      }: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <RecoilRoot>
                    <Head>
                        <meta
                            name="viewport"
                            content="initial-scale=1, width=device-width"
                        />
                    </Head>
                    <CssBaseline/>
                    {children}
                    <Toaster/>
                </RecoilRoot>
            </AuthContextProvider>
        </QueryClientProvider>
    );
}

