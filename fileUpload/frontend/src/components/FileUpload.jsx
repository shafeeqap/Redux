import React, { useState } from "react";
import { useUploadImageMutation } from "../services/apiSlice";
import FileDisplay from "./FileDisplay"; 

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [uploadImage, { isLoading, isSuccess, isError, data }] = useUploadImageMutation();

  const submitImage = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadImage(formData);
    console.log(result);
    if (result.data && result.data.id) {
      setImageId(result.data.id);
      localStorage.setItem('imageId', result.data.id)
    }
  };


  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" disabled={isLoading}>
          Upload
        </button>
        {isSuccess && <p>File uploaded successfully: {imageId}</p>}
        {isError && <p>Error uploading file.</p>}
      </form>

      {imageId && <FileDisplay imageId={imageId} />}
    </div>
  );
};

export default FileUpload;
