"use client"

import React, {useEffect} from 'react';
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

export default function Page() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user]);
    return (
        <>
            <div>
                {user?.email}
            </div>
        </>
    );
}
