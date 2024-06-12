import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const ViewBookingDetails = ({ details, bookingId, closeDetail }) => {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const data = details.find((booking) => booking._id === bookingId);
    setBooking(data);
  }, [details, bookingId]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-max inset-0 p-4 bg-gray-800 text-white rounded-md ">
      <div className="cursor-pointer" onClick={() => closeDetail("")}>
        <FontAwesomeIcon icon={faClose} size="2x" />
      </div>
      <div className="flex justify-center">
        <form className="flex flex-col gap-3 sm:w-[300px] md:w-[600px] xl:w-[800px] mb-12">
          <h1 className="flex-1 text-white text-2xl">
            Booking Request Details
          </h1>
          <input
            className="rounded-md p-1 focus:outline-none poppins"
            type="text"
            value={booking.name}
            readOnly
          />
          <input
            className="rounded-md p-1 focus:outline-none poppins"
            type="text"
            value={booking.organizationName}
            readOnly
          />
          <input
            className="rounded-md p-1 focus:outline-none poppins"
            type="text"
            value={formatDate(booking.bookingDate)}
            readOnly
          />
          <label className="text-white text-xl mt-4">Service Requested:</label>
          <input
            className="rounded-md p-1 focus:outline-none poppins"
            type="text"
            value={booking.serviceRequested}
            readOnly
          />
          <input
            className="rounded-md p-1 focus:outline-none poppins"
            type="email"
            value={booking.email}
            readOnly
          />
          <input
            className="rounded-md p-1 focus:outline-none poppins"
            type="number"
            value={booking.mobileNum}
            readOnly
          />
          <textarea
            placeholder="Request detail"
            className="rounded-md p-1 focus:outline-none poppins"
            name=""
            id=""
            cols="30"
            rows="10"
            value={booking.requestDetail}
            readOnly
          ></textarea>
          {booking.attachment != "no attachment" && (
            <div className="mb-2">
              <strong>Attachment:</strong>{" "}
              <a href={booking.attachment} className="text-blue-400">
                View Attachment
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ViewBookingDetails;
