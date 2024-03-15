import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const { user, message, isError } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formdata;

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(login(formdata));
    setformdata({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (message || isError) {
      toast.error(message);
    }
  }, [user, message, isError]);

  return (
    <div className="container-fluid p-5">
      <h1 className="text-center text-secondary">Login Here</h1>
      <div className="card p-3 my-3">
        <form className="my-3" onSubmit={handlesubmit}>
          <input
            placeholder="Enter Email"
            type="email"
            name="email"
            value={email}
            onChange={handlechange}
            className="form-control my-3"
            required
          />
          <input
            placeholder="Enter Password"
            type="password"
            name="password"
            value={password}
            onChange={handlechange}
            className="form-control my-3"
            required
          />
          <button className="btn btn-success w-100">Login</button>
          <p className="text-secondary py-4">
            Don't have an Account? <Link to={"/register"}>Register.</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
