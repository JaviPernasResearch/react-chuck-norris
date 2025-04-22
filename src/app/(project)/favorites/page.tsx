'use client'

import ChucksAppBar from "@/components/default/Navbar";
import { useState } from 'react';
import { useAuthRedirect } from "@/components/auth/useAuthRedirect";
import { FavoritesNav, FavoriteTabType } from "@/components/favorites/FavoritesNav";

export default function FavoritesPage() {

    useAuthRedirect();

    const [activeTab, setActiveTab] = useState<FavoriteTabType>('favJokes');

    const handleTabChange = (_event: React.SyntheticEvent, newValue: FavoriteTabType) => {
        setActiveTab(newValue);
    };

    return (
        <>
            <ChucksAppBar/>
            <FavoritesNav activeTab={activeTab} onTabChange={handleTabChange}/>
        </>
    );
}