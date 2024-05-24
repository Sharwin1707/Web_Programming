import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../Context/ContextProvider";

const PendingRequestPage = () => {
  const [bookingData, setBookingData] = useState([]);
  const { token } = useStateContext();

  useEffect(() => {
    fetchBookingData();
  }, [bookingData]);

  const fetchBookingData = () => {
    axios
      .post("http://localhost:3000/bookings/find", { uid: token })
      .then((res) => {
        if (res) {
          setBookingData(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error);
      });
  };

  const handleCancelBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      axios
        .delete(`http://localhost:3000/bookings/${id}`)
        .then((res) => {
          console.log("Booking deleted");
          // After deleting the booking, fetch updated booking data
          fetchBookingData();
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
        });
    }
  };

  return (
    <div className="flex flex-1 flex-col  relative mx-10">
      <div className="mt-12"></div>
      <h1 className="text-3xl poppins mb-12">
        <Link to={"/book"}>
          <FontAwesomeIcon className="mr-2" size="1x" icon={faArrowLeft} />
        </Link>
        Booking Status
      </h1>
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg my-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="poppins text-md text-white bg-blue-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Artist
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Service Requested
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Cancel</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((data, index) => (
              <tr
                key={index} // add key prop for each item in the list
                className="bg-white border hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-semibold text-black whitespace-nowrap"
                >
                  {data.artistName}
                </td>
                <td className="px-6 py-4">in review</td>
                <td className="px-6 py-4">{data.serviceRequested}</td>
                <td className="px-6 py-4">{data.bookingDate}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleCancelBooking(data._id)}
                  >
                    Cancel
                  </a>
                </td>
              </tr>
            ))}
            {bookingData.length === 0 && (
              <tr>
                <td colSpan="5">Waiting for data...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRequestPage;
