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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUserType(user.userType);
    }

    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/createEvent");
        console.log("Fetched events:", response.data); // Debugging log
        setEvents(response.data.event);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [user]);

  return (
    <div className="relative min-h-[100vh] mx-[12%] flex flex-col items-center">
      <h1 className="text-center text-4xl my-8">Event Schedule</h1>

      <div className="w-full px-[5%] flex justify-between">
        <input className="w-80 p-1 rounded-md" type="month"></input>
        {userType === "Organization" ? (
          <Link to={"/event/create"}>
            <div className="w-10 h-10 flex justify-center items-center bg-white rounded-full">
              <FontAwesomeIcon color="black" icon={faAdd} />
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>

      {userType === "Organization" ? (
        <div className="w-full  my-12 flex flex-col">
          <hr />

          {/* loading animation */}
          {loading ? (
            <div className="w-full h-full flex justify-center items-center mt-12">
              <img className="animate-spin" src="/vinyl.png" alt="" /> Loading..
            </div>
          ) : (
            ""
          )}

          <h1 className="text-3xl my-4"></h1>
          <div className="w-full flex flex-wrap gap-8 mb-12 josefin">
            {events.map((event, i) => (
              <EventCard
                userType={"Organization"}
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

      {userType !== "Organization" ? (
        <div className="w-full flex justify-center flex-wrap gap-8 my-12 josefin">
          {/* loading animation */}
          {loading ? (
            <div className="w-full h-full flex justify-center items-center mt-12">
              <img className="animate-spin" src="/vinyl.png" alt="" /> Loading..
            </div>
          ) : Array.isArray(events) && events.length > 0 ? (
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
