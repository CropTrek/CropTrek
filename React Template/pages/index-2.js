import Link from "next/link";
import Slider from "react-slick";
import { OrgariumCounter2 } from "../src/components/OrgariumCounter";
import Layout from "../src/layouts/Layout";
import {
  heroSliderOne,
  logoSlider,
  recentProductSlider,
  testimonialSliderTwo,
} from "../src/sliderProps";
const Index2 = () => {
  return (
    <Layout header={2}>
      <section className="hero-area-two">
        <Slider {...heroSliderOne} className="hero-slider-one">
          <div className="single-slider">
            <div
              className="image-layer bg_cover"
              style={{
                backgroundImage:
                  "url(assets/images/hero/hero_two-slider-1.jpg)",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="hero-content-inner">
                    <div className="hero-content text-center">
                      <span
                        className="tag-line"
                        data-animation="fadeInDown"
                        data-delay=".4s"
                      >
                        Organic Farms
                      </span>
                      <h1 data-animation="fadeInUp" data-delay=".5s">
                        Organic &amp; Fresh Testy Foods
                      </h1>
                      <div
                        className="hero-button"
                        data-animation="fadeInDown"
                        data-delay=".6s"
                      >
                        <Link href="/about">
                          <a className="main-btn btn-yellow">Learn About Us</a>
                        </Link>
                        <Link href="/portfolio-grid">
                          <a className="main-btn bordered-btn">
                            Latest Project
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-slider">
            <div
              className="image-layer bg_cover"
              style={{
                backgroundImage:
                  "url(assets/images/hero/hero_two-slider-2.jpg)",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="hero-content-inner">
                    <div className="hero-content text-center">
                      <span
                        className="tag-line"
                        data-animation="fadeInDown"
                        data-delay=".4s"
                      >
                        Organic Farms
                      </span>
                      <h1 data-animation="fadeInUp" data-delay=".5s">
                        Agriculture &amp; Organic Farms
                      </h1>
                      <div
                        className="hero-button"
                        data-animation="fadeInDown"
                        data-delay=".6s"
                      >
                        <Link href="/about">
                          <a className="main-btn btn-yellow">Learn About Us</a>
                        </Link>
                        <Link href="/portfolio-grid">
                          <a className="main-btn bordered-btn">
                            Latest Project
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </section>
      {/*====== End About section ======*/}
      {/*====== Start About section ======*/}
      <section className="about-section overflow-hidden pt-130 pb-80 p-r z-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-content-box content-box-gap pr-lg-70 mb-50">
                <div className="section-title section-title-left mb-30 wow fadeInUp">
                  <span className="sub-title">About Us</span>
                  <h2>We’re Best Agriculture &amp; Organic Firms</h2>
                </div>
                <p>
                  Natus error sit voluptatem accusantium doloremque laudatium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                  et quasi architecto beatae vitae dicta sunt
                </p>
                <div className="skill-bar wow fadeInDown">
                  <div className="skill-title">
                    <h5>
                      Organic Products<span>75%</span>
                    </h5>
                  </div>
                  <div
                    className="progress-bar wow slideInLeft"
                    style={{ width: "75%" }}
                  />
                  <div className="progress" />
                </div>
                <div className="skill-bar wow fadeInUp">
                  <div className="skill-title">
                    <h5>
                      Healthy Foods<span>89%</span>
                    </h5>
                  </div>
                  <div
                    className="progress-bar wow slideInLeft"
                    style={{ width: "89%" }}
                  />
                  <div className="progress" />
                </div>
                <div className="about-button mt-60 wow fadeInDown">
                  <Link href="/about">
                    <a className="main-btn bordered-btn">Learn More Us</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-two_image-box p-r z-1 mb-50 wow fadeInRight">
                <img src="assets/images/about/about-2.png" alt="" />
                <div className="theme-user-card bg-white">
                  <h3>Agriculture &amp; Organic Farms</h3>
                  <img src="assets/images/user-1.jpg" alt="" />
                  <img src="assets/images/sign-1.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End About section ======*/}
      {/*====== Start Category section ======*/}
      <section className="category-one p-r z-1 pt-120">
        <div className="shape shape-one">
          <span>
            <img src="assets/images/shape/leaf-1.png" alt="" />
          </span>
        </div>
        <div className="shape shape-two">
          <span>
            <img src="assets/images/shape/leaf-2.png" alt="" />
          </span>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center mb-50 wow fadeInUp">
                <span className="sub-title">Healthy Foods</span>
                <h2>What We Provide For Your Better Health</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="single-category-item mb-25 wow fadeInDown">
                <div className="category-img">
                  <img src="assets/images/category/img-1.jpg" alt="category" />
                </div>
                <div className="category-info d-flex justify-content-between align-items-center">
                  <h3 className="title">
                    <a href="#">Organic Juice</a>
                  </h3>
                  <a href="#" className="arrow-btn">
                    <i className="far fa-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="single-category-item mb-25 wow fadeInUp">
                <div className="category-img">
                  <img src="assets/images/category/img-2.jpg" alt="category" />
                </div>
                <div className="category-info d-flex justify-content-between align-items-center">
                  <h3 className="title">
                    <a href="#">Sunflowers</a>
                  </h3>
                  <a href="#" className="arrow-btn">
                    <i className="far fa-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="single-category-item mb-25 wow fadeInDown">
                <div className="category-img">
                  <img src="assets/images/category/img-3.jpg" alt="category" />
                </div>
                <div className="category-info d-flex justify-content-between align-items-center">
                  <h3 className="title">
                    <a href="#">Cow Milk &amp; Meat</a>
                  </h3>
                  <a href="#" className="arrow-btn">
                    <i className="far fa-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="single-category-item mb-25 wow fadeInUp">
                <div className="category-img">
                  <img src="assets/images/category/img-4.jpg" alt="category" />
                </div>
                <div className="category-info d-flex justify-content-between align-items-center">
                  <h3 className="title">
                    <a href="#">Organic Wheat</a>
                  </h3>
                  <a href="#" className="arrow-btn">
                    <i className="far fa-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Category section ======*/}
      {/*====== Start Partners Section ======*/}
      <section className="partners-section">
        <div className="container-1350">
          <div className="partners-wrap-one dark-black-bg pb-60 pt-50 p-r z-1">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section-title text-white text-center mb-30 wow fadeInDown">
                  <h4>
                    We Have More Then <span className="yellow">1235+</span>{" "}
                    Global Partners
                  </h4>
                </div>
              </div>
            </div>
            <Slider {...logoSlider} className="partner-slider-one wow fadeInUp">
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
                    src="assets/images/partner/img-9.png"
                    alt="partner image"
                  />
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
      {/*====== End Partners Section ======*/}
      {/*====== Start Products Section ======*/}
      <section className="products-area pt-130 pb-190 p-r z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Popular Products</span>
                <h2>Some Category Organic Products Collect Our Shop</h2>
              </div>
            </div>
          </div>
          <Slider {...recentProductSlider} className="recent-product-slider">
            <div className="single-product-item mb-40 wow fadeInDown">
              <div className="product-img">
                <img src="assets/images/products/img-1.png" alt="" />
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
                <img src="assets/images/products/img-2.png" alt="" />
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
                <img src="assets/images/products/img-3.png" alt="" />
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
                <img src="assets/images/products/img-4.png" alt="" />
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
                <img src="assets/images/products/img-2.png" alt="" />
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
      {/*====== Start Offer section ======*/}
      <section
        className="intro-video-one bg_cover p-r z-1"
        style={{ backgroundImage: "url(assets/images/bg/intro-bg-2.jpg)" }}
      >
        <div className="container-1350">
          <div className="services-wrap-one yellow-bg pt-65 pb-45 p-r z-1">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="section-title text-center mb-50 wow fadeInUp">
                  <span className="sub-title">What We Offers</span>
                  <h2>People Choose Us For Our Great Offers</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="service-box-two text-center mb-35 wow fadeInDown">
                  <div className="icon">
                    <img src="assets/images/icon/icon-7.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/service-details">
                        <a>Fresh Organic Sack Food</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="service-box-two text-center mb-35 wow fadeInUp">
                  <div className="icon">
                    <img src="assets/images/icon/icon-8.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/service-details">
                        <a>Raspberries Food</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="service-box-two text-center mb-35 wow fadeInDown">
                  <div className="icon">
                    <img src="assets/images/icon/icon-9.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/service-details">
                        <a>Organice Fresh Dragon Fruit</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="service-box-two text-center mb-35 wow fadeInUp">
                  <div className="icon">
                    <img src="assets/images/icon/icon-10.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/service-details">
                        <a>Fresh Organic Sea Fish</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="service-box-two text-center mb-35 wow fadeInDown">
                  <div className="icon">
                    <img src="assets/images/icon/icon-11.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/service-details">
                        <a>Organice Steak Foods</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <div className="service-box-two text-center mb-35 wow fadeInUp">
                  <div className="icon">
                    <img src="assets/images/icon/icon-12.png" alt="" />
                  </div>
                  <div className="text">
                    <h3 className="title">
                      <Link href="/service-details">
                        <a>Organice Fresh Chicken</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-lg-12">
            <div className="play-content-box text-center wow fadeInDown">
              <a
                href="https://www.youtube.com/watch?v=gOZ26jO6iXE"
                className="video-popup"
              >
                <i className="fas fa-play" />
              </a>
            </div>
          </div>
        </div>
        <div className="counter-wrap-two text-white pt-35 wow fadeInUp">
          <div className="container">
            <OrgariumCounter2 />
          </div>
        </div>
      </section>
      {/*====== End Offer section ======*/}
      {/*====== Start Testimonial Section ======*/}
      <section className="testimonial-two dark-black-bg p-r z-1 pt-130 pb-90">
        <div className="shape shape-one">
          <span>
            <img src="assets/images/shape/tree3.png" alt="" />
          </span>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="section-title section-title-white section-title-left pr-lg-70 mb-40 wow fadeInLeft">
                <span className="sub-title">Clients Feedback</span>
                <h2>What’s Our Client Say About Organic Foods</h2>
              </div>
              <div className="testimonial-dots mb-40" />
            </div>
            <div className="col-lg-7">
              <Slider
                {...testimonialSliderTwo}
                className="testimonial-slider-two mb-40 wow fadeInRight"
              >
                <div className="testimonial-item-two d-flex">
                  <div className="author-thumb">
                    <img src="assets/images/testimonial/img-5.jpg" alt="" />
                  </div>
                  <div className="testimonial-content">
                    <p>
                      “Sit amet consectetu escing elit sed do mod tempor
                      incidide labore dolore magna aliqua. Quis ipsum
                      suspendisse ultrices darisus comoe systems ways”
                    </p>
                    <div className="author-title-quote d-flex">
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
                <div className="testimonial-item-two d-flex">
                  <div className="author-thumb">
                    <img src="assets/images/testimonial/img-5.jpg" alt="" />
                  </div>
                  <div className="testimonial-content">
                    <p>
                      “Sit amet consectetu escing elit sed do mod tempor
                      incidide labore dolore magna aliqua. Quis ipsum
                      suspendisse ultrices darisus comoe systems ways”
                    </p>
                    <div className="author-title-quote d-flex">
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
                <div className="testimonial-item-two d-flex">
                  <div className="author-thumb">
                    <img src="assets/images/testimonial/img-5.jpg" alt="" />
                  </div>
                  <div className="testimonial-content">
                    <p>
                      “Sit amet consectetu escing elit sed do mod tempor
                      incidide labore dolore magna aliqua. Quis ipsum
                      suspendisse ultrices darisus comoe systems ways”
                    </p>
                    <div className="author-title-quote d-flex">
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
              </Slider>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Testimonial Section ======*/}
      {/*====== Start Why Choose Section ======*/}
      <section className="why-choose-one p-r z-1 pt-130">
        <div className="shape shape-one">
          <span>
            <img src="assets/images/shape/leaf-3.png" alt="" />
          </span>
        </div>
        <div className="shape shape-two">
          <span>
            <img src="assets/images/shape/leaf-2.png" alt="" />
          </span>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="choose-one_img-box p-r mb-40 wow fadeInLeft">
                <img
                  src="assets/images/choose/img-1.jpg"
                  className="choose-img_one"
                  alt=""
                />
                <img
                  src="assets/images/choose/img-2.jpg"
                  className="choose-img_two"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="choose-one_content-box pl-lg-70 mb-40">
                <div className="section-title section-title-left mb-40 wow fadeInDown">
                  <span className="sub-title">Why Choose Us</span>
                  <h2>Trusted Organice Food Providing Company</h2>
                </div>
                <div className="choose-item-list wow fadeInUp">
                  <div className="single-choose-item mb-30">
                    <div className="text">
                      <h5>100% Natural Foods</h5>
                      <p>
                        Accusantium doloremque laudatium, totam rem aperiam
                        inventore veritatis et quasi architecto beatae{" "}
                      </p>
                    </div>
                  </div>
                  <div className="single-choose-item mb-30">
                    <div className="text">
                      <h5>Modern Euipments</h5>
                      <p>
                        Accusantium doloremque laudatium, totam rem aperiam
                        inventore veritatis et quasi architecto beatae{" "}
                      </p>
                    </div>
                  </div>
                  <div className="single-choose-item mb-30">
                    <div className="text">
                      <h5>World Class Meats &amp; Eggs</h5>
                      <p>
                        Accusantium doloremque laudatium, totam rem aperiam
                        inventore veritatis et quasi architecto beatae{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="choose-button wow fadeInUp">
                  <Link href="/about">
                    <a className="main-btn bordered-btn bordered-yellow">
                      Learn About Us
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Why Choose Section ======*/}
      {/*====== Start Blog Section ======*/}
      <section className="blog-section pt-90 pb-130 p-r z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Latest News Blog</span>
                <h2>Read Latest News &amp; Blog Get Every Updates</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
              <div className="blog-post-item-two mb-40 wow fadeInDown">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/img-4.jpg" alt="" />
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    Organic Foods
                  </a>
                  <h3 className="title">
                    <Link href="/blog-details">
                      <a>Smashin Podcast Episode Ferdinande Web Dead</a>
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <span>
                          <i className="far fa-calendar-alt" />
                          <a href="#">25 March 2022</a>
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
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
              <div className="blog-post-item-two mb-40 wow fadeInUp">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/img-5.jpg" alt="" />
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    Organic Foods
                  </a>
                  <h3 className="title">
                    <Link href="/blog-details">
                      <a>Powerful Termimand Linec Tools Modern Web</a>
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <span>
                          <i className="far fa-calendar-alt" />
                          <a href="#">25 March 2022</a>
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
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
              <div className="blog-post-item-two mb-40 wow fadeInDown">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/img-6.jpg" alt="" />
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    Organic Foods
                  </a>
                  <h3 className="title">
                    <Link href="/blog-details">
                      <a>Smashin Podcast Episode Ferdinande Web Dead</a>
                    </Link>
                  </h3>
                  <div className="post-meta">
                    <ul>
                      <li>
                        <span>
                          <i className="far fa-calendar-alt" />
                          <a href="#">25 March 2022</a>
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
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="button-box text-center wow fadeInUp">
                <Link href="/blog-standard">
                  <a className="main-btn bordered-btn bordered-yellow">
                    View More News
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Index2;
