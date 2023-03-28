
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../../src/layouts/Layout';
import PageBanner from "../../../src/components/PageBanner";
import ProductDetailsSlider from "../../../src/components/sliders/ProductDetailsSlider";
import {Nav, Tab} from "react-bootstrap";
 import Slider from "react-slick";
import {recentProductSlider} from "../../../src/sliderProps";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import  {listProductDetail} from "../../../Redux/Actions/ProductActions";
import productDetails from "../../product-details";
import Rating from "../../../src/components/Rating";
import Head from 'next/head';
   const  Product =()=>{


     const router = useRouter();
     const { id } = router.query;
     const [product, setProduct] = useState({});
     const dispatch=useDispatch();
     const [cssVersion, setCssVersion] = useState(Date.now());

     useEffect( ()=>{
   
dispatch(listProductDetail(id))
setCssVersion(Date.now());
     },[dispatch,id] )

const {loading,error}=productDetails











  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (id) => {

    const res = await axios.get(`http://localhost:5000/api/products/${id}`);
    setProduct(res.data);
  };


  const deleteProduct = async (id) => {
    await axios.delete(`/api/products/${id}`);
    router.push('/');
  };



     // add To cart
     const [qty,setQty] =useState(1);


     const AddToCartHandle=(e)=>{
       e.preventDefault()
       router.push(`/Cart/${id}?qty=${qty}`)
     }


  return (


    
    <Layout>
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



      <PageBanner pageTitle={"Product"} pageName="Product Details" />
      <section className="prodcuts-details-page pt-170 pb-130">
        <div className="container">
          <div className="product-details-wrapper wow fadeInUp">
            <div className="row">
              <div className="col-lg-7">
                <ProductDetailsSlider />
              </div>
              <div className="col-lg-5">
                <div className="product-info mb-50">
                  <h3 className="title">{product.name}</h3>
                  <div className="products-rating-price d-flex">
                    <ul className="ratings">
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                      <li>
                        <i className="fas fa-star" />
                      </li>
                    </ul>
                    <span className="price">
                      <span className="curreny">$</span>{product.price}
                    </span>

                  </div>


                  <div className="flex-box d-flex justify-content-between align-items" >
                    <h6>Status</h6>
                    {
                      product.countInStock>0?(
                          <span>InStock</span>
                      ):(
                          <span>unaivalable</span>
                      )
                    }

                </div>

                  <div className="review-form">
                    <h3 className="title mb-15">Leave Your Reviews</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form_group">
                            <div className="flex-box d-flex justify-content-between align-items " >
                              <h6>Review</h6>
                              <Rating
                                  value={product.rating}
                                  text={`${product.numReviews} reviews`}
                              ></Rating>
                            </div>

                            {/*<ul className="ratings mb-25">*/}
                            {/*  <li>*/}
                            {/*    <span className="mr-2">Your Rating:</span>*/}
                            {/*  </li>*/}
                            {/*  <li className="star">*/}
                            {/*    <a href="Full-Stack-Project-F-Society/React Template/pages/[id]#">*/}
                            {/*      <i className="fas fa-star" />*/}
                            {/*    </a>*/}
                            {/*  </li>*/}
                            {/*  <li className="star">*/}
                            {/*    <a href="Full-Stack-Project-F-Society/React Template/pages/[id]#">*/}
                            {/*      <i className="fas fa-star" />*/}
                            {/*    </a>*/}
                            {/*  </li>*/}
                            {/*  <li className="star">*/}
                            {/*    <a href="Full-Stack-Project-F-Society/React Template/pages/[id]#">*/}
                            {/*      <i className="fas fa-star" />*/}
                            {/*    </a>*/}
                            {/*  </li>*/}
                            {/*  <li className="star">*/}
                            {/*    <a href="Full-Stack-Project-F-Society/React Template/pages/[id]#">*/}
                            {/*      <i className="fas fa-star" />*/}
                            {/*    </a>*/}
                            {/*  </li>*/}
                            {/*  <li className="star">*/}
                            {/*    <a href="Full-Stack-Project-F-Society/React Template/pages/[id]#">*/}
                            {/*      <i className="fas fa-star" />*/}
                            {/*    </a>*/}
                            {/*  </li>*/}
                            {/*</ul>*/}
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form_group">
                            <input
                                type="text"
                                className="form_control"
                                placeholder="Full Name"
                                name="name"
                                required=""
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form_group">
                            <input
                                type="text"
                                className="form_control"
                                placeholder="Email Address"
                                name="email"
                                required=""
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form_group">
                            <input
                                type="text"
                                className="form_control"
                                placeholder="Phone Number"
                                name="phone"
                                required=""
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form_group select-100">
                            <select className="wide">
                              <option data-display="Subject :">Subject :</option>
                              <option value={1}>Customer Support</option>
                              <option value={2}>Best Product</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form_group">
                    <textarea
                        name="message"
                        className="form_control"
                        placeholder="Write Message"
                        defaultValue={""}
                    />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form_group">
                            <button className="main-btn btn-yellow">
                              Write Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  {product.countInStock>0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items" >
                          <h6>Quantity</h6>
                          <select value={qty}
                          onChange={ (e)=>setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                                (x)=>(
                                    <option key={x+1} value={x+1} >{x+1}
                                    </option>
                                )
                            )}

                          </select>
                        </div>
                      
                        <button className="main-btn btn-yellow" onClick={AddToCartHandle} >Add To Cart2</button>
                      </>
                  ):null }

                  <p>
                    {product.description}
                  </p>
                  <ul className="product-meta">
                    <li>
                      <span>Categories :</span>
                      <a href="Full-Stack-Project-F-Society/React Template/pages/[id]#">Organic, Fruits, Food</a>
                    </li>
                    <li>
                      <span>Tags :</span>
                      <a href="Full-Stack-Project-F-Society/React Template/pages/[id]#">Fruits, Juice, Drink</a>
                    </li>
                  </ul>
                  <div className="product-cart">
                    <ul>
                      <li>
                        <input type="number" defaultValue={1} />
                      </li>
                      <li>
                        <a href="Full-Stack-Project-F-Society/React Template/pages/[id]#" className="main-btn btn-yellow">
                          Add to cart
                        </a>
                      </li>
                      <li>
                        <a href="Full-Stack-Project-F-Society/React Template/pages/[id]#" className="wishlist-btn">
                          <i className="far fa-heart" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Tab.Container defaultActiveKey={"descrptions"}>
            <div className="discription-area pb-120">
              <div className="discription-tabs mb-20">
                <Nav as="ul" className="nav">
                  <li className="nav-item">
                    <Nav.Link
                      className="nav-link"
                      as="a"
                      data-toggle="tab"
                      eventKey="descrptions"
                      href="#descrptions"
                    >
                      Descrptions
                    </Nav.Link>
                  </li>
                  <li className="nav-item">
                    <Nav.Link
                      className="nav-link"
                      as="a"
                      data-toggle="tab"
                      eventKey="information"
                      href="#information"
                    >
                      Information
                    </Nav.Link>
                  </li>
                </Nav>
              </div>
              <Tab.Content className="tab-content">
                <Tab.Pane className="tab-pane fade" eventKey="descrptions">
                  <div className="content-box">
                    <p>
                      {product.description}
                    </p>
                  </div>
                </Tab.Pane>
                <Tab.Pane className="tab-pane fade" eventKey="information">
                  <div className="content-box">
                    <p>
                      {product.description}
                    </p>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      </section>
      {/*====== End Product Details Page Section ======*/}
      {/*====== Start Recent Product ======*/}
      <section className="recent-product-section border-top-1 pt-130 pb-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-60">
                <span className="sub-title">Popular Products</span>
                <h2>Some Category Organic Products Collect Our Shop</h2>
              </div>
            </div>
          </div>
          <Slider {...recentProductSlider} className="recent-product-slider">
            <div className="single-product-item wow fadeInUp">
              <div className="product-img">
                <img src="../../../../assets/images/products/img-1.png" alt="" />

                <div className="pc-btn">Food</div>
              </div>
              <div className="product-info">
                <ul className="ratings">
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                </ul>
                <h3 className="title">
                  <Link
                   href="/Users/Mouna/Desktop/Desktop/sem2/ProjetIntegré/Full-Stack-Project-F-Society/React Template/pages/product-details">
                    <a>Organice Delicious Pomegranate</a>
                  </Link>
                </h3>
                <span className="price">
                  <span className="curreny">$</span>53.56
                </span>
              </div>
            </div>
            <div className="single-product-item wow fadeInDown">
              <div className="product-img">
                <img src="../../../../assets/images/products/img-2.png" alt="" />
                <div className="pc-btn">Fish</div>
              </div>
              <div className="product-info">
                <ul className="ratings">
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                </ul>
                <h3 className="title">
                  <Link href="/Users/Mouna/Desktop/Desktop/sem2/ProjetIntegré/Full-Stack-Project-F-Society/React Template/pages/product-details">
                    <a>100% Natural Fresh Sea Fish</a>
                  </Link>
                </h3>
                <span className="price">
                  <span className="curreny">$</span>53.56
                </span>
              </div>
            </div>
            <div className="single-product-item wow fadeInUp">
              <div className="product-img">
                <img src="../../../../assets/images/products/img-3.png" alt="" />
                <div className="pc-btn">Food</div>
              </div>
              <div className="product-info">
                <ul className="ratings">
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                </ul>
                <h3 className="title">
                  <Link href="/Users/Mouna/Desktop/Desktop/sem2/ProjetIntegré/Full-Stack-Project-F-Society/React Template/pages/product-details">
                    <a>Organice Delicious Pomegranate</a>
                  </Link>
                </h3>
                <span className="price">
                  <span className="curreny">$</span>53.56
                </span>
              </div>
            </div>
            <div className="single-product-item wow fadeInDown">
              <div className="product-img">
                <img src="../../../../assets/images/products/img-4.png" alt="" />
                <div className="pc-btn">Vegetable</div>
              </div>
              <div className="product-info">
                <ul className="ratings">
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                </ul>
                <h3 className="title">
                  <Link href="/Users/Mouna/Desktop/Desktop/sem2/ProjetIntegré/Full-Stack-Project-F-Society/React Template/pages/product-details">
                    <a>Organice Delicious Pomegranate</a>
                  </Link>
                </h3>
                <span className="price">
                  <span className="curreny">$</span>53.56
                </span>
              </div>
            </div>
            <div className="single-product-item wow fadeInUp">
              <div className="product-img">
                <img src="../../../../assets/images/products/img-5.png" alt="" />
                <div className="pc-btn">Fruits</div>
              </div>
              <div className="product-info">
                <ul className="ratings">
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                  <li>
                    <i className="fas fa-star" />
                  </li>
                </ul>
                <h3 className="title">
                  <Link href="/Users/Mouna/Desktop/Desktop/sem2/ProjetIntegré/Full-Stack-Project-F-Society/React Template/pages/product-details">
                    <a>Organice Delicious Pomegranate</a>
                  </Link>
                </h3>
                <span className="price">
                  <span className="curreny">$</span>53.56
                </span>
              </div>
            </div>
          </Slider>
        </div>
      </section>
    </Layout>
  );
}


export default Product;
