import { useEffect, useState } from "react";
import { useSelector, useDispatch  } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { adminLogout } from "../../features/admin/adminSlice"

const TokenExpirationHandler = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenExpired = useSelector((state) => state.api?.error?.tokenExpired);
    const [hasNavigated, setHasNavigated] = useState(false);


    useEffect(() =>{
        if(tokenExpired && !hasNavigated){
            setHasNavigated(true)

            if(tokenExpired === 'user'){
                dispatch(logout());
                navigate('/login', { replace: true });
            } else if(tokenExpired === 'admin'){
                dispatch(adminLogout());
                navigate('/admin-login', { replace: true });
            }

        }
    }, [tokenExpired, hasNavigated, navigate, dispatch]);

    return null;
};

export default TokenExpirationHandler;