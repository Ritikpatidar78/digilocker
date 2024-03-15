import React from "react";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Pagenotfound from "./screens/PageNotFound";
import Adddocument from "./screens/Adddocument";
import AllDocument from "./screens/AllDocument";
import SingleDocument from "./screens/SingleDocument";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="*" element={<Pagenotfound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newdocument" element={<Adddocument />} />
          <Route path="/alldocument" element={<AllDocument />} />
          <Route path="/singledocument/:id" element={<SingleDocument />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
