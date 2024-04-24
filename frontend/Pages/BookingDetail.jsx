import React, {useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useToast } from '../Components/Toast'

import {data} from '../sampleData'

const BookingDetail = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const { showToastMessage } = useToast();

    const [showToast, setShowToast] = useState(false);

    const sampleData = data.filter(data => data.id == id);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here (e.g., API call)
        // Show the toast after submission
        showToastMessage('Form submitted successfully!');

        // Navigate to another page after submission
        navigate('/request');
      };
    

  return (
    <div className='py-16 mx-[12%]'>
        {showToast && (
        <div className="toast">
          <p>Form submitted successfully!</p>
        </div>
      )}
        <Link to={'/book'}>
            <FontAwesomeIcon className='mr-2' size='2xl' icon={faArrowLeft}/>
        </Link>
        <div className='flex flex-col md:flex-row justify-center gap-20 mt-4 '> 
            <div className='max-w-80'>
                <div className='h-80 overflow-hidden rounded-md flex justify-center items-center'>      
                    <img className='w-full h-full object-cover rounded-md' src={sampleData[0].image} alt="" />
                </div>
                <p className='text-white text-md my-10'><strong>Description: </strong>
                    {sampleData[0].about}
                </p>
            </div>
            
        <div>
            <h1 className='text-white text-5xl mb-4'>{sampleData[0].nickname}</h1>
            <div className='text-white poppins'>Career: {sampleData[0].career}</div>
            <div className='text-white poppins flex gap-3'>Genre: {sampleData[0].genre}</div>
            <div className='text-white poppins'>Birthday: {sampleData[0].birthday}</div>
            <br /><hr />

            <form className='mt-12 flex flex-col gap-3' action="">
                <h1 className='flex-1 text-white text-2xl'>Send Booking Request</h1>
                <input className='rounded-md p-1 focus:outline-none poppins' placeholder='Name' type="text" />
                <input className='rounded-md p-1 focus:outline-none poppins' placeholder='Organization Name' type="text" />
                <input className='rounded-md p-1 focus:outline-none poppins' type="date" />
                <label className='text-white text-xl mt-4' >Service available:</label>
                <div className='flex gap-4 mb-4'>
                    <div className='flex justify-center items-center gap-2'>
                        <input className='w-5 h-5' type="checkbox" />
                        <label className='text-white text-xl' >Event</label>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        <input className='w-5 h-5' type="checkbox" />
                        <label className='text-white text-xl' >Collaboration</label>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                        <input className='w-5 h-5' type="checkbox" />
                        <label className='text-white text-xl' >Ambassador</label>
                    </div>  
                </div>
                <input className='rounded-md p-1 focus:outline-none poppins' type="email" placeholder='Email' />
                <input className='rounded-md p-1 focus:outline-none poppins' type="number" placeholder='Mobile number' />
                <textarea placeholder='Request detail' className='rounded-md p-1 focus:outline-none poppins' name="" id="" cols="30" rows="10"></textarea>
                
                <label className="block mb-2 text-xl font-medium text-white poppins" htmlFor="file_input">Attachment</label>
                <input
                type="file"
                class="bg-blue-gray-300 rounded-md  block w-full text-sm text-white poppins
                    file:mr-4 file:py-2 file:px-4 file:rounded-md
                    file:border-0 file:text-sm file:font-semibold
                    file:bg-white file:text-black
                    hover:file:bg-pink-100"
  />

                <input onClick={handleSubmit} className='text-white bg-red-400 rounded-md py-3' type="submit" value='Submit' />
            </form>
        </div>
    </div>
    </div>
    
  )
}

export default BookingDetail