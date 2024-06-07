import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ShopItem from "../Components/ShopItem";
import { Link, useParams } from "react-router-dom";
import { useToast } from "../Components/Toast";
import { useStateContext } from "../Context/ContextProvider";
import axios from "axios";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { showToastMessage } = useToast();
  const { token, isGuest, username } = useStateContext(); // Ensure username is available in context
  const [shopData, setShopData] = useState([]);
  const [product, setProduct] = useState(null);
  const [imgMain, setImgMain] = useState("");
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { user } = useStateContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/merchandise/details/${id}`);
        setProduct(response.data);
        setImgMain(response.data.image);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/merchandise/`);
        setShopData(response.data);
      } catch (err) {
        console.error("Error fetching merchandise data:", err);
      }
    };

    fetchMerchandise();
  }, []);

  const handleImageClick = (imageUrl) => {
    setImgMain(imageUrl);
  };

  const handleAddToCart = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/cart/add`, {
        productId: id,
        quantity,
        name: product.name,
        type: product.type,
        price: product.price,
        image: product.image,
        username: user._id,
      });
      showToastMessage("Added to Cart");
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white bg-opacity-100 text-black p-6 rounded-md shadow-lg mx-[12%] my-12">
      <Link to={token ? "/shop" : "/guest/shop"}>
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>
      <div className="flex flex-col md:flex-row justify-center gap-12 ">
        <div className="relative w-[600px] flex flex-col gap-4">
          {/* Main Image Display */}
          <div className="bg-white rounded-md shadow-lg p-4 ">
            <img className="w-full h-full object-cover rounded-md" src={imgMain} alt={product.name} style={{ width: '500px', height: '500px' }} />
          </div>

          {/* Thumbnail Images */}
          <div className="w-full h-full flex gap-4 overflow-x-auto">
            {product.allImages &&
              product.allImages.map((image, index) => (
                <img
                  key={index}
                  onClick={() => handleImageClick(image)}
                  className="w-[200px] h-[200px] border cursor-pointer rounded-md shadow-md object-cover"
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
          </div>
        </div>

        <div className="w-[500px] h-[534px] p-4 bg-white rounded-md shadow-lg ">
          <h1 className="text-3xl font-bold mb-4 underline">{product.name}</h1>
          <p className="mb-4">{product.description}</p>
          <p className="mb-2"><strong>Categories: </strong>{product.type}</p>
          <p className="mb-4"><strong>Tags: </strong>{product.tag}</p>
          <hr className="border-gray-500 mb-4" />
          <p className="text-2xl font-bold mb-4"><strong>Price: </strong> RM {product.price}</p>

          <div className="flex flex-col mb-4">
            <label className="mb-2">Quantity:</label>
            <input
              className="py-1 px-2 rounded-md border border-gray-300"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="py-2 px-4 bg-[#dc3545] text-white rounded-md flex justify-center items-center gap-2 shadow-md"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              Add to Cart
            </button>
            <Link to={token ? `/payment` : `/guest/login`}>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <h1 className="text-center text-4xl my-8 border-b-4 border-black-500">
        FEATURED PRODUCTS
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {shopData
          .filter((data) => data.tag === "featured")
          .slice(0, 5)
          .map((data, i) => (
            <div key={i} className="flex flex-col justify-center items-center p-4 bg-white rounded-md shadow-md">
              <ShopItem
                id={data._id}
                name={data.name}
                image={data.image}
                ratingStar={data.rating}
                price={data.price}
                type={data.tag} // Ensure type is passed for filtering classes if needed
              />
              <button
                onClick={() => handleAddToCart(data._id)}
                className="w-max py-2 px-4 rounded-full border-2 border-green-500 hover:bg-green-500 hover:text-white mt-2"
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
