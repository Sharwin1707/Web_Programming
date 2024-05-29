import React, { useEffect, useState, startTransition, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useFetch } from "../Hook/useFetch";
import { useStateContext } from "../Context/ContextProvider";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};



const BookDetails = () => {
  const { user } = useStateContext();
  const [bookingData, setBookingData] = useState([]);
  const bookData = useFetch(
    `${import.meta.env.VITE_SERVER_ENDPOINT}/bookings/artistManage/${user._id}`
  );

  useEffect(() => {
    if (bookData.length > 0) {
      startTransition(() => {
        setBookingData(bookData);
      });
    }
  }, [bookData]);

  return (
    <div className="mx-[12%] my-16">
      <Link to={"/"}>
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>
      <div className="flex flex-col justify-center ">
        <h1 className="text-3xl josefin mt-16">Booking Request</h1>
        <table className="mt-12 rounded-md overflow-hidden">
          <thead className="poppins text-md text-white bg-blue-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Organization
              </th>
              <th scope="col" className="px-6 py-3">
                Booking Date
              </th>
              <th scope="col" className="px-6 py-3">
                Service Requested
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile Number
              </th>
              <th className="px-6 py-3">Attachment</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookingData.map((booking, i) => (
              <tr key={i} className="bg-white border text-center hover:bg-gray-50 text-black dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-semibold whitespace-nowrap">
                  {i + 1}
                </th>
                <td className="px-6 py-4">{booking.organizationName}</td>
                <td className="px-6 py-4">{formatDate(booking.bookingDate)}</td>
                <td className="px-6 py-4">{booking.serviceRequested}</td>
                <td className="px-6 py-4">{booking.email}</td>
                <td className="px-6 py-4">{booking.mobileNum}</td>
                <td>
                  <button className="bg-gray-500 px-4 py-2 rounded-md">
                    View
                  </button>
                </td>
                <td className="flex gap-2 p-2 justify-center">
                  <button className="bg-green-500 px-4 py-2 rounded-md">
                    Accept
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const ArtistManagement = () => {
  
  return (
    <Suspense fallback={<div>Loading artist details...</div>}>
      <BookDetails/>
    </Suspense>
  );
};

export default ArtistManagement;

