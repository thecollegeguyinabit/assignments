"use client";

import { useMemo,useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import GameList from "./CardContainer";
import { X } from "lucide-react";

export default function GameComponent({games}) {
  
  const [editorChoice, setEditorChoice] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  const searchedGame = useMemo(() =>{
    let filteredData = games;

    if(searchQuery.trim()){
      filteredData = filteredData.filter(game =>  game.title.toLowerCase().includes(searchQuery.toLowerCase()) 
                                                  || game.platform.toLowerCase().includes(searchQuery.toLowerCase()
                                                  || game.genre.some( item => item.toLowerCase().includes(searchQuery.toLowerCase()))));
    } 
    if(editorChoice){
      filteredData = filteredData.filter(game => game.editors_choice === "Y");
    }
    return filteredData;
  },[searchQuery, editorChoice]);



  return (
    <div className="bg-[#fcfcfc]">
      <Navbar
        editorChoice = {editorChoice}
        setEditorChoice={setEditorChoice}
        onSearch={setSearchQuery}
        searchTerm={searchQuery}
      />
      <main className="w-auto h-auto  mx-5 md:max-lg:mx-18 lg:max-xl:mx-17 xl:max-2xl:mx-25 2xl:mx-20 px-1">
        <div className={searchedGame.length === games.length ? 'hidden' : 'my-5 flex flex-col gap-4'}>
          <p>Showing {searchedGame.length} of {games.length} Games </p>
          <div>
            {(searchQuery || editorChoice) && (
              <span>
                {searchQuery && <span className="inline-flex items-center mr-2 px-3 py-1 rounded-full text-md font-bold bg-gray-200 text-gray-700  ">
                  Search :  "{searchQuery}"
                  <X
                    className="ml-1 h-5 w-5 text-gray-500 hover:text-gray-700 hover:cursor-pointer" 
                    onClick={() => setSearchQuery("")}
                  />
                </span>}
                {editorChoice && <span className="inline-flex items-center px-3 py-1 rounded-full text-md font-bold bg-gray-200 text-gray-700  ">
                  Editor Choice
                  <X
                    className="ml-1 h-5 w-5 text-gray-500 hover:text-gray-700 hover:cursor-pointer" 
                    onClick={() => setEditorChoice(false)}
                  />
                </span>}
              </span>
            )

            }
          </div>
        </div>
        <div className="flex flex-wrap gap-5 px-4 py-4 lg:px-0 ">
          {searchedGame.length > 0 ? (
            searchedGame.map((item, index) => (
              <GameList
                key={index}
                title={item.title}
                platform={item.platform}
                genre={item.genre}
                score={item.score}
                editorChoice={item.editors_choice}
              />
          ))) : (
            <p>No Game found  </p>
          )
          }
        </div>
      </main>
    </div>
  );
}
