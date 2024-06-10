import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faArrowLeft,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useStateContext } from "../Context/ContextProvider";
import axios from "axios";

// Custom hook to fetch artist data with Suspense
let cache = {};

function fetchArtistData() {
  if (!cache.artistDataPromise) {
    cache.artistDataPromise = axios
      .get(`${import.meta.env.VITE_SERVER_ENDPOINT}/profile/artist`)
      .then((response) => {
        if (response.status === 200) {
          cache.artistData = response.data;
          return response.data;
        } else {
          throw new Error("Error fetching data");
        }
      });
  }
  if (!cache.artistData) {
    throw cache.artistDataPromise;
  }
  return cache.artistData;
}

const useArtistData = () => {
  return fetchArtistData();
};

const ArtistProfilePage = () => {
  const { id } = useParams();
  const { isGuest, user } = useStateContext();
  const artistData = useArtistData();
  const artist = artistData.filter((artist) => artist._id === id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [isBigImage, setIsBigImage] = useState(false);
  const [bigImage, setBigImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/gallery/images/${id}`
        );
        setImages(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch images. Please try again.");
      }
    };

    fetchImages();
  }, [id]);

  const handleBigImage = (image) => {
    setIsBigImage(true);
    setBigImage(image);
  };

  const closeBigImage = () => {
    setIsBigImage(false);
    setBigImage(null);
  };

  return (
    <div className="w-full  flex flex-col items-center pt-8">
      <div className="w-full max-w-[1280px]">
        <div className="">
          <Link to={user ? "/artist" : "/guest/artist"}>
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faArrowLeft}
              size="2x"
            />
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center">
          <br />
          <br />
          <h1 className="text-center text-4xl josefin">
            {artist[0].stageName}
          </h1>
          <br />
          <div>Profile Music Photo Video</div>
          <br />
          <div className="max-w-[600px] max-h-[600px] overflow-hidden rounded-md">
            <img
              className="w-full h-full object-cover rounded-md"
              src={artist[0].image}
              alt=""
            />
          </div>

          <p className="text-center my-4 josefin">
            <strong>About</strong>
            <br />
            {artist[0].about}
          </p>

          <p className="text-center josefin">
            Career: {artist[0].career}
            <br />
            Genre: {artist[0].genre}
            <br />
            Birthday: {artist[0].birthday}
            <br />
            Music: {artist[0].music}
          </p>

          <br />
          <br />
          <br />

          <h1 className="josefin text-white text-2xl">GALLERY</h1>

          <hr className="w-full" />

          <div className="mt-4 w-full max-w-[1280px] flex justify-center flex-wrap gap-8 my-8">
            {images.length > 0 ? (
              images.map((image, index) => (
                <div
                  onClick={() => {
                    handleBigImage(image.imageUrl);
                  }}
                  className="cursor-pointer w-[250px] h-[250px] rounded-md overflow-hidden"
                >
                  <img
                    key={index}
                    src={image.imageUrl}
                    alt={`Gallery image ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <p className="text-white text-2xl josefin">
                No images uploaded by <span>{artist[0].stageName}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {isBigImage ? (
        <div className="fixed top-0 left-0 p-[12%] flex flex-col justify-center items-center inset-0 w-full h-screen bg-black bg-opacity-80 ">
          <div className="w-full flex justify-end pt-[200px]">
            <FontAwesomeIcon onClick={closeBigImage} icon={faClose} size="2x" />
          </div>
          <div className="max-w-[720px]">
            <img className="w-full h-full object-cover" src={bigImage} alt="" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const ArtistProfilePageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ArtistProfilePage />
  </Suspense>
);

export default ArtistProfilePageWithSuspense;
