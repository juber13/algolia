import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useSearchParams, useNavigate } from "react-router-dom";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [type, setType] = useState(searchParams.get("type") || "story");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [dateRange, setDateRange] = useState(
    searchParams.get("dateRange") || "all_time"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 0
  );
  const [data, setData] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [selectedType, setSelectedType] = useState("search");

  // Construct URL inside effect
  const constructUrl = () => {
    return `https://hn.algolia.com/api/v1/${
      selectedType === "search" ? "search" : "search_by_date"
    }?page=${currentPage}&query=${query}&tags=${`(${type})`}` +
      (selectedType !== "search"
        ? `&numericFilters=${
            dateRange === "" ? "points" : "created_at_i"
          }>=${getCreatedAtIFromText(dateRange || sortBy)}`
        : "");
  };
  useEffect(() => {
    const fetchData = async () => {
      const url = constructUrl(); // Construct URL before fetching
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();
        setNumberOfPages(res.nbPages);
        setData(res.hits || []);
        // Update the window location when the API call is successful
        setSearchParams({
          query,
          type,
          sortBy,
          dateRange,
          page: currentPage.toString(),
        });
      } catch (error) {
        console.error("Fetch error:", error);
        setData([]); // Reset data on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, currentPage, dateRange, sortBy, query, setSearchParams]); // Remove url from dependencies

  function getCreatedAtIFromText(inputText) {
    if (inputText === "popularity") {
      return 1000;
    } else {
      const value = inputText.toLowerCase();
      const currentTime = Date.now() / 1000;
      let createdAtI;

      if (value === "last_24" || value === "date") {
        createdAtI = currentTime - 24 * 60 * 60;
      } else if (value === "past_week") {
        createdAtI = currentTime - 7 * 24 * 60 * 60;
      } else if (value === "past_month") {
        createdAtI = currentTime - 30 * 24 * 60 * 60;
      } else if (value === "past_year") {
        createdAtI = currentTime - 365 * 24 * 60 * 60;
      } else if (value === "all_time") {
        createdAtI = 0;
      } else {
        return null;
      }
      return createdAtI;
    }
  }

  const handleDropDown = (text, type) => {
    const selectedValue = text;
    if (type === "search") {
      if (selectedValue === "all") {
        setType(text);
        setSelectedType(type);
      } else {
        setType(selectedValue);
        setSelectedType(type);
      }
    }

    if (type === "for") {
      if (selectedValue === "all_time") {
        setDateRange("all_time");
        setSelectedType("search"); // Reset selectedType to search
      } else {
        setDateRange(selectedValue);
        setSelectedType(type);
      }
    }

    if (type === "sortBy") {
      setSortBy(selectedValue);
      setSelectedType(type);
    }
  };

  function timeDifference(timestamp) {
    const givenTime = new Date(timestamp);
    const currentTime = new Date();
    const difference = currentTime - givenTime;
    const differenceInSeconds = Math.floor(difference / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);

    if (differenceInHours >= 1) {
      return `${differenceInHours} hour(s) ago`;
    } else if (differenceInMinutes >= 1) {
      return `${differenceInMinutes} minute(s) ago`;
    } else if (differenceInSeconds >= 1) {
      return `${differenceInSeconds} second(s) ago`;
    } else {
      return "Just now";
    }
  }

  const arr = Array.from({ length: numberOfPages }, (_, i) => i + 1);
  const slicedArr = arr.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage == endIndex - 1) {
      setStartIndex(startIndex + 5);
      setEndIndex(endIndex + 5);
      setCurrentPage(slicedArr[0]);
    }
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage === startIndex) {
      setStartIndex(startIndex - 5);
      setEndIndex(endIndex - 5);
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-black h-auto">
      <Header query={query} setQuery={setQuery} />
      <div className="border m-auto bg-[#F6F6EF] max-w-6xl h-auto min-h-screen pb-3">
        <div className="content p-2">
          <Filters
            handleDropDown={handleDropDown}
            type={type}
            sortBy={sortBy || "Popularity"}
            dateRange={dateRange || "All"}
          />
        </div>
        <div className="stories">
          {loading && <Loader />}
          {data?.map((item) => (
            <div key={item?.objectID} className="px-4">
              <div className="flex lg:gap-2 flex-wrap  story-title items-center">
                {item?.comment_text && (
                  <div className="text-[10px] text-gray-500 comment-details flex gap-2 mt-2">
                    <a
                      href={`https://news.ycombinator.com/user?id=${item?.author}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.author} |
                    </a>{" "}
                    <a
                      href={`http://news.ycombinator.com/item?id=${item?.objectID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.updated_at} |
                    </a>
                    <a
                      href={`http://news.ycombinator.com/item?id=${item?.objectID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      0 comments |
                    </a>
                    <a
                      href={`http://news.ycombinator.com/item?id=${item?.parent_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      parent |
                    </a>
                    <a
                      href={`http://news.ycombinator.com/item?id=${item?.story_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      on:{item.story_title}
                    </a>
                  </div>
                )}

                <span className="text-[13px] font-[400] text-black">
                  {item?.title ||
                    item?.comment_text
                      ?.split(/<[pa][^>]*>/)
                      .map((line, index) => (
                        <small
                          key={index}
                          className="text-wrap max-w-[99%] overflow-x-hidden"
                        >
                          {line}
                        </small>
                      ))}
                </span>

                {item?.url && (
                  <a
                    href={item?.url}
                    className="text-xs text-gray-500 text-wrap max-w-[90%] overflow-x-hidden"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`(${item?.url})`}
                  </a>
                )}
              </div>
              {item?.title && (
                <div className="story-meta flex gap-3 text-[9px] font-[400]">
                  <a
                    href={`https://news.ycombinator.com/item?id=${item?.objectID}`}
                    className="text-gray-500  pr-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.points} Points |
                  </a>
                  <a
                    href={`https://news.ycombinator.com/user?id=${item?.author}`}
                    className="text-gray-500 pr-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.author}|
                  </a>
                  <a
                    href={`https://news.ycombinator.com/item?id=${item?.objectID}`}
                    className="text-gray-500  pr-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {timeDifference(item?.updated_at)} |
                  </a>
                  <a
                    href={`https://news.ycombinator.com/item?id=${item?.objectID}`}
                    className="text-gray-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.num_comments > 0 ? item?.num_comments : 0} comments
                  </a>
                </div>
              )}
              {item?.story_text && (
                <div className="story-text text-[11px] font-[400] flex gap-1 mb-2 flex-col mt-2 ml-2">
                  {item?.story_text?.split(/<[pa][^>]*>/).map((line, index) => (
                    <p
                      key={index}
                      className="text-wrap max-w-[99%] overflow-x-hidden"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="paginat flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            slicedArr={slicedArr}
            setCurrentPage={setCurrentPage}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};
