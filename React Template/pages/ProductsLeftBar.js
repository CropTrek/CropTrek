import Link from "next/link";
import React,{useEffect,useState} from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import axios from "axios";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {eeeee, listMyProducts} from "../Redux/Actions/ProductActions";
import Loading from "./Products/LoadingError/Loading";
import Message from "./Products/LoadingError/Error";
import Rating from "../src/components/Rating";
import {get} from "local-storage";
import {listMyOrders} from "../Redux/Actions/OrderActions";
import {Nav, Navbar} from "react-bootstrap";
import Orders from "./Orders/Orders";
import MyVitrin from "./MyVitrin";
import {Button} from "reactstrap";
import {Box, TablePagination} from "@mui/material";
import Slider from "react-slick";
import {testimonialSliderOne} from "../src/sliderProps";
import AccessDach from "./AccessDach";

const ProductsLeftBarPage = (props) => {


  const [connectedUser, setConnectedUser] = useState(null);
  //const profile = JSON.parse(localStorage.getItem('profile'));
  const profile = get('profile');


  console.log("**************************")
  console.log(profile)

  useEffect(() => {
    setConnectedUser(profile);
    dispatch(listMyOrders());
  }, []);
  const [showProducts1, setShowProducts1] = useState([]);
  const [noFilteredProducts,setNoFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [topProducts,setTopProducts] = useState([])
  const [suppliers,setSuppliers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/products');

      setShowProducts1(result.data.products)
    };

    const fetchData3=async() => {
      const result = await axios.get('http://localhost:5000/api/products/Products/NotFiltered')
      setNoFilteredProducts(result.data.products)
    }

    const fetchSuppliers = async () => {
      const result=await axios.get('http://localhost:5000/api/products/users/suppliers')
      console.log("Suppliers")
      console.log(result.data)
      setSuppliers(result.data)
    }
    fetchSuppliers();
    fetchData();

    fetchData3()
  }, []);
  useEffect(() => {
    const fetchData2 = async () => {
      const result = await axios.get('http://localhost:5000/api/products/topProducts/top');
      console.log("result Top")
      console.log(result)
      setTopProducts(result.data)
    };
    fetchData2();
  }, []);


  const filteredProducts = noFilteredProducts.filter(product => {
    const searchValue = searchTerm.toLowerCase();
    const productName = product.name.toLowerCase();
    const productPrice = product.price >= minPrice && product.price <= maxPrice;
    return productName.includes(searchValue) && productPrice;
  });

  const router=useRouter()
  const {keyword}=props




  const dispatch= useDispatch();
  const productList=useSelector( (state)=>state.productList )
  console.log(productList)
  const {loading,error,products}=productList;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect( ()=>{
    dispatch(eeeee(keyword,''));
  },[dispatch,keyword])




  useEffect(() => {
    setConnectedUser(profile);
    dispatch(listMyOrders());
  }, []);
  const orderListMy = useSelector(state => state.orderListMy);
  const { loading2, error2, orders } = orderListMy;
  const [products2,setProducts2] = useState([]);

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

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Calculate the index of the first and last products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = noFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  function nextPage() {
    setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    setCurrentPage(currentPage - 1);
  }


  return (
    <Layout>
      {!connectedUser  || connectedUser.role==="admin" &&<AccessDach/> }
      <PageBanner pageTitle={"Shop Left Sidebar"} pageName="Shop" />

      {connectedUser && connectedUser.role === "farmer" &&
          <section className="testimonial-section ">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-10">
                  <div className="section-title text-center mb-60 wow fadeInUp">
                    <span className="sub-title">Our Suppliers</span>
                    <h2>you can look for the products in the shops of our suppliers</h2>
                  </div>
                </div>
              </div>
              <Slider {...testimonialSliderOne} className="testimonial-slider-one">

                {suppliers.map((supplier) => (
                    <div className="testimonial-item text-center wow fadeInDown">


                      <div className="author-thumb">
                        <img
                            src="assets/images/testimonial/img-1.jpg"
                            alt="author Image"
                        />
                      </div>
                      <div className="testimonial-content">

                        <div className="quote">
                          <i className="fas fa-quote-right"/>
                        </div>
                        <div className="author-title">
                          <h4><Link href={`/SupplierProducts/${supplier._id}`}>
                            <a>{supplier.name} | {supplier.surname}</a>
                          </Link></h4>
                          <p className="position">{supplier.phoneNumber} </p>
                          <p className="position">{supplier.adresse.fullAdresse.city_district}</p>
                        </div>
                      </div>
                    </div>
                ))}
              </Slider>
            </div>
          </section>
      }








      <section className="shaop-page">


        <div className="container">



          <div style={{ justifyContent: "center" , margin:"20px"}} className="d-flex flex-row align-items-center">
            <input type="text" className="form-control col-6 mr-2" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />

            <button className="btn btn-outline-secondary ml-2" onClick={() => setSearchTerm('')}>Clear</button>
          </div>
          <div className="row">


            <div className="col-xl-3 col-lg-4">

              <div className="prodcut-sidebar">

                <div className="widget price-range-widget mb-30 wow fadeInUp">
                  <h4 className="widget-title">Filter By Price</h4>

                  <div className="d-flex align-items-center">
                    <input type="range" className="form-control-range mr-2" min="0" max="1000" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                    <span>Min Price: {minPrice}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <input type="range" className="form-control-range mr-2" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    <span>Max Price: {maxPrice}</span>
                  </div>
                  <div id="slider-range" />
                  <div className="price-number">
                    <span className="amount">
                      <input type="text" id="amount" />
                    </span>
                  </div>
                </div>


                <div className="widget product-sidebar-widget mb-30 wow fadeInUp">
                  <h4 className="widget-title">Sale Products</h4>
                  <ul className="product-list">
                    {topProducts && topProducts.map((product) => (
                    <li className="product-item">
                      <div className="product-img" >

                        <img width={50} src={`http://localhost:5000/api/products/getImage/${product._id}/products`}  alt="" />

                      </div>

                      <div className="info">
                        <h6>
                          <Link href={`/Products/ProductDetails/${product._id}`}>
                            <a>{product.name}</a>
                          </Link>
                        </h6>
                        <Rating
                            value={product.rating}
                            text=""
                        ></Rating>
                      </div>
                    </li>
                    ))  }
                  </ul>
                </div>
                {/*{connectedUser && connectedUser.role === "Farmer" &&*/}

                {/*    <div className="widget product-sidebar-widget mb-30 wow fadeInUp">*/}
                {/*      <h4 className="widget-title">Suppliers</h4>*/}
                {/*      <ul className="product-list">*/}
                {/*        {suppliers.map((supplier) => (*/}
                {/*            <li className="product-item">*/}

                {/*              <div className="product-img">*/}

                {/*                <img width={50}*/}

                {/*                     src={`http://localhost:5000/api/users/file/${supplier?._id}`}*/}

                {/*                     alt=""/>*/}

                {/*              </div>*/}

                {/*              <div className="info">*/}
                {/*                <h6>*/}
                {/*                  <Link href={`/SupplierProducts/${supplier._id}`}>*/}
                {/*                    <a>{supplier.name} | {supplier.surname}</a>*/}
                {/*                  </Link>*/}
                {/*                </h6>*/}

                {/*              </div>*/}
                {/*            </li>*/}
                {/*        ))}*/}
                {/*      </ul>*/}
                {/*    </div>*/}
                {/*}*/}
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              <div className="products-wrapper">
                <div className="row">
                  {loading ? (
                      <div className="mb-5">
                        <Loading />
                      </div>
                  ) : error ? (
                      <Message variant="alert-danger"> {error} </Message>
                  ) : (
                      <>
                        {paginatedProducts.map((product) => (
                            <div className="col-lg-4 col-md-6 col-sm-12" key={product._id}>

                              <div className="single-product-item mb-60 wow fadeInUp">
                                <div className="product-img">
                                  <img
                                      src={`http://localhost:5000/api/products/getImage/${product._id}/products`}
                                      alt=""
                                  />
                                  <div className="cart-button">
                                    <Link href={`/Products/ProductDetails/${product._id}`}>
                                      <a className="main-btn btn-yellow">Add to cart</a>
                                    </Link>
                                  </div>
                                </div>
                                <div className="product-info">
                                  <Rating value={product.rating} text=""></Rating>
                                  <h3 className="title">
                                    <Link href={`/Products/ProductDetails/${product._id}`}>
                                      <a>{product.name}</a>
                                    </Link>
                                  </h3>
                                  <span className="price">
                    {product.price} <span className="curreny">DT</span>
                  </span>
                                </div>
                              </div>
                            </div>
                        ))}
                        <div className="pagination d-flex justify-content-between">
                          {currentPage > 1 && (
                              <button onClick={prevPage} className={`btn btn-secondary ${currentPage === 1 ? "ml-auto" : ""}`}>
                                Previous
                              </button>
                          )}
                          {paginatedProducts.length === productsPerPage && (
                              <button onClick={nextPage} className="btn btn-secondary">
                                Next
                              </button>
                          )}
                        </div>





                      </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="shaop-page pt-170 pb-70">

        <div className="container">
        <Navbar style={{marginLeft:"400px"}} >

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">


              {connectedUser && connectedUser.role !=="supplier" &&
              <Nav.Link onClick={showOrdersF}>
                <Button className="main-btn btn-yellow"
                                                              data-bs-toggle="pill"
                                                              data-bs-target="#v-pills-profile"
                                                              type="button"
                                                              role="tab"
                                                              aria-controls="v-pills-profile"
                                                              aria-selected="false"
              >
                <span class="order-list">Orders List: </span>
                <span class="badge badge-secondary badge-pill">{orders ? userOrders.length : 0}</span>
              </Button></Nav.Link>


              }

              {connectedUser && (connectedUser.role === "farmer" || connectedUser.role === "supplier"  ) &&
                  <Nav.Link onClick={showProductsF}>
                    <Button className="main-btn btn-yellow"
                            data-bs-toggle="pill"
                            data-bs-target="#v-pills-profile"
                            type="button"
                            role="tab"
                            aria-controls="v-pills-profile"
                            aria-selected="false"
                    >
                      <span class="order-list">My Vitrin: </span>
                      <span class="badge badge-dark badge-pill"> {products2 ? products2.length : 0}</span>
                    </Button></Nav.Link>



              }

              <Nav.Link onClick={showTestF}>
                <Button className="main-btn btn-yellow"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#v-pills-profile"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="v-pills-profile"
                                                    aria-selected="false"
              > Bouton Test</Button></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {showOrders   ? <div className="container">
              <div className="row justify-content-end">
                <div className=" col-lg-10">
                  {connectedUser && connectedUser.role !=="supplier" &&
                  <Orders orders={userOrders} loading={loading2} error={error2}/> }</div> </div> </div>
            : showProducts ? <MyVitrin products={products2}  />
                :
                <><h1>Good Testtt</h1> </>}


        </div></section>
    </Layout>
  );
};
export default ProductsLeftBarPage;
