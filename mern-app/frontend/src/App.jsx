import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./Components/Private/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./pages/PageNotFound/PageNotFound";


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
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
        <ToastContainer />
    </>
  );
};

export default App;
