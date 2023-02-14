import React, { useState } from "react";
import Masonry from "react-masonry-css";
import "../styles/ImageList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppContext } from "../context/appContext";

function ImageList({ images, fetchImages }) {
  const { setLike, setUnLike, token, handleClick } = useAppContext();
  const [imageLikes, setImageLikes] = useState({});

  const breakpoints = {
    default: 3,
    1100: 2,
    750: 1,
  };

  const toggleLike = async (image, likedByUser) => {
    if (!token) {
      handleClick();
      return;
    }
    try {
      const newLikedState = !likedByUser;
      setImageLikes((prevImageLikes) => ({
        ...prevImageLikes,
        [image.id]: newLikedState,
      }));

      if (newLikedState) {
        await setLike(image.id);
      } else {
        await setUnLike(image.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="result">
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more images</b>
          </p>
        }
      >
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images?.map((image) => (
            <div key={image.id}>
              <div>
                <div key={image.id} className="imageWrapper">
                  <div
                    onClick={() =>
                      toggleLike(
                        image,
                        imageLikes[image.id] || image.liked_by_user
                      )
                    }
                    className="like"
                    style={{
                      backgroundColor:
                        imageLikes[image.id] !== undefined
                          ? imageLikes[image.id]
                            ? "#F15150"
                            : "white"
                          : image.liked_by_user
                          ? "#F15150"
                          : "white",
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </div>

                  <img src={image.urls.small} alt={image.alt_description} />
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}

export default ImageList;
