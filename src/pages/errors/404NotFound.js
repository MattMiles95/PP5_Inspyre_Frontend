// Assets
import NoResults from "../../assets/no-results.png";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// CSS
import styles from "../../styles/CustomErrors.module.css";

// React
import React from "react";

// React Router
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={`text-center ${styles.ErrorWrapper}`}>
      <Image
        src={NoResults}
        className={styles.ErrorImage}
        alt="Page Not Found"
      />
      <h2 className={`mt-4 ${styles.ErrorTitle}`}>Oops! Page Not Found</h2>
      <p className={`mt-3 ${styles.ErrorMessage}`}>
        It seems you've wandered off track. Let's get you back to the others!
      </p>
      <Link to="/" className={styles.ErrorButtonLink}>
        <Button className={styles.ErrorButton}>Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
