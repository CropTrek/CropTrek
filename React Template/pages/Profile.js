import Slider from "react-slick";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import { logoSlider } from "../src/sliderProps";
import Link from "next/link";
import MobileHeader from "../src/layouts/MobileHeader";
import Access from "./Access"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../Redux/Actions/OrderActions";
import Orders from "./Orders/Orders";
import { get, set } from 'local-storage';
import { Navbar, Nav } from 'react-bootstrap';
import MyVitrin from "./MyVitrin";
import {listMyProducts} from "../Redux/Actions/ProductActions";
const Contact = () => {
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
  return (
   
  



    <>


    {/* The rest of your Contact component */}
    {!connectedUser && <Access/> }
    {connectedUser && 
    <Layout>
      <PageBanner pageName={"Contact Us"} />
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Bonjour {connectedUser.name} ! </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={showOrdersF}>        <button class="nav-link d-flex justify-content-between align-items-center"
    data-bs-toggle="pill"
    data-bs-target="#v-pills-profile"
    type="button"
    role="tab"
    aria-controls="v-pills-profile"
    aria-selected="false"
>
    <span class="order-list">Orders List: </span>
    <span class="badge badge-secondary badge-pill">{orders ? userOrders.length : 0}</span>
</button></Nav.Link>


          <Nav.Link onClick={showProductsF}>        <button class="nav-link d-flex justify-content-between align-items-center"
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target="#v-pills-profile"
                                                                        type="button"
                                                                        role="tab"
                                                                        aria-controls="v-pills-profile"
                                                                        aria-selected="false"
          >
            <span class="order-list">My Vitrin: </span>
            <span class="badge badge-secondary badge-pill">{products ? products.length : 0}</span>
          </button></Nav.Link>


          <Nav.Link onClick={showTestF}><button class="nav-link d-flex justify-content-between align-items-center"
    data-bs-toggle="pill"
    data-bs-target="#v-pills-profile"
    type="button"
    role="tab"
    aria-controls="v-pills-profile"
    aria-selected="false"
> Bouton Test</button></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
   
    {showOrders   ? <div className="container">
          <div className="row justify-content-end">
            <div className=" col-lg-10"><Orders orders={userOrders} loading={loading} error={error}/> </div> </div> </div>
        : showProducts ? <MyVitrin products={products}  />
        :
        <><h1>Good Testtt</h1> </>}


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
      <section className="contact-page-map">
        <div className="map-box">
          <iframe src="https://maps.google.com/maps?q=new%20york&t=&z=13&ie=UTF8&iwloc=&output=embed" />
        </div>
      </section>
      {/*====== End Map section ======*/}
      {/*====== Start Contact Section ======*/}
      <section className="contact-three pb-70 wow fadeInUp">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-xl-7 col-lg-10">
              <div className="contact-three_content-box">
                <div className="section-title section-title-left mb-60">
                  <span className="sub-title">Get In Touch</span>
                  <h2>Need Oragnic Foods! Send Us Message</h2>
                </div>
                <div className="contact-form">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form_group">
                      <input
                        type="text"
                        className="form_control"
                        placeholder="Full Name"
                        name="name"
                        required=""
                      />
                    </div>
                    <div className="form_group">
                      <input
                        type="email"
                        className="form_control"
                        placeholder="Email Address"
                        name="email"
                        required=""
                      />
                    </div>
                    <div className="form_group">
                      <textarea
                        className="form_control"
                        placeholder="Write Message"
                        name="message"
                        defaultValue={""}
                      />
                    </div>
                    <div className="form_group">
                      <button className="main-btn btn-yellow">
                        Send Us Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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


