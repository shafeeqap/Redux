import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { adminLogout } from "../../features/admin/adminSlice";
// import { useSomeApiQuery } from "../../services/apiSlice";



const TokenExpirationHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const tokenExpired = useSelector((state) => state.api?.error?.tokenExpired);
  // const { data, error } = useSomeApiQuery();

  useEffect(() => {
    if (error.tokenExpired === "user") {
      dispatch(logout());
      navigate("/login", { replace: true });
    } else if (error.tokenExpired === "admin") {
      dispatch(adminLogout());
      navigate("/admin-login", { replace: true });
    }
  }, [error, navigate, dispatch]);

  return null;
};

export default TokenExpirationHandler;
