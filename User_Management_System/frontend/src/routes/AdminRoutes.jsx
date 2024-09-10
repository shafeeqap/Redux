import AdminLogin from "../features/auth/Login/AdminLogin";
import { Routes, Route } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
