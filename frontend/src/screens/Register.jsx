import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [confirmpassword, setconfirmpassword] = useState("");
  const { user, message, isError } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });

  const { name, number, email, password } = formdata;

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (password.length < 5) {
      toast.error("Enter Atleast 5 digits Password");
      return;
    }

    if (password === confirmpassword) {
      dispatch(register(formdata));
      setformdata({
        name: "",
        number: "",
        email: "",
        password: "",
      });
      setconfirmpassword("");
    } else {
      toast.error("Enter Same Password");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (isError || message) {
      toast.error(message);
    }
  }, [user, message, isError]);

  return (
    <div className="container-fluid p-5">
      <h1 className="text-center text-secondary">Register Here</h1>
      <div className="card p-3 my-3">
        <form className="my-3" onSubmit={handlesubmit}>
          <input
            placeholder="Name"
            type="text"
            name="name"
            value={name}
            onChange={handlechange}
            className="form-control my-3"
            required
          />
          <input
            placeholder="Phone No."
            type="number"
            name="number"
            value={number}
            onChange={handlechange}
            className="form-control my-3"
            required
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={handlechange}
            className="form-control my-3"
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlechange}
            className="form-control my-3"
            required
          />
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirmpassword"
            value={confirmpassword}
            onChange={(e) => {
              setconfirmpassword(e.target.value);
            }}
            className="form-control my-3"
            required
          />
          <button className="btn btn-success w-100">Register</button>
          <p className="text-secondary py-4">
            Already have an Account? <Link to={"/login"}>Login.</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
