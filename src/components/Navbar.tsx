import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import type { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/auth-slice";

export default function Navbar(){
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () =>{
        dispatch(logout());
        navigate("/login");
    }
    return(
        <header className="border-b bg-card">
            <nav className="mx-auto max-w-6xl p-4 flex justify-between items-center">
                <Link to='/' className="font-semibold text-sm md:text-2xl">
                    Ecommerce Shop
                </Link>
                <div className="flex items-center gap-1 md:gap-5 ">
                    <Link to="/products" className="text-xs  px-2 py-1 rounded-lg hover:bg-neutral-200/50 md:text-base">
                        Products
                    </Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-xs px-2 py-1 rounded-lg hover:bg-neutral-200/50 md:text-base">
                                Dashboard
                            </Link>
                            <Button variant="outline" className="text-xs h-8 p-3 hover:cursor-pointer md:text-base md:p-4" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                     ) : (
                        <Link to='/login'>
                            <Button size='default' className="text-xs hover:cursor-pointer md:text-base" >Login</Button>
                        </Link>
                     )}
                </div>
            </nav>
        </header>
    )
}