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
    <div className="container-fluid  p-5">
      <h1 className="text-secondary text-center text-capitalize">
        Welcome {!user ? "hello" : user.name}
      </h1>
      <div className="card boxone shadow-lg p-5 my-3">
        <h2 className="text-center text-secondary mb-3">Digital Locker.</h2>
        <Link
          to={"/newdocument"}
          className="btn shadow-sm btn-outline-secondary my-2"
        >
          Upload Documents
        </Link>
        <Link
          to={"/alldocument"}
          className="btn shadow-sm btn-outline-secondary my-2"
        >
          View All Documents
        </Link>
      </div>
    </div>
  );
};

export default Home;
