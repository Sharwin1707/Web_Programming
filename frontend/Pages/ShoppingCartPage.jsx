
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "../Components/Toast";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useStateContext } from "../Context/ContextProvider"; // Ensure you have the context to get user info

const ShoppingCartPage = () => {
  const { token, isGuest, username } = useStateContext(); 
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [delivery, setDelivery] = useState(5.00);
  const { user } = useStateContext(); // Assuming your context provides user info
  const navigate = useNavigate();
  const { showToastMessage } = useToast();

  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');

  const handleRedeem = async () => {
    try {
      const response = await axios.post('http://localhost:3000/voucher/redeem-voucher', { voucherCode });
      const discountValue = parseFloat(response.data.voucherDisc).toFixed(2);
      setDiscount(response.data.voucherDisc);
      setMessage(`- RM ${discountValue}`);
    } catch (error) {
      setMessage(error.response ? error.response.data : 'Error redeeming voucher');
      setDiscount(null);
    }
  };

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
    setTotalPrice(parseFloat(total - discount + delivery).toFixed(2));
  }, [quantities, cartData, discount, delivery]);

  const incrementQuantity = async (merchandiseId) => {
    const newQuantity = (quantities[merchandiseId] || 0) + 1;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [merchandiseId]: newQuantity,
    }));

    await updateCartQuantity(merchandiseId, newQuantity);
  };

  const decrementQuantity = async (merchandiseId) => {
    const newQuantity = Math.max((quantities[merchandiseId] || 0) - 1, 0);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [merchandiseId]: newQuantity,
    }));

    await updateCartQuantity(merchandiseId, newQuantity);
  };

  // const updateCartQuantity = async (merchandiseId, newQuantity) => {
  //   try {
  //     await axios.put(`${import.meta.env.VITE_SERVER_ENDPOINT}/cart/update/${user._id}`, {
  //       merchandiseId,
  //       quantity: newQuantity
  //     });
  //   } catch (error) {
  //     console.error("Error updating cart quantity:", error);
  //   }
  // };



  const updateCartQuantity = async (merchandiseId, newQuantity) => {
    try {
      await axios.put(`${import.meta.env.VITE_SERVER_ENDPOINT}/cart/update/${user._id}/${merchandiseId}`, {
        quantity: newQuantity
      });
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const handleClick = () => {
    if (cartData.length === 0) {
      showToastMessage("Please add an item");
    } else {
      navigate(token ? "/payment" : "/guest/login", {
        state: {
          delivery: parseFloat(delivery),
          discount: parseFloat(discount),
          voucherCode: voucherCode
        }
      });
    }
  };

  const deleteCartItem = async (merchandiseId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/cart/item/${merchandiseId}`);
      setCartData(cartData.filter(item => item.merchandiseId !== merchandiseId));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <div className="josefin mx-[12%] bg-white text-black p-6 rounded-md shadow-lg mt-10 mb-10">
      <Link to={"/shop"}>
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>

      <div className="flex h-[700px] flex-col xl:flex-row gap-12">
        <div className="min-w-max md:w-[50%]">
          <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
              {cartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-lg font-semibold">Your cart is empty.</p>
              <Link to="/shop" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                Continue Shopping
              </Link>
            </div>
            ) : (
            <ul className="flex flex-col gap-6">
              {cartData.map((item) => (
              <li
                key={item.merchandiseId}
                className="flex items-center justify-between gap-4 border-b pb-4"
              >
                <img width="100px" height="100px" src={item.merchImage} alt="Product" className="w-24 h-24 object-cover rounded-md shadow-md" />
                <div className="flex-1">
                  <p className="text-lg font-semibold">{item.merchName}</p>
                  <p className="text-sm text-gray-500">{item.merchType}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm">Quantity:</p>
                  <button
                    className="w-[24px] text-black rounded-md bg-gray-200"
                    onClick={() => decrementQuantity(item.merchandiseId)}
                  >
                  -
                  </button>
                  <span className="text-xl px-4">{quantities[item.merchandiseId] || 0}</span>
                  <button
                    className="w-[24px] text-black rounded-md bg-gray-200"
                    onClick={() => incrementQuantity(item.merchandiseId)}
                  >
                   +
                  </button>
                </div>
                <p className="text-lg font-semibold">RM {item.merchPrice * (quantities[item.merchandiseId] || 0)}</p>

                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-md h-10"
                  onClick={() => deleteCartItem(item.merchandiseId)}
                >
                 X
                </button>
              </li>
              ))}
            </ul>
          )}
        </div>


        <div className="min-w-max xl:w-[50%] p-6 flex flex-col gap-6 bg-gray-100 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-4">Summary</h1>
          <div className="flex flex-col gap-4 flex-grow">
            <div className="flex justify-between">
              <p className="text-lg">Shipping</p>
              <select
                className="px-4 py-2 rounded-md text-black bg-white"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
             >
               <option value="5.00">Standard Delivery - RM 5.00</option>
               <option value="10.00">Express Delivery - RM 10.00</option>
              </select>
            </div>
            {/* <div className="flex my-4 p-2 border rounded-md bg-white shadow-sm">
              <input
                className="flex flex-1 px-4 py-2 rounded-md border border-gray-300"
                type="text"
               placeholder="Promo code"
              />
              <button className="bg-green-600 text-white px-4 rounded-md ml-2">Redeem</button>
            </div> */}

            <div className="flex my-4 p-2 border rounded-md bg-white shadow-sm">
             <input
              className="flex flex-1 px-4 py-2 rounded-md border border-gray-300"
              type="text"
              placeholder="Promo code"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <button 
              className="bg-green-600 text-white px-4 rounded-md ml-2"
              onClick={handleRedeem}
            >
              Redeem
            </button>
          </div>
          {message && (
            <div className="flex justify-between text-xl font-semibold">
              <p>Discount:</p>
              <p>{message}</p>
            </div>
            )}

            <div className="flex justify-between text-xl font-semibold">
              <p>Delivery:</p>
              <p>+ RM {parseFloat(delivery).toFixed(2)}</p>
            </div>
        
           <div className="flex justify-between text-xl font-semibold">
              <p>Total price:</p>
              <p>RM {totalPrice || 0}</p>
            </div>
            <div className="mt-auto px-4 py-2 text-center">
              <button
                onClick={handleClick}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                >
              Buy now
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShoppingCartPage;