import React, { useState } from "react";
import { useUploadFileMutation, useGetFileQuery } from "../services/apiSlice";
import { RiImageAddFill } from "react-icons/ri";

const FileUploader = () => {
  // const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageId, setImageId] = useState(
    () => localStorage.getItem("imageId") || ""
  );
  const [uploadFile, { isLoading, isSuccess, isError }] =
    useUploadFileMutation();
  const {
    data: fileData,
    error: fetchError,
    isLoading: isFetching,
  } = useGetFileQuery(imageId, { skip: !imageId });

  console.log(fileData, "fileData");

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

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await uploadFile(formData).unwrap(); // Use unwrap for direct access to data

      if (response && response.uploadedFile) {
        setImageId(response.uploadedFile._id);
        localStorage.setItem("imageId", response.uploadedFile._id);
      }

      console.log(response, "response");
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-full h-screen">
      <div className="w-full sm:w-1/2 mt-5">
        <div className="text-center">
          <h1 className="font-bold text-3xl underline">File Upload</h1>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg m-5">
          <input
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            className="hidden"
          />
          <div
            onClick={handleClick}
            className="max-w-20 max-h-20 max-sm:w-fit max-sm:h-fit flex flex-col items-center justify-center m-5 bg-white rounded-full cursor-pointer"
          >
            <div>
              
            </div>
            {previewImage ? (
              <img
                src={previewImage}
                alt=""
                className="min-w-20 min-h-20 rounded-full border"
              />
            ) : (
              <RiImageAddFill className="min-w-20 min-h-20 sm:text-8xl p-3" />
            )}
          </div>
          <button
            className="bg-blue-500 text-white rounded p-1 sm:min-w-28"
            onClick={handleUpload}
            disabled={isLoading}
          >
            Upload
          </button>
        </div>
      </div>
      <div className="w-full sm:w-1/2 mt-5">
        <div className="">
          {isError && <p>Error uploading file: {isError.message}</p>}
          {isFetching ? (
            <p>Loading file...</p>
          ) : (
            fileData && (
              <div className="flex flex-col items-center p-4">
                <div className="text-center">
                  <h2 className="font-bold text-3xl underline">File Details</h2>
                  <p className="text-red-500">
                    Filename: {fileData.file.filename}
                  </p>
                </div>
                <a
                  className="bg-green-500 p-1 sm:min-w-36 rounded text-white px-3 m-3 text-center"
                  href={`http://localhost:5001/${fileData.file.filename}`}
                  download
                >
                  Download File
                </a>
                <div className="text-center">
                  <h3 className="text-lg underline font-bold">
                    Uploaded Image
                  </h3>
                </div>
                <div className="border border-black m-3">
                  <img
                    src={`http://localhost:5001/${fileData.file.filename}`}
                    alt="Uploaded"
                    className="sm:w-96 sm:h-96"
                  />
                </div>
              </div>
            )
          )}
          {fetchError && <p>Error fetching file: {fetchError.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
