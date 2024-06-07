import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../Context/ContextProvider";

const ImageUpload = ({ id, currentImg , userType }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null); // Define the imageUrl state
  const [error, setError] = useState(null);
  const {user} = useStateContext()


  useEffect(() => {
    setImageUrl(currentImg);
  }, [currentImg]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload image
      const uploadResponse = await axios.post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update profile image in the database
      const saveToDb = {
        _id: id,
        image: uploadResponse.data.url,
      };
      
      if(user.userType === "Artist"){
        await axios.put(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/profile/artist/image`,
        saveToDb
      ) 
      }
      else if(user.userType === "User"){
        await axios.put(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/profile/user/image`,
          saveToDb)
      }
      else if(user.userType === "Organization"){
        await axios.put(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/profile/org/image`,
          saveToDb)
      }

      // Update imageUrl state only after successful upload and database update
      setImageUrl(uploadResponse.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Error uploading image. Please try again.");
    } finally {
      setUploading(false);
      setFile(null)
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex flex-col items-center">
        {/* Display profile picture */}
        <img
          src={imageUrl}
          className="w-40 h-40 rounded-full mb-4 border border-slate-500"
        />

        {/* Custom file input */}
        <label
          htmlFor="profilePicInput"
          className="absolute bottom-0 right-0 cursor-pointer"
        >
          <span className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
            <FontAwesomeIcon icon={faUpload} />
          </span>
          <input
            id="profilePicInput"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Upload button */}
      </div>

      {file ? (
        <div
          className="bg-blue-500 text-white px-2 py-1"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </div>
      ) : (
        ""
      )}

      {/* Display error message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImageUpload;
