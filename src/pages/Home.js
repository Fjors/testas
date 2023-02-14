import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ImageList from "../components/ImageList";
import SearchBar from "../components/SearchBar";
import Loader from "../helpers/Loader";
import { useAppContext } from "../context/appContext";

function Home() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("forest");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token, username, getUserProfile, getToken } = useAppContext();

  const clientId = process.env.REACT_APP_UNSPLASH_KEY;

  useEffect(() => {
    if (window.location.search.includes("code=") && !token) {
      console.log("tikrinu ar getToken veikia");
      getToken();
    }

    if (token && !username) {
      getUserProfile();
    }
  }, [token]);

  const fetchImages = () => {
    console.log("fetchImages called");
    setLoading(true);

    let params = {
      page: page,
      query: query,
      per_page: 30,
    };

    let headers = {};

    if (username) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
      console.log("gauname su token foto");
    } else {
      params = { ...params, client_id: clientId };
      console.log("be token foto");
    }

    axios
      .get("https://api.unsplash.com/search/photos", { headers, params })
      .then((response) => {
        setImages([...images, ...response.data.results]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    setPage(page + 1);
  };

  useEffect(() => {
    console.log("useEffect called");

    fetchImages();
    setQuery("");
  }, []);

  return (
    <div>
      <SearchBar
        fetchImages={fetchImages}
        query={query}
        setQuery={setQuery}
        setImages={setImages}
        setPage={setPage}
      />

      {loading && <Loader />}
      <ImageList
        images={images}
        setImages={setImages}
        fetchImages={fetchImages}
      />
    </div>
  );
}

export default Home;
