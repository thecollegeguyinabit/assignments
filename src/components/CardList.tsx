"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { TbUserMinus, TbMail, TbWorld } from "react-icons/tb";
import { FaPhone } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import EditUser from "./EditUser";
import { User } from "@/types";
import { useDispatch } from "react-redux";
import { deleteUser } from "@/state/usersSlice";


export default function CardList( { user }: { user: User } ): React.JSX.Element {
  const dispatch = useDispatch();

  const { id, name, email, phone, website } = user;
  const Email = email.toLowerCase();
  const [liked, setLiked] = useState(false);

  function toggle() {
    setLiked(!liked);
  }
  return (
    <Card className="min-w-[250px] max-w-auto h-[400px] py-0 gap-5">
      <div className="place-items-center bg-neutral-200 rounded-t-xl">
        <Image
          src="https://api.dicebear.com/9.x/personas/svg?seed=%7B%7Busername%7D%7D"
          alt="Image"
          width={190}
          height={0}
          priority={true}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <p className="flex font-light items-center gap-1">
            <TbMail size={22} />
            {Email}
          </p>
          <p className="flex font-light items-center gap-1">
            <FaPhone size={18} />
            {phone}
          </p>
          <p className="flex font-light items-center gap-1">
            <TbWorld size={22} />
            {website}
          </p>
        </div>
      </CardContent>
      <CardFooter className="w-full flex p-2 justify-evenly bg-neutral-100 rounded-b-xl">
        
          <div onClick={toggle} className="text-pink-400 hover:cursor-pointer">
            {liked ? <BsHeartFill size={20} /> : <BsHeart size={20} />}
          </div>
          <Separator orientation="vertical" className="bg-neutral-400" />
          <span className="hover:cursor-pointer">
          <EditUser id={id} name={name} phone={phone} email={email} website={website} />
          </span>
          <Separator orientation="vertical" className="bg-neutral-400" />
          <TbUserMinus size={24} className="hover:text-red-400 hover:cursor-pointer" onClick={() => {liked ? alert("can't delete favourite user") : dispatch(deleteUser(user.id))} } />
      </CardFooter>
    </Card>
  );
}
