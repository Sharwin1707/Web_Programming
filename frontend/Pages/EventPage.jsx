import React, { useEffect, useState } from "react";
import EventCard from "../Components/EventCard";
import { eventData } from "../sampleData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";

import axios from "axios";

const EventPage = () => {
  const { user } = useStateContext();
  const [userType, setUserType] = useState("User");
  const [events, setEvents] = useState([]);

  const sampleArtistData = [
    {
      image:
        "https://www.sinarharian.com.my/uploads/images/2019/04/18/275597.jpg",
      name: "Ismail Izzani",
      month: "JAN",
      concertName: "Journey with Mail",
      venue: "Axiata Arena",
      time: "2000 - 2200",
      id: "66597e3fc970ebf697c1110",
      start: "18:00",
      end: "22:00"
    },
  ];

  useEffect(() => {
    if (user) {
      setUserType(user.userType);
    }

    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/createEvent");
        console.log("Fetched events:", response.data); // Debugging log
        setEvents(response.data.event);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [user]);



  return (
    <div className="mx-[12%] flex flex-col items-center">
      <h1 className="text-center text-4xl my-8">Event Schedule</h1>

      <div className="w-full px-[5%] flex justify-between">
        <input className="w-80 p-1 rounded-md"  type="month"></input>
        {userType === "Artist" ? (
          <Link to={"/event/create"}>
            <div className="w-10 h-10 flex justify-center items-center bg-white rounded-full">
              <FontAwesomeIcon color="black" icon={faAdd} />
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>

      {userType === "Artist" ? (
        <div className="w-full my-12 flex flex-col">

          <hr />

          <h1 className="text-3xl my-4"></h1>
          <div className="w-full flex flex-wrap gap-8 mb-12 josefin">
            {events.map((event, i) => (
              <EventCard
                userType={"Artist"}
                key={i}
                id={event._id} //pass the event ID
                image={event.image}
                name={event.ArtistName}
                month={event.date}
               // month={new Date(event.date).toLocaleString('default', { month: 'short' })}
                eventName={event.concertName}
                location={event.venue}
               // time={event.time}
               time={`${event.start} - ${event.end}`}
              />
            ))}

          </div>

          <hr />
        </div>


      ) : (
        ""
      )}

{userType !== "Artist" ? (
      <div className="w-full flex justify-center flex-wrap gap-8 my-12 josefin">
        {Array.isArray(events) && events.length > 0 ? (
        events.map((event) => (
          <EventCard
            //key={i}
            key={event._id} // Assuming "_id" is the unique identifier for each event
      
            id={event._id} //pass the event ID
            image={event.image}
            name={event.ArtistName}
           month={event.date}
          // month={new Date(event.date).toLocaleString('default', { month: 'short' })}
            eventName={event.concertName}
            location={event.venue}
            //time={event.time}
            time={`${event.start} - ${event.end}`}
           
            
            />
          
          ))
        ) : (
          <p>No events available</p>
        )}
      </div> 
     ) : (
      ""
    )}

    </div>
  );
};

export default EventPage;
