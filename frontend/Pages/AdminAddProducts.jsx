import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AdminAddProducts = () => {
    const [product, setProduct] = useState({
        productName: '',
        category: '',
        description: '',
        image: null
    });

    const [productImages, setProductImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setProductImages(selectedImages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your submission logic here
        console.log('Product Submitted:', product);
        // Clear the form after submission
        setProduct({
            productName: '',
            category: '',
            description: '',
            image: null
        });
    };

    const handleCancel = () => {
        // Clear the form
        setProduct({
            productName: '',
            category: '',
            description: '',
            image: null
        });
    };

    const [formHeight, setFormHeight] = useState('auto'); // Initialize form height state

    // Function to adjust form height dynamically based on content
    const adjustFormHeight = () => {
        const formContainer = document.getElementById('formContainer');
        if (formContainer) {
            const newHeight = formContainer.scrollHeight + 'px';
            setFormHeight(newHeight);
        }
    };

    // Call adjustFormHeight function when component mounts and whenever form content changes
    useEffect(() => {
        adjustFormHeight();
    }, []); // Run only once when component mount
    

    return (
        <div id="formContainer" className="container mt-5 josefin center container-add-product" style={{ minHeight: formHeight }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <Link to={'/home'}>
                    <FontAwesomeIcon icon={faArrowLeft} size='2x' />
                </Link>
                <h2 className="mb-4 text-white head-cont" style={{ marginLeft: '10px' }}>Add New Product</h2>
            </div>
            <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', borderRadius: '5px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', color: '#000' }}>
                <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input type="text" className="form-control border-black pd" id="productName" name="productName" value={product.productName} onChange={handleChange} required style={{ width: '100%', height: '30px', borderRadius: '5px' }} />
                </div>
                <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select border-black pd" style={{ height: '30px', borderRadius: '5px' }} id="category" name="category" value={product.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Trouser">Trouser</option>
                        <option value="Tote Bag">Tote Bag</option>
                    </select>
                </div>
                <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="description" className="form-label">Product Description</label>
                    <textarea className="form-control border-black pd" id="description" name="description" value={product.description} onChange={handleChange} required style={{ height: '60px', borderRadius: '5px' }}></textarea>
                </div>
                <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="image" className="form-label">Product Images</label>
                    <input type="file" className="form-control border-black" id="image" name="image" accept="image/*" onChange={handleImageChange} multiple required style={{ height: '30px', borderRadius: '5px' }} />
                    {/* Display the uploaded images */}
                    
                    {/* Boxes for selected images */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                        {[...Array(4)].map((_, index) => (
                            <div key={index} style={{ marginRight: '10px', marginBottom: '10px', border: '1px solid #ccc', width: '200px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {/* Render selected image if exists */}
                                {index < productImages.length && (
                                    <img src={URL.createObjectURL(productImages[index])} alt={`Product Image ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                )}
                                {/* Add text inside the box */}
                                {index < productImages.length ? null : (
                                    <div style={{ textAlign: 'center' }}>Image {index + 1}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-3 mt-10">
                    <button type="submit" className="btn btn-primary text-white green px-6 py-2 rounded hover:bg-green-600 mr-2">Submit</button>
                    <button type="button" className="btn btn-secondary text-white red px-6 py-2 rounded hover:bg-red-600" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AdminAddProducts;
