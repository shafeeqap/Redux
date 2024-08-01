import React from "react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { useFetchUserQuery } from "../../features/users/usersApiSlice";

const Navbar = () => {
  const { data: users, isLoading, error } = useFetchUserQuery();

  return (
    <div className="flex justify-between items-center bg-black/75 p-2 px-5">
      <div className="font-bold text-white">CRUD_RTK</div>
      <div className="flex">
        {users ? (
          <button className="text-white flex items-center gap-2">
            <CiLogout />
            Logout
          </button>
        ) : (
          <button className="text-white flex items-center gap-2">
            <CiLogin />
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
