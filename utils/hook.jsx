import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setStories } from "../src/store/storySlice";



const useFetchAllPages = (baseUrl, tags) => {
  
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();

  const fetchPage = async (page) => {
    const response = await fetch(`${baseUrl}${page}&tags=${tags == "all" ? "story" : tags}`);
    if (!response.ok) {
      throw new Error(`Error fetching page ${page}: ${response.statusText}`);
    }
    return response.json(); // Return the JSON data
  };

  const fetchAllPages = async () => {
    const fetchPromises = [];
    // Create an array of promises for each page
    for (let i = 0; i < 49; i++) {
      fetchPromises.push(fetchPage(i));
    }

    try {
      // Wait for all promises to resolve
      const allPagesData = await Promise.all(fetchPromises);
      const hits = allPagesData.reduce(
        (acc, pageData) => [...acc, ...pageData.hits],
        []
      );
      dispatch(setStories(hits));
      console.log(hits.length);
      setTotalPages(Math.ceil(hits.length / 20)); // Assuming 20 items per page
    } catch (error) {
      console.log(error.message); // Handle any errors
    }
  };

  useEffect(() => {
    fetchAllPages();
  }, [baseUrl, tags]); // Fetch data whenever the base URL or tags change

  return {totalPages };
};

export default useFetchAllPages;
