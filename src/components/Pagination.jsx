/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setCurrentPage2 } from '../store/storySlice';
const Pagination = ({ totalPages, isInitialRender }) => {
  const { currentPage } = useSelector((state) => state.story);
  const dispatch = useDispatch();

  const [currentPageButtonStartIndex, setCurrentPageButtonStartIndex] = useState(1);
  const [currentPageButtonEndIndex, setCurrentPageButtonEndIndex] = useState(5);
  const arr = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pages = arr.slice(currentPageButtonStartIndex - 1,currentPageButtonEndIndex);

  const handleNextClick = () => {
    if (currentPageButtonEndIndex < arr.length) {
      setCurrentPageButtonStartIndex(currentPageButtonStartIndex + 5);
      setCurrentPageButtonEndIndex(currentPageButtonEndIndex + 5);
      // setCurrentPage(currentPageButtonStartIndex + 5);
      dispatch(setCurrentPage(currentPageButtonStartIndex + 5));
    }
  };

  const handlePrevClick = () => {
    if (currentPageButtonStartIndex > 1) {
      setCurrentPageButtonStartIndex(currentPageButtonStartIndex - 5);
      setCurrentPageButtonEndIndex(currentPageButtonEndIndex - 5);
      // setCurrentPage(currentPageButtonEndIndex - 5);
      dispatch(setCurrentPage(currentPageButtonEndIndex - 5));
    }
  };

  const handlePageClick = (page) => {
    if(isInitialRender){
      dispatch(setCurrentPage(page));
    }else{
      dispatch(setCurrentPage2(page));
    }
  };

  return (
    <div className='flex gap-1'>
      {currentPageButtonEndIndex > 5 && (
        <button className='text-[10px] border p-1' onClick={handlePrevClick}>
          Prev
        </button>
      )}

      {pages.map((val, i) => {
        return (
          <button
            onClick={() => handlePageClick(val)}
            key={i}
            // disabled={i + 1 === currentPageVal}
            className={`text-[10px] border-gray-400  border text-gray-500 p-1 px-2 ${
              val == 33 || val == 34 || val == 35 ? "hidden" : ""
            } ${
              val === currentPage ? "text-orange-400 border-orange-400" : ""
            }`}
          >
            {val}
          </button>
        );
      })}

      {currentPageButtonEndIndex <= 32 && (
        <button className='text-[10px] border p-1' onClick={handleNextClick}>
          Next
        </button>
      )}
    </div>

    //   <button className='text-[10px] border p-1' onClick={handleNextClick} disabled={nextDisabled}>
    //     Next
    //   </button>
    // </div>
  );
};

export default Pagination