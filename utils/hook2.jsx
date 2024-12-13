import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStories } from "../src/store/storySlice";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return; // Prevent fetching if URL is empty

      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        dispatch(setStories(result.hits));
        setTotalPages(Math.ceil(result.nbPages));
        
        // setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-run the effect if the URL changes

  return { data, totalPages, loading, error };
};

export default useFetch;
