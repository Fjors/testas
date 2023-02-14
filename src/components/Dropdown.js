import React from "react";
import "../styles/Dropdown.scss";
import { menuData } from "../data/MenuData";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ isOpen, toggle }) => {
  const { handleClick, token, username, logoutUser, userProfileImage } =
    useAppContext();

  return (
    <div
      className="dropDownContainer"
      onClick={toggle}
      style={{ opacity: isOpen ? "1" : "0", top: isOpen ? "0" : "-100%" }}
    >
      <div className="icon">
        <FontAwesomeIcon icon={faXmark} onClick={toggle} />
      </div>

      <div className="dropDownMenu">
        <div className="dropDownMenuWrapper">
          {menuData.map((item, index) => {
            return (
              <div key={index} className="dropDownLink">
                <Link to={item.link} onClick={toggle}>
                  <p>{item.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
        {!token && (
          <div className="dropDownLoginBtn">
            <button onClick={() => handleClick()}>Log in</button>
            <button onClick={() => handleClick()}> Sign up</button>
          </div>
        )}

        {token && (
          <div className="dropDownlogoutBtn">
            <div className="dropDownUsername">
              <p>
                Welcome back, <span>{username}</span>
              </p>
            </div>
            {username ? <img src={userProfileImage} alt="profile" /> : null}

            <button onClick={() => logoutUser()}>Logout </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
