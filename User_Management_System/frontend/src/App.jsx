import Login from "./features/auth/Login/UserLogin";
import Signup from "./features/auth/Signup/Signup";
import { Routes, Route } from "react-router-dom";
import UserHome from "./pages/Home/UserHome";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./features/user/Profile/Profile";
import PrivateRoute from "./Components/Private/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
// import AdminRoutes from "./routes/AdminRoutes";
import AdminLogin from "./features/auth/Login/AdminLogin";
import AdminHome from "./pages/Home/AdminHome";
import Dashboard from "./features/admin/Dashboard";
import AdminPrivateRoute from "./Components/Private/AdminPrivateRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="" element={<AdminPrivateRoute />}>
        <Route path="/admin" element={<AdminHome />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <AdminRoutes /> */}
      <ToastContainer />
    </>
  );
};

export default App;