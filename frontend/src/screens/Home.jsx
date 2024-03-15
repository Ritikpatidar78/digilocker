import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="container-fluid p-5">
      <h1 className="text-secondary text-center">Welcome User!</h1>
      <div className="card p-5 my-3">
        <h2 className="text-center mb-3">Digital Locker.</h2>
        <Link to={"/newdocument"} className="btn btn-outline-secondary my-2">
          Upload Documents
        </Link>
        <Link to={"/alldocument"} className="btn btn-outline-secondary my-2">
          View All Documents
        </Link>
      </div>
    </div>
  );
};

export default Home;
