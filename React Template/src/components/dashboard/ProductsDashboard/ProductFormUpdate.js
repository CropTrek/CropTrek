import React, {useEffect, useState} from "react";
import {createProduct} from "../../../../Redux/Actions/ProductActions";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
const ProductFormUpdate = (props) => {
    const { product, onCancel } = props;
    // Définissez des états pour chaque champ de formulaire (par exemple, name, price, etc.) en utilisant useState.
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [countInStock, setCountInStock] = useState("");

    useEffect(() => {
        // Fetch the product data using the `id` parameter
        fetch(`http://localhost:5000/api/products/${product._id}`)
            .then((res) => res.json())
            .then((data) => {
                setName(data.name);
                setPrice(data.price);
                setDescription(data.description);
                setCountInStock(data.countInStock);
            })
            .catch((error) => console.error(error));
    }, [product._id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send a PUT request to update the product using the form data
        fetch(`http://localhost:5000/api/products/updateProduct/${product._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                price,
                description,
                countInStock,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
             toast.success("ProductUpdated")
            })
            .catch((error) => console.error(error));
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



            <button type="submit" className="btn btn-primary mr-2"  >Save</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Close</button>

        </form>

    );
};
export default ProductFormUpdate;
