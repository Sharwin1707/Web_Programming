import React, { useState } from "react";
import { useToast } from "./Toast";
import { Link } from "react-router-dom";

const EventCard = ({
  id, //add the event ID
  image,
  name,
  month,
  eventName,
  location,
  time,
  userType,
}) => {
  const [addReminder, setAddReminder] = useState(false);
  const { showToastMessage } = useToast();
  const [imageError, setImageError] = useState(false);
  const toggleReminder = () => {
    // Toggle the addReminder state when the button is clicked
    setAddReminder(true);
    showToastMessage("Added to Reminder");
  };

  return (
    <div className="w-96 p-8 bg-white flex flex-col items-center rounded-md">
      <div className="relative flex items-start w-[300px] h-[300px] overflow-hidden rounded-md mb-3">
      {image && !imageError ? (
        <img
          src={`data:image/jpeg;base64,${image}`}
          className="relative top-0 w-full h-full object-cover rounded-md"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="relative top-0 w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
          <span className="text-gray-500">Image not available</span>
        </div>
      )}

        <div className="absolute text-white top-0 m-4 text-xl">
        {new Date(month).toLocaleString('default', { month: 'short' })}
        </div>
      </div>

      <div className="w-full text-black flex flex-col gap-2">
        <div className="text-xl text-center">{name}</div>
        <div className="text-3xl h-[100px]">{eventName}</div>
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
          </svg>{" "}
          {location}
        </div>
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-clock-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
          </svg>
          {time}
        </div>

        <button
          type="button"
          className="mt-4 mb-2 px-4 py-2 bg-black text-white rounded-md"
          onClick={toggleReminder}
        >
          {addReminder ? "Added to Reminder 🔔" : "Add Reminder"}
        </button>
        {userType === "Artist" ?  (
          <Link to={`/event/manage/${id}`} className="py-2 border text-center border-black rounded">
           
          
            
            <button>Edit</button>
          </Link>
        ) : (
          ""
      )}
      </div>
    </div>
  );
};

export default EventCard;



