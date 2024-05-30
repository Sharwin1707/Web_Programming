import React, { useEffect, useState, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";
import ViewBookingDetails from "../Components/ViewBookingDetails";
import axios from "axios";

// Utility function for formatting dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const BookingHistory = () => {
  const { user } = useStateContext();
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/bookhistory/${user._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookingData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user._id]);

  return (
    <div>
      <h1 className="text-3xl josefin mt-16">Booking History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto mt-12">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Organization
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Booking Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Service Requested
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Mobile Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Response
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookingData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-black">
                    No booking history found.
                  </td>
                </tr>
              ) : (
                bookingData.map((booking, i) => (
                  <tr key={i} className="hover:bg-gray-50 text-black">
                    <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.organizationName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(booking.bookingDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.serviceRequested}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.mobileNum}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap ${
                        booking.status === "Accepted"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {booking.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

//-------------------------------------------------------------------------
const BookDetails = () => {
  const { user } = useStateContext();
  const [bookingData, setBookingData] = useState([]);
  const [bookId, setBookingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/bookings/artistManage/${
            user._id
          }`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookingData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user._id]);

  const handleResponse = async (id, response) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/bookings/response/${id}`,
        {
          response,
        }
      );

      // Update the bookingData state
      setBookingData((prevData) =>
        prevData.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <Link to={"/"}>
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>
      <div className="flex flex-col justify-center ">
        <h1 className="text-3xl josefin mt-16">Booking Request</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto mt-12">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Organization
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Booking Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Service Requested
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Mobile Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookingData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-4 text-center text-black"
                    >
                      No booking requests found.
                    </td>
                  </tr>
                ) : (
                  bookingData.map((booking, i) => (
                    <tr key={i} className="hover:bg-gray-50 text-black">
                      <td className="px-6 py-4 whitespace-nowrap">{i + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.organizationName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(booking.bookingDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.serviceRequested}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.mobileNum}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setBookingId(booking._id)}
                          className="bg-gray-500 px-4 py-2 rounded-md"
                        >
                          View
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex gap-3">
                          <button
                            className="bg-green-500 px-4 py-2 rounded-md text-white"
                            onClick={() =>
                              handleResponse(booking._id, "Accepted")
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                            onClick={() =>
                              handleResponse(booking._id, "Rejected")
                            }
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {bookId && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className=" rounded-md p-4 w-full max-w-2xl">
            <ViewBookingDetails
              details={bookingData}
              bookingId={bookId}
              closeDetail={() => setBookingId("")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ArtistManagement = () => {
  return (
    <div className="relative mx-[12%] my-16 min-h-[80vh]">
      <Suspense fallback={<div>Loading booking details...</div>}>
        <BookDetails />
      </Suspense>
      <BookingHistory />
    </div>
  );
};

export default ArtistManagement;
