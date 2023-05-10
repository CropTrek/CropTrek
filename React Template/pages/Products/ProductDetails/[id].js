
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../../src/layouts/Layout';
import PageBanner from "../../../src/components/PageBanner";
import ProductDetailsSlider from "../../../src/components/sliders/ProductDetailsSlider";
import {Nav, Tab} from "react-bootstrap";
 import Slider from "react-slick";
import {
    heroSliderOne, heroSliderTwo,
    logoSlider,
    projectsSliderOne,
    recentProductSlider,
    testimonialSliderOne
} from "../../../src/sliderProps";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {createProductReview, listProductDetail} from "../../../Redux/Actions/ProductActions";
import productDetails from "../../product-details";
import Rating from "../../../src/components/Rating";
import { get, set } from 'local-storage';

import Head from 'next/head';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../../Redux/Constants/ProductConstants';
import {Alert} from "reactstrap";
import moment from "moment";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Header from "../../../src/layouts/Header";
import Footer from "../../../src/layouts/Footer";
import {animation} from "../../../src/utils";
import {circle} from "@turf/turf";
   const  Product =()=>{
     useEffect(() => {
       animation();

     }, []);
    const [qty,setQty] =useState(1);

    const [rating,setRating] =useState(0);
    const [comment,setComment] =useState("");
    const profile = get('profile');
     const router = useRouter();
     const { id } = router.query;
     const [product, setProduct] = useState({});
     const [products, setProducts] = useState([]);
     const dispatch=useDispatch();
     const [cssVersion, setCssVersion] = useState(Date.now());


     const productReviewCreate=useSelector( (state)=>state.productReviewCreate )
const {loading:loadingCreateReview,error:errorCreateReview,success:successCreateReview}=productReviewCreate;




     useEffect( ()=>{




         console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
if(successCreateReview){
  alert("Review Submitted successfully")
  setRating(0)
  setComment("")
  dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
}

dispatch(listProductDetail(id))
setCssVersion(Date.now());
     },[dispatch,id,successCreateReview] )

const {loading,error}=productDetails





       const testttttttt = async (id) => {

           const res = await axios.get(`http://localhost:5000/api/sys/products/recProductsSys/${id}`);
           console.log("mmmmmmmmmmmmmmmm222mmmmmmmmmmmmmmmmmmmm")
           console.log(res.data.recommended_products);
           console.log("mmmmmmmmmmmmmmmm222mmmmmmmmmmmmmmmmmmmm")
       };



     const fetchProduct = async (id) => {

       const res = await axios.get(`http://localhost:5000/api/products/${id}`);
       setProduct(res.data);

     };

     const fetchProduct2 = async (id) => {

         const res = await axios.get(`http://localhost:5000/api/sys/products/recProductsSys/${id}`);
       setProducts(res.data.recommended_products);
       console.log("Products Sys")
       console.log(products)

       console.log("Products Sys")

     };


  useEffect(() => {
    if (id) {
      console.log("---------------------000--------------------------");
testttttttt(id);

        console.log("---------------------1111--------------------------");

      fetchProduct(id);
      fetchProduct2(id)

    }
  }, [id]);



  const deleteProduct = async (id) => {
    await axios.delete(`/api/products/${id}`);
    router.push('/');
  };



     // add To cart


     const AddToCartHandle=(e)=>{
       e.preventDefault()
       router.push(`/Cart/${id}?qty=${qty}`)
     }
     const [rvs2, setRvs2] = useState([]);


     const submitHandler = async (e) => {
       e.preventDefault();
       await dispatch(createProductReview(id, { rating, comment }));
       const res = await axios.get(`http://localhost:5000/api/products/${id}`);
       setProduct(res.data);
       setRvs2(res.data.reviews);
       console.log("555555555555555555555555555555")
       console.log(rvs2)
     };
     useEffect(() => {
       if (product && product.reviews) {
         setRvs2(product.reviews);
         console.log("*********************0000*******ffff********************");
         console.log(rvs2);
         console.log("*********************0000*******ffff********************");
       }
     }, [product]);
//console.log(product.reviews)
  return (



    <>
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
<Header/>

<br/>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

      {/*<PageBanner pageTitle={"Product"} pageName="Product Details" />*/}








      <section className="prodcuts-details-page  pb-130">
        <div className="container">
          <div className="product-details-wrapper wow fadeInUp">
            <div className="row">
              <div className="col-lg-7">


                <img className="col-lg-9" src={`http://localhost:5000/api/products/getImage/${product._id}/products`}  alt="product" />
                  <section className="recent-product-section border-top-1 pt-130 pb-130">
                      <div className="container">
                          {/*<div className="row justify-content-center">*/}
                          {/*    <div className="col-xl-8 col-lg-10">*/}
                          {/*        <div className="section-title text-center mb-60">*/}
                          {/*            <span className="sub-title">Popular Products</span>*/}
                          {/*            <h5>Other products you can buy it with <i>{product.name} </i></h5>*/}
                          {/*        </div>*/}
                          {/*    </div>*/}
                          {/*</div>*/}

                          <div>



                                          <div className="section-title   ">
                                              <span  className="sub-title" style={{fontSize:"10px"}} >Other products you can buy it with {product.name} </span>

                                          </div>


                                  <Slider  style={{ maxWidth: "300px" , marginLeft:"120px" }} {...heroSliderTwo} className="center recent-product-slider">
                                      {products.map((product) => (
                                          <li className="product-item">
                                              <div className="product-img" >

                                                  <img width={100} src={`http://localhost:5000/api/products/getImage/${product._id.$oid}/products`}  alt="" />

                                              </div>

                                              <div className="info">
                                                  <h6>
                                                      <Link href={`/Products/ProductDetails/${product._id.$oid}`}>
                                                          <a>{product.name}</a>
                                                      </Link>
                                                  </h6>
                                                  <Rating
                                                      value={product.rating}
                                                      text=""
                                                  ></Rating>
                                              </div>
                                          </li>                                      ))}
                                  </Slider>
                              </div>



                      </div>

                  </section>

              </div>
              <div className="col-lg-5">
                <div className="product-info mb-50">

                  <h3 className="title">{product.name}</h3>
                  <div className="products-rating-price d-flex">
                    <Rating
                        value={product.rating}

                    ></Rating>
                    <span className="price">
                    {product.price}   <span className="curreny">DT</span>
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
                  <br/>
                  <div className="flex-box d-flex justify-content-between align-items " >
                    <h6>Review</h6>

                    <span>{product.numReviews} reviews</span>

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
                      <br/>
                        <button className="main-btn btn-yellow" onClick={AddToCartHandle} >Add To Cart2</button>
                      </>
                  ):null }

                  <p>
                    {product.description}
                  </p>
                

                </div>
              </div>
            </div>
          </div>

          <div className="row my-5">
          <div className="col-md-6">
      <h6 className="mb-3" >Reviews</h6>
            {
                product && rvs2 && rvs2.length === 0 && (
                    <Alert variant={"alert-info mt-3"} >No Reviews</Alert>

                )
            }
            {
                product && rvs2 && rvs2.map( (review)=>(
                  <div key={review._id} className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded  " >
                    <strong>{review.name}</strong>
                    <Rating  value={review.rating} />
                    <span> {moment(review.createdAt).calendar()} </span>
                    <div className="alert alert-info mt-3" >{review.comment}</div>
                  </div>

              ) )
            }

    </div>

            <div className="col md-6">
              <h6>WRITE A CUSTOMER REVIEW</h6>
              <div className="my-4" >
                {loadingCreateReview && <Loading />}
                {errorCreateReview && (
                    <Alert variant="alert-danger" >{errorCreateReview}</Alert>
                )}
              </div>
              {
                profile ?(
                    <form onSubmit={submitHandler}>
<strong>Rating</strong>
                  <div className="my-4" >

                    <select value={rating} onChange={ (e)=>setRating(e.target.value) }
                         className="col-12"   required>
                      <option value="">Select ...</option>
                      <option value="1">1- Poor</option>

                      <option value="2">2- Fair ...</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very Good</option>
                      <option value="5">5- Excellent</option>

                    </select>
                  </div>



                  <div className="my">
                    <strong>Comment</strong>
                    <textarea value={comment} onChange={ (e)=> setComment( e.target.value) } rows="3"
                              className="col-12  p-3 mt-2 border-1 rounded"  required></textarea>
                  </div>
                  <div className="my-3">
                    <button className="main-btn btn-yellow col-12  rounded " disabled={loadingCreateReview}  >Create</button>

                  </div>
                </form> ):
                    <div className="my-3">
                      <Message variant={"alert-warning"}>
                        Please {" "}
                        <Link href="/Auth">
                          <a>
                            <strong>Login</strong>
                            to write a review
                          </a>
                        </Link>
                      </Message>


                    </div>
              }

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

      <Footer/>
    </>
  );
}


export default Product;
