import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../Context/ContextProvider";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const PendingRequestPage = () => {
  const [bookingData, setBookingData] = useState([]);
  const [pastBookingData, setPastBookingData] = useState([]);
  const { token, user } = useStateContext();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState(null);

  useEffect(() => {
    fetchBookingData();
  }, [bookingData]);

  useEffect(() => {
    const fetchPastBookings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/bookhistory/user/${user._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setPastBookingData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
      }
    };

    fetchPastBookings();
  }, []);

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

      setDeleteConfirmation(false)
  };

  return (
    <div className="min-h-[100vh] flex flex-1 flex-col  relative mx-10">
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
          <tbody className="bg-white">
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
                <td className="px-6 py-4">{data.status}</td>
                <td className="px-6 py-4">{data.serviceRequested}</td>
                <td className="px-6 py-4">{formatDate(data.bookingDate)}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => {
                      setDeleteConfirmation(true);
                      setDeleteBookingId(data._id);
                    }}
                  >
                    Cancel
                  </a>
                </td>
              </tr>
            ))}
            {bookingData.length === 0 && (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-black">
                  No booking found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* delete confirmation */}
        {deleteConfirmation ? (
          <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-xl">
              <p className="text-black">
                Are you sure you want to cancel this booking?
              </p>
              <div className="flex justify-end gap-6 mt-6">
                <button
                  className="bg-gray-500 px-2 py-1"
                  onClick={() => {
                    setDeleteConfirmation(false);
                    setDeleteBookingId(null);
                  }}
                >
                  Cancle
                </button>
                <button
                  className="bg-red-500 px-2 py-1"
                  onClick={() => handleCancelBooking(deleteBookingId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <h1 className="text-3xl poppins my-12 ">Past Booking</h1>
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
          <tbody className="bg-white">
            {pastBookingData.map((data, index) => (
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
                <td
                  className={`px-6 py-4 whitespace-nowrap ${
                    data.status === "Accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {data.status}
                </td>
                <td className="px-6 py-4">{data.serviceRequested}</td>
                <td className="px-6 py-4">{formatDate(data.bookingDate)}</td>
                <td className="px-6 py-4 text-right"></td>
              </tr>
            ))}
            {pastBookingData.length === 0 && (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-black">
                  No booking history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRequestPage;
