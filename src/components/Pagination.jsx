/* eslint-disable react/prop-types */

const Pagination = ({
  currentPage,
  slicedArr,
  numberOfPages,
  setCurrentPage,
  handleNext,
  handlePrev,
}) => {
  return (
    <div className='pagination flex gap-1'>
      {currentPage > 0 && (
        <button
          onClick={handlePrev}
          className='text-[10px] border text-black p-1'
        >
          Prev
        </button>
      )}
      {slicedArr.map((item, index) => (
        <button
          className={`${
            item - 1 === currentPage
              ? "border border-orange-400 text-orange-600"
              : "border border-gray-300 text-gray-500"
          } px-2 py-1 text-[10px]`}
          key={index}
          onClick={() => setCurrentPage(item - 1)}
        >
          {item}
        </button>
      ))}
      {currentPage < numberOfPages - 1 && (
        <button
          onClick={handleNext}
          className='text-[10px] border text-black p-1'
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination