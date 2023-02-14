import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function Loader() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5rem 2rem",
      }}
    >
      <FontAwesomeIcon icon={faCircleNotch} size="5x" className={"fa-spin"} />
    </div>
  );
}

export default Loader;
