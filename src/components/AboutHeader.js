import React from "react";
import { useAppContext } from "../context/appContext";
import "../styles/AboutHeader.scss";

function AboutHeader() {
  const { username, userProfileImage } = useAppContext();
  return (
    <div className="AboutHeader">
      <div className="imgWrapper">
        <img src={userProfileImage} alt="profile"></img>
      </div>
      <div className="textContainer">
        <h1> {username} </h1>
        <p>
          Explore an amazing collection of free, high-quality photos curated by{" "}
          {username}. With stunning visuals and unique perspectives, these
          photos will elevate your projects and bring your ideas to life.
        </p>
        <p>List of Favorite Photos</p>
      </div>
    </div>
  );
}

export default AboutHeader;
