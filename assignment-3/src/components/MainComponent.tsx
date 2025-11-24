"use client";

import { useQuery } from "@tanstack/react-query";
import CardList from "./CardList";
import { User } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "@/state/usersSlice";
import { RootState } from "@/state/store";
import Loading from "@/app/loading";
import { useEffect } from "react";


export default function MainComponent() {
  const dispatch = useDispatch();

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      return fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
    },
  });

  useEffect(() =>{
    if(isSuccess && data){
      dispatch(setUsers(data));
    }
  },[dispatch, data]);
  const { users } = useSelector((state: RootState) => state.users);
  
  if (isLoading) return <Loading />;
  if (isError) return <div>Error occurred while fetching data.</div>;
  return(
      <div className="font-sans min-h-screen p-5 grid gap-5 md:max-lg:grid-cols-2 lg:max-xl:grid-cols-3 xl:grid-cols-4">
      {users?.map((user: User, index: number) => (
        <CardList key={user.id} user={user} />
      ))}
    </div>
    );
}