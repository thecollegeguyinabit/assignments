"use client";

import { TbUserEdit } from "react-icons/tb";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { UserData } from "@/types";
import { useState } from "react";
import { updateUser } from "@/state/usersSlice";
import { useDispatch } from "react-redux";



export default function EditUser({
  id,
  name,
  email,
  phone,
  website,
}: UserData): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const updatedData = {
      name: formData.get("name")?.toString() || name,
      phone: formData.get("phone")?.toString() || phone,
      email: formData.get("email")?.toString() || email,
      website: formData.get("website")?.toString() || website,
    };

    dispatch(updateUser({ id, ...updatedData }));
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TbUserEdit size={24} className="hover:text-blue-600" />
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DialogHeader className="mb-1">
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" defaultValue={name} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone</Label>
              <Input type="text" id="phone" name="phone" defaultValue={phone} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input type="text" id="email" name="email" defaultValue={email} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="website">Website</Label>
              <Input
                type="text"
                id="website"
                name="website"
                defaultValue={website}
              />
            </div>
          </div>
          <DialogFooter className="flex gap-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
