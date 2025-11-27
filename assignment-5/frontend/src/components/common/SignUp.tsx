import { useDispatch } from "react-redux";
import {  NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useApi";
import { setCredentials } from "@/store/slices/authSlice";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const dispatch = useDispatch();
  const {signup} = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [error , setError] =  useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const form = new FormData(e.currentTarget as HTMLFormElement)
      const email = form.get('email') as string;
      const password = form.get('password') as string;
      const confirmPassword = form.get("confirm-password") as string;
      const name = form.get('name') as string;

      if (password !== confirmPassword) {
      setError("Password don't Match");
      return;
    }

      signup.mutate({ email: email, password: password, name: name, role: selectedRole }, {
        onSuccess: (data) => {dispatch(setCredentials(data)); navigate("/admin/login", {replace: true})},
        onError: (error) => {console.error(`${error} error from signup`); console.error({ email, password, name, role: selectedRole })}
      })
    }

  return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
        <Card {...props}>
          <CardHeader>
            {/* Error Alert */}
            { error && 
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className='w-4 h-4'/>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
            }
              {/* Sign Up form */}
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input id="name" name="name" type="text" placeholder="John Doe" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    name="email"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" type="password" name="password" required />
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input id="confirm-password" name="confirm-password" type="password" required />
                  <FieldDescription>Please confirm your password.</FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="role">Role</FieldLabel>
                  <Select value={selectedRole} onValueChange={setSelectedRole} required>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel >Roles</SelectLabel>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <FieldGroup>
                  <Field>
                    <Button type="submit">Create Account</Button>
                    <FieldDescription className="flex gap-1 justify-center">
                      Already have an account? 
                      <NavLink to="/admin/login" >Login</NavLink>
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
