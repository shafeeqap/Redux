import React from "react";
import { useGetImageQuery } from "../services/apiSlice";

const FileDisplay = ({ imageId }) => {
  console.log(localStorage.getItem('imageId'),'localStorage');
  const { data, error, isLoading, refetch } = useGetImageQuery(localStorage.getItem('imageId'));

  const imageSrc = `data:${data?.contentType};base64,${data?.data}`; // Construct image URL

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching file.</p>}
      {imageSrc && (
        <div>
          <img style={{width: "200px", height: "200px"}} src={imageSrc} alt="image" />
        </div>
      )}
    </div>
  );
};

export default FileDisplay;
