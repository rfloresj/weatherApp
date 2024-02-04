import React from "react";
import { IoIosSearch } from "react-icons/io";

type Props = {};

export default function SearchBar({}: Props) {
  return (
    <form className="flex relative items-center justify-center h-10">
      <input
        type="text"
        placeholder="Search location"
        className="px-4 py-2 w-[230px] border
        border-gray-300 rounded-l-md focus:outline-none 
        focus:border-blue-500 h-full"
      />
      <button
        className="px-4 py-[9px] bg-orange-500 text-white 
      rounded-r-md focus:outline-none hover:bg-yellow-500 h-full"
      >
        <IoIosSearch className="text-xl" />
      </button>
    </form>
  );
}
