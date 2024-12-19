/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import DropDowns from './DropDowns';


const Filters = ({handleDropDown , type , sortBy , dateRange}) => {
  const [searchValueArr] = useState([
    "all",
    "story",
    "comment",
    "ask_hn",
    "show_hn",
    "launch_hn",
    "job",
    "poll",
  ]);
  const [byArr] = useState(["popularity", "date"]);
  const [searchByTimeArr] = useState([
    "all_time",
    "last_24",
    "past_week",
    "past_month",
    "past_year",
  ]);

  const [by, setBy] = useState(byArr[0]);
  const [searchByTime, setSearchByTime] = useState(searchByTimeArr[0]);

  return (
    <div className='filters flex flex-wrap max-w-6xl mx-auto gap-2'>
      <div className='flex items-center gap-1'>
        <label htmlFor='' className='text-xs'>
          Search
        </label>
        <DropDowns
          handleDropDown={handleDropDown}
          data={searchValueArr}
          text={type}
          searchType={"search"}
        />
      </div>

      <div className='flex items-center gap-1'>
        <label htmlFor='' className='text-xs'>
          By
        </label>
        <DropDowns
          handleDropDown={handleDropDown}
          data={byArr}
          text={sortBy}
          searchType={"sortBy"}
        />
      </div>

      <div className='flex items-center gap-1'>
        <label htmlFor='' className='text-xs'>
          for
        </label>
        <DropDowns
          handleDropDown={handleDropDown}
          data={searchByTimeArr}
          text={dateRange}
          searchType={"for"}
        />
      </div>
    </div>
  );
};

export default Filters