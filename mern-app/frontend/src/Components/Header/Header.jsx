import { useState } from "react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import Dropdown from "../Dropdown/Dropdown";
import { useLogoutMutation } from "../../features/user/usersApiSlice.js";
import { logout } from "../../features/user/authSlice.js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);


  return (
    <>
    <header className="p-4 bg-black/85">
      <nav>
        <div className="flex justify-between px-5 text-white">
          <div className="font-bold text-lg uppercase">
            h<span className="text-yellow-700">o</span>riz<span className="text-yellow-700">o</span>n
          </div>
          <div className="hidden md:flex justify-between items-center">
            {userInfo ? (
              <Dropdown/>
            ) : (
              <Link to="/login" className="flex items-center gap-1">
                <CiLogin />
                Login
              </Link>
            )}
          </div>
          <div className="flex flex-col justify-center items-end md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <RxHamburgerMenu />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <ul className="md:hidden flex flex-col ml-4 mt-4 text-white">
            <li className="hover:bg-black/10 p-1 cursor-pointer">Login</li>
            <li className="hover:bg-black/10 p-1 cursor-pointer">Profile</li>
            <li className="hover:bg-black/10 p-1 cursor-pointer">Logout</li>
          </ul>
        )}
      </nav>
    </header>
    </>
  );
};

export default Header;
