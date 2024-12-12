/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { RxCaretDown, RxCaretUp } from "react-icons/rx";


const DropDowns = ({ data, text, setQueryFn}) => {
  const [showDroppdown, setShowDropdown] = useState(false);

  return (
    <ul className='flex'>
      <li className='flex relative'>
        <li
          className='border-2 text-gray-800 h-7 flex items-center cursor-pointer justify-between p-1 px-2 gap-2 text-xs relative'
          onClick={() => setShowDropdown(!showDroppdown)}
        >
          {text}
          {showDroppdown ? (
            <RxCaretUp className='text-xl' />
          ) : (
            <RxCaretDown className='text-xl' />
          )}
        </li>
        <ul
          className={`absolute transition-all duration-100  left-0 w-[100px] ${
            showDroppdown
              ? "top-7 z-[999] opacity-100"
              : "top-0  z-[-20] opacity-0"
          }`}
        >
          {data.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                console.log(item);
                setQueryFn(item);
                setShowDropdown(false);
              }}
              className={`overflow-hidden cursor-pointer text-gray-800   p-2 font-[500] text-xs ${
                showDroppdown ? "h-auto bg-white border " : "h-0"
              }`}
              value={item}
            >
              {item
                .split("_")
                .map((ch) => ch.charAt(0).toUpperCase() + ch.slice(1))
                .join(" ")}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default DropDowns