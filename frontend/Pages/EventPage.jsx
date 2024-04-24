import React from 'react'
import EventCard from '../Components/EventCard'
import {data} from '../sampleData'

const EventPage = () => {


  return (
    <div className='mx-[12%] flex flex-col items-center'>
        <h1 className='text-center text-4xl my-8'>Event Schedule</h1>

        <input className='w-80 p-1 rounded-md' type="month" ></input>

        <div className='w-full flex justify-center flex-wrap gap-8 my-12 josefin'>
            {data.map((event, i) => (
                <EventCard key={i} image={event.image} name={event.nickname}/>
            ))}
        </div>
    </div>
  )
}

export default EventPage