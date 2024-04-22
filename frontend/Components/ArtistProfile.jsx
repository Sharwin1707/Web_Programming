import React from 'react'
import { Link } from 'react-router-dom'

const ArtistProfile = ({name,image,career,genre,birthday,music}) => {
  return (
   
        <div class="min-w-56 flex flex-col md:flex-row bg-[#222222] overflow-hidden rounded-md">
            <div className='w-96 h-96 overflow-hidden rounded-md'>      
                <img className='w-full h-full object-cover rounded-md' src={image} alt="" />
            </div>
          
            <div class="artist-info px-16 py-8">
                <h2 className='text-5xl md:text-4xl josefin'>{name}</h2>
                <p className='josefin text-md md:text-xl'>
                Career: {career}<br />
                Genre: {genre}<br />
                Birthday: {birthday}<br/>
                Music: {music}
                </p>
                <Link to={`/artistprofile/${name}`}>
                    <button className='mt-2 px-6 py-3 red rounded-md'>VIEW</button>
                </Link>
            </div>
        </div>
   
  )
}

export default ArtistProfile