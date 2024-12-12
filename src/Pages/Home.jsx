import React, { useState } from 'react'
import Header from '../components/Header'
import Filters from '../components/Filters'
import {useSelector } from 'react-redux';
import Pagination from '../components/Pagination';
import useFetchAllPages from '../../utils/hook'; 
import Footer from '../components/Footer';

export const Home = () => {
  
const stories = useSelector((state) => state.story.stories);
const [currentPage, setCurrentPage] = useState(1);
const [query, setQuery] = useState("story");
const [query2, setQuery2] = useState("all_time");

const baseUrl = "https://hn.algolia.com/api/v1/search?page=";
const baseUrl2 = "https://hn.algolia.com/api/v1/search_by_date?page=";

const { totalPages } = useFetchAllPages(baseUrl, query);
const {totalPages2 } = useFetchAllPages(baseUrl2, query2);

// const { totalPages2 } = useFetchAllPages2(baseUrl2, query2);


// current pages function 
const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};

const itemsPerPage = 30;
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const story = stories.slice(startIndex, endIndex);

const convertDateIntoYear = (date) => {
  // Define the start date
  const startDate = new Date(date);
  // Define the end date (today)
  const endDate = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(endDate - startDate); // Use Math.abs to ensure the value is positive

  // Convert milliseconds to years
  const totalYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25); // Using 365.25 for leap years

  // Use Math.ceil to round up to the nearest whole number
  const totalYearsCeil = Math.ceil(totalYears);
  return totalYearsCeil;
};



  return (
    <div className='bg-black h-auto'>
      <div className='container m-auto bg-[#F6F6EF] max-w-6xl h-auto min-h-screen pb-3'>
        <Header />
        <div className='content p-2'>
          <Filters setQuery={setQuery} query={query} query2={query2} setQuery2={setQuery2} />
        </div>
        <div className='stories '>
          {story.map((items) => {
            return (
              <div key={items.objectID} className='px-4'>
                <div className='flex gap-1 story-title items-center'>
                  <a
                    href={`https://news.ycombinator.com/item?id=${items.objectID}`}
                    target='_blank'
                  >
                    <span className='text-[13px] font-[400]  text-black'>
                      {items.title}
                    </span>
                  </a>
                  {items.title && (
                    <a
                      href={`${items.url}`}
                      className='text-xs text-gray-500'
                      target='_blank'
                    >
                      {`${items.url ? "(" + items.url + ")" : ""}`}
                    </a>
                  )}
                </div>

                {items.title && (
                  <div className='story-meta flex gap-3 text-[9px] font-[400]'>
                    <a
                      href={`https://news.ycombinator.com/item?id=${items.objectID}`}
                      className='text-gray-500 border-r-[1px] pr-2 border-gray-500'
                      target='_blank'
                    >
                      {items.points} Points
                    </a>
                    <a
                      href={`https://news.ycombinator.com/user?id=${items.author}`}
                      className='text-gray-500 border-r-[1px] border-gray-500 pr-1'
                      target='_blank'
                    >
                      {items.author}
                    </a>

                    <a
                      href={`https://news.ycombinator.com/item?id=${items.objectID}`}
                      className='text-gray-500 border-r-[1px] border-gray-500 pr-1'
                      target='_blank'
                    >
                      {convertDateIntoYear(items.created_at)} Years ago
                    </a>

                    <a
                      href={`https://news.ycombinator.com/item?id=${items.objectID}`}
                      className='text-gray-500'
                      target='_blank'
                    >
                      {items.num_comments > 0 ? items.num_comments : 0} comments
                    </a>
                  </div>
                )}
                {items.story_text && (
                  <div className='story-text text-[11px] font-[400] flex gap-1 mb-2 flex-col mt-2 ml-2'>
                    {items.story_text.split("<p>").map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className='paginat flex items-center justify-center'>
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
