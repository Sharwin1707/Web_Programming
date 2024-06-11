import React, { useState, useEffect, useRef } from "react";
import CustomCarousel from "../Components/Carousel";
import { data, shopData } from "../sampleData";
import BookingProfile from "../Components/BookingProfile";
import ShopItem from "../Components/ShopItem";
import { useLocation } from "react-router-dom";
import ArtistCard from "../Components/ArtistCard";
import { useFetch } from "../Hook/useFetch";
import axios from "axios";

const HomePage = () => {
  const sampleImage = [
    { id: "img1", url: "https://i.ytimg.com/vi/jfMjbVIGzYc/maxresdefault.jpg" },
    { id: "img2", url: "https://i.ytimg.com/vi/tMcYSxFYmGI/maxresdefault.jpg" },
    { id: "img3", url: "https://i.ytimg.com/vi/nPZWNsFXqs8/maxresdefault.jpg" },
  ];

  const [shopData, setShopData] = useState([]); // State to store fetched merchandise

  useEffect(() => {
    // Fetch merchandise data when component mounts
    const fetchMerchandise = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/merchandise/`);
        setShopData(response.data);
      } catch (err) {
        console.error("Error fetching merchandise data:", err);
      }
    };

    fetchMerchandise();
  }, []);

  const artistData = useFetch(`${import.meta.env.VITE_SERVER_ENDPOINT}/profile/artist`);
  
  return (
    <div className="mx-0   xl:mx-[15%]">
      <CustomCarousel image={sampleImage} />

      <h1 className="text-center text-2xl my-8">More Artists</h1>

      <div className="flex justify-center flex-wrap gap-5">
        {artistData.map((artist) => (
          <ArtistCard
            key={artist._id}
            id={artist._id}
            name={artist.stageName}
            image={artist.image}
          />
        ))}
      </div>

      <h1 className="text-center text-2xl my-8">Shop Our Latest Merchandise</h1>

      <div className="flex justify-center flex-wrap gap-5 mb-10">
        {shopData.slice(0, 5).map((shop, index) => (
          <ShopItem
            key={index}
            id={shop._id}
            name={shop.name}
            image={shop.image}
            price={shop.price}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
