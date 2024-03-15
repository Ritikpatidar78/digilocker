import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Backbutton from "../components/Backbutton";
import Document from "../components/Document";
import { getalldoc } from "../features/document/documentSlice";
import { toast } from "react-toastify";

const AllDocument = () => {
  const { user } = useSelector((state) => state.auth);
  const { documents, isLoading } = useSelector((state) => state.docs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getalldoc());

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

  if (!documents || documents.length == 0) {
    return (
      <div className="container-fluid p-5">
        <h1 className="display-5 text-secondary text-center">
          No Documents Uploaded
        </h1>
      </div>
    );
  }

  return (
    <div className="container-fluid p-5">
      <Backbutton location={"/"} />
      <h1 className="text-secondary text-center">All Documents</h1>

      <div className="card p-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {documents.map((item, index) => (
              <Document doc={item} key={item._id} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDocument;
