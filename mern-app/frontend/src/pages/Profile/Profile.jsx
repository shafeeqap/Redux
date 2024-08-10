import React, { useEffect, useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import Header from "../../Components/Header/Header";
import { useSelector } from "react-redux";
import Modal from "../../Components/modal/Modal";
import UpdateProfile from "../../Components/updates/UpadateProfile/UpdateProfile";
import UpdatePassword from "../../Components/updates/UpdatePassword/UpdatePassword";
import ProfileImage from "../../Components/updates/ProfileImage/ProfileImage";
import { useGetUserQuery } from "../../features/user/usersApiSlice";
import { CgProfile } from "react-icons/cg";
import profile_icon from "../../assets/profile-icon.png";

const Profile = () => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobile, setMobile] = useState("");
  // const [profileImage, setProfileImage] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);

  // Fetch user data
  const { data, isLoading, isError } = useGetUserQuery();

  // useEffect(() => {
  //   setFirstName(userInfo.firstName);
  //   setLastName(userInfo.lastName);
  //   setMobile(userInfo.mobile);
  //   setEmail(userInfo.email);
  //   setProfileImage(userInfo.profileImage);
  // }, [userInfo]);

  const user = data?.user || {};
  const { firstName, lastName, email, mobile, profileImage } = user;

  const imageUrl = `http://localhost:5000/public/${user.profileImage}`;
  const imageSrc = profileImage ? imageUrl : <CgProfile />;

  // const imageSrc = `data:${data?.contentType};base64,${data?.data}`; // Construct image URL

  // const imageSrc = data?.contentType && data?.data
  // ? `data:${data.contentType};base64,${data.data}`
  // : null; // Or provide a default image URL

  // const imageSrc = data?.profileImage
  // ? `data:<span class="math-inline">\{data\.contentType\};base64,</span>{data.profileImage}` // Construct image URL
  // : null;

  console.log(imageSrc, "imageSrc");

  const handleProfileModalOpen = () => setIsProfileModalOpen(true);
  const handleProfileModalClose = () => setIsProfileModalOpen(false);
  const handlePasswordModalOpen = () => setIsPasswordModalOpen(true);
  const handlePasswordModalClose = () => setIsPasswordModalOpen(false);
  const handleProfileImageModalOpen = () => setIsProfileImageModalOpen(true);
  const handleProfileImageModalClose = () => setIsProfileImageModalOpen(false);

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="bg-black/65 h-screen flex justify-center items-center sm:px-10 overflow-hidden">
        <div className="sm:w-1/2 bg-white flex-col justify-center py-5">
          <div className="flex sm:flex-row h-[400px] gap-2 sm:p-4 min-w-fit">
            <div className="w-1/2 flex-row justify-center">
              <div className="w-full mt-10 max-sm:m-4">
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
                <h1 className="font-semibold text-xl">My Profile</h1>
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
                      <h1>{firstName}</h1>
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
                      <h1>{lastName}</h1>
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
                      <h1>{mobile}</h1>
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
                      <h1>{email}</h1>
                    </div>
                  </div>
                </div>
                <div className="mt-4 px-2 mb-5 border rounded p-5 relative">
                  <div
                    onClick={handlePasswordModalOpen}
                    className="flex items-center"
                  >
                    <div className="flex items-center gap-2 cursor-pointer">
                      <h1>change password</h1>
                      <RiEdit2Line />
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