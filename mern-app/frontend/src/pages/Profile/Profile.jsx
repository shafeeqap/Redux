import { useEffect, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/modal/Modal";
import UpdateProfile from "../../Components/updates/UpadateProfile/UpdateProfile";
import UpdatePassword from "../../Components/updates/UpdatePassword/UpdatePassword";
import ProfileImage from "../../Components/updates/ProfileImage/ProfileImage";
import { useGetUserQuery } from "../../features/user/usersApiSlice";
import {
  openProfileModal,
  closeProfileModal,
  openPasswordModal,
  closePasswordModal,
  openProfileImageModal,
  closeProfileImageModal,
} from "../../features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import default_image from "../../assets/profile-icon.png";
import { MdOutlineLockReset } from "react-icons/md";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { isProfileModalOpen, isPasswordModalOpen, isProfileImageModalOpen } = useSelector((state) => state.modal);
  const [profileImage, setProfileImage] = useState(default_image);
  const dispatch = useDispatch();

  // Fetch user data
  const { data, refetch } = useGetUserQuery();

  const handleProfileModalOpen = () => {
    dispatch(openProfileModal());
  };

  const handleProfileModalClose = () => {
    dispatch(closeProfileModal());
    refetch();
  };

  const handlePasswordModalOpen = () => {
    dispatch(openPasswordModal());
  };

  const handlePasswordModalClose = () => {
    dispatch(closePasswordModal());
  };

  const handleProfileImageModalOpen = () => {
    dispatch(openProfileImageModal());
  };

  const handleProfileImageModalClose = () => {
    dispatch(closeProfileImageModal());
  };

  useEffect(() => {
    if (userInfo && userInfo.profileImage) {
      setProfileImage(
        `http://localhost:5000/userProfile/${userInfo.profileImage}`
      );
    } else {
      setProfileImage(default_image);
    }
  }, [userInfo]);

  return (
    <div className="h-screen overflow-hidde">
      <Header />
      <div className="bg-black/65 min-h-svh flex justify-center sm:px-10 overflow-hidden">
        <div className="bg-white justify-center">
          <div className="flex flex-col sm:p-4 min-w-fit">
            <div className="flex-row justify-center items-center rounded-md bg-gray-300">
              <div className="w-full p-5 max-sm:m-4">
                <div className="flex justify-center">
                  <div className="bg-blue-400 rounded-full w-24 h-24 relative">
                    <img
                      src={profileImage}
                      alt="profile-image"
                      className="w-24 h-24 rounded-full"
                    />
                    <div
                      onClick={handleProfileImageModalOpen}
                      className="flex items-center justify-center absolute top-15 right-0 bottom-2 bg-black/30 rounded-full w-6 h-6 cursor-pointer"
                    >
                      <FaPlus className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  {/* <div className="text-center bg-black/65 text-white rounded-xl p-1 w-32 cursor-pointer">
                  Social Media
                </div> */}
                </div>
              </div>
            </div>
            <div className="w-full flex max-sm:m-5 p-5">
              <div className="w-full mt-5">
                <h1 className="font-bold text-xl uppercase">My Profile</h1>
                <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-4 border rounded relative">
                  <div
                    onClick={handleProfileModalOpen}
                    className="flex items-center absolute cursor-pointer end-2"
                  >
                    <RiEdit2Line />
                  </div>
                  <div className="mt-4 px-2">
                    <label
                      htmlFor="firstName"
                      className="text-xs uppercase text-gray-400"
                    >
                      First Name
                    </label>
                    <div className="bg-gray-200 rounded p-1 h-8 min-w-fit">
                      <h1>{data?.user.firstName}</h1>
                    </div>
                  </div>
                  <div className="mt-4 px-2">
                    <label
                      htmlFor="lastName"
                      className="text-xs uppercase text-gray-400"
                    >
                      Last Name
                    </label>
                    <div className="bg-gray-200 rounded p-1 h-8 min-w-fit">
                      <h1>{data?.user.lastName}</h1>
                    </div>
                  </div>
                  <div className="mt-4 px-2">
                    <label
                      htmlFor="phone"
                      className="text-xs uppercase text-gray-400"
                    >
                      Mobile
                    </label>
                    <div className="bg-gray-200 rounded p-1 h-8">
                      <h1>{data?.user.mobile}</h1>
                    </div>
                  </div>
                  <div className="mt-4 px-2 mb-5">
                    <label
                      htmlFor="email"
                      className="text-xs uppercase text-gray-400"
                    >
                      Email
                    </label>
                    <div className="bg-gray-200 rounded p-1 h-8 min-w-fit">
                      <h1>{data?.user.email}</h1>
                    </div>
                  </div>
                </div>
                <div className="mt-4 px-2 mb-5 border rounded p-5 relative">
                  <div
                    onClick={handlePasswordModalOpen}
                    className="flex items-center"
                  >
                    <div className="flex items-center gap-2 cursor-pointer">
                      <MdOutlineLockReset className="text-gray-400 text-2xl" />
                      <h1 className="uppercase font-bold">change password</h1>
                      {/* <RiEdit2Line /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <footer>
            <div className="bg-gray-300 min-h-32 w-full rounded-md"></div>
          </footer>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isProfileModalOpen}
        onClose={handleProfileModalClose}
        title={"Update Profile"}
      >
        <UpdateProfile handleProfileModalClose={handleProfileModalClose} />
      </Modal>
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordModalClose}
        title={"Update Password"}
      >
        <UpdatePassword handlePasswordModalClose={handlePasswordModalClose} />
      </Modal>
      <Modal
        isOpen={isProfileImageModalOpen}
        onClose={handleProfileImageModalClose}
        title={"Update Profile Image"}
      >
        <ProfileImage
          handleProfileImageModalClose={handleProfileImageModalClose}
        />
      </Modal>
    </div>
  );
};

export default Profile;
