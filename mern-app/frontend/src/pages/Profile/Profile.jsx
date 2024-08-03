import React, { useEffect, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import Header from "../../Components/Header/Header";
import { useSelector } from "react-redux";
import Modal from "../../Components/modal/Modal";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setEmail(userInfo.email);
  }, [userInfo.firstName, userInfo.email]);

  const handleModalOpen = () =>{
    setIsModalOpen(true)
  }

  const handleModalClose = () =>{
    setIsModalOpen(false)
  }



  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="bg-black/65 h-screen flex justify-center items-center sm:px-10 overflow-hidden">
        <div className="sm:w-1/2 bg-white flex-col justify-center py-5">
          <div className="flex sm:flex-row h-[400px] gap-2 sm:p-4">
            <div className="w-1/2 flex-row justify-center">
              <div className="w-full mt-10 max-sm:m-4">
                <div className="flex justify-center">
                  <div className="bg-blue-400 rounded-full w-24 h-24">
                    <img src="" alt="" className="w-24 h-24 rounded-full" />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  {/* <div className="text-center bg-black/65 text-white rounded-xl p-1 w-32 cursor-pointer">
                  Social Media
                </div> */}
                  <div onClick={handleModalOpen} className="flex items-center justify-center gap-1 py-3 cursor-pointer">
                    <RiEdit2Line />
                    <h2>Edit</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex max-sm:m-5 p-5">
              <div className="w-full mt-5">
                <h1 className="font-semibold text-xl">My Profile</h1>
                <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-4">
                  <div className="mt-4 px-2">
                    <label
                      htmlFor="firstName"
                      className="text-xs uppercase text-gray-400"
                    >
                      First Name
                    </label>
                    <div className="bg-gray-200 rounded p-1 h-8">
                      <h1>{userInfo?.firstName}</h1>
                    </div>
                  </div>
                  <div className="mt-4 px-2">
                    <label
                      htmlFor="lastName"
                      className="text-xs uppercase text-gray-400"
                    >
                      Last Name
                    </label>
                    <div className="bg-gray-200 rounded p-1 h-8">
                      <h1>{userInfo?.lastName}</h1>
                    </div>
                  </div>
                  <div className="mt-4 px-2">
                    <label
                      htmlFor="phone"
                      className="text-xs uppercase text-gray-400"
                    >
                      Phone
                    </label>
                    <div className="bg-gray-200 rounded p-1 h-8">
                      <h1>{userInfo?.phone}</h1>
                    </div>
                  </div>
                  <div className="mt-4 px-2">
                    <label
                      htmlFor="email"
                      className="text-xs uppercase text-gray-400"
                    >
                      Email
                    </label>
                    <div className="bg-gray-200 rounded p-1 h-8">
                      <h1>{userInfo?.email}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <div className="bg-gray-200 h-28 w-full"></div>
          </footer>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} title={"Update Profile"} button={"Update"}><UpdateProfile/></Modal>
    </div>
  );
};

export default Profile;
