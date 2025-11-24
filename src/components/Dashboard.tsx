import Protected from "@/components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { updateProfile } from "@/store/slices/auth-slice";
import { useState } from "react";

export default function DashboardPage() {
    const user = useSelector((s: RootState) => s.auth.user);
    
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [username, setUsername] = useState(user?.username || "");
    const [pw1, setpw1] = useState("");
    const [pw2, setpw2] = useState("");
    const [msg, setMsg] = useState<string | null>(null);
    
    const dispatch = useDispatch<AppDispatch>();


    const onProfileSave = ()=> {
        dispatch(updateProfile({firstName, lastName, username}));
    }
    const onPasswordSave = () =>{
        if(pw1 !== pw2){
            setMsg("Password don't match");
            return;
        }
        setMsg("Password successfully changed");
        setpw1("");
        setpw2("");
    } 
    return (
        <Protected>
        <main className="mx-auto max-w-4xl p-6 flex flex-col items-center">
            <h1 className="mb-2 text-2xl font-semibold text-balance">Dashboard</h1>
            <p className="text-muted-foreground">
            Welcome, {user?.firstName+ " " + user?.lastName || user?.username}!
            </p>

            <div className="mt-6 flex flex-wrap gap-5 justify-center">
            {/*profile*/}
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account" className="hover:cursor-pointer">Account</TabsTrigger>
                    <TabsTrigger value="password" className="hover:cursor-pointer">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                        Make changes to your account here. Click save when
                        you&apos;re done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-name">First Name</Label>
                        <Input id="tabs-demo-name" defaultValue={user?.firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-name">Last Name</Label>
                        <Input id="tabs-demo-name" defaultValue={ user?.lastName} onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                        <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-username">Username</Label>
                        <Input id="tabs-demo-username" defaultValue={user?.username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={onProfileSave} className="hover:cursor-pointer">Save changes</Button>
                    </CardFooter>
                    </Card>
                </TabsContent>
                {/*change password*/}
                <TabsContent value="password">
                    <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                        The Password change functionality don't change actual user password. This feature for demo
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-current">
                            Current password
                        </Label>
                        <Input id="tabs-demo-current" type="password" />
                        </div>
                        <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-new">New password</Label>
                        <Input id="tabs-demo-new" type="password" onChange={(e) =>setpw1(e.target.value)}/>
                        </div>
                        <div className="grid gap-3">
                        <Label htmlFor="tabs-demo-new-confirm">Confirm password</Label>
                        <Input id="tabs-demo-new" type="password" onChange={(e) =>setpw2(e.target.value)}/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-col gap-2">
                            {msg ? <p className="text-red-400 text-sm">{msg}</p> : null}
                            <Button onClick={onPasswordSave} className="hover:cursor-pointer">Save password</Button>
                        </div>
                    </CardFooter>
                    </Card>
                </TabsContent>
                </Tabs>
            </div>
            {/*browse products*/}
            <Link to="/products">
                <Button className="hover:cursor-pointer">Browse Products</Button>
            </Link>
            </div>
        </main>
        </Protected>
    );
}
