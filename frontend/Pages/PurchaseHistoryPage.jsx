import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PurchaseHistoryPage = () => {
  return (
    <div className="px-0 md:px-[20%] poppins my-12">
      <Link to={"/shop"}>
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>
      <div className=" bg-white rounded-lg shadow-md">
        <div className="px-4 py-5 sm:px-6">
          <h5 className="text-gray-700 text-lg">
            Thanks for your Order, <span className="text-purple-600">Demo</span>
            !
          </h5>
        </div>
        <div className="p-4">
          {/* Sample Purchase Details */}
          <div className="mb-4">
            <p className="font-semibold text-gray-600">Receipt</p>
            <p className="text-sm text-gray-500">
              Receipt Voucher: 1KAU9-84UIL
            </p>
          </div>
          <div className="bg-gray-100 rounded-md p-4 mb-4 flex items-center">
            <div className="mr-4">
              <img
                src="https://media.karousell.com/media/photos/products/2023/11/30/coldplay_music_of_the_spheres__1701361899_1a38ab91_progressive.jpg"
                className="w-16 h-16"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">Coldplay Shirt</p>
              <p className="text-xs text-gray-600">Black | Qty: 1</p>
              <p className="text-xs text-gray-600 font-semibold">RM120</p>
              <div className="mt-2"></div>
              <div className="flex  justify-between items-center">
                <p className="text-xs text-gray-600">Track Order</p>
                <div className="w-2/3">
                  <div className="h-2 bg-purple-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <p>Out for delivery</p>
                    <p>Delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End of Sample Purchase Details */}

          {/* Additional Purchase Details */}
          <div className="mb-4">
            <p className="font-semibold text-gray-600">Order Details</p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Total:</span> RM120.00
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Invoice Number: 788152</p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Discount:</span> RM15.00
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Invoice Date: 22 Dec, 2019</p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">GST 18%:</span> 123
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Receipt Voucher: 18KU-62IIK</p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Delivery Charges:</span> Free
            </p>
          </div>
          {/* End of Additional Purchase Details */}

          <div className="px-4 py-5 bg-purple-600 rounded-b-lg text-white text-right">
            <p className="text-lg font-semibold">Total paid: RM 105</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;
