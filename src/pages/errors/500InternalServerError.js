// Assets
import NoService from "../../assets/no-service.png";

// Bootstrap Components
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

// CSS
import appStyles from "../../App.module.css";
import styles from "../../styles/CustomErrors.module.css";

// React
import React from "react";

// React Router
import { Link } from "react-router-dom";

const ServiceUnavailable = () => {
  return (
    <div className={`text-center ${styles.ErrorWrapper}`}>
      <Image
        src={NoService}
        className={`${appStyles.NoResult} ${styles.ErrorImage}`}
        alt="Internal Server Error"
      />
      <h2 className={`mt-4 ${styles.ErrorTitle}`}>Internal Server Error</h2>
      <p className={`mt-3 ${styles.ErrorMessage}`}>
        We're currently experiencing issues. Please try again later.
      </p>
      <Link to="/" className={styles.ErrorButtonLink}>
        <Button className={styles.ErrorButton}>Return Home</Button>
      </Link>
    </div>
  );
};

export default ServiceUnavailable;
