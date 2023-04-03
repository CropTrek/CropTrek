import { Accordion } from "react-bootstrap";
import PageBanner from "../../src/components/PageBanner";
import Layout from "../../src/layouts/Layout";
import { useEffect, useState } from "react";
import { Alert } from 'react-bootstrap';

import Link from "next/link";
import {PayPalButton} from "react-paypal-button-v2"
import Swal from 'sweetalert2';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ORDER_CREATE_RESET, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../../Redux/Constants/OrderConstants";
import { getOrderDetails, payOrder } from "../../Redux/Actions/OrderActions";
import Header from "../../src/layouts/Header";
import Loading from "../Products/LoadingError/Loading";
import moment from "moment";
import  axios  from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
const OrderDetailPage = () => {

  // const [connectedUser, setConnectedUser] = useState(null);
  // useEffect(() => {
  //   const profile = JSON.parse(localStorage.getItem('profile'));
  //   setConnectedUser(profile);
  //   console.log("3333333333333333333333333333")
  //   console.log(profile._id)
  // }, []);


  const publishableKey =
  'pk_test_51Mrh47EUjH7lozT7dGmLZyQFfCeQ4yG61vK5eYuLRgib8zmeWrqomPfrCKonJyNsWvFYbq7g2hukzI1fXqH5G97g00glG9cKNY';
  const router = useRouter();
  const orderId=  router.query.id;
console.log('55555555555555555')
console.log(orderId)

  const[sdkReady,setSdkReady] =useState(false)
  const [load,setLoad]=useState(false)
///////////////////////////////



const dispatch=useDispatch()


const orderDetails=useSelector( (state)=>state.orderDetails )
const {order,loading,error}=orderDetails;


const orderPay=useSelector( (state)=>state.orderPay )
const {loading:loadingPay,success:successPay}=orderPay;


if(!loading) {  
// nehseb l price
const addDecimals=(num)=>{
  // nadhreb fel 100 bech n7awel l virgule aal lmin martyn bech n9areb le3dal lel 3dad eli a9rablou 
  // w ba3 ne9sem bech nraja3ha 
  return (Math.round (num*100)/100 ).toFixed(2) // tofixed traja3li nombre decimal b zouz ar9am ba3d l , hata ken mefamech ar9am ba3d l fasel traja3 zouz 
}

order.itemsPrice=addDecimals(
  order.orderItems.reduce( (acc,item)=>acc+item.price*item.qty,0 )
)
// masarif cha7n w fazet
order.shippingPrice=addDecimals(
  order.cartItems >100 ? 0 : 100
)
// houni les taxes
order.taxPrice=addDecimals(Number (  (0.15*order.itemsPrice).toFixed(2) )  )
order.totalPrice=(
Number(order.itemsPrice)+
Number(order.shippingPrice)+
Number(order.taxPrice)
).toFixed(2)
}


useEffect(  ()=>{

const addPaypalScript=async()=>{
  const {data:clientId}=await axios.get("http://localhost:5000/api/config/paypal")
  const script =document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
  script.async=true;
  script.onload=()=>{
    setSdkReady(true);
  }
  document.body.appendChild(script);
};

if(!order || successPay){
dispatch( {type:ORDER_PAY_RESET} )
dispatch(getOrderDetails(orderId));

}
else if(! order.isPaid){
  if(!window.paypal){
    addPaypalScript()
  }

else{
setSdkReady(true)
}}



},[dispatch,orderId,successPay,order,loading] )


const handleSuccess = () => {
  MySwal.fire({
    icon: 'success',
    title: 'Payment was successful',
    time: 4000,
  });
};
const handleFailure = () => {
  MySwal.fire({
    icon: 'error',
    title: 'Payment was not successful,you mus login !!!!!!!!',
    time: 4000,
  });
};



const pay = async (orderId, paymentResult) => {


  

  orderId=router.query.id;
console.log(orderId)
const profile = JSON.parse(localStorage.getItem('profile'));
  try {
    dispatch( {type:ORDER_PAY_REQUEST} );


    const idUser=profile._id;
    const config ={
        headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer ${idUser}`,
        },
    };
    const response = await axios.put(`http://localhost:5000/api/orders/${orderId}/pay`, paymentResult,config);
    dispatch( {type:ORDER_PAY_SUCCESS,payload:response} );

  
    handleSuccess()
    setLoad(true)
  } catch (error) {
    const message=error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    if (message === "Cannot read properties of null (reading '_id')") {
     
      handleFailure()
      setLoad(false)
      console.log(error);
     

}
dispatch( {
  type: ORDER_PAY_FAIL,
  payload:message,
})
   
  }
}
;
const {success,error2}=pay
useEffect(() => {
  if (load ) { 
 //   window.location.reload();

  }


}, [load]);

/////////////////////////////

const successPaymentHandler=(paymentResult)=>{
  console.log(paymentResult)
  dispatch(payOrder(orderId,paymentResult))
}


  return (
    <>
    <Header></Header>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<link
          rel="shortcut icon"
          href="assets/images/favicon.ico"
          type="image/png"
        />
        {/*====== FontAwesome css ======*/}
        <link
          rel="stylesheet"
          href="../../../../assets/fonts/fontawesome/css/all.min.css"
        />
        {/*====== Flaticon css ======*/}
        <link rel="stylesheet" href="../../../../assets/fonts/flaticon/flaticon.css" />
        {/*====== Bootstrap css ======*/}
        <link
          rel="stylesheet"
          href="../../../../assets/vendor/bootstrap/css/bootstrap.min.css"
        />
        {/*====== magnific-popup css ======*/}
        <link
          rel="stylesheet"
          href="../../../../assets/vendor/magnific-popup/dist/magnific-popup.css"
        />
        {/*====== Slick-popup css ======*/}
        <link rel="stylesheet" href="../../../../assets/vendor/slick/slick.css" />
        {/*====== Nice Select css ======*/}
        <link
          rel="stylesheet"
          href="../../../../assets/vendor/nice-select/css/nice-select.css"
        />
        {/*====== Animate css ======*/}
        <link rel="stylesheet" href="../../../../assets/vendor/animate.css" />
        {/*====== Default css ======*/}
        <link rel="stylesheet" href="../../../../assets/css/default.css" />
        {/*====== Style css ======*/}
        <link rel="stylesheet" href="../../../../assets/css/style.css" />
      



    
<div className="container" >


    {
     loading? (<Loading/> ):error  ?( <Alert variant="alert-danger" >{error}</Alert>)
    :
     (<>


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
  {order.user.name}
  </p>
  <p>
  {order.user.email}
  </p>

    <div className="main-btn btn-yellow">Contacter par mail</div>

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
  Shipping : {order.shippingAddress.country}
  </p>
  <p>
Pay Method : {order.paymentMethod}
  </p>

  {
    order.isPaid ?(
      <div className="bg-info p-2 col-12" >
<p className="text-white text-center text-sm-start" >

  Paid on {moment(order.paidAt).calendar()}
</p>

      </div>
    ):(
      <div className="bg-danger p-2 col-12" >
      <p className="text-white text-center text-sm-start" >
      
     Not paid
      </p>
      
            </div>
    )
  }


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
Address : {order.shippingAddress.city} , {" "} {order.shippingAddress.address} {" "} , {order.shippingAddress.postalCode} 
  </p>
  {
    order.isDeliverd ?(
      <div className="bg-info p-2 col-12" >
<p className="text-white text-center text-sm-start" >

  Delivered on {moment(order.deliveredAt).calendar()}
</p>

      </div>
    ):(
      <div className="bg-danger p-2 col-12" >
      <p className="text-white text-center text-sm-start" >
      
     Not delivered
      </p>
      
            </div>
    )
  }


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
        {order.orderItems.length === 0 ? (
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
                {order.orderItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src="../../../assets/images/products/product-thumb-4.jpg"
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
              <td>{order.itemsPrice}DT</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>{order.shippingPrice}DT</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>{order.taxPrice}DT</td>
            </tr>
            <tr>
              <td className="total">
                <span>Order Total</span>
              </td>
              <td className="total">
                <span>{order.totalPrice}DT</span>
              </td>
            </tr>
          </tbody>
        </table>

{!order.isPaid && (<div className="col-15">

  {loadingPay && (<Loading/>)}
  {!sdkReady? (
    <Loading/>
  ):(
<>
<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} /> 

<StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
    
        description={`Your total: ${order.totalPrice} DT`}
        token={pay}
      />

</>

  ) }
        </div>)}

        

        {/* {order.orderItems.length === 0 ? null : (
          <button onClick={placeOrderHandler} className="main-btn btn-yellow">
            Place Order
          </button>
        )} */}


        {
          error &&(
            <div className="my-3 col12">

              <Alert variant="alert-danger" ><h1>Erreur !!</h1></Alert>
            </div>
          ) 

        } 
      </div>
    </div>
  </div>
</div>

</section>

     </>)
    }
   
</div>

    </>
  );
};
export default OrderDetailPage;
