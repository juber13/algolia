/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { setStories } from "../store/storySlice";

export const Home = () => {
  const {stories , currentPage , currentPage2} = useSelector((state) => state.story);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tag, setTag] = useState("all");
  const [time, setTime] = useState("all_time");  
  const [totalPages, setTotalPages] = useState(0); 
  const dispatch = useDispatch();
  const [data , setData] = useState([]);

  const fetchData = async (url) => {
    if (!url) return; 
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      dispatch(setStories(result.hits));
      setTotalPages(result.nbPages); 
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

    const isInitialRender = useRef(true);

    useEffect(() => {
      const url = `https://hn.algolia.com/api/v1/search?page=${currentPage}&tags=${tag === "all" ? "story" : tag}`;
      fetchData(url);
    }, [tag , currentPage]);

    useEffect(() => {
      if (isInitialRender.current) {
        isInitialRender.current = false;
        return;
      }

      const url = `https://hn.algolia.com/api/v1/search_by_date?page=${currentPage2}&query=${time}`;
      fetchData(url);
    }, [time , currentPage2]);


  const convertDateIntoYear = (date) => {
    const startDate = new Date(date);
    const endDate = new Date();
    const diffInMs = Math.abs(endDate - startDate);
    const totalYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    return Math.ceil(totalYears);
  };


  return (
    <div className='bg-black h-auto'>
      <div className='container m-auto bg-[#F6F6EF] max-w-6xl h-auto min-h-screen pb-3 pr-3'>
        <Header />
        <div className='content p-2'>
          <Filters
            setQuery={setTag}
            query={tag}
            query2={time}
            setQuery2={setTime}
          />
        </div>
        <div className='stories'>
          {loading && <p className='text-center text-xs mb-4'>Loading...</p>}
          {/* {error && <p>Error: {error.message}</p>} */}
          {stories?.map((item) => (
            <div key={item?.objectID} className='px-4'>
              <div className='flex gap-1 flex-wrap  story-title items-center'>
                <a
                  href={`https://news.ycombinator.com/item?id=${item?.objectID}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className='text-[13px] font-[400] text-black'>
                    {item?.title}
                  </span>
                </a>
                {item?.url && (
                  <a
                    href={item?.url}
                    className='text-xs text-gray-500 text-wrap max-w[90%]'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {`(${item?.url})`}
                  </a>
                )}
              </div>
              {item?.title && (
                <div className='story-meta flex gap-3 text-[9px] font-[400]'>
                  <a
                    href={`https://news.ycombinator.com/item?id=${item?.objectID}`}
                    className='text-gray-500 border-r-[1px] pr-2 border-gray-500'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {item?.points} Points
                  </a>
                  <a
                    href={`https://news.ycombinator.com/user?id=${item?.author}`}
                    className='text-gray-500 border-r-[1px] border-gray-500 pr-1'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {item?.author}
                  </a>
                  <a
                    href={`https://news.ycombinator.com/item?id=${item?.objectID}`}
                    className='text-gray-500 border-r-[1px] border-gray-500 pr-1'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {convertDateIntoYear(item?.created_at)} Years ago
                  </a>
                  <a
                    href={`https://news.ycombinator.com/item?id=${item?.objectID}`}
                    className='text-gray-500'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {item?.num_comments > 0 ? item?.num_comments : 0} comments
                  </a>
                </div>
              )}
              {item?.story_text && (
                <div className='story-text text-[11px] font-[400] flex gap-1 mb-2 flex-col mt-2 ml-2'>
                  {item?.story_text.split(/<[pa][^>]*>/).map((line, index) => (
                    <p
                      key={index}
                      className='text-wrap max-w-[99%] overflow-x-hidden'
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='paginat flex items-center justify-center'>
          <Pagination
            totalPages={totalPages}
            isInitialRender={isInitialRender}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
