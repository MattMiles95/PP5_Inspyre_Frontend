// Bootstrap Components
import Spinner from "react-bootstrap/Spinner";

// CSS
import styles from "../styles/Asset.module.css";

// React
import React from "react";

const Asset = ({ spinner, src, message, imgClassName }) => {
  return (
    <div className={`${styles.Asset}`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} className={imgClassName} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;
