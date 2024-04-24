import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCartShopping , faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ShopItem from '../Components/ShopItem';
import { Link } from 'react-router-dom';
import { shopData } from '../sampleData';
import { useParams } from 'react-router-dom';
import { useToast } from '../Components/Toast';

const ProductDetailPage = () => {

  const { id } = useParams();
  const {showToastMessage } = useToast();

  // State to track the product image data
  const [productImage, setProductImage] = useState({});

  useEffect(() => {
    // Filter shopData array to find the product by id
    const selectedProduct = shopData.find(item => item.name === id);
    if (selectedProduct) {
      setProductImage(selectedProduct);
    }
  }, [id]);

  // State to track the main image URL
  const [imgMain, setImgMain] = useState('');

  useEffect(() => {
    if (productImage.displayImage) {
      setImgMain(productImage.displayImage);
    }
  }, [productImage]);

  // Function to handle clicking on thumbnail images
  const handleImageClick = (imageUrl) => {
    setImgMain(imageUrl);
  };

  const addToCart = () => {
    showToastMessage('Added to Cart')
  }

  return (
    <div className='mx-[12%] my-12'>
      <Link to={'/shop'}>
        <FontAwesomeIcon  icon={faArrowLeft} size='2x'/>
      </Link>
      <div className='flex flex-col md:flex-row justify-center gap-12'>
        <div className='relative w-[600px] flex flex-col gap-4'>
          {/* Main Image Display */}
          <div className=''>
            <img className='w-full h-full object-cover' src={imgMain} alt="" />
          </div>
          

          {/* Thumbnail Images */}
          <div className='w-full h-full flex gap-4 overflow-x-auto'>
            {productImage.allImages &&
              productImage.allImages.map((image, index) => (
                <img
                  key={index}
                  onClick={() => handleImageClick(image)}
                  className='w-[200px] border cursor-pointer'
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
          </div>
        </div>

        <div className='w-[500px] josefin '>
      
          <h1 className='text-blue-600 underline'>Leopard Shirt Dress</h1> 
          <p>Praesent ac condimentum felis. Nulla at nisl orci, at dignissim dolor, The best product descriptions address your ideal buyer directly and personally. The best product descriptions address your ideal buyer directly and personally.</p>
            <br />
          <p><strong>Categories: </strong></p>
          <p><strong>Tags: </strong></p>
            <br /><hr /><br />
          <p><strong>Price: </strong> RM</p>

          <div className='flex flex-col'>
            <label>Quatity: </label>
            <input className='py-1 px-2 rounded-md ' type="number" />
          </div>

          <div className='flex gap-3 mt-4'>
            <button onClick={addToCart} className='py-2 px-4 bg-[#dc3545] rounded-md flex justify-center items-center gap-2'><FontAwesomeIcon icon={faCartShopping}/>Add to Cart</button>
            <Link to={'/payment'}>
              <button className='px-4 py-2 bg-green-600 rounded-md'>Buy Now</button>
            </Link>
          </div>
        </div>
      </div>


      <h1 className='text-center text-4xl my-8 border-b-4 border- border-green-500'>FEATURED PRODUCTS</h1>
      <div className='flex flex-wrap justify-center gap-4'>

            {shopData.slice(0,5).map((data,i) => (
              <div className='flex flex-col justify-center items-center p-2 border rounded-md'>
                <ShopItem key={i} name={data.name} image={data.displayImage} ratingStar={5} price={120}/>
                <button className='w-max py-2 px-4 rounded-full border-2 border-green-500 hover:bg-green-500 hover:text-white '>Add to Cart</button>
              </div>
            ))}
          
      </div>

    </div>
  );
};

export default ProductDetailPage;
