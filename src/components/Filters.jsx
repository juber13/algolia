/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import DropDowns from './DropDowns';


const Filters = ({ setQuery, query, query2, setQuery2, setPopularity }) => {
  const [searchValueArr] = useState([
    "all",
    "story",
    "ask_hn",
    "show_hn",
    "launch_hn",
    "job",
    "poll",
  ]);
  const [byArr] = useState(["Popularity", "Date"]);
  const [searchByTimeArr] = useState([
    "all",
    "last_24",
    "past_week",
    "past_month",
    "past_Year",
    "Custom Range",
  ]);

  // const [searchValue , setSearchValue] = useState(query);
  const [by, setBy] = useState(byArr[0]);
  const [searchByTime, setSearchByTime] = useState(searchByTimeArr[0]);

  return (
    <div className='filters flex max-w-6xl mx-auto gap-2'>
      <div className='flex items-center gap-1'>
        <label htmlFor='' className='text-xs'>
          Search
        </label>
        <DropDowns
          data={searchValueArr}
          setQueryFn={setQuery}
          text={query}
        />
      </div>

      <div className='flex items-center gap-1'>
        <label htmlFor='' className='text-xs'>
          By
        </label>
        <DropDowns text={by} data={byArr} setQueryFn={setPopularity} />
      </div>

      <div className='flex items-center gap-1'>
        <label htmlFor='' className='text-xs'>
          for
        </label>
        <DropDowns
          text={query2}
          data={searchByTimeArr}
          setQueryFn={setQuery2}
        />
      </div>
    </div>
  );
};

export default Filters