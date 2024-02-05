import React from "react";
import { BsSun } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { SlLocationPin } from "react-icons/sl";
import SearchBar from "../components/SearchBar";

type Props = {};

export default function NavBar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <BsSun className="text-3xl mt-1 text-yellow-400" />
        </p>
        {/*  */}
        <section className="flex gap-2 items-center">
          <SlLocationPin className="text-2xl text-gray-700 hover:opacity-60 cursor-pointer" />
          <GrMapLocation className="text-2xl border-0" />
          <p className="text-slate-900/80 text-sm pl-1"> Mexico </p>
          <div>
            <SearchBar />
          </div>
        </section>
      </div>
    </nav>
  );
}
