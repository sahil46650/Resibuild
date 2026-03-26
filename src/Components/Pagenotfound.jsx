import React from "react";
import { Link } from "react-router-dom";
import img from '../assets/images/404-new.png'

const Pagenotfound = () => {
  return (
    <div className="error-area pt-50 pb-100">
      <div className="container">
        <div className="error-content">
          <img
            src={img}
            alt="404 Error"
          />
          <h1>404 Page Not Found</h1>
          <h5>The document/file requested was not found on this server.</h5>
          <Link to="/" className="default-btn no-found">
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pagenotfound;
