import { useSelector } from "react-redux";
import AdminHeader from "../../Components/Header/AdminHeader";
import { Link } from "react-router-dom";
import adminbg from "../../assets/adminbg.jpg";
import { useEffect, useState } from "react";

const AdminHome = () => {
  const [profileImage, setProfileImage] = useState();
  const { adminInfo } = useSelector((state) => state.admin);

  useEffect(() => {
    if (adminInfo.profileImage) {
      setProfileImage(
        `http://localhost:5000/userProfile/${adminInfo.profileImage}`
      );
    }
  }, [adminInfo]);

  return (
    <div className="h-screen overflow-hidden">
      <AdminHeader />
      <div className="flex h-screen">
        <div className="flex flex-col justify-center items-center w-1/2">
          <div className="w-full px-5 max-sm:py-20 sm:px-20">
              <h1 className="font-bold uppercase text-gray-500 mb-3 border-b-2 border-black">
                Welcome Admin Home Page!
              </h1>
            <div className="flex items-center gap-2">
              <div className="font-semibold text-lg sm:text-xl">
                <h2 className="text-blue-500 uppercase">
                  {adminInfo?.firstName}
                </h2>{" "}
              </div>
            <small className="text-red-500 text-sm">({adminInfo.role})</small>
            </div>
            <div className="rounded-full w-28 h-28 border border-gray-300">
              <img
                src={profileImage}
                className="rounded-full w-28 h-28"
                alt=""
              />
            </div>
          </div>
          <div className="flex justify-start w-full py-5 gap-5 px-5 max-sm:py-20 sm:px-20">
            <Link
              to="/dashboard"
              className="bg-gray-500 hover:bg-gray-600 hover:text-gray-100 text-white p-1 rounded-xl text-center w-36"
            >
              Dashboard
            </Link>
          </div>
        </div>
        <div className="w-1/2">
          <img src={adminbg} alt="" className="h-screen w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
