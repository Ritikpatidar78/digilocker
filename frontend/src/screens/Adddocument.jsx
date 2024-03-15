import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createdoc, updatedoc } from "../features/document/documentSlice";
import { toast } from "react-toastify";
import Backbutton from "../components/Backbutton";

const Adddocument = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message, edit } = useSelector(
    (state) => state.docs
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [coverimg, setcoverimg] = useState("");

  const onchangefile = (e) => {
    setcoverimg(e.target.files[0]);
  };

  const [formdata, setformdata] = useState({
    title: "",
    description: "",
  });

  const { title, description } = formdata;

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
      description: description,
      coverimg: coverimg,
    };

    await dispatch(createdoc(data));

    toast.success("Document Added");

    setformdata({
      title: "",
      description: "",
    });

    setcoverimg("");
  };

  const handleedit = async (e) => {
    e.preventDefault();
    const data = {
      ...edit.editdoc,
      title: title,
      description: description,
    };
    await dispatch(updatedoc(data));

    toast.success("Document Updated");

    setformdata({
      title: "",
      description: "",
    });

    setcoverimg("");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError || message) {
      toast.error(message);
    }
    if (edit.isedit) {
      setformdata({
        title: edit.editdoc.title,
        description: edit.editdoc.description,
      });
    }
  }, [user, isError, message, edit]);

  if (isLoading) {
    return (
      <div className="container-fluid p-5">
        <h1 className="text-center text-secondary">
          Add New Documents To the Locker
        </h1>
        <Backbutton location={"/"} />
        <div className="card p-3">
          <h3 className="text-center">Please Fill All Details</h3>
          <form className="my-3">
            <input
              type="text"
              className="form-control my-3"
              placeholder="Document Name"
              name="title"
              disabled
              value={title}
              onChange={handlechange}
            />
            <textarea
              name="description"
              value={description}
              onChange={handlechange}
              disabled
              placeholder="Description About the Document"
              className="form-control my-3"
              required
            ></textarea>
            <div className="input-group mb-3">
              <input
                onChange={onchangefile}
                type="file"
                className="form-control"
                disabled
                id="inputGroupFile02"
              />
              <label className="input-group-text">Upload a Document</label>
            </div>
            <button disabled type="submit" className="btn btn-success w-100">
              Add Document
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (edit.isedit) {
    return (
      <div className="container-fluid p-5">
        <h1 className="text-center text-secondary">Edit Your Document</h1>
        <Backbutton location={"/"} />
        <div className="card p-3">
          <h3 className="text-center">Edit your Details</h3>
          <form className="my-3" onSubmit={handleedit}>
            <input
              type="text"
              className="form-control my-3"
              placeholder="Document Name"
              name="title"
              required
              value={title}
              onChange={handlechange}
            />
            <textarea
              name="description"
              value={description}
              onChange={handlechange}
              placeholder="Description About the Document"
              className="form-control my-3"
              required
            ></textarea>
            <div className="input-group mb-3">
              <input
                onChange={onchangefile}
                type="file"
                required
                disabled
                className="form-control"
                id="inputGroupFile02"
              />
              <label className="input-group-text">Upload a Document</label>
            </div>
            <button type="submit" className="btn btn-success w-100">
              Edit Details
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-5">
      <h1 className="text-center text-secondary">
        Add New Documents To the Locker
      </h1>
      <Backbutton location={"/"} />
      <div className="card p-3">
        <h3 className="text-center">Please Fill All Details</h3>
        <form className="my-3" onSubmit={handlesubmit}>
          <input
            type="text"
            className="form-control my-3"
            placeholder="Document Name"
            name="title"
            required
            value={title}
            onChange={handlechange}
          />
          <textarea
            name="description"
            value={description}
            onChange={handlechange}
            placeholder="Description About the Document"
            className="form-control my-3"
            required
          ></textarea>
          <div className="input-group mb-3">
            <input
              onChange={onchangefile}
              type="file"
              required
              className="form-control"
              id="inputGroupFile02"
            />
            <label className="input-group-text">Upload a Document</label>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Add Document
          </button>
        </form>
      </div>
    </div>
  );
};

export default Adddocument;
