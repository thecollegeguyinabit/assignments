import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  NavLink, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "../ui/alert"

import { useAuth } from "@/hooks/useApi"

import type { RootState } from "@/store"
import { setCredentials } from "@/store/slices/authSlice"

import { AlertCircle } from "lucide-react"


export function AdminLogin({ ...props }: React.ComponentProps<typeof Card>) {
  const { login } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const form = new FormData(e.currentTarget as HTMLFormElement)
      const email = form.get('email') as string;
      const password = form.get('password') as string;
      login.mutate({ email, password }, {
      onSuccess: (data) => {
        dispatch(setCredentials(data)); 
        navigate("/admin/blogs", {replace: true});
      },
      onError:(error: Error) => {
        const errorMessage = error?.message || "Login Failed";
        setError(errorMessage);
      }
    })
    }
    useEffect(() => {
        if (isLoggedIn) return;
      }, [isLoggedIn]);

  return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 md:-mt-20">
        <div className="w-full max-w-sm ">
        <Card {...props}>
          <CardHeader>
          {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className='w-4 h-4'/>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter Login Details
            </CardDescription>
          </CardHeader>
          <CardContent>

          {/* Login Form */}
            <form onSubmit={onSubmit} className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" name="password" type="password" required />
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <FieldGroup>
                  <Field>
                    <Button type="submit">Login</Button>
                    <FieldDescription className="flex gap-1 justify-center">
                      Create an account 
                      <NavLink to="/admin/signup" >SignUp</NavLink>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
