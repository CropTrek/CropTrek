import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import OrgariumCounter from "../src/components/OrgariumCounter";
import ProgressBar from "../src/components/ProgressBar";
import ProjectOneSlider from "../src/components/sliders/ProjectOneSlider";
import Layout from "../src/layouts/Layout";
import {
  heroSliderOne,
  logoSlider,
  testimonialSliderOne,
} from "../src/sliderProps";
const Index = () => {
  return (
    <Layout header={1}>
      <section className="hero-area-one">
        <Slider {...heroSliderOne} className="hero-slider-one">
          <div className="single-slider">
            <div
              className="image-layer bg_cover"
              style={{
                backgroundImage:
                  "url(assets/images/hero/hero_one-slider-1.jpg)",
              }}
            />
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
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
                        <a className="main-btn bordered-btn bordered-white">
                          Latest Project
                        </a>
                      </Link>
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
                  "url(assets/images/hero/hero_one-slider-2.jpg)",
              }}
            />
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="hero-content text-center">
                    <span
                      className="tag-line"
                      data-animation="fadeInDown"
                      data-delay=".4s"
                    >
                      Organic Farms
                    </span>
                    <h1 data-animation="fadeInUp" data-delay=".5s">
                      Welcome to Organic Farms
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
                        <a className="main-btn bordered-btn bordered-white">
                          Latest Project
                        </a>
                      </Link>
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
                  "url(assets/images/hero/hero_one-slider-3.jpg)",
              }}
            />
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
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
                        <a className="main-btn bordered-btn bordered-white">
                          Latest Project
                        </a>
                      </Link>
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
                  "url(assets/images/hero/hero_one-slider-4.jpg)",
              }}
            />
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="hero-content text-center">
                    <span
                      className="tag-line"
                      data-animation="fadeInDown"
                      data-delay=".4s"
                    >
                      Organic Farms
                    </span>
                    <h1 data-animation="fadeInUp" data-delay=".5s">
                      Welcome to Organic Farms
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
                        <a className="main-btn bordered-btn bordered-white">
                          Latest Project
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </section>
      {/*====== End Hero Section ======*/}
      {/*====== Start Features Section ======*/}
      <section className="features-section">
        <div className="container-1350">
          <div className="features-wrap-one wow fadeInUp">
            <div className="row justify-content-center">
              <div className="col-xl-4 col-md-6 col-sm-12">
                <div className="features-item d-flex mb-30">
                  <div className="fill-number">01</div>
                  <div className="icon">
                    <i className="flaticon-tractor" />
                  </div>
                  <div className="text">
                    <h5>Modern Agriculture Equipment</h5>
                    <p>
                      Sit amet consectetur adipiscing elit sed eiusmod tempor
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-sm-12">
                <div className="features-item d-flex mb-30">
                  <div className="fill-number">02</div>
                  <div className="icon">
                    <i className="flaticon-agriculture" />
                  </div>
                  <div className="text">
                    <h5>Organic and Fresh Harvest of Wheat</h5>
                    <p>
                      Sit amet consectetur adipiscing elit sed eiusmod tempor
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-sm-12">
                <div className="features-item d-flex mb-30">
                  <div className="fill-number">01</div>
                  <div className="icon">
                    <i className="flaticon-social-care" />
                  </div>
                  <div className="text">
                    <h5>Lot’s Of Professional &amp; Expert Farmers</h5>
                    <p>
                      Sit amet consectetur adipiscing elit sed eiusmod tempor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Features Section ======*/}
      {/*====== Start About Section ======*/}
      <section className="about-section p-r z-1 pt-130 pb-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6">
              <div className="about-one_content-box mb-50">
                <div className="section-title section-title-left mb-30 wow fadeInUp">
                  <span className="sub-title">About Us</span>
                  <h2>We’re Best Agriculture &amp; Organic Firms</h2>
                </div>
                <div
                  className="quote-text mb-35 wow fadeInDown"
                  data-wow-delay=".3s"
                >
                  <p>
                    Sed ut perspiciatis omnis natus error volup accusantiue
                    doloremque laudantium totam aperiam eaque quae abllcs
                    veritatis quasi architecto beatae vitae.
                  </p>
                </div>
                <Tab.Container defaultActiveKey={"mission"}>
                  <div className="tab-content-box wow fadeInUp">
                    <Nav as={"ul"} className="nav nav-tabs mb-20">
                      <li className="nav-item">
                        <Nav.Link
                          as={"a"}
                          className="nav-link"
                          data-toggle="tab"
                          eventKey="mission"
                          href="#mission"
                        >
                          Our Mission
                        </Nav.Link>
                      </li>
                      <li className="nav-item">
                        <Nav.Link
                          as={"a"}
                          className="nav-link"
                          data-toggle="tab"
                          eventKey="vision"
                          href="#vision"
                        >
                          Our Vision
                        </Nav.Link>
                      </li>
                    </Nav>
                    <Tab.Content className="tab-content">
                      <Tab.Pane className="tab-pane fade" eventKey="mission">
                        <div className="content-box-gap">
                          <p>
                            Natus error sit voluptatem accusantium doloremque
                            laudatium, totam rem aperiam, eaque ipsa quae ab
                            illo inventore veritatis et quasi architecto beatae
                            vitae dicta sunt
                          </p>
                          <div className="avatar-box d-flex align-items-center">
                            <div className="thumb">
                              <img
                                src="assets/images/user-1.jpg"
                                alt="Admin Thumb"
                              />
                            </div>
                            <div className="content">
                              <img src="assets/images/sign-1.png" alt="Sign" />
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane className="tab-pane fade" eventKey="vision">
                        <div className="content-box-gap">
                          <p>
                            Natus error sit voluptatem accusantium doloremque
                            laudatium, totam rem aperiam, eaque ipsa quae ab
                            illo inventore veritatis et quasi architecto beatae
                            vitae dicta sunt
                          </p>
                          <div className="avatar-box d-flex align-items-center">
                            <div className="thumb">
                              <img
                                src="assets/images/user-1.jpg"
                                alt="Admin Thumb"
                              />
                            </div>
                            <div className="content">
                              <img src="assets/images/sign-1.png" alt="Sign" />
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="about-one_image-box p-r mb-50 pl-100">
                <div className="about-img_one wow fadeInLeft">
                  <img src="assets/images/about/img-1.jpg" alt="About Image" />
                </div>
                <div className="about-img_two wow fadeInRight">
                  <img src="assets/images/about/img-2.jpg" alt="About Image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End About Section ======*/}
      {/*====== Start Service Section ======*/}
      <section className="service-one dark-black-bg pt-130 pb-125 p-r z-1">
        <div className="shape shape-one">
          <span>
            <img src="assets/images/shape/tree1.png" alt="" />
          </span>
        </div>
        <div className="shape shape-two">
          <span>
            <img src="assets/images/shape/tree2.png" alt="" />
          </span>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title section-title-white text-center mb-60 wow fadeInUp">
                <span className="sub-title">Healthy Foods</span>
                <h2>What We Provide For Your Better Health</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12">
              <div className="service-box text-center mb-70 wow fadeInUp">
                <div className="icon">
                  <i className="flaticon-wheat-sack" />
                </div>
                <div className="text">
                  <h3 className="title">
                    <Link href="/service-details">
                      <a>Fresh Wheat Sack Food</a>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12">
              <div className="service-box text-center mb-70 wow fadeInDown">
                <div className="icon">
                  <i className="flaticon-grape" />
                </div>
                <div className="text">
                  <h3 className="title">
                    <Link href="/service-details">
                      <a>Organic Fresh Fruits</a>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12">
              <div className="service-box text-center mb-70 wow fadeInUp">
                <div className="icon">
                  <i className="flaticon-cow" />
                </div>
                <div className="text">
                  <h3 className="title">
                    <Link href="/service-details">
                      <a>Cows Meat and Milk</a>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12">
              <div className="service-box text-center mb-70 wow fadeInDown">
                <div className="icon">
                  <i className="flaticon-fish" />
                </div>
                <div className="text">
                  <h3 className="title">
                    <Link href="/service-details">
                      <a>Fresh Pond &amp; Sea Fish</a>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12">
              <div className="service-box text-center mb-70 wow fadeInUp">
                <div className="icon">
                  <i className="flaticon-healthy-food" />
                </div>
                <div className="text">
                  <h3 className="title">
                    <Link href="/service-details">
                      <a>Fresh Organic Vegetable</a>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4 col-sm-12">
              <div className="service-box text-center mb-70 wow fadeInDown">
                <div className="icon">
                  <i className="flaticon-planet-earth" />
                </div>
                <div className="text">
                  <h3 className="title">
                    <Link href="/service-details">
                      <a>Planet Earth Safety</a>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div
                className="play-one_content-box bg_cover wow fadeInDown"
                style={{
                  backgroundImage: "url(assets/images/bg/intro-bg-1.jpg)",
                }}
              >
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
      {/*====== End Service Section ======*/}
      {/*====== Start Gallery Section ======*/}
      <ProjectOneSlider />
      {/*====== End Gallery Section ======*/}
      {/*====== Start Counter Section ======*/}
      <section className="fun-fact">
        <div className="big-text mb-105 wow fadeInUp">
          <h2>Statistics</h2>
        </div>
        <div className="container">
          <div className="counter-wrap-one wow fadeInDown">
            <div className="counter-inner-box">
              <OrgariumCounter />
            </div>
          </div>
        </div>
      </section>
      {/*====== End Counter Section ======*/}
      {/*====== Start Service Section ======*/}
      <section className="popular-service p-r z-1 pt-130 pb-135">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title">Popular Services</span>
                <h2>We Provide Organice Food Services to Get Better Health</h2>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="single-service-item mb-50 wow fadeInUp">
                <div className="icon">
                  <img src="assets/images/icon/icon-1.png" alt="Icon" />
                </div>
                <div className="text">
                  <h3>
                    <Link href="/service-details">
                      <a>Fresh Avocado</a>
                    </Link>
                  </h3>
                  <p>Natus error sit volupt ateme accus antium dolores</p>
                </div>
              </div>
              <div className="single-service-item mb-50 wow fadeInDown">
                <div className="icon">
                  <img src="assets/images/icon/icon-2.png" alt="Icon" />
                </div>
                <div className="text">
                  <h3>
                    <Link href="/service-details">
                      <a>Organic Carrot</a>
                    </Link>
                  </h3>
                  <p>Natus error sit volupt ateme accus antium dolores</p>
                </div>
              </div>
              <div className="single-service-item mb-50 wow fadeInUp">
                <div className="icon">
                  <img src="assets/images/icon/icon-3.png" alt="Icon" />
                </div>
                <div className="text">
                  <h3>
                    <Link href="/service-details">
                      <a>Organic Carrot</a>
                    </Link>
                  </h3>
                  <p>Natus error sit volupt ateme accus antium dolores</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="img-holder mb-50 wow fadeInDown">
                <img
                  src="assets/images/service/img-1.jpg"
                  alt="Service Image"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-service-item mb-50 card-rtl wow fadeInDown">
                <div className="icon">
                  <img src="assets/images/icon/icon-4.png" alt="Icon" />
                </div>
                <div className="text">
                  <h3>
                    <Link href="/service-details">
                      <a>Organic Corn</a>
                    </Link>
                  </h3>
                  <p>Natus error sit volupt ateme accus antium dolores</p>
                </div>
              </div>
              <div className="single-service-item mb-50 card-rtl fadeInUp">
                <div className="icon">
                  <img src="assets/images/icon/icon-5.png" alt="Icon" />
                </div>
                <div className="text">
                  <h3>
                    <Link href="/service-details">
                      <a>Milk and Meats</a>
                    </Link>
                  </h3>
                  <p>Natus error sit volupt ateme accus antium dolores</p>
                </div>
              </div>
              <div className="single-service-item mb-50 card-rtl wow fadeInDown">
                <div className="icon">
                  <img src="assets/images/icon/icon-6.png" alt="Icon" />
                </div>
                <div className="text">
                  <h3>
                    <Link href="/service-details">
                      <a>Fresh Dragon Fruit</a>
                    </Link>
                  </h3>
                  <p>Natus error sit volupt ateme accus antium dolores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Service Section ======*/}
      {/*====== Start Fancy Text Block Section ======*/}
      <section className="offer-section-one p-r z-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="offer-one_image-box bg_cover mb-50 wow fadeInRight"
                style={{
                  backgroundImage: "url(assets/images/bg/offer-bg-1.jpg)",
                }}
              >
                <div className="content-box">
                  <h2>35 Years Of Experience in Agriculture</h2>
                </div>
                <div className="experience-box">
                  Experience &amp; Professional Team Members
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="offer-one_content-box content-box-gap mb-20">
                <div className="section-title section-title-left mb-20 wow fadeInUp">
                  <span className="sub-title">What We Offers</span>
                  <h2>People Choose Us For Our Great Offers</h2>
                </div>
                <p>
                  Natus error sit voluptatem accusantium doloreue laudatiuec
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                  et quasi architecto beatae vitae dicta sunt
                </p>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="single-chart-item text-center mb-30 wow fadeInDown">
                      {/* <div className="chart-circle">
                        <div
                          className="circle"
                          data-donutty=""
                          data-thickness={5}
                          data-value={72}
                          data-bg="rgba(255, 255, 255, 0.149)"
                          data-round="false"
                          data-color="#eece38"
                        />
                        <ProgressBar value={72} color="#76a713" />
                        <h2 className="number">
                          72<span className="sign">%</span>
                        </h2>
                      </div> */}
                      <ProgressBar value={76} color="#eece38" />
                      <div className="text">
                        <h5>Organic Foods Provides</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="single-chart-item text-center mb-30 wow fadeInUp">
                      {/* <div className="chart-circle">
                        <div
                          className="circle"
                          data-donutty=""
                          data-thickness={5}
                          data-value={86}
                          data-bg="rgba(255, 255, 255, 0.149)"
                          data-round="false"
                          data-color="#eece38"
                        />
                        <h2 className="number">
                          86<span className="sign">%</span>
                        </h2>
                      </div> */}
                      <ProgressBar value={86} color="#eece38" />
                      <div className="text">
                        <h5>Reforming The Systems</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Fancy Text Block Section ======*/}
      {/*====== Start Testimonial Section ======*/}
      <section className="testimonial-one light-gray-bg p-r z-1">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Clients Feedback</span>
                <h2>What’s Our Clients Say About Our Organic Foods</h2>
              </div>
            </div>
          </div>
          <Slider {...testimonialSliderOne} className="testimonial-slider-one">
            <div className="testimonial-item text-center wow fadeInDown">
              <div className="author-thumb">
                <img
                  src="assets/images/testimonial/img-1.jpg"
                  alt="author Image"
                />
              </div>
              <div className="testimonial-content">
                <p>
                  “Sit amet consectetu escing elit sed do eiusmod tempor
                  incididunt ut labore dolore magna aliqua. Quis ipsum
                  suspendisse ultrices gravic darisus comoe”{" "}
                </p>
                <div className="quote">
                  <i className="fas fa-quote-right" />
                </div>
                <div className="author-title">
                  <h4>Michael R. Jordan</h4>
                  <p className="position">CEO &amp; Founder</p>
                </div>
              </div>
            </div>
            <div className="testimonial-item text-center wow fadeInUp">
              <div className="author-thumb">
                <img
                  src="assets/images/testimonial/img-2.jpg"
                  alt="author Image"
                />
              </div>
              <div className="testimonial-content">
                <p>
                  “Sit amet consectetu escing elit sed do eiusmod tempor
                  incididunt ut labore dolore magna aliqua. Quis ipsum
                  suspendisse ultrices gravic darisus comoe”{" "}
                </p>
                <div className="quote">
                  <i className="fas fa-quote-right" />
                </div>
                <div className="author-title">
                  <h4>Nathan A. Caswell</h4>
                  <p className="position">Senior Manager</p>
                </div>
              </div>
            </div>
            <div className="testimonial-item text-center wow fadeInDown">
              <div className="author-thumb">
                <img
                  src="assets/images/testimonial/img-3.jpg"
                  alt="author Image"
                />
              </div>
              <div className="testimonial-content">
                <p>
                  “Sit amet consectetu escing elit sed do eiusmod tempor
                  incididunt ut labore dolore magna aliqua. Quis ipsum
                  suspendisse ultrices gravic darisus comoe”{" "}
                </p>
                <div className="quote">
                  <i className="fas fa-quote-right" />
                </div>
                <div className="author-title">
                  <h4>Somalia D. Silva</h4>
                  <p className="position">Business Manager</p>
                </div>
              </div>
            </div>
            <div className="testimonial-item text-center wow fadeInUp">
              <div className="author-thumb">
                <img
                  src="assets/images/testimonial/img-4.jpg"
                  alt="author Image"
                />
              </div>
              <div className="testimonial-content">
                <p>
                  “Sit amet consectetu escing elit sed do eiusmod tempor
                  incididunt ut labore dolore magna aliqua. Quis ipsum
                  suspendisse ultrices gravic darisus comoe”{" "}
                </p>
                <div className="quote">
                  <i className="fas fa-quote-right" />
                </div>
                <div className="author-title">
                  <h4>Michael D. Slaughter</h4>
                  <p className="position">Web Developer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-item text-center wow fadeInDown">
              <div className="author-thumb">
                <img
                  src="assets/images/testimonial/img-2.jpg"
                  alt="author Image"
                />
              </div>
              <div className="testimonial-content">
                <p>
                  “Sit amet consectetu escing elit sed do eiusmod tempor
                  incididunt ut labore dolore magna aliqua. Quis ipsum
                  suspendisse ultrices gravic darisus comoe”{" "}
                </p>
                <div className="quote">
                  <i className="fas fa-quote-right" />
                </div>
                <div className="author-title">
                  <h4>Nathan A. Caswell</h4>
                  <p className="position">Senior Manager</p>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/*====== End Testimonial Section ======*/}
      {/*====== Start Contact Section ======*/}
      <section className="contact-one p-r z-2">
        <div className="container-fluid">
          <div className="row no-gutters">
            <div className="col-lg-6">
              <div className="contact-one_content-box wow fadeInLeft">
                <div className="contact-wrapper">
                  <div className="section-title section-title-left mb-40">
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
                        <button className="main-btn yellow-bg">
                          Send Us Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="contact-one_information-box bg_cover wow fadeInRight"
                style={{
                  backgroundImage: "url(assets/images/bg/contact-bg-1.jpg)",
                }}
              >
                <div className="information-box">
                  <h3>Contact Us</h3>
                  <p>
                    Sit volupta accusantium doloreues laudatiuec totam rem
                    aperiam eaque abillo inventore verit atiset
                  </p>
                  <div className="information-item_one d-flex mb-25">
                    <div className="icon">
                      <i className="flaticon-placeholder" />
                    </div>
                    <div className="info">
                      <span className="sub-title mb-1">Location</span>
                      <h5>55 Main Street, New York</h5>
                    </div>
                  </div>
                  <div className="information-item_one d-flex mb-25">
                    <div className="icon">
                      <i className="flaticon-email" />
                    </div>
                    <div className="info">
                      <span className="sub-title mb-1">Email Address</span>
                      <h5>
                        <a href="mailto:hotline@gmail.com">hotline@gmail.com</a>
                      </h5>
                    </div>
                  </div>
                  <div className="information-item_one d-flex mb-25">
                    <div className="icon">
                      <i className="flaticon-phone-call" />
                    </div>
                    <div className="info">
                      <span className="sub-title mb-1">Phone Number</span>
                      <h5>
                        <a href="tel:+0123456789">+012(345) 67 89</a>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Contact Section ======*/}
      {/*====== Start Blog Section ======*/}
      <section className="blog-section p-r z-1 pt-130 pb-100">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xl-7 col-lg-10">
              <div className="section-title section-title-left mb-60 wow fadeInLeft">
                <span className="sub-title">Latest News Blog</span>
                <h2>Read Latest News &amp; Blog Get Every Updates</h2>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="button-box float-lg-right mb-60 wow fadeInRight">
                <Link href="/blog-standard">
                  <a className="main-btn bordered-btn bordered-yellow">
                    View More Newss
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="blog-post-item-one mb-30 wow fadeInLeft">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/img-1.jpg" alt="Post Image" />
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    Organic Foods
                  </a>
                  <h3 className="title">
                    <a href="#">
                      Smashing Podcast Episode 44 With Chris Ferdinandi Is The
                      Web Dead
                    </a>
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
              <div className="blog-post-item-one mb-30 wow fadeInRight">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/img-2.jpg" alt="Post Image" />
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    Organic Foods
                  </a>
                  <h3 className="title">
                    <a href="#">
                      Powerful Terminal And Command-Line Tools Modern Web
                      Development
                    </a>
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
              <div className="blog-post-item-one mb-30 wow fadeInLeft">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/img-3.jpg" alt="Post Image" />
                </div>
                <div className="entry-content">
                  <a href="#" className="cat-btn">
                    Organic Foods
                  </a>
                  <h3 className="title">
                    <a href="#">
                      Smashing Podcast Episode 44 With Chris Ferdinandi Is The
                      Web Dead
                    </a>
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
        </div>
      </section>
      {/*====== End Blog Section ======*/}
      {/*====== Start Partner Section ======*/}
      <section className="partners-section yellow-bg pt-50 pb-60 p-r z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title text-center mb-30 wow fadeInUp">
                <h4>We Have More Then 1235+ Global Partners</h4>
              </div>
            </div>
          </div>
          <Slider {...logoSlider} className="partner-slider-one wow fadeInDown">
            <div className="partner-item">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-1.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-2.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-3.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-4.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-5.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-6.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-3.png"
                  alt="partner image"
                />
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/*====== End Partner Section ======*/}
      {/*====== Start Footer ======*/}

      {/*====== End Footer ======*/}
      {/*====== back-to-top ======*/}
    </Layout>
  );
};
export default Index;
