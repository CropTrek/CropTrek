import Link from "next/link";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import Slider from "react-slick";
import OrgariumAcc from "../src/components/OrgariumAcc";
import Hero4Slider from "../src/components/sliders/Hero4Slider";
import Layout from "../src/layouts/Layout";
import {
  logoSlider,
  projectsSliderThree,
  recentProductSlider,
  testimonialSliderFive,
} from "../src/sliderProps";
const Index4 = () => {
  const [active, setActive] = useState("collapse0");
  return (
    <Layout header={4} footer={4}>
      <Hero4Slider />
      {/*====== End Hero Section ======*/}
      {/*====== Start About Section ======*/}
      <section className="about-section-two p-r z-1">
        <div className="container">
          <div className="about-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="about-five_image-box mb-40 wow fadeInLeft">
                  <img src="assets/images/about/img-3.jpg" alt="About Image" />
                </div>
              </div>
              <div className="col-lg-7">
                <div className="about-content-box content-box-gap pl-lg-60 pr-lg-70 mb-40 wow fadeInRight">
                  <div className="section-title section-title-left mb-35">
                    <span className="sub-title">About Us</span>
                    <h2>We’re Best Dairy Milk Provider Farms</h2>
                  </div>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam eaque quae abillo inventore veritatis et quasi
                    architecto beatae vitae dicta sunt explicabo enim ipsam
                    voluptatem quia{" "}
                  </p>
                  <div className="avatar-box d-flex align-items-center">
                    <div className="thumb mr-20">
                      <img src="assets/images/user-1.jpg" alt="Admin Thumb" />
                    </div>
                    <div className="content">
                      <img src="assets/images/sign-1.png" alt="Sign" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End About Section ======*/}
      {/*====== Start Category Section ======*/}
      <section className="category-section pt-90">
        <div className="container">
          <div className="category-wrapper">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-10">
                <div className="section-title text-center mb-50 wow fadeInDown">
                  <span className="sub-title">Healthy Foods</span>
                  <h2>What We Provide For Your Better Health</h2>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="single-category-box text-center mb-40 wow fadeInUp">
                  <div className="icon">
                    <img src="assets/images/icon/icon-13.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/">
                        <a>Fresh Cows Meat and Milks</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="single-category-box text-center mb-40 wow fadeInDown">
                  <div className="icon">
                    <img src="assets/images/icon/icon-14.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/">
                        <a>Fresh Chicken Meats</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="single-category-box text-center mb-40 wow fadeInUp">
                  <div className="icon">
                    <img src="assets/images/icon/icon-15.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/">
                        <a>Fresh Duck Meat and Eggs</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="single-category-box text-center mb-40 wow fadeInDown">
                  <div className="icon">
                    <img src="assets/images/icon/icon-16.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/">
                        <a>Fresh Sheep Meat and Milks</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="single-category-box text-center mb-40 wow fadeInUp">
                  <div className="icon">
                    <img src="assets/images/icon/icon-17.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/">
                        <a>Fresh Cows Meat and Milks</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="single-category-box text-center mb-40 wow fadeInDown">
                  <div className="icon">
                    <img src="assets/images/icon/icon-18.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/">
                        <a>Fresh Goat Meat and Milks</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="single-category-box text-center mb-40 wow fadeInUp">
                  <div className="icon">
                    <img src="assets/images/icon/icon-19.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/">
                        <a>Fresh Pork Meat and Milks</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="single-category-box text-center mb-40 wow fadeInDown">
                  <div className="icon">
                    <img src="assets/images/icon/icon-20.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/">
                        <a>Fresh Hen Meat and Eggs</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Category Section ======*/}
      {/*====== Start Intro Section ======*/}
      <section
        className="intro-video-two bg_cover"
        style={{ backgroundImage: "url(assets/images/bg/intro-bg-3.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="play-content-box text-center">
                <a
                  href="https://www.youtube.com/watch?v=gOZ26jO6iXE"
                  className="video-popup"
                >
                  <i className="fas fa-play" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Intro Section ======*/}
      {/*====== Start Team Section ======*/}
      <section className="team-section pt-130">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xl-6 col-lg-8">
              <div className="section-title mb-60 wow fadeInLeft">
                <span className="sub-title">Our Farmers</span>
                <h2>We Have Lot’s Of Experience Team Members</h2>
              </div>
            </div>
            <div className="col-xl-6 col-lg-4">
              <div className="team-button float-lg-right mb-60 wow fadeInRight">
                <Link href="/farmers">
                  <a className="main-btn bordered-btn bordered-yellow">
                    Become a Member
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="team-member_two text-center mb-40 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/img-1.jpg" alt="Member Image" />
                  <div className="hover-overlay" />
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
                <div className="member-info">
                  <h3 className="title">
                    <Link href="/farmers">
                      <a>Dennis P. Russell</a>
                    </Link>
                  </h3>
                  <p className="position">Food Farmers</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="team-member_two text-center mb-40 wow fadeInDown">
                <div className="member-img">
                  <img src="assets/images/team/img-2.jpg" alt="Member Image" />
                  <div className="hover-overlay" />
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
                <div className="member-info">
                  <h3 className="title">
                    <Link href="/farmers">
                      <a>David M. Hower</a>
                    </Link>
                  </h3>
                  <p className="position">Food Farmers</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="team-member_two text-center mb-40 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/img-3.jpg" alt="Member Image" />
                  <div className="hover-overlay" />
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
                <div className="member-info">
                  <h3 className="title">
                    <Link href="/farmers">
                      <a>Richard M. Howell</a>
                    </Link>
                  </h3>
                  <p className="position">Food Farmers</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="team-member_two text-center mb-40 wow fadeInDown">
                <div className="member-img">
                  <img src="assets/images/team/img-4.jpg" alt="Member Image" />
                  <div className="hover-overlay" />
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
                <div className="member-info">
                  <h3 className="title">
                    <Link href="/farmers">
                      <a>Keneth R. Williams</a>
                    </Link>
                  </h3>
                  <p className="position">Food Farmers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Team Section ======*/}
      {/*====== Start Project Section ======*/}
      <section className="project-section pt-90">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInDown">
                <span className="sub-title">Project Gallery</span>
                <h2>
                  We’ve Done Many Other Projects Let’s See Gallery Insights
                </h2>
              </div>
            </div>
          </div>
          <Slider {...projectsSliderThree} className="projects-slider-three">
            <div className="project-item-four wow fadeInUp">
              <div className="img-holder">
                <img src="assets/images/portfolio/portfolio-1.jpg" alt="" />
                <div className="hover-portfolio">
                  <div className="icon-btn">
                    <Link href="/portfolio-details">
                      <a>
                        <i className="far fa-arrow-right" />
                      </a>
                    </Link>
                  </div>
                  <div className="hover-content">
                    <h3 className="title">
                      <Link href="/portfolio-details">
                        <a>Cow Eating Gress From Farms</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="project-item-four wow fadeInDown">
              <div className="img-holder">
                <img src="assets/images/portfolio/portfolio-2.jpg" alt="" />
                <div className="hover-portfolio">
                  <div className="icon-btn">
                    <Link href="/portfolio-details">
                      <a>
                        <i className="far fa-arrow-right" />
                      </a>
                    </Link>
                  </div>
                  <div className="hover-content">
                    <h3 className="title">
                      <Link href="/portfolio-details">
                        <a>Cow Eating Gress From Farms</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="project-item-four wow fadeInUp">
              <div className="img-holder">
                <img src="assets/images/portfolio/portfolio-3.jpg" alt="" />
                <div className="hover-portfolio">
                  <div className="icon-btn">
                    <Link href="/portfolio-details">
                      <a>
                        <i className="far fa-arrow-right" />
                      </a>
                    </Link>
                  </div>
                  <div className="hover-content">
                    <h3 className="title">
                      <Link href="/portfolio-details">
                        <a>Cow Eating Gress From Farms</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="project-item-four wow fadeInDown">
              <div className="img-holder">
                <img src="assets/images/portfolio/portfolio-4.jpg" alt="" />
                <div className="hover-portfolio">
                  <div className="icon-btn">
                    <Link href="/portfolio-details">
                      <a>
                        <i className="far fa-arrow-right" />
                      </a>
                    </Link>
                  </div>
                  <div className="hover-content">
                    <h3 className="title">
                      <Link href="/portfolio-details">
                        <a>Cow Eating Gress From Farms</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="project-item-four wow fadeInUp">
              <div className="img-holder">
                <img src="assets/images/portfolio/portfolio-5.jpg" alt="" />
                <div className="hover-portfolio">
                  <div className="icon-btn">
                    <Link href="/portfolio-details">
                      <a>
                        <i className="far fa-arrow-right" />
                      </a>
                    </Link>
                  </div>
                  <div className="hover-content">
                    <h3 className="title">
                      <Link href="/portfolio-details">
                        <a>Cow Eating Gress From Farms</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="project-item-four wow fadeInDown">
              <div className="img-holder">
                <img src="assets/images/portfolio/portfolio-3.jpg" alt="" />
                <div className="hover-portfolio">
                  <div className="icon-btn">
                    <Link href="/portfolio-details">
                      <a>
                        <i className="far fa-arrow-right" />
                      </a>
                    </Link>
                  </div>
                  <div className="hover-content">
                    <h3 className="title">
                      <Link href="/portfolio-details">
                        <a>Cow Eating Gress From Farms</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/*====== End Project Section ======*/}
      {/*====== Start Products Section ======*/}
      <section className="products-area pt-130 pb-170 p-r z-1">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xl-6 col-lg-8">
              <div className="section-title mb-60 wow fadeInLeft">
                <span className="sub-title">Popular Products</span>
                <h2>Some Fresh Cows Products Collection Our Shop</h2>
              </div>
            </div>
            <div className="col-xl-6 col-lg-4">
              <div className="product-button float-lg-right wow fadeInRight mb-60">
                <Link href="/products">
                  <a className="main-btn bordered-btn bordered-yellow">
                    View More Products
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <Slider {...recentProductSlider} className="recent-product-slider">
            <div className="single-product-item mb-40 wow fadeInDown">
              <div className="product-img">
                <img src="assets/images/products/img-10.png" alt="" />
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
                    <a>Organice Delicious Pomegranate</a>
                  </Link>
                </h3>
                <span className="price">
                  <span className="curreny">$</span>53.56
                </span>
              </div>
            </div>
            <div className="single-product-item mb-40 wow fadeInUp">
              <div className="product-img">
                <img src="assets/images/products/img-11.png" alt="" />
                <div className="pc-btn">Fish</div>
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
                    <a>100% Natural Fresh Sea Fish</a>
                  </Link>
                </h3>
                <span className="price">
                  <span className="curreny">$</span>53.56
                </span>
              </div>
            </div>
            <div className="single-product-item mb-40 wow fadeInDown">
              <div className="product-img">
                <img src="assets/images/products/img-12.png" alt="" />
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
                    <a>Organice Delicious Cutting Pear</a>
                  </Link>
                </h3>
                <span className="price">
                  <span className="curreny">$</span>53.56
                </span>
              </div>
            </div>
            <div className="single-product-item mb-40 wow fadeInUp">
              <div className="product-img">
                <img src="assets/images/products/img-13.png" alt="" />
                <div className="pc-btn">Vegetable</div>
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
                    <a>Organice Delicious Fresh Tomato</a>
                  </Link>
                </h3>
                <span className="price">
                  <span className="curreny">$</span>53.56
                </span>
              </div>
            </div>
            <div className="single-product-item mb-40 wow fadeInDown">
              <div className="product-img">
                <img src="assets/images/products/img-11.png" alt="" />
                <div className="pc-btn">Fish</div>
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
                    <a>100% Natural Fresh Sea Fish</a>
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
      {/*====== End Products Section ======*/}
      {/*====== Start CTA Section ======*/}
      <section className="cta-section">
        <div className="container-fluid">
          <div
            className="cta-wrap-two bg_cover pb-130"
            style={{ backgroundImage: "url(assets/images/bg/cta-bg-1.jpg)" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="cta-content-box wow fadeInDown">
                    <span className="tag-line">Get In Touch</span>
                    <h2>Need Organic Cow Milk &amp; Meats </h2>
                    <p>
                      Sed perspiciatis unde omnis iste natus voluptatem
                      accusantium doloremque laudantium totam reaperia inventore
                      veritatis et quasi architecto
                    </p>
                    <Link href="/farmers">
                      <a className="main-btn bordered-btn">Meet With Us</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End CTA Section ======*/}
      {/*====== Start Faq Section ======*/}
      <section className="faqs-section pt-130 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="faq-one_img-box mb-50">
                <img
                  src="assets/images/faq/faq-1.jpg"
                  className="faq-img-one wow fadeInUp"
                  alt="Faq Image"
                />
                <img
                  src="assets/images/faq/faq-2.jpg"
                  className="faq-img-two wow fadeInDown"
                  alt="Faq Image"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-one_content-box mb-50 pl-lg-70 wow fadeInRight">
                <div className="section-title mb-60">
                  <span className="sub-title">Why Choose Us</span>
                  <h2>Why People’s Choose Farming Products</h2>
                </div>
                <Accordion
                  defaultActiveKey="collapse0"
                  className="accordion"
                  id="accordionOne"
                >
                  <OrgariumAcc
                    title={"Best Organic Food Provider Since 1995"}
                    event={"collapse0"}
                    onClick={() => setActive("collapse0")}
                    active={active}
                  />
                  <OrgariumAcc
                    title={" Why Choose Our Products ?"}
                    event={"collapse1"}
                    onClick={() => setActive("collapse1")}
                    active={active}
                  />
                  <OrgariumAcc
                    title={"Organic Food and Biology Safe ?"}
                    event={"collapse2"}
                    onClick={() => setActive("collapse2")}
                    active={active}
                  />
                  <OrgariumAcc
                    title={"How Much Sweet &amp; Testy Our Foods ?"}
                    event={"collapse3"}
                    onClick={() => setActive("collapse3")}
                    active={active}
                  />
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Faq Section ======*/}
      {/*====== Start Contact Section ======*/}
      <section className="contact-section dark-black-bg pt-130 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="contact-four_content-box wow fadeInLeft mb-50">
                <div className="section-title section-title-white mb-60">
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
            <div className="col-lg-7">
              <div className="map-box_one ml-lg-70 wow fadeInRight">
                <div className="map-box mb-50">
                  <iframe src="https://maps.google.com/maps?q=new%20york&t=&z=13&ie=UTF8&iwloc=&output=embed" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Contact Section ======*/}
      {/*====== Start Testimonial Section ======*/}
      <section className="testimonial-section pt-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInDown">
                <span className="sub-title">Clients Feedback</span>
                <h2>What’s Our Client Say About Our Organic Foods</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="testimonial-img-box mb-40 wow fadeInLeft">
                    <img
                      src="assets/images/testimonial/img-12.jpg"
                      alt="testimonial image"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="testimonial-wrapper pl-lg-30 mb-40 wow fadeInRight">
                    <Slider
                      {...testimonialSliderFive}
                      className="testimonial-slider-five mb-55"
                    >
                      <div className="testimonial-item-four">
                        <div className="testimonial-content">
                          <div className="client-review-box d-flex">
                            <div className="client-thumb mb-10">
                              <img
                                src="assets/images/testimonial/company-1.png"
                                alt=""
                              />
                            </div>
                            <div className="review-box mb-10">
                              <span>Quality Foods</span>
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
                            </div>
                          </div>
                          <p>
                            Sed ut perspiciatis unde omnis iste natuses
                            voluptatem accusantium doloremque lauda ntium totam
                            rem aperiam eaque ipsa quaeab inventore veritatis et
                            quasi architecto beatae vitae dicta sunt explicabo.
                            Nemo enim ipsam voluptatem voluptas sit aspernatur{" "}
                          </p>
                          <div className="author-title-qoute d-flex">
                            <div className="quote">
                              <i className="fas fa-quote-right" />
                            </div>
                            <div className="author-title">
                              <h4>Michael R. Jordan</h4>
                              <p className="position">CEO &amp; Founder</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-item-four">
                        <div className="testimonial-content">
                          <div className="client-review-box d-flex justify-content-between">
                            <div className="client-thumb mb-10">
                              <img
                                src="assets/images/testimonial/company-1.png"
                                alt=""
                              />
                            </div>
                            <div className="review-box mb-10">
                              <span>Quality Foods</span>
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
                            </div>
                          </div>
                          <p>
                            Sed ut perspiciatis unde omnis iste natuses
                            voluptatem accusantium doloremque lauda ntium totam
                            rem aperiam eaque ipsa quaeab inventore veritatis et
                            quasi architecto beatae vitae dicta sunt explicabo.
                            Nemo enim ipsam voluptatem voluptas sit aspernatur{" "}
                          </p>
                          <div className="author-title-qoute d-flex">
                            <div className="quote">
                              <i className="fas fa-quote-right" />
                            </div>
                            <div className="author-title">
                              <h4>Jordan Michael</h4>
                              <p className="position">CEO &amp; Founder</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-item-four">
                        <div className="testimonial-content">
                          <div className="client-review-box d-flex">
                            <div className="client-thumb mb-10">
                              <img
                                src="assets/images/testimonial/company-1.png"
                                alt=""
                              />
                            </div>
                            <div className="review-box mb-10">
                              <span>Quality Foods</span>
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
                            </div>
                          </div>
                          <p>
                            Sed ut perspiciatis unde omnis iste natuses
                            voluptatem accusantium doloremque lauda ntium totam
                            rem aperiam eaque ipsa quaeab inventore veritatis et
                            quasi architecto beatae vitae dicta sunt explicabo.
                            Nemo enim ipsam voluptatem voluptas sit aspernatur{" "}
                          </p>
                          <div className="author-title-qoute d-flex">
                            <div className="quote">
                              <i className="fas fa-quote-right" />
                            </div>
                            <div className="author-title">
                              <h4>Michael R. Jordan</h4>
                              <p className="position">CEO &amp; Founder</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-item-four">
                        <div className="testimonial-content">
                          <div className="client-review-box d-flex justify-content-between">
                            <div className="client-thumb mb-10">
                              <img
                                src="assets/images/testimonial/company-1.png"
                                alt=""
                              />
                            </div>
                            <div className="review-box mb-10">
                              <span>Quality Foods</span>
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
                            </div>
                          </div>
                          <p>
                            Sed ut perspiciatis unde omnis iste natuses
                            voluptatem accusantium doloremque lauda ntium totam
                            rem aperiam eaque ipsa quaeab inventore veritatis et
                            quasi architecto beatae vitae dicta sunt explicabo.
                            Nemo enim ipsam voluptatem voluptas sit aspernatur{" "}
                          </p>
                          <div className="author-title-qoute d-flex">
                            <div className="quote">
                              <i className="fas fa-quote-right" />
                            </div>
                            <div className="author-title">
                              <h4>Jordan Michael</h4>
                              <p className="position">CEO &amp; Founder</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Slider>
                    <div className="testimonial-dots" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Testimonial Section ======*/}
      {/*====== Start Blog Section ======*/}
      <section className="blog-section pt-90 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInDown">
                <span className="sub-title">Latest News Blog</span>
                <h2>Read Latest News &amp; Blog Get Every Updates</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="blog-post-item-four mb-40 wow fadeInUp">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/img-7.jpg" alt="Post Image" />
                  <a href="#" className="post-date">
                    25 <span>March</span>
                  </a>
                </div>
                <div className="entry-content">
                  <div className="content-inner">
                    <div className="post-meta">
                      <ul>
                        <li>
                          <span>
                            <a href="#" className="cat-btn">
                              Organic
                            </a>
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="far fa-comments" />
                            <a href="#">Comment (5)</a>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <h3 className="title">
                      <Link href="/blog-details">
                        <a>Smashin Podcast Episode Ferdinande Web Dead</a>
                      </Link>
                    </h3>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error voluptatem
                      accusantium doloremque laudantium
                    </p>
                  </div>
                  <div className="read-more">
                    <a href="#" className="main-btn bordered-btn">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="blog-post-item-four mb-40 wow fadeInDown">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/img-8.jpg" alt="Post Image" />
                  <a href="#" className="post-date">
                    25 <span>March</span>
                  </a>
                </div>
                <div className="entry-content">
                  <div className="content-inner">
                    <div className="post-meta">
                      <ul>
                        <li>
                          <span>
                            <a href="#" className="cat-btn">
                              Organic
                            </a>
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="far fa-comments" />
                            <a href="#">Comment (5)</a>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <h3 className="title">
                      <Link href="/blog-details">
                        <a>Designing Better Links For Websites And Emails</a>
                      </Link>
                    </h3>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error voluptatem
                      accusantium doloremque laudantium
                    </p>
                  </div>
                  <div className="read-more">
                    <a href="#" className="main-btn bordered-btn">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="blog-post-item-four mb-40 wow fadeInUp">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/img-9.jpg" alt="Post Image" />
                  <a href="#" className="post-date">
                    25 <span>March</span>
                  </a>
                </div>
                <div className="entry-content">
                  <div className="content-inner">
                    <div className="post-meta">
                      <ul>
                        <li>
                          <span>
                            <a href="#" className="cat-btn">
                              Organic
                            </a>
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="far fa-comments" />
                            <a href="#">Comment (5)</a>
                          </span>
                        </li>
                      </ul>
                    </div>
                    <h3 className="title">
                      <Link href="/blog-details">
                        <a>Front End Boiler Plate See And Starter KiSmashin</a>
                      </Link>
                    </h3>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error voluptatem
                      accusantium doloremque laudantium
                    </p>
                  </div>
                  <div className="read-more">
                    <a href="#" className="main-btn bordered-btn">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Blog Section ======*/}
      {/*====== Start Partner Section ======*/}
      <section className="partners-one p-r z-1 pb-150">
        <div className="container">
          <div className="partners-wrapper border-top-1 pt-80">
            <Slider
              {...logoSlider}
              className="partner-slider-one wow fadeInDown"
            >
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
        </div>
      </section>
    </Layout>
  );
};
export default Index4;
