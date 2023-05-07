import Slider from "react-slick";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import {logoSlider, testimonialSliderOne} from "../src/sliderProps";
import Link from "next/link";
import MobileHeader from "../src/layouts/MobileHeader";
import Access from "./Access"
import React, {Fragment, useEffect, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../Redux/Actions/OrderActions";
import Orders from "./Orders/Orders";
import { get, set } from 'local-storage';
import { Navbar, Nav } from 'react-bootstrap';
import MyVitrin from "./MyVitrin";
import {listMyProducts} from "../Redux/Actions/ProductActions";
import axios from "axios";
import {Button} from "reactstrap";
import Isotope from "isotope-layout";
const Contact = (props) => {
  const [connectedUser, setConnectedUser] = useState(null);
  //const profile = JSON.parse(localStorage.getItem('profile'));
  const profile = get('profile');
  const dispatch = useDispatch();
  const [suppliers,setSuppliers] = useState([])
  const orderListMy = useSelector(state => state.orderListMy);
  const { loading2, error2, orders } = orderListMy;
  const [products2,setProducts2] = useState([]);
  useEffect(() => {
    setConnectedUser(profile);
    dispatch(listMyOrders());
    const fetchSuppliers = async () => {
      const result=await axios.get('http://localhost:5000/api/products/users/suppliers')
      console.log("Suppliers")
      console.log(result.data)
      setSuppliers(result.data)
    }
    fetchSuppliers();
  }, []);
  useEffect(() => {
    listMyProducts().then(data => {
      console.log("mes produits  *****************")
      console.log(data)
      setProducts2(data)
      console.log("mes produit ******8888888888888***********")
      console.log(products2)
    });
  }, []);


  const userOrders = orders ? orders.filter(order => order.user === profile._id) : [];
  console.log(orderListMy.orders)
  const [showOrders, setShowOrders] = useState(true);
  const [showProducts,setShowProducts] = useState(true)

  const showOrdersF=()=>{
    setShowOrders(true)
    setShowProducts(false)

  }
  const showProductsF=()=>{
    setShowProducts(true)
    setShowOrders(false)
  }
  const showTestF =()=>{
    setShowProducts(false)
    setShowOrders(false)
  }
  // const orderListMy = useSelector(state => state.orderListMy);
  // const { loading, error, orders } = orderListMy;
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

  // const userOrders = orders ? orders.filter(order => order.user === profile._id) : [];
console.log(orderListMy.orders)
  // const [showOrders, setShowOrders] = useState(true);
// const [showProducts,setShowProducts] = useState(true)

//   const showOrdersF=()=>{
//   setShowOrders(true)
// setShowProducts(false)
//
//   }
//   const showProductsF=()=>{
//   setShowProducts(true)
//     setShowOrders(false)
//   }
//   const showTestF =()=>{
//   setShowProducts(false)
//     setShowOrders(false)
//   }



  ////// nav zedtha
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".project-row", {
        itemSelector: ".project-column",
        //    layoutMode: "fitRows",
        percentPosition: true,
        masonry: {
          columnWidth: ".project-column",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);
    //     return () => isotope.current.destroy();
  }, []);
  useEffect(() => {
    // if (isotope.current) {
    //   filterKey === "*"
    //       ? isotope.current.arrange({ filter: `*` })
    //       : isotope.current.arrange({ filter: `.${filterKey}` });
    // }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };

  return (
   
  



    <>


    {/* The rest of your Contact component */}
    {!connectedUser && <Access/> }
    {connectedUser && 
    <Layout>
      <PageBanner pageName={"Contact Us"} />

        <div style={{marginTop:"-165px"}} className="row justify-content-center">
          <div className="col-lg-10">
            <div className="portfolio-filter-button text-center mb-60 wow fadeInDown">
              <ul className="filter-btn">
                <li
                    className={`c-pointer`}
                    onClick={handleFilterKeyChange("*")}
                    data-filter="*"
                >
                  Show All
                </li>
                  {connectedUser && connectedUser.role !== "supplier" &&




                    <li
                    className={`c-pointer`}
                    onClick={showTestF}
                    onClick={showOrdersF}
                >
                      <span className="order-list">Orders List: </span>
                      <span className="badge badge-secondary badge-pill">{orders ? userOrders.length : 0}</span>

                </li>
                  }
                {connectedUser && (connectedUser.role === "farmer" || connectedUser.role === "supplier") &&

                    <li
                        className={`c-pointer `}
                        onClick={showProductsF}
                        data-filter=".cat-2"
                    >
                      <span className="order-list">My Vitrin: </span>
                      <span className="badge badge-dark badge-pill"> {products2 ? products2.length : 0}</span>
                    </li>
                }

              </ul>
            </div>
          </div>
        </div>

      <section className="partners-one p-r z-1 pt-50 pb-130">
        <div className="container">

          {showOrders ? <div className="container">
                <div className="row justify-content-end">
                  <div className=" col-lg-10">
                    {connectedUser && connectedUser.role !== "supplier" &&
                        <Orders orders={userOrders} loading={loading2} error={error2}/>}</div>
                </div>
              </div>
              : showProducts ? <MyVitrin products={products2}/>
                  :
                  <><h1>Good Testtt</h1> </>}
        </div>
      </section>


      {/*{connectedUser && connectedUser.role === "farmer" &&*/}
      {/*    <section className="testimonial-section ">*/}
      {/*      <div className="container-fluid">*/}
      {/*        <div className="row justify-content-center">*/}
      {/*          <div className="col-xl-6 col-lg-10">*/}
      {/*            <div className="section-title text-center mb-60 wow fadeInUp">*/}
      {/*              <span className="sub-title">Our Suppliers</span>*/}
      {/*              <h2>you can look for the products in the shops of our suppliers</h2>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <Slider {...testimonialSliderOne} className="testimonial-slider-one">*/}

      {/*          {suppliers.map((supplier) => (*/}
      {/*              <div className="testimonial-item text-center wow fadeInDown">*/}


      {/*                <div className="author-thumb">*/}
      {/*                  <img*/}
      {/*                      src={`http://localhost:5000/api/users/file/${supplier._id}`}*/}
      {/*                      alt="author Image"*/}
      {/*                  />*/}
      {/*                </div>*/}
      {/*                <div className="testimonial-content">*/}

      {/*                  <div className="quote">*/}
      {/*                    <i className="fas fa-quote-right"/>*/}
      {/*                  </div>*/}
      {/*                  <div className="author-title">*/}
      {/*                    <h4><Link href={`/SupplierProducts/${supplier._id}`}>*/}
      {/*                      <a>{supplier.name} | {supplier.surname}</a>*/}
      {/*                    </Link></h4>*/}
      {/*                    <p className="position">{supplier.phoneNumber} </p>*/}
      {/*                    <p className="position">{supplier.adresse.fullAdresse.city_district}</p>*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*          ))}*/}
      {/*        </Slider>*/}
      {/*      </div>*/}
      {/*    </section>*/}
      {/*}*/}



{/*      <Navbar bg="light" expand="lg">*/}
{/*      <Navbar.Brand href="#">Bonjour {connectedUser.name} ! </Navbar.Brand>*/}
{/*      <Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
{/*      <Navbar.Collapse id="basic-navbar-nav">*/}
{/*        <Nav className="mr-auto">*/}
{/*          <Nav.Link onClick={showOrdersF}>        <button class="nav-link d-flex justify-content-between align-items-center"*/}
{/*    data-bs-toggle="pill"*/}
{/*    data-bs-target="#v-pills-profile"*/}
{/*    type="button"*/}
{/*    role="tab"*/}
{/*    aria-controls="v-pills-profile"*/}
{/*    aria-selected="false"*/}
{/*>*/}
{/*    <span class="order-list">Orders List: </span>*/}
{/*    <span class="badge badge-secondary badge-pill">{orders ? userOrders.length : 0}</span>*/}
{/*</button></Nav.Link>*/}


{/*          <Nav.Link onClick={showProductsF}>        <button class="nav-link d-flex justify-content-between align-items-center"*/}
{/*                                                                        data-bs-toggle="pill"*/}
{/*                                                                        data-bs-target="#v-pills-profile"*/}
{/*                                                                        type="button"*/}
{/*                                                                        role="tab"*/}
{/*                                                                        aria-controls="v-pills-profile"*/}
{/*                                                                        aria-selected="false"*/}
{/*          >*/}
{/*            <span class="order-list">My Vitrin: </span>*/}
{/*            <span class="badge badge-secondary badge-pill">{products ? products.length : 0}</span>*/}
{/*          </button></Nav.Link>*/}


{/*          <Nav.Link onClick={showTestF}><button class="nav-link d-flex justify-content-between align-items-center"*/}
{/*    data-bs-toggle="pill"*/}
{/*    data-bs-target="#v-pills-profile"*/}
{/*    type="button"*/}
{/*    role="tab"*/}
{/*    aria-controls="v-pills-profile"*/}
{/*    aria-selected="false"*/}
{/*> Bouton Test</button></Nav.Link>*/}
{/*        </Nav>*/}
{/*      </Navbar.Collapse>*/}
{/*    </Navbar>*/}
   
    {/*{showOrders   ? <div className="container">*/}
    {/*      <div className="row justify-content-end">*/}
    {/*        <div className=" col-lg-10"><Orders orders={userOrders} loading={loading} error={error}/> </div> </div> </div>*/}
    {/*    : showProducts ? <MyVitrin products={products}  />*/}
    {/*    :*/}
    {/*    <><h1>Good Testtt</h1> </>}*/}


      {/* <section className="contact-three pb-70 wow fadeInUp">
        <div className="container">
          <div className="row justify-content-end">
            <div className=" col-lg-10">
            <button class="nav-link d-flex justify-content-between align-items-center"
    data-bs-toggle="pill"
    data-bs-target="#v-pills-profile"
    type="button"
    role="tab"
    aria-controls="v-pills-profile"
    aria-selected="false"
>
    <span class="order-list">Orders List: </span>
    <span class="badge badge-secondary badge-pill">{orders ? orders.length : 0}</span>
</button>

<Orders orders={orders} loading={loading} error={error}/>
              </div>
              </div>
              </div>
              
              </section> */}

      {/*====== End Contact Information section ======*/}
      {/*====== Start Map section ======*/}
      {/*<section className="contact-page-map">*/}
      {/*  <div className="map-box">*/}
      {/*    <iframe src="https://maps.google.com/maps?q=new%20york&t=&z=13&ie=UTF8&iwloc=&output=embed" />*/}
      {/*  </div>*/}
      {/*</section>*/}
      {/*====== End Map section ======*/}
      {/*====== Start Contact Section ======*/}
      {/*<section className="contact-three pb-70 wow fadeInUp">*/}
      {/*  <div className="container">*/}
      {/*    <div className="row justify-content-end">*/}
      {/*      <div className="col-xl-7 col-lg-10">*/}
      {/*        <div className="contact-three_content-box">*/}
      {/*          <div className="section-title section-title-left mb-60">*/}
      {/*            <span className="sub-title">Get In Touch</span>*/}
      {/*            <h2>Need Oragnic Foods! Send Us Message</h2>*/}
      {/*          </div>*/}
      {/*          <div className="contact-form">*/}
      {/*            <form onSubmit={(e) => e.preventDefault()}>*/}
      {/*              <div className="form_group">*/}
      {/*                <input*/}
      {/*                  type="text"*/}
      {/*                  className="form_control"*/}
      {/*                  placeholder="Full Name"*/}
      {/*                  name="name"*/}
      {/*                  required=""*/}
      {/*                />*/}
      {/*              </div>*/}
      {/*              <div className="form_group">*/}
      {/*                <input*/}
      {/*                  type="email"*/}
      {/*                  className="form_control"*/}
      {/*                  placeholder="Email Address"*/}
      {/*                  name="email"*/}
      {/*                  required=""*/}
      {/*                />*/}
      {/*              </div>*/}
      {/*              <div className="form_group">*/}
      {/*                <textarea*/}
      {/*                  className="form_control"*/}
      {/*                  placeholder="Write Message"*/}
      {/*                  name="message"*/}
      {/*                  defaultValue={""}*/}
      {/*                />*/}
      {/*              </div>*/}
      {/*              <div className="form_group">*/}
      {/*                <button className="main-btn btn-yellow">*/}
      {/*                  Send Us Message*/}
      {/*                </button>*/}
      {/*              </div>*/}
      {/*            </form>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      {/*====== End Contact Section ======*/}
      {/*====== Start Partner Section ======*/}
      <section className="partners-one p-r z-1 pt-50 pb-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center mb-30 wow fadeInUp">
                <h4>We Have More Then 1235+ Global Partners</h4>
              </div>
            </div>
          </div>
          <Slider {...logoSlider} className="partner-slider-one wow fadeInDown">
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-7.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-8.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-9.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-10.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-11.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-12.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-10.png"
                  alt="partner image"
                />
              </div>
            </div>
          </Slider>
        </div>
      </section>
    </Layout>} 
    </>
  );
};



export default Contact;


