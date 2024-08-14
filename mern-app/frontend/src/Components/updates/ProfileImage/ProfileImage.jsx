import { useState, useEffect } from "react";
import { useUploadProfileImageMutation, useGetUserQuery } from "../../../features/user/usersApiSlice";
import { IoSave } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../features/user/authSlice";


const ProfileImage = ({ handleProfileImageModalClose, setProfileImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadProfileImage] = useUploadProfileImageMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data: userData } = useGetUserQuery(userInfo?._id, { skip: !userInfo?._id });
  
  console.log(userData, 'userData');
  
  // Set the initial preview image from the user data
  useEffect(() => {
    if (userData) {
      setPreviewImage(`http://localhost:5000/userProfile/${userData.user.profileImage}`);
    }
  }, [userData]);
  
  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const saveImage = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      const response = await uploadProfileImage(formData).unwrap();

      const { profileImage } = response;

      // Update localStorage
      const updatedUserInfo = { ...userInfo, profileImage };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      
      setProfileImage(profileImage);
      
      dispatch(setCredentials(response));
      handleProfileImageModalClose();

    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  console.log(previewImage, 'previewImage');
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center bg-black/25 rounded-full cursor-pointer">
        <input
          type="file"
          id="fileInput"
          onChange={handleImageChange}
          className="hidden"
        />
        <img
          onClick={handleClick}
          src={previewImage}
          alt="profile-image"
          className="w-36 h-36 rounded-full"
        />
      </div>
      <div className="w-full flex justify-between items-center">
        <button
          onClick={saveImage}
          className="flex justify-center items-center gap-2 bg-blue-700 p-2 rounded-md min-w-28 text-white text-center cursor-pointer hover:bg-blue-800"
        >
          <IoSave />
          Save
        </button>
        <button className="flex justify-center items-center gap-2 bg-red-700 p-2 rounded-md min-w-28 text-white hover:bg-red-800">
          <FaTrashCan />
          Remove
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
