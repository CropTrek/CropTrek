import { Accordion } from "react-bootstrap";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import Header from '../src/layouts/Header';
import Footer from '../src/layouts/Footer';
import  Link  from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress } from './../Redux/Actions/cartActions';
import { useRouter } from 'next/router';
import Checkout from './Checkout';

const ShippingPage = ({ children, header, footer }) => {
  const router = useRouter();


const cart =useSelector( (state)=>state.cart );
const {shippingAddress}=cart

const [address,setAddress]=useState(shippingAddress.address)
const [city,setCity]=useState(shippingAddress.city)
const [postalCode,setPostalCode]=useState(shippingAddress.postalCode)
const [country,setCountry]=useState(shippingAddress.country)

const dispatch=useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(saveShippingAddress({address,city,postalCode,country} ))
    router.push('/Checkout')
  }
  return (
    <>
     <Header header={header} />
   
   

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


      <PageBanner pageName={"Shipping"} />
      <section className="checkout-section pt-170 pb-80">
        <div className="container">
         
          <div className="row">
            <div className="col-lg-12">
              <div className="checkout-wrapper mt-50 mb-80">
                {/* <h4 className="title mb-15">Delivery</h4> */}
                <form
                  onSubmit={submitHandler}
                  className="checkout-form"
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <h5>Delivery Address</h5>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Enter Address"
                          name="address"
                          required
                          value={address} onChange={ (e)=>setAddress(e.target.value) }
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Enter City"
                          name="city"
                          required
                          value={city}
                           onChange={ (e)=>setCity(e.target.value) }
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="enter Postal Code"
                          name="code"
                          required
                          value={postalCode}
                           onChange={ (e)=>setPostalCode(e.target.value) }
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="enter Country"
                          name="country"
                          required
                          value={country}
                           onChange={ (e)=>setCountry(e.target.value) }
                        />
                                          <button type="submit" className="main-btn btn-yellow">
                                            {/* <Link  href="#" ></Link> */}
                                              Continue
                                             </button>

                      </div>
                    </div>
                
                   
                 
                 
             
                  
                 
                 
            
                  </div>
                </form>
              </div>
            </div>
          </div>
     
        </div>
      </section>
      <Footer footer={footer} />
    </>
  );
};
export default ShippingPage;
