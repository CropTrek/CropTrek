import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardGroup,
    Button,
    Row,
    Col,
} from "reactstrap";
import Blog from "../src/components/dashboard/Blog";
import bg1 from "../src/assets/images/bg/bg1.jpg";
import bg2 from "../src/assets/images/bg/bg2.jpg";
import bg3 from "../src/assets/images/bg/bg3.jpg";
import bg4 from "../src/assets/images/bg/bg4.jpg";
import Image from "next/image";
import FullLayout from "../src/layouts/FullLayout";
import ProductModel from "./ProductModel";
import React, {useEffect, useState} from "react";
import ProductForm from "./ProductForm";
import {createProduct} from "../Redux/Actions/ProductActions";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import ProductFormUpdate from "./ProductFormUpdate";

const MyVitrinPage = (props) => {

    const [showForm, setShowForm] = useState(false);
    const [showProducts1, setShowProducts1] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    async function fetchProduct() {
        const profile = JSON.parse(localStorage.getItem('profile'));
        const idUser = profile._id;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${idUser}`,
                },
            };

            const response = await axios.get(
                `http://localhost:5000/api/products/productsByUser/${idUser}/products`,
                config
            );
            setShowProducts1(response.data);
        } catch (error) {
            const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            if (message === "Cannot read properties of null (reading '_id')") {
                localStorage.removeItem('profile')
                localStorage.removeItem('token')
                router.push("/Auth")
            }
            throw new Error(message);
        }
    }

    useEffect(() => {
        fetchProduct()
    }, []);

    const handleFormSubmit = () => {
        setShowForm(false);
        fetchProduct();
    };

    const handleFormCancel = () => {
        setShowForm(false);
        fetchProduct();
    };
    const handleFormCance2=()=>{
        setShowEditForm(false)
        fetchProduct()
    }
    async function deleteProduct(id) {
        if (window.confirm('Are you sure you want to delete')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                toast.success('Product deleted', { autoClose: 5000 });
                //const response = await axios.get('http://localhost:5000/api/products');
                fetchProduct();
            } catch (error) {
                console.error(error);
                toast.error('An error occurred while deleting the product');
            }
        }
    }


    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setShowEditForm(true);
    }

    const handleEditFormSubmit = () => {
        setShowEditForm(false);
        fetchProduct();
    };
    const filteredProducts = showProducts1.filter(product => {
        const searchValue = searchTerm.toLowerCase();
        const productName = product.name.toLowerCase();
        const productPrice = product.price >= minPrice && product.price <= maxPrice;
        return productName.includes(searchValue) && productPrice;
    });


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };



    return (
        <>
            <ToastContainer />
            <div className="container">


                <h5>My Vitrin</h5>
<br/>
                <div className="d-flex justify-content-between align-items-center col-12">
                    <Button color="primary" onClick={() => setShowForm(true)}>
                        Ajouter un produit
                    </Button>
                    <div style={{marginLeft:"50px"}} className="d-flex flex-row align-items-center">
                        <input type="text" className="form-control col-6 mr-2" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
                        <div className="d-flex align-items-center">
                            <input type="range" className="form-control-range mr-2" min="0" max="1000" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                            <span>Min Price: {minPrice}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <input type="range" className="form-control-range mr-2" min="0" max="10000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                            <span>Max Price: {maxPrice}</span>
                        </div>
                        <button className="btn btn-outline-secondary ml-2" onClick={() => setSearchTerm('')}>Clear</button>
                    </div>

                </div>



                <br/>
                {showForm ? (
                    <ProductForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
                ) : null}
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <div className="table-responsive">
                        <Row>
                            {filteredProducts.map((product) => (
                                <Col sm="6" lg="6" xl="3" key={product.name}>
                                    <Card>
                                        <CardImg top width="100%" src={`http://localhost:5000/uploads/${product.image}`} alt="Card image cap" />
                                        <CardBody>
                                            <CardTitle tag="h5">{product.name}</CardTitle>
                                            <CardSubtitle tag="h6" className="mb-2 text-muted">{product.subtitle}</CardSubtitle>
                                            <CardText>{product.price} DT</CardText>
                                            <CardText>{product.description}</CardText>
                                            <CardText>{product.quantity}</CardText>
                                            <div className="d-flex justify-content-between">
                                                <Button onClick={() => handleEditClick(product)} className="btn" outline color="info">
                                                    <i className="bi bi-pencil-fill"></i>
                                                </Button>
                                                <Button onClick={() => deleteProduct(product._id)} className="btn" outline color="warning">
                                                    <i className="bi bi-trash3-fill"></i>
                                                </Button>
                                            </div>
                                        </CardBody>

                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        {showEditForm ? (
                            <ProductFormUpdate product={selectedProduct} onCancel={handleFormCance2} defaultValues={selectedProduct} />
                        ) : null}
                    </div>
                </div>




            </div>
        </>
    );
};

export default MyVitrinPage;
