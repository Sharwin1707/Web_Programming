import React from 'react'
import { Link } from 'react-router-dom'

const CreateEventPage = () => {
  return (
    <div className='px-[12%] flex flex-col justify-center items-center py-12'>
        
        <form action="" className='max-w-[400px] poppins flex flex-col gap-6 py-4'>
            <h1 className='text-3xl py-4'>Create Event</h1>
            <hr />
            <div className='flex flex-col '>
                <label htmlFor="">Artist Name</label>
                <input className='max-w-[400px] px-4 py-2 rounded-md' type="text"/>
            </div>
            <div className='flex flex-col '>
                <label htmlFor="">Consert/Show Name</label>
                <input className='max-w-[400px] px-4 py-2 rounded-md' type="text"/>
            </div>
            <div className='flex flex-col '>
                <label htmlFor="">Event Details</label>
                <textarea className='max-w-[400px] px-4 py-2 rounded-md' type="text"/>
            </div>
            <div className='flex flex-col '>
                <label htmlFor="">Venue</label>
                <input className='max-w-[400px] px-4 py-2 rounded-md' type="text"/>
            </div>
            <div className='flex flex-col '>
                <label htmlFor="">Date</label>
                <input className='max-w-[400px] px-4 py-2 rounded-md' type="date"/>
            </div>
            <div className='flex gap-8'>
                <div className='flex gap-2'>
                    <label htmlFor="">Start</label>
                    <input className='px-4 py-2 rounded-md' type="time" />
                </div>
                <div className='flex gap-2'>
                    <label htmlFor="">End</label>
                    <input className='px-4 py-2 rounded-md' type="time" />
                </div> 
            </div>
            <div className='flex flex-col '>
                <label htmlFor="">Image</label>
                <input
                type="file"
                class="max-w-[400px] bg-blue-gray-300 rounded-md  block text-sm text-white poppins
                    file:mr-4 file:py-2 file:px-4 file:rounded-md
                    file:border-0 file:text-sm file:font-semibold
                    file:bg-white file:text-black
                    hover:file:bg-gray-400"/>
            </div>

            <div className='flex justify-center gap-6'>
                <button className='px-4 py-2 bg-green-400 rounded-md'>Add</button>
                <Link to={'/event'}><button className='px-4 py-2 bg-red-400 rounded-md'>Cancel</button></Link>
            </div>
        </form>
    </div>
  )
}

export default CreateEventPage