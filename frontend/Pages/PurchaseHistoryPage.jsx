import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../Context/ContextProvider";

const PurchaseHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useStateContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/purchasehistory/user/${user._id}`);; // Replace with your API endpoint
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);


  return (
    <div className="px-0 md:px-[20%] poppins my-12">
      <Link to={"/shop"}>
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-700 text-lg">No orders found.</p>
        </div>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md mb-8">
            <div className="px-4 py-5 sm:px-6">
              <h5 className="text-gray-700 text-lg">
                Order {index + 1} - Receipt ID: {order.receiptVoucher}
              </h5>
              <p className="text-sm text-gray-500">Discount: RM{order.discount}</p>
            </div>
            {order.merchandise.map((item) => (
              <div key={item.merchandiseId} className="p-4">
                <div className="bg-gray-100 rounded-md p-4 mb-4 flex items-center">
                  <div className="mr-4">
                    <img src={item.merchImage} className="w-16 h-16" alt={item.merchName} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{item.merchName}</p>
                    <p className="text-xs text-gray-600">{item.merchType} | Qty: {item.cartQuantity}</p>
                    <p className="text-xs text-gray-600 font-semibold">RM{item.merchPrice}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-4">
              <div className="mb-4">
                <p className="font-semibold text-gray-600">Order Details</p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Total:</span> RM{order.totalPrice}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Invoice Number: {order.invoiceNumber}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Invoice Date: {new Date(order.invoiceDate).toLocaleDateString()}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Receipt Voucher: {order.receiptVoucher}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Delivery Charges:</span> {order.deliveryCharges}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Delivery Status:</span> {order.deliveryStatus}
                </p>
              </div>
            </div>
            <div className="px-4 py-5 bg-black rounded-b-lg text-white text-right">
              <p className="text-lg font-semibold">Total paid: RM{order.totalPaid}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PurchaseHistoryPage;

