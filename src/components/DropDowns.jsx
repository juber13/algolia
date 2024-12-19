/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { RxCaretDown, RxCaretUp } from "react-icons/rx";


const DropDowns = ({handleDropDown,data,text,searchType}) => {
  
  const handleChange = (e) => {
    console.log(e)
    const dataValue = e.target.value;
    console.log(dataValue)

    handleDropDown(dataValue,searchType);
  }
  return (
    // <ul className='flex'>
    //   <li className='flex relative'>
    //     <span
    //       className='border border-gray-300 text-[#5c5c5c] h-7 flex items-center cursor-pointer font-[600] font-sans justify-between p-1 px-2 gap-2 text-xs relative'
    //       onClick={() => setShowDropdown(!showDroppdown)}
    //     >
    //       {text
    //         .split("_")
    //         .map((ch) => ch.charAt(0).toUpperCase() + ch.slice(1))
    //         .join(" ")}

    //       {showDroppdown ? (
    //         <RxCaretUp className='text-xl' />
    //       ) : (
    //         <RxCaretDown className='text-xl' />
    //       )}
    //     </span>
    //     <ul
    //       className={`absolute transition-all duration-100  left-0 w-[100px] ${
    //         showDroppdown
    //           ? "top-7 z-[999] opacity-100"
    //           : "top-0  z-[-20] opacity-0"
    //       }`}
    //     >
    //       {data.map((item, index) => (
    //         <li
    //           key={index}
    //           onClick={(e) => {
    //             const dataValue = e.target.getAttribute("data-value");
    //             console.log(dataValue);
    //             handleDropDown(dataValue,searchType);
    //             setShowDropdown(false);
    //           }}
    //           className={`overflow-hidden cursor-pointer text-[#5c5c5c] font-[600] font-sans p-2  text-xs ${
    //             showDroppdown ? "h-auto bg-white border " : "h-0"
    //           }`}
    //           data-value={item == "all" ? "story,jobs,poll" : item}
    //         >
    //           {item
    //             .split("_")
    //             .map((ch) => ch.charAt(0).toUpperCase() + ch.slice(1))
    //             .join(" ")}
    //         </li>
    //       ))}
    //     </ul>
    //   </li>
    // </ul>

    <select
      name=''
      id=''
      className='text-xs bg-[#F6F6EF] border p-1 outline-none focus:outline-none'
      // className='bg-white text-gray-700 border border-gray-300 rounded-md p-2 focus:outline-non2'
      onChange={handleChange}
    >
      {data.map((item, index) => (
        <option
          key={index}
          value={item == "all" ? "story,jobs,poll" : item}
          className='bg-white border p-2 border-gray-600 hover:gray-500 text-xs'
        >
            {item
              .split("_")
              .map((ch) => ch.charAt(0).toUpperCase() + ch.slice(1))
              .join(" ")}
        </option>
      ))}
    </select>
  );
};

export default DropDowns