import Link from "next/link";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import CreateProduct from "./Products/CreateProduct";
import { Provider} from 'react-redux';
import store from '../Redux/Store.js';
import { axios } from 'axios';
import { useDispatch,useSelector } from "react-redux";
import React ,{useEffect,useState} from "react";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import  {listProduct}  from '../Redux/Actions/productActions';
import Loading from "./Products/LoadingError/Loading";
import Message from "./Products/LoadingError/Error";
import Contact from './contact';
import { Route } from "react-router-dom";
// import UpdateUser from "./User/testUsers";
const ProductsPage = () => {
 



  // const [connectedUser, setConnectedUser] = useState(null);
  // useEffect(() => {
  //   const profile = JSON.parse(localStorage.getItem('profile'));
  //   setConnectedUser(profile);
  //   console.log("3333333333333333333333333333")
  //   console.log(profile._id)
  // }, []);

  console.log("***********Mouna**************")

 const dispatch= useDispatch();
 const productList=useSelector( (state)=>state.productList )
 console.log(productList)
 const {loading,error,products}=productList;



 useEffect( ()=>{
   dispatch(listProduct());
 },[dispatch])


  return (
 

   
    <Layout>
      <PageBanner pageTitle={"Shop"} pageName="Shop" />
      <h1>Mouna
<Link href="/products" >MMMMMMMM</Link>

      </h1>

      <section className="shaop-page pt-170 pb-70">

      {/* <div>
      <h1>Update User</h1>
      <UpdateUser />
    </div> */}

        <div className="container">
          <div className="product-search-filter wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <div className="product-search mb-30">
                    <div className="form_group">
                      <input
                        type="search"
                        className="form_control"
                        placeholder="Search"
                        name="search"
                      />
                      <button className="search-btn">
                        <i className="far fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row justify-content-between align-items-center mb-15">
                    <div className="col-lg-4 col-md-6">
                      <div className="show-text mb-15">
                        <p>Showing 1 - 12 of 30 Results</p>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-6">
                      <div className="filter-category mb-15">
                        <ul>
                          <li>
                            <select className="wide">
                              <option data-display="Sort by Newness">
                                Sort by Newness
                              </option>
                              <option value={1}>Price High To Low</option>
                              <option value={2}>Price Low To High</option>
                            </select>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>
                                <i className="far fa-list" />
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>
                                <i className="far fa-th" />
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>



          <div className="row">
            <div className="col-xl-12">
              <div className="products-wrapper">
               
                <div className="row">
               
                  {
                    loading?( 
                   
                    <div className="mb-5" ><Loading /></div>
                     ):error?(<Message variant="alert-danger" > {error} </Message>  )
                    :
                    (<>
                                      {products.map( (product)=>(

<div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={product._id}>

<div className="single-product-item mb-60 wow fadeInUp">
  <div className="product-img">
  {/*<Link href={`/product/${product._id}`}>sssssssssss</Link>*/}
    <Link href={`/product/${product._id}`}>

    <img src="assets/images/products/img-1.png" alt="" /></Link>
    <div className="pc-btn">Food</div>
    <div className="cart-button">
      <Link href="/products">
        <a className="main-btn btn-yellow">Add to cart</a>
      </Link>
    </div>
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
      <Link href="/product-details">
        <a>{product.name}</a>
      </Link>
    </h3>
    {/* <h1> <Link href="/MounaT">
        <a>888888888</a>
      </Link></h1> */}

<li key={product._id}>
            {/* <Link href={`${product._id}`}> */}
            <Link href={`Products/ProductDetails/${product._id}`}>
              <a>Tastyyy</a>
            </Link>
            </li>




    <span className="price">
      <span className="curreny">$</span>{product.price}
    </span>
  </div>
</div>
</div>

                  )
                  
                  
                  )}
                    </>
                    )
                  }

                 
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  

       {/* <Provider store={store} >
        <CreateProduct></CreateProduct>
      </Provider>  */}
     
    </Layout>
  );
};
export default ProductsPage;
