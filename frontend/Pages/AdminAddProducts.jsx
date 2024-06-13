import React, { useEffect, useState } from "react";
import { useStateContext } from "../Context/ContextProvider";
import { useToast } from "../Components/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Components/Spinner";

function AdminAddProduct() {
  const { user, setUser, token } = useStateContext();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showToastMessage } = useToast();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [merchandise, setMerchandise] = useState([]);
  const [formData, setFormData] = useState({
    merchantId: "",
    name: "",
    price: 0,
    rating: 5,
    description: "",
    quantity: 0,
    type: "",
    tag: "best",
    image: ""
  });

  // Handle missing user id when refresh
  useEffect(() => {
    const fetchUser = async () => {
      if (!user && token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_ENDPOINT}/users/${token}`);
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };

    fetchUser();
  }, [user, token]);

  // Update form data with merchantId once user is set
  useEffect(() => {
    if (user && user._id) {
      setFormData((prevData) => ({
        ...prevData,
        merchantId: user._id
      }));
    }
  }, [user]);

  const [editMerchandise, setEditMerchandise] = useState(null);
  const [deleteMerchandise, setDeleteMerchandise] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageEditPreview, setImageEditPreview] = useState(null);

  useEffect(() => {
    const fetchMerchandise = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_ENDPOINT}/merchandise/${token}`
        );
        setMerchandise(response.data);
      } catch (err) {
        //setError("Failed to fetch merchandise");
      } finally {
        setLoading(false);
      }
    };

    fetchMerchandise();
  }, [merchandise]);

  

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

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageEditPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");
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
      const finalFormData = { ...formData, image: imageUrl };

      await axios.post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/merchandise/`,
        finalFormData
      );

      showToastMessage("Product added successfully");
      setFormData({
        merchantId: user._id,
        name: "",
        price: 0,
        rating: 5,
        description: "",
        quantity: 0,
        type: "",
        tag: "best",
        image: "",
      });
      setImagePreview(null);

      // Refresh merchandise list after adding new product
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/merchandise/${user._id}`
      );
      setMerchandise(response.data);
    } catch (e) {
      setError("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const imageData = new FormData();
      if (imageFile) {
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
        editMerchandise.image = imageUrl;
      }

      await axios.put(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/merchandise/${
          editMerchandise._id
        }`,
        editMerchandise
      );

      // Update local state
      setMerchandise((prevMerchandise) =>
        prevMerchandise.map((item) =>
          item._id === editMerchandise._id ? editMerchandise : item
        )
      );

      showToastMessage("Product updated successfully");
      setEditMerchandise(null);
      setImageFile(null);
      setImageEditPreview(null);
    } catch (e) {
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (merch) => {
    setEditMerchandise(merch);
    setImageEditPreview(merch.image);
  };

  const handleDelete = (merch) => {
    setDeleteMerchandise(merch);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/merchandise/${
          deleteMerchandise._id
        }`
      );
      showToastMessage("Product deleted successfully");
      setDeleteMerchandise(null);
      setMerchandise(
        merchandise.filter((m) => m._id !== deleteMerchandise._id)
      );
    } catch (e) {
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-12">
      {loading && <Spinner />}
      <div className="w-full max-w-[1080px] mb-4">
        <a href="/shop">
          <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </a>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-white-800">
        Add Your Product
      </h2>
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-[1080px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Submit Product Info
        </h2>

        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

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

      {/* View Your Merchandise */}
      <div className="w-full max-w-[1080px]">
        <h1 className="my-8 text-3xl text-center">Your Merchandises</h1>
        <hr className="w-full max-w-[] mb-8" />

        <div className="flex flex-col gap-8">
          {merchandise.length > 0 ? (
            merchandise.map((merch) => (
              <div key={merch._id} className="flex gap-8">
                <div className="w-40 h-40 overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={merch.image}
                    alt={merch.name}
                  />
                </div>
                <div>
                  <h1 className="text-2xl josefin">{merch.name}</h1>
                  <p>{merch.description}</p>
                  <p>Quantity: {merch.quantity}</p>
                  <div className="flex gap-4 mt-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      onClick={() => handleEdit(merch)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      onClick={() => handleDelete(merch)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center">You don't have any merchandise</h1>
          )}
        </div>
      </div>

      {/* Edit Merchandise Modal */}
      {editMerchandise && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[1000px]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Edit Merchandise
            </h2>
            <form
              onSubmit={handleEditSubmit}
              className="grid grid-cols-3 gap-4"
            >
              <div className="col-span-1">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editMerchandise.name}
                  onChange={(e) =>
                    setEditMerchandise({
                      ...editMerchandise,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={editMerchandise.price}
                  onChange={(e) =>
                    setEditMerchandise({
                      ...editMerchandise,
                      price: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={editMerchandise.quantity}
                  onChange={(e) =>
                    setEditMerchandise({
                      ...editMerchandise,
                      quantity: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              <div className="col-span-1">
                <label
                  className="block text-gray-700 mb-2 "
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={editMerchandise.description}
                  onChange={(e) =>
                    setEditMerchandise({
                      ...editMerchandise,
                      description: e.target.value,
                    })
                  }
                  className="w-full h-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="tag">
                  Tag
                </label>
                <select
                  id="tag"
                  name="tag"
                  value={editMerchandise.tag}
                  onChange={(e) =>
                    setEditMerchandise({
                      ...editMerchandise,
                      tag: e.target.value,
                    })
                  }
                  className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                >
                  <option value="best">Best</option>
                  <option value="featured">Featured</option>
                  <option value="new">New</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="type">
                  Type
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={editMerchandise.type}
                  onChange={(e) =>
                    setEditMerchandise({
                      ...editMerchandise,
                      type: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              <div className="col-span-1">
                <label
                  className="block text-gray-700 mb-2 mt-8"
                  htmlFor="image"
                >
                  Image Upload
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleEditImageChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {imageEditPreview && (
                <div className="col-span-1 mt-8">
                  <img
                    src={imageEditPreview}
                    alt="Selected"
                    className="mt-2 rounded-lg max-h-24"
                  />
                </div>
              )}

              <div className="col-span-3 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  onClick={() => setEditMerchandise(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteMerchandise && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[500px]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Confirm Deletion
            </h2>
            <p>Are you sure you want to delete this merchandise?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setDeleteMerchandise(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAddProduct;

