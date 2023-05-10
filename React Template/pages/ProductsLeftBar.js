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
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";


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
  const [nearProducts,setNearProducts] = useState([])
  const [nearUsers,setNearUsers] = useState([])
  const [otherUsers,setOtherUsers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/products');

      setShowProducts1(result.data.products)
    };

    const fetchData3=async() => {
      const result = await axios.get('http://localhost:5000/api/products/Products/NotFiltered')
      setNoFilteredProducts(result.data.products)
    }
    const fetchProduct2 = async () => {

      const res = await axios.get(`http://localhost:5000/api/sys/products/nearProducts/${id}`);
      setNearProducts(res.data.nearby_products);
      console.log("Products near")
      console.log(nearProducts)

      console.log("Products near")

    };
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



    const fetchProduct2 = async (id) => {

      const res = await axios.get(`http://localhost:1000/nearProducts/${id}`);
      setNearProducts(res.data.nearby_products);
      console.log("Products near")
      console.log(nearProducts)

      console.log("Products near")

    };

    fetchProduct2(profile._id)


    const fetchUsers = async (id) => {

      const res = await axios.get(`http://localhost:1000/users/nearbyUsers/${id}`);

      setNearUsers(res.data.nearby_users);
      console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
      console.log(res.data.nearby_users)
      console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttttttt")





    };
    fetchUsers(profile._id)


    const fetchOtherSuppliers = async (id) => {

      const res = await axios.get(`http://localhost:1000/users/otherUsers/${id}`);

      setOtherUsers(res.data.nearby_users);
      console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
      console.log(res.data.nearby_users)
      console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttttttt")





    };
    fetchOtherSuppliers(profile._id)


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

  useEffect(async () => {
    listMyProducts().then(data => {
      console.log("mes produits  *****************")
      console.log(data)
      setProducts2(data)
      console.log("mes produit ******8888888888888***********")
      console.log(products2)
    });



        const response = await axios.get('http://localhost:1000/nearProducts/64525f7c9e8f0d13df57aed9');
    console.log("yyyyyyyyyy55555555555555555555555555555")
console.log(response.data.nearby_products);
    console.log("yyyyyyyyyy55555555555555555555555555555")

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


    const   Tooltip = dynamic( ()=>import ('react-leaflet').then( (module)=>module.Tooltip ), { ssr: false } )


  const MapContainer = dynamic(() => import('react-leaflet').then((module) => module.MapContainer), { ssr: false });
  const TileLayer = dynamic(() => import('react-leaflet').then((module) => module.TileLayer), { ssr: false });
  const Marker = dynamic(() => import('react-leaflet').then((module) => module.Marker), { ssr: false });
  const Popup = dynamic(() => import('react-leaflet').then((module) => module.Popup), { ssr: false });
  const [L, setL] = useState(null);
  const [icon, setIcon] = useState(null);
  useEffect(() => {
    import("leaflet").then((L) => {
      setL(() => L);
    });
  }, []);
  const myIcon = L && L.icon({
    iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconRetinaUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -40],
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [13, 41],
  });

  const myIcon2 = L && L.icon({
    iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    iconRetinaUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -40],
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [13, 41],
  });
    const myIcon3 = L && L.icon({
        iconUrl:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        iconRetinaUrl:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
        iconSize: [30, 45],
        iconAnchor: [15, 45],
        popupAnchor: [0, -40],
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        shadowSize: [41, 41],
        shadowAnchor: [13, 41],
    });

  const legendStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  };

  const redLegend = (
      <div style={{ ...legendStyle, color: "red", marginLeft:"4px" }}>
        <span style={{ marginRight: "5px" }}>●</span> Near Products
      </div>
  );

  const greenLegend = (
      <div style={{ ...legendStyle, color: "green" , marginLeft:"4px"}}>
        <span style={{ marginRight: "5px" }}>●</span> Near Suppliers
      </div>
  );

  const blueLegend = (
      <div style={{ ...legendStyle, color: "blue" , marginLeft:"4px"}}>
        <span style={{ marginRight: "5px" }}>●</span> Other Suppliers
      </div>
  );
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
marginBottom:"10px"
  };
  const [searchTerm2, setSearchTerm2] = useState("");

  const handleSearch2 = (event) => {
    const searchTerm2 = event.target.value;
    setSearchTerm2(searchTerm2);
    const filteredProducts2 = nearProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm2.toLowerCase())
    );
    setNearProducts(filteredProducts2);
  };
  const handleClearSearch2 = () => {
    setSearchTerm2("");
    const fetchProduct2 = async (id) => {

      const res = await axios.get(`http://localhost:5000/api/sys/products/nearProducts/${id}`);
      setNearProducts(res.data.nearby_products);
      console.log("Products near")
      console.log(nearProducts)

      console.log("Products near")

    };

    fetchProduct2(profile._id)
    setNearProducts(nearProducts);
  };
    return (
    <Layout>
      {!connectedUser  || connectedUser.role==="admin" &&<AccessDach/> }
      <PageBanner pageTitle={"Shop Left Sidebar"} pageName="Shop" />
      {connectedUser && connectedUser.role === "farmer" &&
          <>
      <div  className="row justify-content-center" style={{marginTop:"-130px"}}>
        <div className="col-xl-6 col-lg-10">
          <div className="section-title text-center mb-60 wow fadeInUp">
            <span className="sub-title">Nearest Poducts and Suppliers  </span>
            <h5>You can search for the nearest product requested by you <b>whose distance is less than or equal to <span style={{color:"red"}} > 10 km</span></b></h5>
          </div>
        </div>
      </div>

      <div className="col-lg-12 col-md-6 col-sm-6"   >

        <div className="d-flex flex-row align-items-center" style={{ justifyContent: "center" }} >
          <p className="cat-btn" >   {redLegend}</p>
          <p className="cat-btn">     {greenLegend}</p>
          <p className="cat-btn">   {blueLegend}</p>
          <input
              type="text"
              placeholder="Serach near Products..."
              onChange={handleSearch2}
              value={searchTerm2}
              className="form-control col-2"
              style={{marginLeft:"25px"}}
          />
          <button onClick={handleClearSearch2}  className="btn btn-outline-secondary ml-2">Clear search</button>
        </div>








        </div>


          <MapContainer
              center={[36.81897, 10.16579]}
              zoom={5}
              scrollWheelZoom={true}
              zoomControl={false}
              style={{height: "900px", maxWidth: "100%", border: "2px solid #ccc", margin: "20px"}}
          >

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {nearProducts.map((product) => (
                <Marker
                    key={product.id}
                    position={
                      product.user.adresse.coordinates[0] &&
                      product.user.adresse.coordinates[1]
                          ? [
                            product.user.adresse.coordinates[0],
                            product.user.adresse.coordinates[1],
                          ]
                          : [0, 0] // Set default coordinates if either lat or lng is undefined
                    }
                    icon={myIcon}
                >
                  <Tooltip direction="top" offset={[0, -45]} opacity={1} permanent>
                    <span>{product.name}</span>
                  </Tooltip>
                  <Popup>
                    <div>
                      <h3>{product.name}</h3>
                      <img
                          width={100}
                          src={`http://localhost:5000/api/products/getImage/${product._id.$oid}/products`}
                          alt=""
                      />
                      <p>{product.description}</p>
                      <p><b>{product.price} Dt</b></p>
                      <div className="cart-button">
                        <Link href={`/Products/ProductDetails/${product._id.$oid}`}>
                          <a className="main-btn btn-yellow">Add to cart</a>
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>
            ))}


            {nearUsers.map((user) => (
                <Marker

                    key={user._id.$oid}
                    position={
                      user.adresse.coordinates[0] &&
                      user.adresse.coordinates[1]
                          ? [
                            user.adresse.coordinates[0],
                            user.adresse.coordinates[1],
                          ]
                          : [0, 0] // Set default coordinates if either lat or lng is undefined
                    }
                    icon={myIcon2}
                >
                  <Tooltip direction="top" offset={[0, -45]} opacity={1} permanent>
                    <div style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <img
                          style={{maxWidth: "100%", maxHeight: "100%"}}
                          src={`http://localhost:5000/api/users/file/${user._id.$oid}`}
                          alt="author Image"
                      />
                    </div>
                  </Tooltip>

                  <Popup>
                    <div>
                      <img
                          style={{maxWidth: "100%", maxHeight: "100%"}}
                          src={`http://localhost:5000/api/users/file/${user._id.$oid}`}
                          alt="author Image"
                      />
                      <h5>{user.name} {user.surname}</h5>
                      <p>
                        {user.adresse.fullAdresse.suburb} | {user.adresse.fullAdresse.city_district} |
                        {user.adresse.fullAdresse.state} | {user.adresse.fullAdresse.country} |

                      </p>

                      <p>+216 {user.phoneNumber}</p>
                      <div className="cart-button">

                        <Link href={`/SupplierProducts/${user._id.$oid}`}>
                          <a className="main-btn btn-yellow">Show products</a>
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>
            ))}


            {otherUsers.map((user) => (
                <Marker

                    key={user._id}
                    position={
                      user.adresse.coordinates[0] &&
                      user.adresse.coordinates[1]
                          ? [
                            user.adresse.coordinates[0],
                            user.adresse.coordinates[1],
                          ]
                          : [0, 0]
                    }
                    icon={myIcon3}
                >
                  <Tooltip direction="top" offset={[0, -45]} opacity={1} permanent>
                    <div style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <img
                          style={{maxWidth: "100%", maxHeight: "100%"}}
                          src={`http://localhost:5000/api/users/file/${user._id.$oid}`}
                          alt="author Image"
                      />
                    </div>
                  </Tooltip>

                  <Popup>
                    <div>
                      <img
                          style={{maxWidth: "100%", maxHeight: "100%"}}
                          src={`http://localhost:5000/api/users/file/${user._id.$oid}`}
                          alt="author Image"
                      />
                      <h5>{user.name} {user.surname}</h5>
                      <p>
                        {user.adresse.fullAdresse.suburb} | {user.adresse.fullAdresse.city_district} |
                        {user.adresse.fullAdresse.state} | {user.adresse.fullAdresse.country} |

                      </p>

                      <p>+216 {user.phoneNumber}</p>
                      <div className="cart-button">

                        <Link href={`/SupplierProducts/${user._id.$oid}`}>
                          <a className="main-btn btn-yellow">Show products</a>
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>
            ))}

          </MapContainer>














      <section  className="shaop-page" style={{marginTop:"100px"}} >
        <div  className="row justify-content-center" >
          <div className="col-xl-9 col-lg-10">
            <div className="section-title text-center mb-60 wow fadeInUp">
              <span className="sub-title">All Products Published By Suppliers And Other Farmers  </span>
            </div>

          </div>
        </div>

        <div  className="container">
          <div className="col-lg-12 col-md-6 col-sm-6" >
          <div className="entry-content white-bg" style={{marginBottom:"10px"}} >

            <a href="#" className="cat-btn">
              Sale Products
            </a>
            <div className="widget product-sidebar-widget mb-30 wow fadeInUp">

              <br/>
              <ul className="product-list" style={{display: 'flex', flexWrap: 'wrap'}}>
                {topProducts && topProducts.map((product) => (



                    <li className="product-item" style={{display: 'flex', alignItems: 'center', marginRight: '10px'}}>
                      <div className="product-img" style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden'}}>
                        <img style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}} src={`http://localhost:5000/api/products/getImage/${product._id}/products`}  alt="" />
                      </div>
                      <div className="info">
                        <h6 className="product-tag-cloud">
                          <Link href={`/Products/ProductDetails/${product._id}`}>
                            <a>{product.name}</a>
                          </Link>
                        </h6>
                        <Rating
                            value={product.rating}
                            text=""
                        />
                      </div>
                    </li>

                ))}
              </ul>
            </div>
          </div>

          </div>


<div className="col-lg-12 col-md-6 col-sm-6"  style={{marginBottom:"100px",marginTop:"100px"}} >

          <div className="d-flex flex-row align-items-center" style={{ justifyContent: "center" }} >
            <input type="text" className="form-control col-4" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />

            <button className="btn btn-outline-secondary ml-2" onClick={() => setSearchTerm('')}>Clear</button>










              <p  className="cat-btn" style={{marginLeft:"10px",marginRight:"10px"}}>Filter By Price</p>
              <div className="d-flex align-items-center">
                <input type="range" className="form-control-range mr-2" min="0" max="1000" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <input type="range" className="form-control-range mr-2" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

              </div>
            <br/>
            <div className="d-flex align-items-center">

                <span className="cat-btn" style={{fontSize:"15px"}} >Max Price: {maxPrice}</span>
              <span className="cat-btn" style={{ display: 'inline-block', marginLeft: '10px', fontSize: '15px' }}>Min Price: {minPrice}</span>

            </div>
              <div id="slider-range" />
              <div className="price-number">
                    <span className="amount">
                      <input type="text" id="amount" hidden={true}/>
                    </span>
              </div>



          </div>





</div>




          <div className="row">


            <div className="col-lg-12">

              <div className="prodcut-sidebar">

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
            <div className="col-lg-12">
              <div style={{ marginBottom:"20px"}} >
                <div className="row">
                  {loading ? (
                      <div className="mb-5">
                        <Loading />
                      </div>
                  ) : error ? (
                      <Message variant="alert-danger"> {error} </Message>
                  ) : (
                      <>
                        {filteredProducts.map((product) => (
                            <div className="col-lg-2 col-md-3 col-sm-6" key={product._id}>

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
                                      <a href="#" className="cat-btn"><b>{product.name} </b></a>
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
                          {filteredProducts.length === productsPerPage && (
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
          </>
      }
    </Layout>
  );
};
export default ProductsLeftBarPage;
