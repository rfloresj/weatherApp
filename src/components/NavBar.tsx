'use client';

import React, { useState } from 'react';
import { BsSun } from 'react-icons/bs';
import { GrMapLocation } from 'react-icons/gr';
import { SlLocationPin } from 'react-icons/sl';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

type Props = {};

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function NavBar({}: Props) {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  //
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );

        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError('');
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <p className='flex items-center justify-center gap-2'>
          <h2 className='text-gray-500 text-3xl'>Weather</h2>
          <BsSun className='text-3xl mt-1 text-yellow-400' />
        </p>
        {/*  */}
        <section className='flex gap-2 items-center'>
          <SlLocationPin className='text-2xl text-gray-700 hover:opacity-60 cursor-pointer' />
          <GrMapLocation className='text-2xl border-0' />
          <p className='text-slate-900/80 text-sm pl-1'> Mexico </p>
          <div className='relative'>
            {/* SearchBox */}
            <SearchBox
              value={city}
              // onSubmit={}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <SuggestionBox />
          </div>
        </section>
      </div>
    </nav>
  );
}

function SuggestionBox({
  showSuggestion,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestion: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestion && suggestions.length > 1) || error) && (
        <ul className='mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2'>
          {error && suggestions.length < 1 && (
            <li className='text-red.500 p-1'>{error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className='cursor-pointer p-1 rounded hover:bg-gray-200'
            ></li>
          ))}
          <li className='cursor-pointer p-1 rounded hover:bg-gray-200'>
            {item}
          </li>
        </ul>
      )}
    </>
  );
}
