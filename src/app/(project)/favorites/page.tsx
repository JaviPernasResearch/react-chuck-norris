'use client'

import ChucksAppBar from "@/components/default/Navbar";
import { useState } from 'react';
import { FavoritesNav } from '@/components/favorites/FavoritesNav';

type FavoriteTabType = 'favJokes' |'customJokes' | 'cats' | 'colors';

export default function FavoritesPage() {
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