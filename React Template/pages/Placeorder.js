import { Accordion } from "react-bootstrap";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import { useEffect, useState } from "react";
import { Alert } from 'react-bootstrap';

import Link from "next/link";

import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import Message from './Products/LoadingError/Error';
import { useRouter } from 'next/router';
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import { createOrder } from "../Redux/Actions/OrderActions";

const PlaceorderPage = () => {
  const [order, setOrder] = useState(null);
const router=useRouter()
const dispatch=useDispatch()
const cart=useSelector( (state)=> state.cart )
const [profileData, setProfileData] = useState({});

useEffect(() => {
  const profileString = localStorage.getItem("profile");
  const profileObject = JSON.parse(profileString);
  setProfileData(profileObject);



  console.log(profileObject)

}, []);




      // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // Order details
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderTotal, setOrderTotal] = useState('');

  // Delivery location
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Product details
  const [products, setProducts] = useState([]);

  // Calculate order totals
  const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  

// nehseb l price
  const addDecimals=(num)=>{
    // nadhreb fel 100 bech n7awel l virgule aal lmin martyn bech n9areb le3dal lel 3dad eli a9rablou 
    // w ba3 ne9sem bech nraja3ha 
    return (Math.round (num*100)/100 ).toFixed(2) // tofixed traja3li nombre decimal b zouz ar9am ba3d l , hata ken mefamech ar9am ba3d l fasel traja3 zouz 
  }

  cart.itemsPrice=addDecimals(
    cart.cartItems.reduce( (acc,item)=>acc+item.price*item.qty,0 )
  )
// masarif cha7n w fazet
  cart.shippingPrice=addDecimals(
    cart.cartItems >100 ? 0 : 100
  )
  // houni les taxes
  cart.taxPrice=addDecimals(Number (  (0.15*cart.itemsPrice).toFixed(2) )  )
cart.totalPrice=(
  Number(cart.itemsPrice)+
  Number(cart.shippingPrice)+
  Number(cart.taxPrice)
).toFixed(2)
const orderCreate=useSelector((state)=>state.orderCreate )
const {success,error}=orderCreate

// const placeOrderHandler = async (event) => {
//   event.preventDefault();
 
// dispatch(
//   createOrder( {
//     orderItems:cart.cartItems,
//     shippingAddress:cart.shippingAddress,
//     paymentMethod:cart.paymentMethod,
//     itemsPrice:cart.itemsPrice,
//     shippingPrice:cart.shippingPrice,
//     taxPrice:cart.taxPrice,
//     totalPrice:cart.totalPrice,
//     user:profileData._id
//   } ) 
  
// )

// };

const [orderId, setOrderId] = useState(null);
const placeOrderHandler = async (event) => {
  event.preventDefault();

  const orderId1 = await dispatch(
    createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
      user: profileData._id,
    })
  );

  console.log("Order created with id:", orderId1);
  setOrderId(orderId1);
  };

  useEffect(() => {
    if (success && orderId) { 
      router.push(`/Orders/${orderId}`)
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [router, dispatch, success, orderId]);
  



  return (
    <Layout>


      <PageBanner pageName={"PlaceOrder"} />





      <section className="checkout-section">

    
        
  <div className="container">
    <div className="payment-cart-total">
      <div className="row">
      <div className="col-md-3 col-sm-6">
  <div className="single-service-item-two text-center wow fadeInUp" style={{border: '1px solid black', padding: '10px'}}>
    <div className="img-holder">
      
    </div>
    <div className="text" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h3 className="title">
        Customer
      </h3>
      <i className="fal fa-user" style={{marginLeft: '10px'}} />
    </div>
    <p>
    {profileData.name}
    </p>
    <p>
    {profileData.email}
    </p>

      <div className="main-btn btn-yellow"></div>
 
  </div>
</div>

<div className="col-md-3 col-sm-6">
  <div className="single-service-item-two text-center wow fadeInUp" style={{border: '1px solid black', padding: '10px'}}>
    <div className="img-holder">
      
    </div>
    <div className="text" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h3 className="title">
   Order Info
      </h3>
      <i className="fal fa-truck" style={{marginLeft: '10px'}} />
    </div>
    <p>
    Shipping : {cart.shippingAddress.country}
    </p>
    <p>
  Pay Method : {cart.paymentMethod}
    </p>

      <div className="main-btn btn-yellow"></div>

  </div>
</div>

<div className="col-md-3 col-sm-6">
  <div className="single-service-item-two text-center wow fadeInUp" style={{border: '1px solid black', padding: '10px'}}>
    <div className="img-holder">
      
    </div>
    <div className="text" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h3 className="title">
        Deliver To
      </h3>
      <i className="fal fa-map-marker-alt" style={{marginLeft: '10px'}} />


    </div>
    <p>
Address : {cart.shippingAddress.city} , {" "} {cart.shippingAddress.address} {" "} , {cart.shippingAddress.postalCode} 
    </p>

 
    <div className="main-btn btn-yellow"></div>
  </div>
</div>

      
      
      </div>
    </div>
  </div>
</section>

<section className="checkout-section pt-170 pb-80">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <h4 className="title mb-15">List of purchased products</h4>
        <div className="cart-wrapper">
          {cart.cartItems.length === 0 ? (
            <Alert variant="alert-info mt-5">Your Cart is Empty!</Alert>
          ) : (
            <div className="cart-table table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src="../assets/images/products/product-thumb-4.jpg"
                          alt=""
                          className="thumbnail"
                        />
                        <a href={`/Products/ProductDetails/${item.product}`}>
                          <span className="title">{item.name}</span>
                        </a>
                      </td>
                      <td>
                        <h6>{item.qty}</h6>
                      </td>
                      <td>{item.qty * item.price}DT</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="col-lg-6">
        <div className="shopping-cart-total mb-50">
          <h4 className="title">Cart Totals</h4>
          <table className="table">
            <tbody>
              <tr>
                <td>Products</td>
                <td>{cart.itemsPrice}DT</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>{cart.shippingPrice}DT</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>{cart.taxPrice}DT</td>
              </tr>
              <tr>
                <td className="total">
                  <span>Order Total</span>
                </td>
                <td className="total">
                  <span>{cart.totalPrice}DT</span>
                </td>
              </tr>
            </tbody>
          </table>

          {cart.cartItems.length === 0 ? null : (
            <button onClick={placeOrderHandler} className="main-btn btn-yellow">
       Pass to Pay
            </button>
          )}


          {
            error &&(
              <div className="my-3 col12">

                <Alert variant="alert-danger" >Erreur lors de la creation de la commande</Alert>
              </div>
            ) 

          }
        </div>
      </div>
    </div>
  </div>
</section>


    </Layout>
  );
};
export default PlaceorderPage;
