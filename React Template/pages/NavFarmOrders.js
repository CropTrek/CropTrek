import React, {useEffect, useState} from "react";
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import Orders from "./Orders/Orders";
import MyVitrin from "./MyVitrin";
import Access from "./Access";
import {useDispatch, useSelector} from "react-redux";
import {get} from "local-storage";
import {listMyOrders} from "../Redux/Actions/OrderActions";
import {listMyProducts} from "../Redux/Actions/ProductActions";

const NavFarmOrders = () => {
    const [connectedUser, setConnectedUser] = useState(null);
    //const profile = JSON.parse(localStorage.getItem('profile'));
    const profile = get('profile');
    const dispatch = useDispatch();

    useEffect(() => {
        setConnectedUser(profile);
        dispatch(listMyOrders());
    }, []);
    const orderListMy = useSelector(state => state.orderListMy);
    const { loading, error, orders } = orderListMy;
    const [products,setProducts] = useState([]);

    useEffect(() => {
        listMyProducts().then(data => {
            console.log("mes produits  *****************")
            console.log(data)
            setProducts(data)
            console.log("mes produit ******8888888888888***********")
            console.log(products)
        });
    }, []);

    const userOrders = orders ? orders.filter(order => order.user === profile._id) : [];
    console.log(orderListMy.orders)
    const [showOrders, setShowOrders] = useState(true);
    const [showProducts,setShowProducts] = useState(true)

    const handleOrdersClick = () => {
        setShowOrders(true);
    };

    const handleProductsClick = () => {
        setShowProducts(true);
    };

    const handleCloseModal = () => {
        setShowOrders(false);
        setShowProducts(false);
    };

    return (
        <>
            {!connectedUser && <Access/>}
            {connectedUser &&
                <div>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand>Bonjour {connectedUser.name} !</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link onClick={handleOrdersClick}>
                                    <button className="nav-link d-flex justify-content-between align-items-center">
                                        <span className="order-list">Orders List:</span>
                                        <span className="badge badge-secondary badge-pill">{orders ? orders.length : 0}</span>
                                    </button>
                                </Nav.Link>
                                <Nav.Link onClick={handleProductsClick}>
                                    <button className="nav-link d-flex justify-content-between align-items-center">
                                        <span className="order-list">My Vitrin:</span>
                                        <span className="badge badge-secondary badge-pill">{products ? products.length : 0}</span>
                                    </button>
                                </Nav.Link>
                                <Nav.Link onClick={handleCloseModal}>
                                    <button className="nav-link d-flex justify-content-between align-items-center">
                                        Bouton Test
                                    </button>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Modal show={showOrders} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Orders List</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Orders orders={userOrders} loading={loading} error={error}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showProducts} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>My Vitrin</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <MyVitrin products={products} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            }
        </>
    );
};

export default NavFarmOrders;
