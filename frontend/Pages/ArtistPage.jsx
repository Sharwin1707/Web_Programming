import React, { useState, useEffect } from "react";
import ArtistProfile from "../Components/ArtistProfile";
import axios from "axios";

const ArtistPage = () => {
  const [searchBar, setSearchBar] = useState("");
  const [artistData, setArtistData] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const response = await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/profile/artist`)
    if(response.status === 200){
      console.log(response)
      setArtistData(response.data)
      setLoading(false)
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
      artist.stageName.toLowerCase().includes(searchBar.toLowerCase())
    );
    setArtistData(filteredArtists);
  };

  return (
    <div className="px-[12%] flex flex-col justify-center my-12">
      <h1 className="text-4xl josefin text-center">ARTISTS</h1>
      {loading ? (
        <div className="flex gap-3 justify-center items-center">
        <img src="vinyl.png" className="w-8 animate-spin" alt="Loading..." />
        <p className="text-white text-md">Loading...</p>
      </div>
      ) : ''}
      <form className="m-4 flex justify-center" id="searchForm ">
        <input
          className="px-2 py-1 rounded-l-md"
          type="text"
          placeholder="Search..."
          value={searchBar}
          onChange={(event) => {
            if (!event.target.value) {
              fetchData()
            }
            setSearchBar(event.target.value);
          }}
        />
        <button
          className="red px-2 py-1 rounded-r-md ml-1"
          type="button"
          onClick={searchArtist}
        >
          Search
        </button>
      </form>

      <div className="flex flex-col gap-12 mt-8">
        {artistData.map((artist) => (
          <ArtistProfile
            data={artistData}
            key={artist._id}
            id={artist._id}
            image={artist.image}
            name={artist.stageName}
            career={artist.career}
            genre={artist.genre}
            birthday={artist.birthday}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistPage;
