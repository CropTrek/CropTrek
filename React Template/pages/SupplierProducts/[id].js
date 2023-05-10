
import Link from "next/link";
import React,{useEffect,useState} from "react";
import PageBanner from "../../src/components/PageBanner";
import Layout from "../../src/layouts/Layout";
import axios from "axios";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {eeeee, listMyProducts} from "../../Redux/Actions/ProductActions";
import Loading from "../Products/LoadingError/Loading";
import Message from "../Products/LoadingError/Error";
import Rating from "../../src/components/Rating";
import {get} from "local-storage";
import {listMyOrders} from "../../Redux/Actions/OrderActions";
import {Nav, Navbar} from "react-bootstrap";

import {Button} from "reactstrap";

const SupplierProductsPage = (props) => {


    const router = useRouter();
    const { id } = router.query;
    console.log("**********************")
    console.log(id)
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

    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`http://localhost:5000/api/products/users/${id}/products`);

            setShowProducts1(result.data)
            console.log(result.data)
        };


        fetchData();


    }, []);



    const filteredProducts = showProducts1.filter(product => {
        const searchValue = searchTerm.toLowerCase();
        const productName = product.name.toLowerCase();
        const productPrice = product.price >= minPrice && product.price <= maxPrice;
        return productName.includes(searchValue) && productPrice;
    });


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
            <PageBanner pageTitle={"Shop Left Sidebar"} pageName="Shop" />
            <section className="shaop-page pt-170 pb-70">


                <div className="container">

                    <div style={{margin:"50px", justifyContent: "center"}} className="d-flex flex-row align-items-center">
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
                                        <input type="range" className="form-control-range mr-2" min="0" max="10000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                                        <span>Max Price: {maxPrice}</span>
                                    </div>
                                    <div id="slider-range" />
                                    <div className="price-number">
                    <span className="amount">
                      <input type="text" id="amount" />
                    </span>
                                    </div>
                                </div>






                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8">
                            <div className="products-wrapper">
                                <div className="row">


                                    {
                                        loading?(

                                            <div className="mb-5" ><Loading /></div>
                                        ):error?(<Message variant="alert-danger" > {error} </Message>  )
                                            :
                                            (<>
                                                    {filteredProducts.map((product) => (


                                                            <div className="col-lg-4 col-md-6 col-sm-12"  key={product._id}>
                                                                <div className="single-product-item mb-60 wow fadeInUp">
                                                                    <div className="product-img">
                                                                        <img src={`http://localhost:5000/api/products/getImage/${product._id}/products`}  alt="" />
                                                                        {/*<div className="pc-btn">Food</div>*/}
                                                                        <div className="cart-button">
                                                                            <Link href="/products">
                                                                                <a className="main-btn btn-yellow">Add to cart</a>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-info">
                                                                        <Rating
                                                                            value={product.rating}
                                                                            text=""
                                                                        ></Rating>
                                                                        <h3 className="title">
                                                                            <Link href={`/Products/ProductDetails/${product._id}`}>


                                                                                <a>{product.name}</a>
                                                                            </Link>
                                                                        </h3>
                                                                        <span className="price">
                         {product.price}  <span className="curreny">DT</span>
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



        </Layout>
    );
};
export default SupplierProductsPage;
