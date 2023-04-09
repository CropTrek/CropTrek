import React, {useEffect, useState} from "react";
import {createProduct} from "../Redux/Actions/ProductActions";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
const ProductForm = ({ onSubmit, onCancel }) => {
    // Définissez des états pour chaque champ de formulaire (par exemple, name, price, etc.) en utilisant useState.
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [countInStock, setCountInStock] = useState(0)
    const [image, setImage] =useState("")
    const [imagePreview, setImagePreview] = useState(null);
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));

    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const profile = JSON.parse(localStorage.getItem('profile'));
        const idUser = profile._id;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('countInStock', countInStock);
        formData.append('image', image);
        try {
            await axios.post(`http://localhost:5000/api/products/${idUser}`, formData);
            toast.success('Product Added', { autoClose: 5000 });
            setName("");
            setPrice(0);
            setDescription("");
            setCountInStock(0);
            setImage("");
        } catch (error) {
            console.log(error);
            toast.error("Failed to create product");
        }
    };
    return (

        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label htmlFor="name">Name :</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)} required />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price :</label>
                <input type="number" className="form-control" id="price" value={price} onChange={(event) => setPrice(event.target.value)} required />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description :</label>
                <textarea className="form-control" id="description" rows="3" value={description} onChange={(event) => setDescription(event.target.value)} required></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="countInStock">Count In Stock :</label>
                <input type="number" className="form-control" id="countInStock" rows="3" value={countInStock} onChange={(event) => setCountInStock(event.target.value)} required></input>
            </div>

            <div className="form-group">
                <label htmlFor="image">Image :</label>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="image" onChange={handleImageChange} required />
                    <label className="custom-file-label" htmlFor="image">Choose Img Product  </label>
                </div>
                {imagePreview && (
                    <div className="mt-2">
                        <img src={imagePreview} alt="Prévisualisation de l'image" className="img-thumbnail" />
                    </div>
                )}
            </div>

            <button type="submit" className="btn btn-primary mr-2"  >Save</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Close</button>

        </form>

    );
};
export default ProductForm;
