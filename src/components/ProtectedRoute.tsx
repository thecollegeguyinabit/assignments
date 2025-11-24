import type { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function ProtecteedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if(!user){
            navigate("/login");
        }
    }, [user]);

    if(!user) return null;
    return <>{children}</>;
}