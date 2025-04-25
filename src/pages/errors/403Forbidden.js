// Assets
import NoAccess from "../../assets/no-access.png";

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

const Forbidden = () => {
  return (
    <div className={`text-center ${styles.ErrorWrapper}`}>
      <Image
        src={NoAccess}
        className={`${appStyles.NoResult} ${styles.ErrorImage}`}
        alt="Forbidden Access"
      />
      <h2 className={`mt-4 ${styles.ErrorTitle}`}>Forbidden</h2>
      <p className={`mt-3 ${styles.ErrorMessage}`}>
        You don't have permission to view this page.
      </p>
      <Link to="/" className={styles.ErrorButtonLink}>
        <Button className={styles.ErrorButton}>Return Home</Button>
      </Link>
    </div>
  );
};

export default Forbidden;
