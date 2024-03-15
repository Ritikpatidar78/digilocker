import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletedoc,
  editdoc,
  getsingledoc,
} from "../features/document/documentSlice";
import Backbutton from "../components/Backbutton";

const SingleDocument = () => {
  const { user } = useSelector((state) => state.auth);
  const { sdocument, isLoading } = useSelector((state) => state.docs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const ondelete = async (id) => {
    await dispatch(deletedoc(id));
    navigate("/alldocument");
  };

  const onedit = (data) => {
    dispatch(editdoc(data));
    navigate("/newdocument");
  };

  useEffect(() => {
    dispatch(getsingledoc(id));
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="container-fluid p-5">
        <h1 className="display-5 text-secondary text-center">Loading...</h1>
      </div>
    );
  }

  if (!sdocument) {
    <div className="container-fluid p-5">
      <h1 className="display-5 text-secondary text-center">
        Can't get Details.Try after a while.
      </h1>
    </div>;
  }

  return (
    <div className="container-fluid p-5">
      <h1 className="text-secondary text-center">Your Document Details</h1>
      <Backbutton location={"/alldocument"} />
      <div className="card p-3 my-3">
        <h1 className="card-title">Title : {sdocument.title} </h1>
        <h3>Description : {sdocument.description}</h3>

        <div>
          <img
            className="rounded-t-lg p-3 border border-black w-100 image px-6"
            src={`https://digilocker.onrender.com/${sdocument.coverimg}`}
            alt="img"
          />
        </div>
        <span className="w-100 text-center">
          <button
            className="btn mx-3 m-2 w-50 btn-primary"
            onClick={() => {
              onedit(sdocument);
            }}
          >
            Edit Details
          </button>
          <button
            className="btn mx-3 m-2 w-50 btn-danger"
            onClick={() => {
              ondelete(sdocument._id);
            }}
          >
            Delete Document
          </button>
        </span>
      </div>
    </div>
  );
};

export default SingleDocument;
