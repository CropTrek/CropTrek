
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
     const dispatch=useDispatch();
     const [cssVersion, setCssVersion] = useState(Date.now());


     const productReviewCreate=useSelector( (state)=>state.productReviewCreate )
const {loading:loadingCreateReview,error:errorCreateReview,success:successCreateReview}=productReviewCreate;




     useEffect( ()=>{

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









     const fetchProduct = async (id) => {

       const res = await axios.get(`http://localhost:5000/api/products/${id}`);
       setProduct(res.data);

     };


  useEffect(() => {
    if (id) {
      console.log("************************************************");
      fetchProduct(id);

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
                      <span className="curreny">DT</span>{product.price}
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
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    ></Rating>
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
                            className="col-12 bg-light p-3 mt-2 border-0 rounded" >
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
                              className="col-12 bg-light p-3 mt-2 border-0 rounded" ></textarea>
                  </div>
                  <div className="my-3">
                    <button disabled={loadingCreateReview} className="col-12 bg-black border-0 p-3 rounded text-white" >Submit</button>

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
      <Footer/>
    </>
  );
}


export default Product;
