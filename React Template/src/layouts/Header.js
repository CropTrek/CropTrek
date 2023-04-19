import Link from "next/link";
import React, { useState } from 'react';
import { Fragment, useEffect } from "react";
import {  DropdownToggle,DropdownMenu,DropdownItem, Collapse} from "reactstrap";
import useWindowSize from "../useWindowSize";
import { stickyNav } from "../utils";
import MobileHeader from "./MobileHeader";
import OffcanvasPanel from "./OffcanvasPanel";
import {image} from "../assets/images/users/user2.jpg";

import Dropdown from 'react-bootstrap/Dropdown';
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
const Header = ({ header }) => {




  useEffect(() => {
    stickyNav();
  }, []);
  const [overlayPanel, setOverlayPanel] = useState(false);
  const togglePanel = () => setOverlayPanel(!overlayPanel);

  const { width } = useWindowSize();

  useEffect(() => {
    const headers = document.querySelectorAll(".header-navigation");
    headers.forEach((header) => {
      if (width <= 1199) {
        header.classList.add("breakpoint-on");
      } else {
        header.classList.remove("breakpoint-on");
      }
      // toggle
      const toggleBtn = header.getElementsByClassName("navbar-toggler")[0],
        overlay = header.getElementsByClassName("nav-overlay")[0],
        menu = header.getElementsByClassName("nav-menu")[0];
      toggleBtn.addEventListener("click", () => {
        overlay.classList.add("active");
        menu.classList.add("menu-on");
      });
      overlay.addEventListener("click", () => {
        overlay.classList.remove("active");
        menu.classList.remove("menu-on");
      });
    });
  }, [width]);

  switch (header) {
    case 1:
      return <Header1 />;
    case 2:
      return <Header2 />;
    case 3:
      return (
        <Header3
          overlayPanel={overlayPanel}
          togglePanel={() => togglePanel()}
        />
      );
    case 4:
      return (
        <Header4
          overlayPanel={overlayPanel}
          togglePanel={() => togglePanel()}
        />
      );
    default:
      return <DefaultHeader />;
  }
};
export default Header;

const Header1 = () => (
  <header className="header-area">
    <div className="header-top-bar top-bar-one dark-black-bg">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-12 col-md-12 col-6">
            <div className="top-bar-left d-flex align-items-center">
              <span className="text">
                Welcome to Agriculture &amp; Organic Food Template
              </span>
              <span className="lang-dropdown">
                <select className="wide">
                  <option value={1}>English</option>
                  <option value={2}>French</option>
                </select>
              </span>
            </div>
          </div>
          <div className="col-xl-6 col-lg-12 col-md-12 col-6">
            <div className="top-bar-right">
              <span className="text">
                <i className="far fa-clock" />
                Opening Hours : Sunday- Friday, 08:00 am - 05:00pm
              </span>
              <ul className="social-link">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-youtube" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="header-middle">
      <div className="container-1350">
        <div className="row align-items-center">
          <div className="col-xl-4 d-xl-block d-lg-none">
            <div className="site-branding d-lg-block d-none">
              <Link href="/">
                <a className="brand-logo">
                  <img src="assets/images/logo/logo-1.png" alt="Site Logo" />
                </a>
              </Link>
            </div>
          </div>
          <div className="col-xl-8 col-lg-12">
            <div className="contact-information">
              <div className="information-item_one d-flex">
                <div className="icon">
                  <i className="flaticon-placeholder" />
                </div>
                <div className="info">
                  <h5 className="mb-1">Locations</h5>
                  <p>55 Main Street, New York</p>
                </div>
              </div>
              <div className="information-item_one d-flex">
                <div className="icon">
                  <i className="flaticon-email" />
                </div>
                <div className="info">
                  <h5 className="mb-1">Email Us</h5>
                  <p>
                    <a href="mailto:hotlineinfo@gmial.com">
                      hotlineinfo@gmial.com
                    </a>
                  </p>
                </div>
              </div>
             
              <div className="button text-md-right text-sm-center">
                <Link href="/Auth">
                  <a className="main-btn btn-yellow">Login/Profile</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="header-navigation navigation-one">
      <div className="nav-overlay" />
      <div className="container-1350">
        <div className="primary-menu">
          <div className="site-branding">
            <Link href="/">
              <a className="brand-logo">
                <img src="assets/images/logo/logo-1.png" alt="Site Logo" />
              </a>
            </Link>
          </div>
          <div className="nav-inner-menu">
            <div className="nav-menu">
              {/*=== Mobile Logo ===*/}
              <div className="mobile-logo mb-30 d-block d-xl-none text-center">
                <Link href="/">
                  <a className="brand-logo">
                    <img src="assets/images/logo/logo-1.png" alt="Site Logo" />
                  </a>
                </Link>
              </div>
              {/*=== Main Menu ===*/}
              <Menu />
              <MobileHeader />
            </div>
            {/*=== Nav Right Item ===*/}
            <div className="nav-right-item">
              <div className="navbar-toggler">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const Header2 = () => (
  <header className="header-area">
    <div className="header-top-bar top-bar-one dark-black-bg">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-12 col-md-12 col-6">
            <div className="top-bar-left d-flex align-items-center">
              <span className="text">
                Welcome to Agriculture &amp; Organic Food Template
              </span>
              <span className="lang-dropdown">
                <select className="wide">
                  <option value={1}>English</option>
                  <option value={2}>French</option>
                </select>
              </span>
            </div>
          </div>
          <div className="col-xl-6 col-lg-12 col-md-12 col-6">
            <div className="top-bar-right">
              <span className="text">
                <i className="far fa-clock" />
                Opening Hours : Sunday- Friday, 08:00 am - 05:00pm
              </span>
              <ul className="social-link">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-youtube" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="header-navigation navigation-two">
      <div className="nav-overlay" />
      <div className="container-fluid">
        <div className="primary-menu">
          <div className="site-branding">
            <Link href="/">
              <a className="brand-logo">
                <img src="assets/images/logo/logo-1.png" alt="Site Logo" />
              </a>
            </Link>
          </div>
          <div className="nav-inner-menu">
            <div className="nav-menu">
              {/*=== Mobile Logo ===*/}
              <div className="mobile-logo mb-30 d-block d-xl-none text-center">
                <Link href="/">
                  <a className="brand-logo">
                    <img src="assets/images/logo/logo-1.png" alt="Site Logo" />
                  </a>
                </Link>
              </div>
              {/*=== Navbar Call Button ===*/}
              <div className="call-button text-center">
                <span>
                  <i className="far fa-phone" />
                  <a href="tel:+012(345)678">+012 (345) 678</a>
                </span>
              </div>
              {/*=== Main Menu ===*/}
              <Menu />
              <MobileHeader />
              {/*=== Navbar Menu Button ===*/}
              <div className="menu-button">
                <Link href="/contact">
                  <a className="main-btn btn-yellow">Get a Quote</a>
                </Link>
              </div>
            </div>
            {/*=== nav Right Item ===*/}
            <div className="nav-right-item d-flex align-items-center">
              <div className="call-button">
                <span>
                  <i className="far fa-phone" />
                  <a href="tel:+012(345)678">+012 (345) 678</a>
                </span>
              </div>
              <div className="menu-button">
                <Link href="/contact">
                  <a className="main-btn btn-yellow">Get a Quote</a>
                </Link>
              </div>
              <div className="navbar-toggler">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const Header3 = ({ overlayPanel, togglePanel }) => (
  <Fragment>
    <OffcanvasPanel overlyPanel={overlayPanel} togglePanel={togglePanel} />
    <header className="header-area">
      {/* Header Navigation */}
      <div className="header-navigation navigation-three">
        <div className="nav-overlay" />
        <div className="container-fluid">
          <div className="primary-menu">
            {/* Site Branding */}
            <div className="site-branding">
              <Link href="/">
                <a className="brand-logo">
                  <img src="assets/images/logo/logo-3.png" alt="Site Logo" />
                </a>
              </Link>
              <Link href="/">
                <a className="sticky-logo">
                  <img src="assets/images/logo/logo-1.png" alt="Site Logo" />
                </a>
              </Link>
            </div>
            {/* Nav inner Menu */}
            <div className="nav-inner-menu">
              {/* Nav Menu */}
              <div className="nav-menu">
                {/*=== Mobile Logo ===*/}
                <div className="mobile-logo mb-30 d-block d-xl-none text-center">
                  <Link href="/">
                    <a className="brand-logo">
                      <img
                        src="assets/images/logo/logo-1.png"
                        alt="Site Logo"
                      />
                    </a>
                  </Link>
                </div>
                {/*=== Navbar Call Button ===*/}
                <div className="call-button text-center">
                  <span>
                    <i className="far fa-phone" />
                    <a href="tel:+012(345)678">+012 (345) 678</a>
                  </span>
                </div>
                {/*=== Main Menu ===*/}
                <Menu />
                <MobileHeader />
                {/*=== Navbar Menu Button ===*/}
                <div className="menu-button">
                  <Link href="/contact">
                    <a className="main-btn btn-yellow">Get a Quote</a>
                  </Link>
                </div>
              </div>
              {/*=== Nav Right Item ===*/}
              <div className="nav-right-item d-flex align-items-center">
                <div className="call-button">
                  <span>
                    <i className="far fa-phone" />
                    <a href="tel:+012(345)678">+012 (345) 678</a>
                  </span>
                </div>
                <div className="menu-button">
                  <Link href="/contact">
                    <a className="main-btn btn-yellow">Get a Quote</a>
                  </Link>
                </div>
                <div className="bar-item">
                  <a className="c-pointer" onClick={() => togglePanel()}>
                    <img src="assets/images/bar.png" alt="" />
                  </a>
                </div>
                <div className="navbar-toggler">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </Fragment>
);

const Header4 = ({ overlayPanel, togglePanel }) => (
  <Fragment>
    <OffcanvasPanel overlyPanel={overlayPanel} togglePanel={togglePanel} />
    <header className="header-area">
      <div className="header-top-bar top-bar-two dark-black-bg">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-12 col-md-12 col-6">
              <div className="top-bar-left d-flex align-items-center">
                <span className="lang-dropdown">
                  <select className="wide">
                    <option value={1}>English</option>
                    <option value={2}>French</option>
                  </select>
                </span>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 col-6">
              <div className="top-bar-right">
                <span className="text">
                  <i className="far fa-clock" />
                  Opening Hours : Sunday- Friday, 08:00 am - 05:00pm
                </span>
                <ul className="social-link">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-navigation navigation-four">
        <div className="nav-overlay" />
        <div className="container-fluid">
          <div className="primary-menu">
            <div className="site-branding">
              <Link href="/">
                <a className="brand-logo">
                  <img src="assets/images/logo/logo-3.png" alt="Site Logo" />
                </a>
              </Link>
              <Link href="/index-4">
                <a className="sticky-logo">
                  <img src="assets/images/logo/logo-2.png" alt="Site Logo" />
                </a>
              </Link>
            </div>
            <div className="nav-inner-menu">
              <div className="bar-item">
                <a className="c-pointer" onClick={() => togglePanel()}>
                  <img src="assets/images/bar-2.png" alt="" />
                </a>
              </div>
              <div className="nav-menu">
                {/*=== Mobile Logo ===*/}
                <div className="mobile-logo mb-30 d-block d-xl-none text-center">
                  <Link href="/">
                    <a className="brand-logo">
                      <img
                        src="assets/images/logo/logo-1.png"
                        alt="Site Logo"
                      />
                    </a>
                  </Link>
                </div>
                {/*=== Navbar Call Button ===*/}
                <div className="call-button text-center">
                  <span>
                    <i className="far fa-phone" />
                    <a href="tel:+012(345)678">+012 (345) 678</a>
                  </span>
                </div>
                {/*=== Main Menu ===*/}
                <Menu />
                <MobileHeader />
                {/*=== Navbar Menu Button ===*/}
                <div className="menu-button">
                  <Link href="/contact">
                    <a className="main-btn bordered-btn">Get a Quote</a>
                  </Link>
                </div>
              </div>
              {/*=== Nav Right Item ===*/}
              <div className="nav-right-item d-flex align-items-center">
                <div className="call-button">
                  <span>
                    <i className="far fa-phone" />
                    <a href="tel:+012(345)678">+012 (345) 678</a>
                  </span>
                </div>
                <div className="menu-button">
                  <Link href="/contact">
                    <a className="main-btn bordered-btn bordered-yellow">
                      Get a Quote
                    </a>
                  </Link>
                </div>
                <div className="navbar-toggler">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </Fragment>
);


const DefaultHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

const dropdownImage = {
  backgroundImage: `url('../assets/images/users/user2.jpg')`,
  backgroundSize: 'cover', // change to 'cover' to fit the image within the toggle
  backgroundPosition: 'center', // center the image horizontally and vertically
  height: '40px',
  width: '40px',
  display: 'flex', // align the content of the toggle vertically
  alignItems: 'center',
  justifyContent: 'center',
};

const router = useRouter()

function logout(){
  localStorage.removeItem('profile')
  localStorage.removeItem('token')
  router.push("/")
}



  // 
  const [connectedUser, setConnectedUser] = useState(null);
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
    
  }, []);
  async function  updateProfile(){
await router.push(`/User/${connectedUser?._id}`)
  }
  async function  Profile(){
    await router.push(`/Profile`)
      }
      const cart =useSelector( (state)=>state.cart )
      const {cartItems}=cart;
  return (

  <header className="header-area">
    <div className="header-top-bar top-bar-one dark-black-bg">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-12 col-md-12 col-6">
            <div className="top-bar-left d-flex align-items-center">
              <span className="text">
                Welcome to Agriculture &amp; Organic Food Template
              </span>
              <span className="lang-dropdown">
                <select className="wide">
                  <option value={1}>English</option>
                  <option value={2}>French</option>
                </select>
              </span>
            </div>
          </div>
          <div className="col-xl-6 col-lg-12 col-md-12 col-6">
            <div className="top-bar-right">
              <span className="text">
                <i className="far fa-clock" />
                Opening Hours : Sunday- Friday, 08:00 am - 05:00pm
              </span>
              <ul className="social-link">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-youtube" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Header Navigation */}
    <div className="header-navigation navigation-three">
      <div className="nav-overlay" />
      <div className="container-fluid">
        <div className="primary-menu">
          {/* Site Branding */}
          <div className="site-branding">
            <Link href="/">
              <a className="brand-logo">
                <img src="assets/images/logo/logo-3.png" alt="Site Logo" />
              </a>
            </Link>
            <Link href="/">
              <a className="sticky-logo">
                <img src="assets/images/logo/logo-1.png" alt="Site Logo" />
              </a>
            </Link>
          </div>
          {/* Nav inner Menu */}
          <div className="nav-inner-menu">
            {/* Nav Menu */}
            <div className="nav-menu">
              {/*=== Mobile Logo ===*/}
              <div className="mobile-logo mb-30 d-block d-xl-none text-center">
                <Link href="/">
                  <a className="brand-logo">
                    <img src="assets/images/logo/logo-1.png" alt="Site Logo" />
                  </a>
                </Link>
              </div>
              {/*=== Navbar Call Button ===*/}
              <div className="call-button text-center">
                <span>
                  <i className="far fa-phone" />
                  <a href="tel:+012(345)678">+012 (345) 678</a>
                </span>
              </div>
              {/*=== Main Menu ===*/}
              <Menu />
              <MobileHeader />
              {/*=== Navbar Menu Button ===*/}
              <div className="menu-button">
                <Link href="/contact">
                  <a className="main-btn btn-yellow">Get a Quote</a>
                </Link>
              </div>
            </div>
            {/*=== Nav Right Item ===*/}
            <div className="nav-right-item d-flex align-items-center">
              <div className="call-button">
                <span>
                  <i className="far fa-phone" />
                  <a href="tel:+012(345)678">+012 (345) 678</a>
                </span>
              </div>
              <div className="menu-button">
                
                <Link href="/Message">
                  <a className="main-btn btn-yellow">Message</a>
                </Link>
              </div>
              {connectedUser && connectedUser.role !== "supplier" &&
                  <div style={{margin: "15px"}}>
                    <a href="/Cart/Cart" style={{position: "relative", display: "inline-block"}}>
                      <i className="fas fa-shopping-bag" style={{fontSize: "2em", color: "#333"}}></i>
                      <span style={{
                        position: "absolute",
                        top: "0",
                        right: "-10px",
                        backgroundColor: "#f44336",
                        borderRadius: "50%",
                        color: "#fff",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "0.8em"
                      }}>{cartItems.length}</span>
                    </a>
                  </div>
              }


              <Dropdown >
      <Dropdown.Toggle style={dropdownImage}  >
      
      </Dropdown.Toggle>
      <Dropdown.Menu>
      <Dropdown.Item onClick={updateProfile}>Update Profile</Dropdown.Item>
      <Dropdown.Item onClick={Profile}>Your Profile</Dropdown.Item>
        <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>


              <div className="navbar-toggler">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);
  }
const Menu = () => (
  <nav className="main-menu d-none d-xl-block">
    <ul>
      <li className="menu-item has-children">
        <a href="#" className="active">
          Home
        </a>
        <ul className="sub-menu">
          <li>
            <Link href="/">Home Agriculture</Link>
          </li>
          <li>
            <Link href="/index-2">Home Organic Food</Link>
          </li>
          <li>
            <Link href="/index-3">Home Farming</Link>
          </li>
          <li>
            <Link href="/index-4">Home Dairy Farm</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      {/* <li className="menu-item has-children">
        <a href="#">Farms</a>
        <ul className="sub-menu">
        
          <li>
            <Link href="/farms">My farm</Link>
          </li>
        
        </ul>
      </li> */}
      <li className="menu-item has-children">
        <a href="#">Portfolio</a>
        <ul className="sub-menu">
          <li>
            <Link href="portfolio-grid">Portfolio Grid</Link>
          </li>
          <li>
            <Link href="portfolio-full-width">Portfolio Full Width</Link>
          </li>
          <li>
            <Link href="portfolio-details">Portfolio Details</Link>
          </li>
        </ul>
      </li>




      <li className="menu-item has-children">
        <a href="#">Shop</a>
        <ul className="sub-menu">
          <li>
            <Link href="/ProductsLeftBar">Our Products</Link>

          </li>

          <li>
            <Link href="/Placeorder">placeOrder</Link>

          </li>
          <li>
            <Link href="/Cart/[id]" as="/Cart/123">
              <a>View Cart</a>
            </Link>

          </li>



        </ul>
      </li>


      <li className="menu-item has-children">
        <a href="#">Shop</a>
        <ul className="sub-menu">
          <li>
            <Link href="/Products">Our Products</Link>

          </li>

          <li>
            <Link href="/Placeorder">placeOrder</Link>

          </li>
          <li>
          <Link href="/Cart/[id]" as="/Cart/123">
  <a>View Cart</a>
</Link>

          </li>
          <li>
          <Link href="/Cart/Cart2/Panier">
        <a>888888888</a>
      </Link>
          </li>

          <li>
            <Link href="ProductsLeftBar">Product Left Sidebar</Link>
          </li>
          <li>
            <Link href="products-right-sidebar">Product Right Sidebar</Link>
          </li>
          <li>
             <Link href="product-details">Product Details</Link>
            {/* <Link href="/product-details/[productID]" as={`/product-details/${productID}`}>
  Product Details2
</Link> */}
          </li>
          <li>
            <Link href="cart">Cart</Link>
          </li>
          <li>
            <Link href="Checkout">Checkout</Link>
          </li>
          <li>
            <Link href="/Shipping">Shipping</Link>
          </li>
        </ul>
      </li>

      <li className="menu-item has-children">
        <a href="#">Users</a>
        <ul className="sub-menu">
         
          <li>
            <Link href="listUsers">Liste Des utilisateurs(Test) </Link>
          </li>
        </ul>
      </li>
      <li className="menu-item has-children">
        <a href="#">Blog</a>
        <ul className="sub-menu">
          <li>
            <Link href="blog-standard">Blog Standard</Link>
          </li>
          <li>
            <Link href="blog-details">Blog Details</Link>
          </li>
        </ul>
      </li>
      {/* <li className="menu-item has-children">
        <a href="#">Pages</a>
        <ul className="sub-menu">
          <li>
            <Link href="farmers">Our Farmers</Link>
          </li>
          <li>
            <Link href="faqs">Faq</Link>
          </li>
          <li>
            <Link href="contact">Contact</Link>
          </li>
        </ul>
      </li> */}

{/* <li>
<Link href="/User/listUsers">list users (test)</Link>
</li> */}

    </ul>
  </nav>
);
