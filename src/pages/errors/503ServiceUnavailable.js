// React
import React from "react";

// Assets
import NoResults from "../../assets/no-results.png";

// Bootstrap Components
import Image from "react-bootstrap/Image";

// CSS
import appStyles from "../../App.module.css";

// React Router
import { Link } from "react-router-dom";

const ServiceUnavailable = () => {
  return (
    <div className={`text-center`}>
      <Image src={NoResults} className={appStyles.NoResult} />
      <h2 className="mt-3">Service Unavailable</h2>
    </div>
  );
};

export default ServiceUnavailable;
