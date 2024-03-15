import React from "react";
import { Link } from "react-router-dom";

const Backbutton = ({ location }) => {
  return (
    <Link className="btn btn-dark m-1" to={location}>
      Back
    </Link>
  );
};

export default Backbutton;
