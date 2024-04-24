import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCartShopping , faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const sampleImage = [
  { id: 'img1', url: 'https://img.freepik.com/free-vector/colorful-gradient-liquid-shapes_23-2148278890.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707955200&semt=ais',
price: 120 },
  { id: 'img2', url: 'https://img.freepik.com/premium-photo/twisted-ribbon-glowing-colorfull-background-design_955712-15789.jpg?size=626&ext=jpg&ga=GA1.1.34264412.1712880000&semt=ais' ,
  price: 80},
  { id: 'img3', url: 'https://img.freepik.com/premium-photo/impressive-3d-rendering-that-features-dynamic-wave-abstract-background_974732-36362.jpg',
  price: 20 },
];

const ShoppingCartPage = () => {

  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  
  useEffect(() => {
    const initialQuantities = {};
    sampleImage.forEach((image) => {
      initialQuantities[image.id] = 1; 
    });
    setQuantities(initialQuantities);
  }, []);

  useEffect(() => {
    let total = 0;
    sampleImage.forEach((image) => {
      const quantity = quantities[image.id] || 0;
      total += image.price * quantity;
    });
    setTotalPrice(total);
  }, [quantities]);

  // Function to handle incrementing quantity
  const incrementQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  // Function to handle decrementing quantity
  const decrementQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
    }));
  };

  return (
    <div className='josefin mx-[12%]'>

        <Link to={'/shop'}>
            <FontAwesomeIcon  icon={faArrowLeft} size='2x'/>
        </Link>

        <div className='flex flex-col xl:flex-row gap-12'>
            <div className='min-w-max md:w-[50%]'>
                <h1 className='text-2xl'>Shopping Cart</h1>
                <ul className='flex flex-col gap-6 border rounded-md'>
                {sampleImage.map((img) => (
                    <li key={img.id} className='flex items-center gap-12 border-b p-2'>
                    <img width='100px' src={img.url} alt='Product' />
                    <div>
                        <p>Shirt <br /> Cotton shirt</p>
                    </div>
                        <div className='flex items-center gap-2 '>
                            <p>Quantity:</p>
                            <button className='w-[24px] text-black rounded-md bg-white' onClick={() => decrementQuantity(img.id)}>-</button>
                            <span className='text-xl px-4'>{quantities[img.id] || 0}</span>
                            <button className='w-[24px] text-black rounded-md bg-white' onClick={() => incrementQuantity(img.id)}>+</button>
                        </div>

                        <p>RM {img.price * (quantities[img.id] || 0)}</p>

                    </li>
                ))}
                </ul>
            </div>

            <div className='min-w-max xl:w-[50%] p-6 flex flex-col gap-6'>
                <h1 className='text-2xl'>Summary</h1>
                <hr />
                <div className='flex flex-col'>
                   <p >Shipping</p>
                    <select className='px-4 py-2 rounded-md text-black'>
                        <option value="">Standard-delivery- RM 5.00</option>    
                    </select> 
                </div>
                <div className='flex flex-col mt-4'>
                   <p >Promo Code</p>
                    <input type="text" className='px-4 py-2 rounded-md text-black'/>
                        
                </div>

                <div>
                    <p className='text-xl'>Total price: RM {totalPrice || 0}</p>

                </div>

                <div>
                  <button className='px-4 py-2 bg-green-500 rounded-md'>Buy now</button>
                </div>

                
            </div>
        </div>
      

      
    </div>
  );
};

export default ShoppingCartPage;
