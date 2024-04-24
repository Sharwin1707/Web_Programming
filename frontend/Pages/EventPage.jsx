import React from 'react'
import EventCard from '../Components/EventCard'
import {eventData} from '../sampleData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faAdd } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const EventPage = ({userType}) => {

console.log(userType)
  return (
    <div className='mx-[12%] flex flex-col items-center'>
        <h1 className='text-center text-4xl my-8'>Event Schedule</h1>
        
        <div className='w-full px-[5%] flex justify-between'>
            <input className='w-80 p-1 rounded-md' type="month" ></input>
            {userType === 'Artist' ? <Link to={'/event/create'}><div className='w-10 h-10 flex justify-center items-center bg-white rounded-full'><FontAwesomeIcon  color='black' icon={faAdd}/></div></Link> : ''}
        </div>
        

        <div className='w-full flex justify-center flex-wrap gap-8 my-12 josefin'>
            {eventData.map((event, i) => (
                <EventCard userType={userType} key={i} image={event.image} name={event.name} month={event.month} eventName={event.eventName} location={event.location} time={event.time}/>
            ))}
        </div>
    </div>
  )
}

export default EventPage