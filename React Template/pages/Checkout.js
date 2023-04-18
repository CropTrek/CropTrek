import { Accordion } from "react-bootstrap";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import { savePaymentMethod } from "../Redux/Actions/cartActions";

const Checkout = () => {
  const router = useRouter();


  const cart =useSelector( (state)=>state.cart );
  const {shippingAddress}=cart
  
  const [paymentMethod,setPaymentMethod]=useState("Cart")

  if(!shippingAddress){
    router.push("/shipping")
  }
  
  const dispatch=useDispatch()
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod))
      router.push('/Placeorder') // placeOrder
    }
  return (
    <Layout>
      <PageBanner pageName={"Checkout"} />
      <section className="checkout-section">
        <div className="container">
      
          <div className="payment-cart-total">
            <div className="row">
              <div className="col-lg-6">
                

<form  onSubmit={submitHandler} >

                <div className="payment-method mb-50">
                  <h4 className="title mb-20">Payment Method</h4>
                  <Accordion
                    defaultActiveKey="collapseOne"
                    as="ul"
                    id="paymentMethod"
                    className="mb-30"
                  >
                    {/* Default unchecked */}
                    <li className="custom-control custom-radio">
                      <input
                         value={paymentMethod}
                        type="radio"
                        className="custom-control-input"
                        id="methodone"
                        name="defaultExampleRadios"
                        defaultChecked
                        onChange={ (e)=>setPaymentMethod(e.target.value) }

                      />
                      <Accordion.Toggle
                        as="label"
                        className="custom-control-label"
                        htmlFor="methodone"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        eventKey="collapseOne"
                      >
                        Direct Bank Transfer{" "}
                        <i className="fas fa-money-check" />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey="collapseOne"
                        data-parent="#paymentMethod"
                        style={{}}
                      >
                        <p>
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped our account.
                        </p>
                      </Accordion.Collapse>
                    </li>
                    {/* Default unchecked */}
                    {/*<li className="custom-control custom-radio">*/}
                    {/*  <input*/}
                    {/*    type="radio"*/}
                    {/*    className="custom-control-input"*/}
                    {/*    id="methodtwo"*/}
                    {/*    name="defaultExampleRadios"*/}
                    {/*  />*/}
                    {/*  <Accordion.Toggle*/}
                    {/*    as="label"*/}
                    {/*    className="custom-control-label collapsed"*/}
                    {/*    htmlFor="methodtwo"*/}
                    {/*    data-toggle="collapse"*/}
                    {/*    data-target="#collapseTwo"*/}
                    {/*    eventKey="collapseTwo"*/}
                    {/*  >*/}
                    {/*    Cash On Delivery <i className="fas fa-truck" />*/}
                    {/*  </Accordion.Toggle>*/}
                    {/*  <Accordion.Collapse*/}
                    {/*    eventKey="collapseTwo"*/}
                    {/*    data-parent="#paymentMethod"*/}
                    {/*    style={{}}*/}
                    {/*  >*/}
                    {/*    <p>Pay with cash upon delivery.</p>*/}
                    {/*  </Accordion.Collapse>*/}
                    {/*</li>*/}
                    {/*/!* Default unchecked *!/*/}
                    {/*<li className="custom-control custom-radio">*/}
                    {/*  <input*/}
                    {/*  value={paymentMethod}*/}
                    {/*    type="radio"*/}
                    {/*    className="custom-control-input"*/}
                    {/*    id="methodthree"*/}
                    {/*    name="defaultExampleRadios"*/}
                    {/*    onChange={ (e)=>setPaymentMethod(e.target.value) }*/}

                    {/*  />*/}
                    {/*  <Accordion.Toggle*/}
                    {/*    as="label"*/}
                    {/*    className="custom-control-label collapsed"*/}
                    {/*    htmlFor="methodthree"*/}
                    {/*    data-toggle="collapse"*/}
                    {/*    data-target="#collapsethree"*/}
                    {/*    eventKey="collapsethree"*/}
                    {/*  >*/}
                    {/*    Paypal <i className="fab fa-cc-paypal" />*/}
                    {/*  </Accordion.Toggle>*/}
                    {/*  <Accordion.Collapse*/}
                    {/*    eventKey="collapsethree"*/}
                    {/*    data-parent="#paymentMethod"*/}
                    {/*    style={{}}*/}
                    {/*  >*/}
                    {/*    <p>*/}
                    {/*      Pay via PayPal; you can pay with your credit card if*/}
                    {/*      you don’t have a PayPal account.*/}
                    {/*    </p>*/}
                    {/*  </Accordion.Collapse>*/}
                    {/*</li>*/}
                  </Accordion>
                  <p>
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our privacy policy.
                  </p>
                  <button className="main-btn btn-yellow">Place Order</button>
                </div>

                </form>



              </div>
              {/*<div className="col-lg-6">*/}
              {/*  <div className="shopping-cart-total mb-50">*/}
              {/*    <h4 className="title">Cart Totals</h4>*/}
              {/*    <table className="table">*/}
              {/*      <tbody>*/}
              {/*        <tr>*/}
              {/*          <td>Cart Subtotal</td>*/}
              {/*          <td>$200</td>*/}
              {/*        </tr>*/}
              {/*        <tr>*/}
              {/*          <td>Shipping Fee</td>*/}
              {/*          <td>$50</td>*/}
              {/*        </tr>*/}
              {/*        <tr>*/}
              {/*          <td className="total">*/}
              {/*            <span>Order Total</span>*/}
              {/*          </td>*/}
              {/*          <td className="total">*/}
              {/*            <span>$250</span>*/}
              {/*          </td>*/}
              {/*        </tr>*/}
              {/*      </tbody>*/}
              {/*    </table>*/}
              {/*    <button className="main-btn btn-yellow">*/}
              {/*      Proceed to checkout*/}
              {/*    </button>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Checkout;
