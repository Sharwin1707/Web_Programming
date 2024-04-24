import React, { useState, useEffect } from 'react'
import ArtistProfile from '../Components/ArtistProfile'
import {data} from '../sampleData'

const ArtistPage = () => {
    const [searchBar, setSearchBar] = useState('')
    const [artistData, setArtistData] = useState([]);
    useEffect(() => {
        // Set initial artist data on component mount
        setArtistData(data);
    }, []);

    const searchArtist = () => {
        // Filter artist data based on search input
        const filteredArtists = data.filter(artist =>
            artist.name.toLowerCase().includes(searchBar.toLowerCase())
        );
        setArtistData(filteredArtists);
    };

  return (
    <div className='px-[12%] flex flex-col justify-center my-12'>
        <h1 className='text-4xl josefin text-center'>ARTISTS</h1>
        <form className="m-4 flex justify-center" id="searchForm ">
            <input className='px-2 py-1 rounded-l-md' type="text" placeholder="Search..." value={searchBar} onChange={(event) => {if (!event.target.value){setArtistData(data)}setSearchBar(event.target.value)}}/>
            <button className='red px-2 py-1 rounded-r-md ml-1' type="button" onClick={searchArtist}>Search</button>
        </form>

        <div className='flex flex-col gap-12 mt-8'>
            {artistData.map(artist => (
                <ArtistProfile key={artist.id} id={artist.id} image={artist.image} name={artist.nickname} career={artist.career} genre={artist.genre} birthday={artist.birthday}/>
            ))}
            
        </div>
        


    </div>
  )
}

export default ArtistPage