"use client";
import Link from "next/link";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function Navbar({editorChoice, setEditorChoice, onSearch, searchTerm}){
    return(
        <header className=" flex flex-col items-center lg:flex-row lg:items-start lg:justify-evenly shrink-0 p-4 gap-4 transition-[width,height] ease-linear  shadow ">
        <h1 className="text-5xl font-medium ">Games </h1>
        <div className="flex gap-5 flex-col items-center md:items-start md:flex-row md:mt-2 relative">
          <div className="absolute inset-y-0 left-0 -top-14 md:top-0 pt-0.5 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-600" />
          </div>
          <Input 
            type="text"
            className="w-[180px] md:w-[250px]  focus-visible:ring-gray-300 pl-8"
            placeholder="Dark Souls"
            onChange={(e) => onSearch(e.target.value)}
            value={searchTerm}
          />
          <div className="flex gap-1">
            <Button 
              className={`hover:cursor-pointer bg-transparent text-black text-md shadow-none rounded-xl ease-linear delay-100
                          ${editorChoice 
                            ? 'bg-neutral-700 text-white border-neutral-700 hover:text-gray-700 hover:bg-neutral-200'
                            : 'bg-neutral-200 text-gray-700 border-gray-300 hover:bg-neutral-200'
                          }
                        `}
              onClick={() => setEditorChoice(!editorChoice)}
            >
              Editor Choice
            </Button>
          </div>
        </div>
      </header>
    );
}