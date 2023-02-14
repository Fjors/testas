import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageList from "../components/ImageList";
import AboutHeader from "../components/AboutHeader";
import Loader from "../helpers/Loader";
import { useAppContext } from "../context/appContext";

function About() {
  const { token, username } = useAppContext();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const fetchImages = () => {
    setLoading(true);

    let params = {
      page,
      per_page: 20,
    };

    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(`https://api.unsplash.com/users/${username}/likes`, {
        headers,
        params,
      })

      .then((response) => {
        setImages([...images, ...response.data]);
        console.log("gauname about page liked img");
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
    fetchImages();
  }, []);

  return (
    <div>
      <AboutHeader />
      {loading && <Loader />}
      <ImageList images={images} fetchImages={fetchImages} />
    </div>
  );
}

export default About;
