import React, { useEffect, useState } from "react";
import "../styles/Navbar.scss";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import { menuData } from "../data/MenuData";
import Dropdown from "../components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const {
    handleClick,
    token,
    username,
    logoutUser,
    userProfileImage,
    getUserProfileImage,
  } = useAppContext();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (username && !userProfileImage) {
      getUserProfileImage();
    }
  }, [token, username]);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="menu">
          {menuData.map((item, index) => {
            return (
              <div key={index}>
                <Link to={item.link}>
                  <p>{item.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
        {!token && (
          <div className="loginBtn">
            <button onClick={() => handleClick()}>Log in</button>
            <button onClick={() => handleClick()}> Sign up</button>
          </div>
        )}

        {token && (
          <div className="logoutBtn">
            <div className="username">
              <p>
                Welcome back, <span>{username}</span>
              </p>
            </div>
            {username ? <img src={userProfileImage} alt="profile" /> : null}

            <button onClick={() => logoutUser()}>Logout </button>
          </div>
        )}
      </div>
      <div className="mobileMenuBtn" onClick={toggle}>
        <FontAwesomeIcon icon={faBars} size={"2x"} />
      </div>
      <Dropdown isOpen={isOpen} toggle={toggle} />
    </div>
  );
}

export default Navbar;
