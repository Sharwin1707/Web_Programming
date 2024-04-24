import React from 'react'
import EventCard from '../Components/EventCard'
import {eventData} from '../sampleData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faAdd } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const EventPage = ({userType}) => {

  const sampleArtistData =[ {
    "image" : "https://www.sinarharian.com.my/uploads/images/2019/04/18/275597.jpg",
    "name"  : "Ismail Izzani",
    "month" : "JAN",
    "eventName":"Journey with Mail",
    "location" : "Axiata Arena",
    "time" : "2000 - 2200"
  }]

console.log(userType)
  return (
    <div className='mx-[12%] flex flex-col items-center'>
        <h1 className='text-center text-4xl my-8'>Event Schedule</h1>
        
        <div className='w-full px-[5%] flex justify-between'>
            <input className='w-80 p-1 rounded-md' type="month" ></input>
            {userType === 'Artist' ? <Link to={'/event/create'}><div className='w-10 h-10 flex justify-center items-center bg-white rounded-full'><FontAwesomeIcon  color='black' icon={faAdd}/></div></Link> : ''}
        </div>

        {userType === 'Artist' ? 
        <div className='w-full my-12 flex flex-col'>
          <hr />
          <h1 className='text-3xl my-4'>My Event</h1>
          <div className='w-full flex flex-wrap gap-8 mb-12 josefin'>      
          {sampleArtistData.map((event, i) => (
              <EventCard userType={'Artist'} key={i} image={event.image} name={event.name} month={event.month} eventName={event.eventName} location={event.location} time={event.time}/>
          ))}
        </div>
        <hr />
        </div>
        : ''}
        

        <div className='w-full flex justify-center flex-wrap gap-8 my-12 josefin'>
            {eventData.map((event, i) => (
                <EventCard key={i} image={event.image} name={event.name} month={event.month} eventName={event.eventName} location={event.location} time={event.time}/>
            ))}
        </div>
    </div>
  )
}

export default EventPage