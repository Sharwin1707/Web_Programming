import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const data = [
  {
    id: "1",
    firstname: "Ahmad",
    lastname: "Aladdin",
    organization: "Organization",
    bookingDate: "1-5-2024",
    serviceRequest: "Collaboration",
    email: "ahmad@gmail.com",
    mobileNumber: "0132384775",
    requesDetail: "",
    attactchments: "",
  },
  {
    id: "1",
    firstname: "Ahmad",
    lastname: "Aladdin",
    organization: "Organization",
    bookingDate: "1-5-2024",
    serviceRequest: "Collaboration",
    email: "ahmad@gmail.com",
    mobileNumber: "0132384775",
    requesDetail: "",
    attactchments: "",
  },
  {
    id: "1",
    firstname: "Ahmad",
    lastname: "Aladdin",
    organization: "Organization",
    bookingDate: "1-5-2024",
    serviceRequest: "Collaboration",
    email: "ahmad@gmail.com",
    mobileNumber: "0132384775",
    requesDetail: "",
    attactchments: "",
  },
  {
    id: "1",
    firstname: "Ahmad",
    lastname: "Aladdin",
    organization: "Organization",
    bookingDate: "1-5-2024",
    serviceRequest: "Collaboration",
    email: "ahmad@gmail.com",
    mobileNumber: "0132384775",
    requesDetail: "",
    attactchments: "",
  },
  {
    id: "1",
    firstname: "Ahmad",
    lastname: "Aladdin",
    organization: "Organization",
    bookingDate: "1-5-2024",
    serviceRequest: "Collaboration",
    email: "ahmad@gmail.com",
    mobileNumber: "0132384775",
    requesDetail: "",
    attactchments: "",
  },
];

const ArtistManagement = () => {
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
            {data.map((bookingData, i) => (
              <tr className="bg-white border text-center hover:bg-gray-50 text-black dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-semibold  whitespace-nowrap"
                >
                  {i + 1}
                </th>
                <td className="px-6 py-4 flex">{bookingData.organization}</td>
                <td className="px-6 py-4">{bookingData.bookingDate}</td>
                <td className="px-6 py-4">{bookingData.serviceRequest}</td>
                <td className="px-6 py-4 text-right">{bookingData.email}</td>
                <td className="px-6 py-4 text-right">
                  {bookingData.mobileNumber}
                </td>
                <td>
                  <button className="bg-gray-500 px-4 py-2 rounded-md">
                    View
                  </button>
                </td>
                <td className="flex gap-2 p-2">
                  <button className="bg-green-500 px-4 py-2 rounded-md">
                    Accept
                  </button>
                  <button className="red text-white px-4 py-2 rounded-md">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtistManagement;
