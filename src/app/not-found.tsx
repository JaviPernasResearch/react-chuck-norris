"use client"

import React from 'react';
import Button from "@mui/material/Button";
import {redirect} from "next/navigation";

export default function NotFound() {

    redirect("/not-found")

    return (
        <>
            <div>
                <Button>
                    404 Error
                </Button>
            </div>
        </>
    );
}
