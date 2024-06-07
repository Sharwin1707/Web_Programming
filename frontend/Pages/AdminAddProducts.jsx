// src/App.js
import React, { useEffect, useState } from "react";
import { useStateContext } from "../Context/ContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function AdminAddProduct() {
  const { user } = useStateContext();
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const [merchandise, setMerchandise] = useState([]);
  const [formData, setFormData] = useState({
    merchantId: user._id,
    name: "",
    price: 0,
    rating: 5,
    description: "",
    quantity: 0,
    type: "",
    tag: "best", // Default value for the dropdown
    image: "",
  });

  useEffect(() => {
    const fetchMerchandise = async (req, res) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/merchandise/${user._id}`
        );
        console.log(response);
        if (response.status == 200) {
          setMerchandise(response.data);
        }
      } catch (err) {}
    };

    fetchMerchandise();
    console.log(merchandise);
  }, [user._id]);

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageData = new FormData();
      imageData.append("file", imageFile);

      const uploadResponse = await axios.post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/images/upload`,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadResponse.data.url;
      console.log(imageUrl);

      const finalFormData = { ...formData, image: imageUrl };

      await axios.post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/merchandise/`,
        finalFormData
      );
      navigate("/shop");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-12">
      <div className="w-full max-w-[1080px] mb-4">
        <a href="/shop">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </a>
      </div>

      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-[1080px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Submit Product Info
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="type">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="tag">
            Tag
          </label>
          <select
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="best">Best</option>
            <option value="featured">Featured</option>
            <option value="new">New</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Image Upload
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        {imagePreview && (
          <div className="mt-6">
            <h3 className="text-gray-700">Image Preview:</h3>
            <img
              src={imagePreview}
              alt="Selected"
              className="mt-2 rounded-lg max-h-64"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </form>


        {/* view you merchandise */}
      <div className="w-full max-w-[1080px]">
        <h1 className="my-8 text-3xl text-center">Your Merchandises</h1>
        <hr className="w-full max-w-[] mb-8" />

        <div className="flex flex-col gap-8">
          {merchandise.length > 0 ? (
            merchandise.map((merch) => (
              <div className="flex gap-8">
                <div className="w-40 h-40 overflow-hidden">
                  <img className="w-full h-full object-cover" src={merch.image} alt="" />
                </div>
                <div>
                  <h1 className="text-2xl josefin">{merch.name}</h1>
                  <p>{merch.description}</p>
                  <p>Quantity : {merch.quantity}</p>
                </div>
              </div>
            ))
          ) : (<h1 className="text-center">You don't have any merchandise</h1>)}
        </div>
      </div>
    </div>
  );
}

export default AdminAddProduct;
