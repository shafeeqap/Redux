import React from "react";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./Components/Private/PrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
