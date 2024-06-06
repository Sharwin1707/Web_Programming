import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../Components/Toast";
import { useStateContext } from "../Context/ContextProvider";
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const { user } = useStateContext();
  const { showToastMessage } = useToast();
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const location = useLocation();
  const { delivery, discount, voucherCode } = location.state || { delivery: 0, discount: 0 };


  // Function to get or set voucher code
  const getReceiptVoucher = (voucherCode) => {
    return voucherCode ? voucherCode : "NULL";
  };

  const receiptVoucher = getReceiptVoucher(voucherCode);

  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    address2: '',
    postcode: '',
    state: '',
    country: 'Malaysia',
    paymentType: '',
    nameOnCard: '',
    cardNumber: '',
    expiration: '',
    cvv: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/cart/user/${user._id}`);
        setCartData(response.data); // The API now returns the merchandise array directly
        const initialQuantities = {};
        response.data.forEach((item) => {
          initialQuantities[item.merchandiseId] = item.cartQuantity;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (user && user._id) {
      fetchCartData();
    }
  }, [user]);

  useEffect(() => {
    let total = 0;
    cartData.forEach((item) => {
      const quantity = quantities[item.merchandiseId] || 0;
      total += item.merchPrice * quantity;
    });
    setTotalPrice((total - discount + delivery).toFixed(2));
  }, [quantities, cartData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentData = {
      userId: user._id,
      cartItems: cartData.map(item => ({
        merchandiseId: item.merchandiseId,
        merchName: item.merchName,
        merchType: item.merchType,
        merchPrice: item.merchPrice,
        cartQuantity: quantities[item.merchandiseId] || 0
      })),
      totalPrice,
      paymentMethod: billingDetails.paymentType,
      billingAddress: {
        firstName: billingDetails.firstName,
        lastName: billingDetails.lastName,
        email: billingDetails.email,
        address: billingDetails.address,
        address2: billingDetails.address2,
        postcode: billingDetails.postcode,
        state: billingDetails.state,
        country: billingDetails.country
      },
      cardDetails: {
        nameOnCard: billingDetails.nameOnCard,
        cardNumber: billingDetails.cardNumber,
        expiration: billingDetails.expiration,
        cvv: billingDetails.cvv
      }
    };

    console.log("Sending payment data:", paymentData);

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/payment/`, paymentData);
      

       // Prepare purchase history data
    const purchaseHistoryData = {
      userId: user._id,
      receiptVoucher: generateReceiptVoucher(), // You can create a function to generate this
      discount: discount, // You can create a function to calculate this
      merchandise: cartData.map(item => ({
        merchandiseId: item.merchandiseId,
        cartQuantity: quantities[item.merchandiseId] || 0,
        merchName: item.merchName,
        merchType: item.merchType,
        merchPrice: item.merchPrice,
        merchImage: item.merchImage
      })),
      totalPrice,
      invoiceNumber: generateInvoiceNumber(), // You can create a function to generate this
      invoiceDate: new Date(),
      deliveryCharges: 'Free', // or calculate if applicable
      totalPaid: totalPrice, // Example calculation
      deliveryStatus: 'Processing' // Initial delivery status
    };

    // Save the purchase history data
    await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/purchasehistory`, purchaseHistoryData);


      // Delete the cart after successful payment
      await axios.delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/cart/user/${user._id}`);
      showToastMessage("Payment Successful");
      navigate("/purchasehistory");
    } catch (error) {
      console.error("Error saving payment data:", error);
    }
  };


  const generateReceiptVoucher = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let voucher = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      voucher += characters[randomIndex];
    }
    return voucher;
  };


  
  const generateInvoiceNumber = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit number
    return randomNumber.toString();
  };

  return (
    <div className="px-[8%] josefin  min-h-screen py-8">
      <Link to="/shop">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>
      <div className="w-full flex flex-col xl:flex-row gap-8 mt-8">
        <div className="relative w-full xl:w-[50%] bg-white rounded-md shadow-md p-4">
          <h1 className="text-2xl py-4 border-b font-bold text-black border-gray-300">Your Cart</h1>
          <ul className="text-black rounded-md overflow-hidden">
            {cartData.map((item) => (
              <li key={item.merchandiseId} className="px-4 py-2 bg-white-200 border-b border-gray-300">
                <div className="flex justify-between">
                  <h1>{item.merchName}</h1>
                  <h1 className="text-gray-600">RM{item.merchPrice * (quantities[item.merchandiseId] || 0)}</h1>
                </div>
                <p className="text-gray-700">{item.merchType}</p>
              </li>
            ))}
            <li className="px-4 py-4 flex justify-between bg-red-200 border-b border-gray-300">
              <h1>Shipping Fee</h1>
              <h1>
                <strong>RM{delivery.toFixed(2)}</strong>
              </h1>
            </li>
            <li className="px-4 py-4 flex justify-between bg-green-200 border-b border-gray-300">
              <h1>Discount </h1>
              <h1>
                <strong>RM{discount.toFixed(2)}</strong>
              </h1>
            </li>
            <li className="px-4 py-4 flex justify-between bg-gray-200 border-b border-gray-300">
              <h1>Total</h1>
              <h1>
                <strong>RM{totalPrice}</strong>
              </h1>
            </li>
          </ul>

        </div>

        <div className="relative w-full xl:w-[50%] bg-white rounded-md shadow-md p-4">
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <h1 className="text-3xl mb-4 font-bold text-black ">Billing Address</h1>
            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="flex flex-1 flex-col">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  className="px-4 py-2 rounded-md border border-gray-300"
                  type="text"
                  required
                  placeholder="First name"
                  value={billingDetails.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-1 flex-col">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  className="px-4 py-2 rounded-md border border-gray-300"
                  type="text"
                  required
                  placeholder="Last name"
                  value={billingDetails.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                className="px-4 py-2 rounded-md border border-gray-300"
                type="email"
                required
                placeholder="Email"
                value={billingDetails.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-1 flex-col">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                required
                placeholder="Address"
                value={billingDetails.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-1 flex-col">
              <label htmlFor="address2">Address2 (Optional)</label>
              <input
                id="address2"
                name="address2"
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                placeholder="Address2"
                value={billingDetails.address2}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-1 flex-col">
                <label htmlFor="postcode">Postcode</label>
                <input
                  id="postcode"
                  name="postcode"
                  className="px-4 py-2 rounded-md border border-gray-300"
                  type="number"
                  required
                  placeholder="Postcode"
                  value={billingDetails.postcode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-1 flex-col">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  className="text-black px-4 py-3 rounded-md border border-gray-300"
                  required
                  value={billingDetails.state}
                  onChange={handleInputChange}
                >
                  <option value="">Select State</option>
                  <option value="Kuala Lumpur">Kuala Lumpur</option>
                  <option value="Kedah">Kedah</option>
                  <option value="Johor">Johor</option>
                  <option value="Sabah">Sabah</option>
                </select>
              </div>

              <div className="flex flex-1 flex-col">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  className="text-black px-4 py-3 rounded-md border border-gray-300"
                  required
                  value={billingDetails.country}
                  onChange={handleInputChange}
                >
                  <option value="Malaysia">Malaysia</option>
                </select>
              </div>
            </div>

            <hr />

            <h1 className="text-3xl mb-4 font-bold text-black ">Payment</h1>

            <div className="text-xl mb-4 text-black ">
              <div className="flex items-center gap-4">
                <input
                  id="creditCard"
                  type="radio"
                  value="Credit Card"
                  name="paymentType"
                  required
                  checked={billingDetails.paymentType === 'Credit Card'}
                  onChange={handleInputChange}
                />
                <label htmlFor="creditCard">Credit Card</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  id="debitCard"
                  type="radio"
                  value="Debit Card"
                  name="paymentType"
                  required
                  checked={billingDetails.paymentType === 'Debit Card'}
                  onChange={handleInputChange}
                />
                <label htmlFor="debitCard">Debit Card</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  id="tng"
                  type="radio"
                  value="Tng"
                  name="paymentType"
                  required
                  checked={billingDetails.paymentType === 'Tng'}
                  onChange={handleInputChange}
                />
                <label htmlFor="tng">TouchnGo</label>
              </div>
            </div>

            <div className="flex flex-1 flex-col">
              <label htmlFor="nameOnCard">Name on Card</label>
              <input
                id="nameOnCard"
                name="nameOnCard"
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                required
                placeholder="Name on Card"
                value={billingDetails.nameOnCard}
                onChange={handleInputChange}
              />
              <div className="text-gray-500">Full name as displayed on card</div>
            </div>

            <div className="flex flex-1 flex-col">
              <label htmlFor="cardNumber">Credit card number</label>
              <input
                id="cardNumber"
                name="cardNumber"
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                required
                placeholder="Credit card number"
                value={billingDetails.cardNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-1 flex-col">
              <label htmlFor="expiration">Expiration</label>
              <input
                id="expiration"
                name="expiration"
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                required
                placeholder="MM/YY"
                value={billingDetails.expiration}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-1 flex-col">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                name="cvv"
                className="px-4 py-2 rounded-md border border-gray-300"
                type="text"
                required
                placeholder="CVV"
                value={billingDetails.cvv}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="w-max my-4 px-4 py-3 bg-red-500 text-white rounded-md shadow-md">
              CONTINUE TO CHECKOUT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
