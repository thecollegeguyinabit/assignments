import React from "react";
import { LoaderOne } from "@/components/ui/loader";

export default function Loading() {
    return(
        <div className="flex justify-center items-center min-h-screen"> 
            <LoaderOne />
        </div>
    );
}

