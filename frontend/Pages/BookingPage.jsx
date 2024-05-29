import React, { useState, useEffect } from "react";
import BookingProfile from "../Components/BookingProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";

const BookingPage = ({ useType }) => {
  const [searchInput, setSearchInput] = useState("");
  const [artistData, setArtistData] = useState([]);
  const {user} = useStateContext()

  const fetchData = async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/profile/artist`)
    if(response.status === 200){
      console.log(response)
      setArtistData(response.data)
    }
  }
  useEffect(() => {
    // Set initial artist data on component mount
    //setArtistData(data);
    fetchData();
  }, []);

  

  const searchArtist = () => {
    // Filter artist data based on search input
    const filteredArtists = artistData.filter((artist) =>
      artist.stageName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setArtistData(filteredArtists);
  };

  return (
    <div className="flex flex-col justify-center items-center relative py-6">
      <div>
        <div className="w-full xl:w-[1000px] flex mt-12">
          <div className="flex flex-col justify-center items-center">
            <div>
              <h1 className="text-white text-4xl">Book Our Artists Now</h1>
              <p className="text-white">Support our local artists</p>
            </div>
          </div>
        </div>

        <div className="flex gap-6  justify-between items-center mt-10">
          <div className="flex p-1 bg-white rounded-md ">
            <input
              className="w-80 focus:outline-none text-black"
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(event) => {
                if (!event.target.value) {
                  fetchData()
                }
                setSearchInput(event.target.value);
              }}
            />
            <button
              className="red px-5 py-2 rounded-md text-white"
              onClick={searchArtist}
            >
              Search
            </button>
          </div>

          <div>
            <Link to={"/request"}>
              <button className="flex justify-center items-center red px-5 py-2 rounded-md text-white">
                Pending Request
                <FontAwesomeIcon className="ml-2" icon={faHourglass} />
              </button>
            </Link>
          </div>
        </div>

        {/* <h1 className=' text-white text-xl my-10'>Top Artists</h1> */}

        <div className="my-24 booking-list flex flex-wrap gap-8">
          {artistData.map((artist) => (
            <BookingProfile
              key={artist._id}
              id={artist._id} // Ensure to provide a unique key for each item in the list
              image={artist.image}
              name={artist.stageName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
