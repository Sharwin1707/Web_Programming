import React, { useState, useEffect, useRef } from "react";
import CustomCarousel from "../Components/Carousel";
import Isotope from "isotope-layout";
import ShopItem from "../Components/ShopItem";
import { shopSliderImage } from "../sampleData";
import axios from "axios";

const ShopPage = () => {
  const [activeFilter, setActiveFilter] = useState("*");
  const [shopData, setShopData] = useState([]); // State to store fetched merchandise
  const isotopeRef = useRef(null);
  const filterContainerRef = useRef(null);

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

  useEffect(() => {
    // Initialize Isotope when the shopData changes and there is a filter container
    if (shopData.length > 0 && filterContainerRef.current) {
      isotopeRef.current = new Isotope(filterContainerRef.current, {
        itemSelector: ".filter-item",
        layoutMode: "fitRows",
      });
    }

    return () => {
      // Destroy Isotope instance when the component unmounts
      if (isotopeRef.current) {
        isotopeRef.current.destroy();
        isotopeRef.current = null;
      }
    };
  }, [shopData]);

  useEffect(() => {
    // Update the filter when activeFilter changes
    if (isotopeRef.current) {
      const filterValue = activeFilter === "*" ? "*" : `.${activeFilter}`;
      isotopeRef.current.arrange({ filter: filterValue });
    }
  }, [activeFilter]);

  const handleFilterClick = (filterValue) => {
    setActiveFilter(filterValue);
  };

  return (
    <div className="mx-0 md:mx-[12%] bg-white bg-opacity-100 text-black p-6 rounded-md shadow-lg mt-10 mb-10">
      <CustomCarousel image={shopSliderImage} />

      <div className="w-full mt-12">
        <div className="title text-center">
          <h1 className="text-3xl font-bold mb-4">New Collection</h1>
        </div>
        <div className="flex justify-center">
          {["*", "best", "featured", "new"].map((filter) => (
            <button
              key={filter}
              type="button"
              className={`p-2 m-2 ${
                activeFilter === filter ? "bg-black text-white rounded-md" : "bg-gray-200 text-black rounded-md"
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter === "*" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <hr className="border-gray-500 my-4" />

        {/* Filtered items container */}
        {shopData.length > 0 && (
          <div className="filter-container flex flex-wrap justify-center gap-4" ref={filterContainerRef}>
            {shopData.map((data, i) => (
              <ShopItem
                key={data._id}
                id={data._id}
                image={data.image}
                name={data.name}
                type={data.tag}
                ratingStar={data.rating}
                price={data.price}
                className="filter-item" // Ensure each ShopItem has this class
              />
            ))}
          </div>
        )}
      </div>

      <hr className="border-gray-500 my-4" />
    </div>
  );
};

export default ShopPage;

