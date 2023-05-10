import Link from "next/link";
import React, { useState } from "react";
import io from "socket.io-client";

import { Fragment, useEffect } from "react";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from "reactstrap";
import useWindowSize from "../useWindowSize";
import { stickyNav } from "../utils";
import MobileHeader from "./MobileHeader";
import OffcanvasPanel from "./OffcanvasPanel";
import { image } from "../assets/images/users/user2.jpg";
import { Badge, ListGroup, Row, Col } from "react-bootstrap";

import Dropdown from "react-bootstrap/Dropdown";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Pusher from 'pusher-js';
import {get} from "local-storage";
import {listMyOrders} from "../../Redux/Actions/OrderActions";

// Initialize a new Pusher client

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



  const socket = io.connect("http://localhost:5002");
  socket.on("connect", () => {
  });
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const dropdownImage = {
    backgroundImage: `url('../assets/images/users/user2.jpg')`,
    backgroundSize: "cover", // change to 'cover' to fit the image within the toggle
    backgroundPosition: "center", // center the image horizontally and vertically
    height: "40px",
    width: "40px",
    display: "flex", // align the content of the toggle vertically
    alignItems: "center",
    justifyContent: "center",
  };
  const [notifications, setNotifications] = useState([]);
  const [unreadNotif, setUnreadNotif] = useState(null);

  const router = useRouter();

  function logout() {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    router.push("/");
  }

  //
  const [connectedUser, setConnectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState([]);



  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    setConnectedUser(profile);

    async function fetchMessages() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/lastMessagess/" + profile?._id
        );
        const data = await response.json();

        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMessages();

    fetch("http://localhost:5000/api/users/unreadmsg/" + profile?._id)
      .then((response) => response.json())
      .then((data) => {
        setUnreadCount(data.unreadCount);
      })
      .catch((error) => console.error(error));

      fetch('http://localhost:5000/api/users/asread/'+profile?._id)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));  
    

    async function fetchNotifications() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/getnotif/" + profile?._id
        );
        const data = await response.json();

        setNotifications(data.notifications);
        console.log ('haha');
        console.log(data.notifications);
        setUnreadNotif(data.unreadCount);
      } catch (error) {
        console.error(error);
      }
    }
    fetchNotifications();

  }, []);

  useEffect(() => {
    const pusher = new Pusher('d43e0468f172059cd0f7', {
      cluster: 'eu',
      encrypted: true
    });
    const channel = pusher.subscribe('croptek-development');
    
    // Bind a function to handle new notifications
    channel.bind('new-notification', function(data) {
    //  console.log('Received new notification:', data);
      if (data.recipients.some(recipient => recipient.userId === connectedUser._id)){
      setNotifications([ data,...notifications]);
     // console.log(notifications);
    
      setUnreadNotif(unreadNotif + 1);
    }
    });

    // Unsubscribe from Pusher channel when component unmounts
    return () => {
      channel.unbind('new-notification');
      pusher.unsubscribe('croptek-development');
    };
  }, [notifications, unreadCount]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handlereadnotif= (e) => {
    setShowDropdown(!showDropdown);

  e.preventDefault();
  fetch('http://localhost:5000/api/users/readnotif/'+connectedUser?._id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ read: true })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }
    setUnreadNotif(0);

  })
  .catch(error => console.error(error));
  
  };

  useEffect(() => {
  
    const handleUserMsg = (incomingUser) => {
      const isProfileInConversation =
        incomingUser[0].from === connectedUser?._id ||
        incomingUser[0].to === connectedUser?._id;
  
      if (isProfileInConversation) {
        const existingConversation = messages.find(
          (user) =>
            (user.from === incomingUser[0].from &&
              user.to === incomingUser[0].to) ||
            (user.from === incomingUser[0].to &&
              user.to === incomingUser[0].from)
        );
        if (existingConversation) {

          if (connectedUser?._id===incomingUser[0].to){ setUnreadCount(unreadCount+1)}
         

          const updatedUsers = [
            {
              ...existingConversation,
              text: incomingUser[0].text,
              to: incomingUser[0].to,
              from: incomingUser[0].from,
              read: false,
              createdAt: incomingUser[0].createdAt,
            },
            ...messages.filter((user) => user._id !== existingConversation._id),
          ];
          setMessages(updatedUsers);
        } else {
          setMessages((prevUsers) => [incomingUser[0], ...prevUsers]);
        }
      }
    };
  
    socket.on("userMsg", handleUserMsg);
  
    return () => {
      socket.off("userMsg", handleUserMsg);
    };
  }, [socket]);

  const getTimeDiff = (createdAt) => {
    const diffMs = Date.now() - new Date(createdAt).getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.round(diffMs / (1000 * 60 * 60 * 24 * 30));
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
    } else {
      return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
    }
  };
  

  
  

  async function updateProfile() {
    await router.push(`/User/${connectedUser?._id}`);
  }
  async function Messages() {
    await router.push(`/Message`);
  }
  async function Profile() {
    await router.push(`/Profile`);
  }
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dropdownImages = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: `http://localhost:5000/api/users/file/${connectedUser?._id}`,

    backgroundSize: "cover",
    cursor: "pointer",
  };
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

                {connectedUser && connectedUser.role !== "supplier" && (
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      marginRight: "7px",
                    }}
                  >
                    <a href="/Cart/Cart">
                      <i
                        className="fas fa-shopping-bag"
                        style={{
                          fontSize: "1.5rem",
                          color: "#333",
                          padding: "0px 8px",
                        }}
                      ></i>
                      <span
                        style={{
                          position: "absolute",
                          top: "-4px",
                          right: "1px",
                          backgroundColor: "#eece38",
                          borderRadius: "50%",
                          color: "#fff",
                          padding: "1px 4px",
                          fontSize: "0.6em",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "18px",
                          width: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        {cartItems.length}
                      </span>
                    </a>
                  </div>
                )}
{connectedUser && (
  <>
                <Dropdown>
                  <Dropdown.Toggle variant="transparent" id="message-dropdown">
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <Badge
                        variant="primary"
                        style={{
                          backgroundColor: "#eece38",
                          position: "absolute",
                          top: "5px",
                          right: "1px",
                          padding: "4px 5px",
                          borderRadius: "50%",
                          fontSize: "0.6rem",
                        }}
                      >
                        {unreadCount}
                      </Badge>
                      <i
                        className="bi bi-envelope-fill"
                        style={{ fontSize: "1.5rem", padding: "5px" }}
                      ></i>
                    </div>
                    <style>
                      {`
      #message-dropdown::after {
        content: none;
        pointer-events: none;
      }
    `}
                    </style>
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="right" style={{ minWidth: "25rem" }}>
                    <ListGroup
                      variant="flush"
                      style={{
                        maxHeight: "15rem",
                        overflowY: "auto",
                        paddingRight: "8px",
                        paddingBottom: "2.7rem",
                      }}
                    >
                      <style>
                        {`
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background-color: #f5f5f5;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: #aaa;
      }
      .message:hover {
        background-color: #eee;
        cursor: pointer;
      }
      .not-read {
        background-color: #eee;
      }
      a:hover{
        color: #aaa;
      }
    `}
                      </style>
                      {messages.length === 0 && (
                          <div>No messages found</div>
                      )}
                      {messages && messages.map((message) => (
                        <ListGroup.Item
                          key={message.id}
                          className={
                            message.read
                              ? "message"
                              : connectedUser._id === message.to
                              ? "not-read message"
                              : "message"
                          }
                        >
                        <Link href={`/Message?id=${connectedUser._id === message.from ? message.to : message.from}`}>

                          <Row>
                            <Col md={3}>
                              <img
                                src={`http://localhost:5000/api/users/file/${message?._id}`}
                                alt="Sender"
                                style={{
                                  height: "3rem",
                                  width: "3rem",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            </Col>
                            <Col md={9} style={{ paddingLeft: "0px" }}>
                              <div style={{ fontWeight: "bold" }}>
                                {message.user[0].name} {message.user[0].surname}
                              </div>
                              <div>
  {connectedUser._id === message.from
    ? `Vous: ${message.text.slice(0, 20)}`
    : message.text.slice(0, 20)}
  {message.text.length > 20 && "..."}
</div>
                              {message.read && (
                                <div
                                  style={{
                                    fontSize: "0.8rem",
                                    color: "#999",
                                    position: "absolute",
                                    top: "0",
                                    right: "0",
                                  }}
                                >
                             
                                </div>
                              )}
                              <div
                                style={{
                                  fontSize: "0.8rem",
                                  color: "#999",
                                  position: "absolute",
                                  top: "0",
                                  right:  "10px",
                                }}
                              >
                               {getTimeDiff(message?.createdAt)}
                              </div>
                            </Col>
                          </Row></Link>
                        </ListGroup.Item>
                      ))}

                      <ListGroup.Item
                        style={{
                          position: "absolute",
                          bottom: "0",
                          left: "0",
                          right: "0",
                          textAlign: "center",
                          borderTop: "1px solid #dee2e6",
                        }}
                      >
                        <a style={{ cursor: "pointer" }} onClick={Messages}>
                          See All Messages
                        </a>
                      </ListGroup.Item>
                    </ListGroup>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown show={showDropdown} onToggle={setShowDropdown}>
                  <Dropdown.Toggle
                    variant="transparent"
                    id="notification-dropdown"
                    style={{ border: "none" }}
                    onClick={handlereadnotif}
                  >
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <Badge
                        variant="danger"
                        style={{
                          backgroundColor: "#eece38",
                          position: "absolute",
                          top: "5px",
                          right: "1px",
                          padding: "4px 5px",
                          borderRadius: "50%",
                          fontSize: "0.6rem",
                        }}
                      >
                        {unreadNotif}
                      </Badge>
                      <i
                        className="bi bi-bell-fill"
                        style={{ fontSize: "1.5rem", padding: "5px" }}
                      ></i>
                    </div>
                    <style>
                      {`
      #notification-dropdown::after {
        content: none;
        pointer-events: none;
        
      }
    `}
                    </style>
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="right" style={{ minWidth: "25rem" }}>
                    <ListGroup
                      variant="flush"
                      style={{
                        maxHeight: "15rem",
                        overflowY: "auto",
                        paddingRight: "8px",
                        
                      }}
                    >
                      <style>
                        {`
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background-color: #f5f5f5;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #ccc;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: #aaa;
          }

          .notification:hover {
            background-color: #eee;
           
          }
          .not-read {
            background-color: #eee;
          }
          a:hover{
            color: #aaa;
          }
          
     
        `}
                      </style>
                      {notifications.length ? (
                          notifications.map((notification, index) => (
                              <ListGroup.Item
                                  className={
                                    notification.recipients.find(
                                        (recipient) => recipient.userId === connectedUser._id
                                    ).read ? "notification" : "not-read notification"
                                  }
                                  key={notification.id}
                              >
                                <Row>
                                  <Col md={2}>
                                  </Col>
                                  <Col md={9} style={{ paddingLeft: "0px" }}>
                                    <div style={{ fontWeight: "bold" }}>
                                      {notification.title}
                                    </div>
                                    <div>{notification.body}</div>
                                    <div
                                        style={{
                                          fontSize: "0.8rem",
                                          color: "#999",
                                          position: "absolute",
                                          top: "0",
                                          right: "0",
                                        }}
                                    >
                                      {getTimeDiff(notification?.createdAt)}
                                    </div>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                          ))
                      ) : (
                          <div>No notifications</div>
                      )}
                      {/*{notifications.map((notification, index) => (*/}
                      {/*  <ListGroup.Item*/}
                      {/*  className={*/}
                      {/*    notification.recipients.find(*/}
                      {/*      (recipient) => recipient.userId === connectedUser._id*/}
                      {/*    ).read ? "notification" : "not-read notification"*/}
                      {/*  }*/}
                      {/*  */}
                      {/*    key={notification.id}*/}
                      {/*  >*/}
                      {/*    <Row>*/}
                      {/*    <Col md={2}>*/}
                      {/*  */}
                      {/*      </Col>*/}
                      {/*      <Col md={9} style={{ paddingLeft: "0px" }}>*/}
                      {/*        <div style={{ fontWeight: "bold" }}>*/}
                      {/*          {notification.title}*/}
                      {/*        </div>*/}
                      {/*        <div>{notification.body}</div>*/}
                      {/*        <div*/}
                      {/*          style={{*/}
                      {/*            fontSize: "0.8rem",*/}
                      {/*            color: "#999",*/}
                      {/*            position: "absolute",*/}
                      {/*            top: "0",*/}
                      {/*            right: "0",*/}
                      {/*          }}*/}
                      {/*        >*/}
                      {/*         {getTimeDiff(notification?.createdAt)}*/}
                      {/*        </div>*/}
                      {/*      </Col>*/}
                      {/*    </Row>*/}
                      {/*  </ListGroup.Item>*/}
                      {/*))}*/}
                    
                    </ListGroup>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                  <Dropdown.Toggle
                    style={{ border: "none" }}
                    variant="transparent"
                    id="dropdown-basic"
                  >
                    <img
                      src={`http://localhost:5000/api/users/file/${connectedUser?._id}`}
                      alt="Profile"
                      style={dropdownImages}
                    />
                    <style>
                      {`
      #dropdown-basic::after {
        content: none;
        pointer-events: none;
        
      }
    `}
                    </style>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={updateProfile}>
                      Update Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={Profile}>
                      Your Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </>   ) }
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
};
const Menu = () =>{
  const [connectedUser, setConnectedUser] = useState(null);
  //const profile = JSON.parse(localStorage.getItem('profile'));
  const profile = get('profile');


  console.log("**************************")
  console.log(profile)

  useEffect(() => {
    setConnectedUser(profile);

  }, []);
  return (
      <>
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
      {/*<li className="menu-item has-children">*/}
      {/*  <a href="#">Portfolio</a>*/}
      {/*  <ul className="sub-menu">*/}
      {/*    <li>*/}
      {/*      <Link href="portfolio-grid">Portfolio Grid</Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link href="portfolio-full-width">Portfolio Full Width</Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link href="portfolio-details">Portfolio Details</Link>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</li>*/}
      {connectedUser && connectedUser.role == "farmer" &&
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
      }
     {connectedUser && connectedUser.role =="farmer" &&
      <li className="menu-item has-children">
        <a href="#">Farms</a>
        <ul className="sub-menu">
          <li>
            <Link href="/farms">My Farms</Link>
          </li>

          <li>
            <Link href="/farmInfo">Growing Plants</Link>
          </li>

          <li>
            <Link href="/cropPrediction">Soil Analyse</Link>
          </li>

          <li>
            <Link href="/disease">Diseases</Link>
          </li>

        </ul>
      </li>
}
{!connectedUser && (
  <li>
  <Link href="/listFarms">Farms</Link>
</li>
)}











{/*      <li className="menu-item has-children">*/}
{/*        <a href="#">Shop</a>*/}
{/*        <ul className="sub-menu">*/}
{/*          <li>*/}
{/*            <Link href="/Products">Our Products</Link>*/}

{/*          </li>*/}

{/*          <li>*/}
{/*            <Link href="/Placeorder">placeOrder</Link>*/}

{/*          </li>*/}
{/*          <li>*/}
{/*          <Link href="/Cart/[id]" as="/Cart/123">*/}
{/*  <a>View Cart</a>*/}
{/*</Link>*/}

{/*          </li>*/}
{/*          <li>*/}
{/*          <Link href="/Cart/Cart2/Panier">*/}
{/*        <a>888888888</a>*/}
{/*      </Link>*/}
{/*          </li>*/}

{/*          <li>*/}
{/*            <Link href="ProductsLeftBar">Product Left Sidebar</Link>*/}
{/*          </li>*/}
{/*          <li>*/}
{/*            <Link href="products-right-sidebar">Product Right Sidebar</Link>*/}
{/*          </li>*/}
{/*          <li>*/}
{/*             <Link href="product-details">Product Details</Link>*/}
{/*            /!* <Link href="/product-details/[productID]" as={`/product-details/${productID}`}>*/}
{/*  Product Details2*/}
{/*</Link> *!/*/}
{/*          </li>*/}
{/*          <li>*/}
{/*            <Link href="cart">Cart</Link>*/}
{/*          </li>*/}
{/*          <li>*/}
{/*            <Link href="Checkout">Checkout</Link>*/}
{/*          </li>*/}
{/*          <li>*/}
{/*            <Link href="/Shipping">Shipping</Link>*/}
{/*          </li>*/}
{/*        </ul>*/}
{/*      </li>*/}

      {/*<li className="menu-item has-children">*/}
      {/*  <a href="#">Users</a>*/}
      {/*  <ul className="sub-menu">*/}
      {/*   */}
      {/*    <li>*/}
      {/*      <Link href="listUsers">Liste Des utilisateurs(Test) </Link>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</li>*/}
      {/*<li className="menu-item has-children">*/}
      {/*  <a href="#">Blog</a>*/}
      {/*  <ul className="sub-menu">*/}
      {/*    <li>*/}
      {/*      <Link href="blog-standard">Blog Standard</Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link href="blog-details">Blog Details</Link>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</li>*/}
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
  </nav></>
)};
