import React from "react";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
