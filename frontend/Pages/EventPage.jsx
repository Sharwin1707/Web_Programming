import React, { useEffect, useState } from "react";
import EventCard from "../Components/EventCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // Use faPlus instead of faAdd
import { Link } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";
import axios from "axios";

const EventPage = () => {
  const { user } = useStateContext();
  const [userType, setUserType] = useState("User");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    if (user) {
      setUserType(user.userType);
    }

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/createEvent");
        console.log("Fetched events:", response.data); // Debugging log
        setEvents(response.data.event);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const filteredEvents = selectedMonth
    ? events.filter((event) => {
        const eventMonth = new Date(event.date).toISOString().substring(0, 7);
        return eventMonth === selectedMonth;
      })
    : events;

  return (
    <div className="relative min-h-[100vh] mx-[12%] flex flex-col items-center">
      <h1 className="text-center text-4xl my-8">Event Schedule</h1>

      <div className="w-full px-[5%] flex justify-between">
      <div className="w-full flex justify-center mb-4">
          <input
            className="w-80 p-1 rounded-md"
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
          />
        </div>

        {userType === "Organization" && (
          <Link to={`/event/create`}>
            <div className="w-10 h-10 flex justify-center items-center bg-white rounded-full">
              <FontAwesomeIcon color="black" icon={faPlus} />
            </div>
          </Link>
        )}
      </div>

      {loading ? (
        <div className="w-full h-full flex justify-center items-center mt-12">
          <img className="animate-spin" src="/vinyl.png" alt="Loading..." /> Loading..
        </div>
      ) : (
        <>
          {userType === "Organization" ? (
            <div className="w-full my-12 flex flex-col">
              <hr />
              <h1 className="text-3xl my-4"></h1>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 josefin">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, i) => (
                    <EventCard
                      userType={"Organization"}
                      key={i}
                      id={event._id} // pass the event ID
                      image={event.image}
                      name={event.ArtistName}
                      month={event.date}
                      // month={new Date(event.date).toLocaleString('default', { month: 'short' })}
                      eventName={event.concertName}
                      location={event.venue}
                      // time={event.time}
                      time={`${event.start} - ${event.end}`}
                    />
                  ))
                ) : (
                  <p>No events available for the selected month</p>
                )}
              </div>
              <hr />
            </div>
          ) : (
            <div className="w-full flex justify-center my-12 josefin">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventCard
                      key={event._id} // Assuming "_id" is the unique identifier for each event
                      id={event._id} // pass the event ID
                      image={event.image}
                      name={event.ArtistName}
                      month={event.date}
                      // month={new Date(event.date).toLocaleString('default', { month: 'short' })}
                      eventName={event.concertName}
                      location={event.venue}
                      // time={event.time}
                      time={`${event.start} - ${event.end}`}
                    />
                  ))
                ) : (
                  <p>No events available for the selected month</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventPage;
