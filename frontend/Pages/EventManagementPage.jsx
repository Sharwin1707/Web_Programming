import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useToast } from "../Components/Toast";
import axios from "axios";


const EventManagementPage = () => {
  // Error state
  const [error, setError] = useState(null);
  
  // State management
  const { id } = useParams(); // Get the event ID from the URL
  const [isCancel, setIsCancel] = useState(null);
  const [artistName, setArtistName] = useState('');
  const [concertName, setConcertName] = useState('');
  const [eventDetail, setEventDetail] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [image, setImage] = useState(null);

  // Placeholder states
  const [placeholderArtistName, setPlaceholderArtistName] = useState('');
  const [placeholderConcertName, setPlaceholderConcertName] = useState('');
  const [placeholderEventDetail, setPlaceholderEventDetail] = useState('');
  const [placeholderVenue, setPlaceholderVenue] = useState('');
  const [placeholderDate, setPlaceholderDate] = useState('');
  const [placeholderStart, setPlaceholderStart] = useState('');
  const [placeholderEnd, setPlaceholderEnd] = useState('');

  const navigate = useNavigate();
  const { showToastMessage } = useToast();


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/createEvent/${id}`);
        console.log("Fetched events:", response.data); // Debugging log
        const event = response.data.event;

        // Set placeholders
        setPlaceholderArtistName(event.ArtistName);
        setPlaceholderConcertName(event.concertName);
        setPlaceholderEventDetail(event.eventDetail);
        setPlaceholderVenue(event.venue);
        setPlaceholderDate(event.date);
        setPlaceholderStart(event.start);
        setPlaceholderEnd(event.end);

        // Set initial values (optional)
        setArtistName(event.ArtistName);
        setConcertName(event.concertName);
        setEventDetail(event.eventDetail);
        setVenue(event.venue);
        setDate(event.date);
        setStart(event.start);
        setEnd(event.end);
        setImage(event.image); // Set image if necessary
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isCancel === 'yes') {
        await axios.delete(`http://localhost:3000/createEvent/${id}`);
        showToastMessage('Event deleted');
        navigate('/event');
      } else {
        const formData = new FormData();
        formData.append('ArtistName', artistName);
        formData.append('concertName', concertName);
        formData.append('eventDetail', eventDetail);
        formData.append('venue', venue);
        formData.append('date', date);
        formData.append('start', start);
        formData.append('end', end);
        if (image) {
          formData.append('image', image);
        }

        await axios.put(`http://localhost:3000/createEvent/${id}`, formData);
        showToastMessage('Event updated');
        navigate('/event');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="px-[12%] flex flex-col justify-center items-center py-12">
      <form onSubmit={handleSubmit} className="w-[800px] poppins flex flex-col gap-6 py-4">
        <h1 className="text-3xl py-4">Event Management</h1>

        <div className="flex flex-col">
          <label htmlFor="">Cancel Event :</label>
          <div>
            <input 
              className="" 
              type="radio"
              name="cancelEvent" 
              value="yes"
              onChange={() => setIsCancel('yes')}
            />
            <label htmlFor="">Yes</label>
          </div>
          <div>
            <input 
              className="" 
              type="radio" 
              name="cancelEvent"
              value="no"
              onChange={() => setIsCancel('no')} 
            />
            <label htmlFor="">No</label>
          </div>
        </div>

        <hr />

        {isCancel === 'no' && (
          <>
            <div className="flex flex-col">
              <label htmlFor="artistName">Artist Name</label>
              <input 
                className="px-4 py-2 rounded-md" 
                type="text"
                value={artistName}
                id="artistName"
                placeholder={placeholderArtistName || "e.g., artist name"} // Dynamic placeholder
                onChange={(e) => setArtistName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="concertName">Concert/Show Name</label>
              <input 
                className="px-4 py-2 rounded-md" 
                type="text" 
                value={concertName}
                id="concertName"
                placeholder={placeholderConcertName || "e.g., concert name"} // Dynamic placeholder
                onChange={(e) => setConcertName(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="eventDetail">Event Details</label>
              <textarea 
                className="px-4 py-2 rounded-md" 
                rows={"10"} 
                type="text" 
                value={eventDetail}
                id="eventDetail"
                placeholder={placeholderEventDetail || "e.g., event details"} // Dynamic placeholder
                onChange={(e) => setEventDetail(e.target.value)}
              ></textarea> 
            </div>

            <div className="flex flex-col">
              <label htmlFor="venue">Venue</label>
              <input 
                className="px-4 py-2 rounded-md" 
                type="text" 
                value={venue}
                id="venue"
                placeholder={placeholderVenue || "e.g., venue"} // Dynamic placeholder
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="date">Date</label>
              <input 
                className="px-4 py-2 rounded-md" 
                type="date" 
                value={date}
                id="date"
                placeholder={placeholderDate || "e.g., date"} // Dynamic placeholder
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex gap-8">
              <div className="flex gap-2">
                <label htmlFor="start">Start</label>
                <input 
                  className="px-4 py-2 rounded-md" 
                  type="time" 
                  value={start}
                  id="start"
                  placeholder={placeholderStart || "e.g., start time"} // Dynamic placeholder
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="end">End</label>
                <input 
                  className="px-4 py-2 rounded-md" 
                  type="time"
                  value={end}
                  id="end"
                  placeholder={placeholderEnd || "e.g., end time"} // Dynamic placeholder
                  onChange={(e) => setEnd(e.target.value)} 
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                className="bg-blue-gray-300 rounded-md block text-sm text-white poppins
                      file:mr-4 file:py-2 file:px-4 file:rounded-md
                      file:border-0 file:text-sm file:font-semibold
                      file:bg-white file:text-black
                      hover:file:bg-gray-400"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </>
        )}

        <div className="flex justify-center gap-6">
          <button type="submit" className="px-4 py-2 bg-gray-600 rounded-md">
            {isCancel === 'yes' ? 'Delete' : 'Update'}
          </button>
          <Link to={"/event"}>
            <button className="px-4 py-2 bg-red-400 rounded-md">Cancel</button>
          </Link>
        </div>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default EventManagementPage;
