import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { createEvent } from "../controllers/EventController";
import axios from "axios";

const CreateEventPage = () => {

  //error state
  const[error, setError] = useState(null);

  //form data state
  const[artistName, setArtistName] = useState('');
  const[concertName, setConcertName] = useState('');
  const[eventDetail, setEventDetail] = useState('');
  const[venue, setVenue] = useState('');
  const[date, setDate] = useState('');
  const[start, setStart] = useState('');
  const[end, setEnd] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // useNavigate instead of useHistory
 //handle submit
 const handleCreate = async (e) =>{
  e.preventDefault()
  console.log('Form submitted'); // Add this line for debugging

  try {
    const formData = new FormData();
    formData.append("ArtistName", artistName);
    formData.append("concertName", concertName);
    formData.append("eventDetail", eventDetail);
    formData.append("venue", venue);
    formData.append("date", date);
    formData.append("start", start);
    formData.append("end", end);
    if (image) {
      formData.append("image", image);
    }

    const response = await axios.post(
      "http://localhost:3000/createEvent/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data); // Log the response data
    // Redirect or perform other actions upon successful submission
    navigate("/event");
  } catch (error) {
    console.error(error); // Log the error for debugging
    setError(error.message);
  }
  //console.log(artistName,concertName,eventDetail,venue,date,start,end,image);
 };



  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-12">
      <form onSubmit={handleCreate} action="" className="w-[800px]  poppins flex flex-col gap-6 py-4">
        <h1 className="text-3xl py-4">Create Event</h1>
        <hr />

        <div className="flex flex-col ">
          <label htmlFor="">Artist Name</label>
          <input 
          className="px-4 py-2 rounded-md" 
          type="text" 
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="">Consert/Show Name</label>
          <input 
          className=" px-4 py-2 rounded-md" 
          type="text"
          value={concertName}
          onChange={(e) => setConcertName(e.target.value)} 
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="">Event Details</label>
          <textarea
            className=" px-4 py-2 rounded-md"
            name=""
            id=""
            cols="30"
            rows="10"
            value={eventDetail}
            onChange={(e) => setEventDetail(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="">Venue</label>
          <input 
          className=" px-4 py-2 rounded-md" 
          type="text" 
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="">Date</label>
          <input 
          className=" px-4 py-2 rounded-md" 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex gap-8">
          <div className="flex gap-2">
            <label htmlFor="">Start</label>
            <input 
            className="px-4 py-2 rounded-md" 
            type="time" 
            value={start}
            onChange={(e) => setStart(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label htmlFor="">End</label>
            <input 
            className="px-4 py-2 rounded-md" 
            type="time" 
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="">Image</label>
          <input
            type="file"
            class=" bg-blue-gray-300 rounded-md  block text-sm text-white poppins
                    file:mr-4 file:py-2 file:px-4 file:rounded-md
                    file:border-0 file:text-sm file:font-semibold
                    file:bg-white file:text-black
                    hover:file:bg-gray-400"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="flex justify-center gap-6">
          <button type="submit" className="w-[100px] px-4 py-2 bg-green-400 rounded-md">
            Add
          </button>
          <Link to={"/event"}>
            <button className="w-[100px] px-4 py-2 bg-red-400 rounded-md">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
