//import { useSelector } from "react-redux";
import { Link } from "react-router";

//import type { RootState } from "@/store";

import { Button } from "./ui/button";

export default function Home(){
    // const user = useSelector((state: RootState) => state.user) || 
    const user = false;
    return(
        <main className="mx-auto min-h-[70vh] max-w-3xl flex flex-col justify-center gap-4 p-6 text-center">
            <h1 className="text-2xl font-semibold text-balance mb-2 md:text-3xl">Welcome to Ecommerce app</h1>
            <div className="flex flex-wrap items-center justify-center gap-5">
                <Link to="/products">
                    <Button variant="outline" className="hover:cursor-pointer">Browse Products</Button>
                </Link>
                {
                    user ? (
                        <Link to="/dashboard">
                            <Button variant="default" className="hover:cursor-pointer">Go to Dashboard</Button>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <Button variant="default" className="hover:cursor-pointer">Login</Button>
                        </Link>
                    )
                }
            </div>
        </main>       
    );
}