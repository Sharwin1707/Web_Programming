import axios from "axios";
import React, { useState, useEffect } from "react";
import { useStateContext } from "../Context/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faA, faAdd } from "@fortawesome/free-solid-svg-icons";

const UploadToGallery = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const { user } = useStateContext();
  const artistId = user._id;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/gallery/images/${user._id}`
        );
        setImages(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch images. Please try again.");
      }
    };

    fetchImages();
  }, [artistId]);

  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        // First, upload the image to firebase
        const uploadResponse = await axios.post(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/images/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = uploadResponse.data.url;

        // Then, add the image to the gallery
        const galleryResponse = await axios.post(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/gallery/upload`,
          { artistId, imageUrl }
        );

        console.log(galleryResponse);

        // Fetch updated images
        const updatedImagesResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/gallery/images/${artistId}`
        );
        setImages(updatedImagesResponse.data);
      } catch (err) {
        console.error(err);
        setError("File upload or gallery update failed. Please try again.");
      } finally {
        setLoading(false);
        setFile(null);
      }
    }
  };

  return (
    <div className="my-4">
      <h1 className="text-4xl text-white my-8 text-center josefin">GALLERY</h1>
      <hr className="my-6" />

      <div className="flex justify-end mr-12">
        {!loading && file === null ? (
          <label className="w-12 h-12 bg-blue-500 text-white p-3 rounded-full flex items-center justify-center cursor-pointer">
            <FontAwesomeIcon icon={faAdd} />
            <input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        ) : null}

        {loading ? (
          <div className="flex gap-3 justify-center items-center">
            <img src="vinyl.png" className="w-8 animate-spin" alt="Loading..." />
            <p className="text-white text-md">Uploading...</p>
          </div>
        ) : null}
      </div>


      <div className="mt-4 flex justify-center flex-wrap gap-8">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div className="w-[250px] h-[250px]">
              <img
                key={index}
                src={image.imageUrl}
                alt={`Gallery image ${index}`}
                className="w-full h-full object-cover m-2"
              />
            </div>
          ))
        ) : (
          <p className="text-white text-2xl josefin">Upload something for you fan</p>
        )}
      </div>
    </div>
  );
};

export default UploadToGallery;
