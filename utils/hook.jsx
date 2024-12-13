import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setStories } from "../src/store/storySlice";



const useFetchAllPages = (baseUrl) => {
  
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();

  const fetchPage = async () => {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Error fetching page  ${response.statusText}`);
    }
    return response.json(); // Return the JSON data
  };

  const fetchAllPages = async () => {
    // const fetchPromises = [];
    // // Create an array of promises for each page
    // for (let i = 0; i < 49; i++) {
    //   fetchPromises.push(fetchPage(i));
    // }

    try {
      // Wait for all promises to resolve
      const data = await fetchPage();
      // const hits = allPagesData.reduce((acc, pageData) => [...acc, ...pageData.hits],[]);
      dispatch(setStories(allPagesData.hits));
      console.log(allPagesData.hits.nbPages);
      setTotalPages(Math.ceil(allPagesData.hits.nbPages)); // Assuming 20 items per page
    } catch (error) {
      console.log(error.message); // Handle any errors
    }
  };

  useEffect(() => {
    fetchAllPages();
  }, [baseUrl]); // Fetch data whenever the base URL or tags change

  return {totalPages };
};

export default useFetchAllPages;
