import Link from "next/link";
import Slider from "react-slick";
import Counter from "../src/components/Counter";
import TestimonialSlider from "../src/components/sliders/TestimonialSlider";
import Layout from "../src/layouts/Layout";
import {
  heroSliderOne,
  logoSlider,
  projectsSliderTwo,
  serviceSliderOne,
} from "../src/sliderProps";
const Index3 = () => {
  return (
    <Layout header={3} footer={3}>
      <section className="hero-area-three">
        <Slider {...heroSliderOne} className="hero-slider-one">
          <div className="single-slider p-r z-1">
            <div
              className="image-layer bg_cover"
              style={{
                backgroundImage:
                  "url(assets/images/hero/hero_three-slider-1.jpg)",
              }}
            />
            <div className="brand-card dark-black-bg">
              <img src="assets/images/icon/wheat.png" alt="" />
              <h3>Orgarium</h3>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero-content text-white">
                    <span
                      className="tag-line"
                      data-animation="fadeInDown"
                      data-delay=".4s"
                    >
                      Organic Farms
                    </span>
                    <h1 data-animation="fadeInUp" data-delay=".5s">
                      Agriculture Farming
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
                        <a className="main-btn btn-white">Latest Project</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-slider p-r z-1">
            <div
              className="image-layer bg_cover"
              style={{
                backgroundImage:
                  "url(assets/images/hero/hero_three-slider-2.jpg)",
              }}
            />
            <div className="brand-card dark-black-bg">
              <img src="assets/images/icon/wheat.png" alt="" />
              <h3>Orgarium</h3>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero-content text-white">
                    <span
                      className="tag-line"
                      data-animation="fadeInDown"
                      data-delay=".4s"
                    >
                      Organic Farms
                    </span>
                    <h1 data-animation="fadeInUp" data-delay=".5s">
                      Agriculture Farming
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
                        <a className="main-btn btn-white">Latest Project</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-slider p-r z-1">
            <div
              className="image-layer bg_cover"
              style={{
                backgroundImage:
                  "url(assets/images/hero/hero_three-slider-3.jpg)",
              }}
            />
            <div className="brand-card dark-black-bg">
              <img src="assets/images/icon/wheat.png" alt="" />
              <h3>Orgarium</h3>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero-content text-white">
                    <span
                      className="tag-line"
                      data-animation="fadeInDown"
                      data-delay=".4s"
                    >
                      Organic Farms
                    </span>
                    <h1 data-animation="fadeInUp" data-delay=".5s">
                      Agriculture Farming
                    </h1>
                    <div
                      className="hero-button"
                      data-animation="fadeInDown"
                      data-delay=".6s"
                    >
                      <Link href="/about">
                        <a className="main-btn btn-yellow">Learn About Us</a>
                      </Link>
                      <Link href="/portfolio-full-width">
                        <a className="main-btn btn-white">Latest Project</a>
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
      <section className="features-section border-bottom-1">
        <div className="features-wrap-two wow fadeInUp">
          <div className="features-item-two">
            <div className="fill-number">01</div>
            <div className="icon">
              <i className="flaticon-tractor" />
            </div>
            <div className="text">
              <h5>Modern Agriculture Equipment</h5>
            </div>
          </div>
          <div className="features-item-two">
            <div className="fill-number">02</div>
            <div className="icon">
              <i className="flaticon-agriculture" />
            </div>
            <div className="text">
              <h5>Organic and Fresh Harvest of Wheat</h5>
            </div>
          </div>
          <div className="features-item-two">
            <div className="fill-number">03</div>
            <div className="icon">
              <i className="flaticon-social-care" />
            </div>
            <div className="text">
              <h5>Lot’s Of Professional &amp; Expert Farmers</h5>
            </div>
          </div>
          <div className="features-item-two">
            <div className="fill-number">04</div>
            <div className="icon">
              <i className="flaticon-farming" />
            </div>
            <div className="text">
              <h5>Provide Full of Natural Goodness</h5>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Features Section ======*/}
      {/*====== Start About Section ======*/}
      <section className="about-section pt-130 pb-95">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-three-image_box p-r mb-40 wow fadeInLeft">
                <div className="experience-box dark-black-bg z-1 text-center text-white">
                  <h3>25 Years Of Experience In Agriculture Farming </h3>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-5">
                    <img
                      src="assets/images/about/1.jpg"
                      className="about-img_one"
                      alt=""
                    />
                  </div>
                  <div className="col-md-7">
                    <img
                      src="assets/images/about/2.jpg"
                      className="about-img_two"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content_box content-box-gap pl-lg-60">
                <div className="section-title section-title-left mb-15 wow fadeInUp">
                  <span className="sub-title">About Us</span>
                  <h2>We’re Best Agriculture &amp; Organic Firms</h2>
                </div>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam eaque
                  quae abillo inventore veritatis et quasi architecto beatae
                  vitae dicta sunt explicabo enim ipsam voluptatem quia
                </p>
                <div className="row">
                  <div className="col-md-4 col-sm-12">
                    <div className="food-card text-center mb-40 wow fadeInDown">
                      <div className="icon">
                        <i className="flaticon-wheat-sack" />
                      </div>
                      <div className="text">
                        <h5>Wheat</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="food-card text-center mb-40 wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-grape" />
                      </div>
                      <div className="text">
                        <h5>Fruits</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="food-card text-center mb-40 wow fadeInDown">
                      <div className="icon">
                        <i className="flaticon-cow" />
                      </div>
                      <div className="text">
                        <h5>Cow Milk</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End About Section ======*/}
      {/*====== Start Fun Fact Section ======*/}
      <section className="fun-fact-two p-r z-1 pb-130">
        <div className="fun-three_img wow fadeInRight">
          <img src="assets/images/choose/img-3.jpg" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 col-lg-12">
              <div className="row">
                <div className="col-xl-10 col-lg-10">
                  <div className="section-title section-title-left mb-40 wow fadeInUp">
                    <span className="sub-title">Company Statistics</span>
                    <h2>
                      Why People Say Us Best Farming Company in The Worlds
                    </h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="counter-item-two p-r z-1 mb-40 wow fadeInDown">
                    <div className="hover-icon">
                      <i className="flaticon-agriculture-1" />
                    </div>
                    <div className="icon">
                      <i className="flaticon-agriculture-1" />
                    </div>
                    <div className="text">
                      <h2 className="number">
                        <Counter end={3652} />+
                      </h2>
                      <p>Tons of Harvesta</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="counter-item-two p-r z-1 mb-40 wow fadeInUp">
                    <div className="hover-icon">
                      <i className="flaticon-cow-1" />
                    </div>
                    <div className="icon">
                      <i className="flaticon-cow-1" />
                    </div>
                    <div className="text">
                      <h2 className="number">
                        <Counter end={7563} />+
                      </h2>
                      <p>Units of Cattle</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="counter-item-two p-r z-1 mb-40 wow fadeInDown">
                    <div className="hover-icon">
                      <i className="flaticon-field" />
                    </div>
                    <div className="icon">
                      <i className="flaticon-field" />
                    </div>
                    <div className="text">
                      <h2 className="number">
                        <Counter end={9634} />+
                      </h2>
                      <p>Hectares of Farm</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="counter-item-two p-r z-1 mb-40 wow fadeInUp">
                    <div className="hover-icon">
                      <i className="flaticon-tractor-1" />
                    </div>
                    <div className="icon">
                      <i className="flaticon-tractor-1" />
                    </div>
                    <div className="text">
                      <h2 className="number">
                        <Counter end={3652} />+
                      </h2>
                      <p>Units of Technic</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Fun Fact Section ======*/}
      {/*====== Start CTA Section ======*/}
      <section className="cta-one p-r">
        <div className="container-fluid">
          <div className="cta-wrap-one">
            <div className="row">
              <div className="col-xl-6 col-lg-12">
                <div
                  className="cta-item_one bg_cover text-white mb-40 wow fadeInLeft"
                  style={{
                    backgroundImage: "url(assets/images/cta/cta-1.jpg)",
                  }}
                >
                  <div className="text d-flex justify-content-between align-items-center">
                    <h2>Need Organic Foods</h2>
                    <Link href="/contact">
                      <a className="main-btn bordered-btn bordered-white">
                        Get Quote
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-12">
                <div
                  className="cta-item_one bg_cover text-white mb-40 wow fadeInRight"
                  style={{
                    backgroundImage: "url(assets/images/cta/cta-2.jpg)",
                  }}
                >
                  <div className="text d-flex justify-content-between align-items-center">
                    <h2>Have Any Equipments ?</h2>
                    <Link href="/contact">
                      <a className="main-btn bordered-btn bordered-white">
                        Contact Us
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End CTA Section ======*/}
      {/*====== Start Service Section ======*/}
      <section className="service-two dark-black-bg pt-165">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title section-title-white text-center mb-50 wow fadeInDown">
                <span className="sub-title">Healthy Foods</span>
                <h2>What We Provide For Your Better Health</h2>
              </div>
            </div>
          </div>
          <Slider {...serviceSliderOne} className="service-slider-one">
            <div className="single-service-item-two text-center wow fadeInUp">
              <div className="img-holder">
                <img src="assets/images/service/img-2.jpg" alt="" />
              </div>
              <div className="text">
                <h3 className="title">
                  <Link href="/service-details">
                    <a>Organic Foods</a>
                  </Link>
                </h3>
                <p>
                  Sit amet consectetur adipisc elit sed eiusmod tempor incdunt
                  labore et dolore magna
                </p>
                <Link href="/service-details">
                  <a className="main-btn btn-yellow">Read More</a>
                </Link>
              </div>
            </div>
            <div className="single-service-item-two text-center wow fadeInDown">
              <div className="img-holder">
                <img src="assets/images/service/img-3.jpg" alt="" />
              </div>
              <div className="text">
                <h3 className="title">
                  <Link href="/service-details">
                    <a>Milks &amp; Meat</a>
                  </Link>
                </h3>
                <p>
                  Sit amet consectetur adipisc elit sed eiusmod tempor incdunt
                  labore et dolore magna
                </p>
                <Link href="/service-details">
                  <a className="main-btn btn-yellow">Read More</a>
                </Link>
              </div>
            </div>
            <div className="single-service-item-two text-center wow fadeInUp">
              <div className="img-holder">
                <img src="assets/images/service/img-4.jpg" alt="" />
              </div>
              <div className="text">
                <h3 className="title">
                  <Link href="/service-details">
                    <a>Organic Fruits</a>
                  </Link>
                </h3>
                <p>
                  Sit amet consectetur adipisc elit sed eiusmod tempor incdunt
                  labore et dolore magna
                </p>
                <Link href="/service-details">
                  <a className="main-btn btn-yellow">Read More</a>
                </Link>
              </div>
            </div>
            <div className="single-service-item-two text-center wow fadeInDown">
              <div className="img-holder">
                <img src="assets/images/service/img-3.jpg" alt="" />
              </div>
              <div className="text">
                <h3 className="title">
                  <Link href="/service-details">
                    <a>Milks &amp; Meat</a>
                  </Link>
                </h3>
                <p>
                  Sit amet consectetur adipisc elit sed eiusmod tempor incdunt
                  labore et dolore magna
                </p>
                <Link href="/service-details">
                  <a className="main-btn btn-yellow">Read More</a>
                </Link>
              </div>
            </div>
          </Slider>
        </div>
      </section>
      {/*====== End Service Section ======*/}
      {/*====== Start Partners Section ======*/}
      <section className="partners-two">
        <div className="container-1350">
          <div className="partners-wrap-one yellow-bg pb-60 pt-50 p-r z-1">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section-title text-center mb-30 wow fadeInUp">
                  <h4>We Have More Then 1235+ Global Partners</h4>
                </div>
              </div>
            </div>
            <Slider
              {...logoSlider}
              className="partner-slider-one wow fadeInDown"
            >
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
        </div>
      </section>
      {/*====== End Partners Section ======*/}
      {/*====== Start Farmers Section ======*/}
      <section className="farmers-team_one pt-130">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-8">
              <div className="section-title section-title-left mb-50 wow fadeInLeft">
                <span className="sub-title">Our Farmers</span>
                <h2>We Have Lot’s Of Experience Team Members</h2>
              </div>
            </div>
            <div className="col-lg-4">
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
              <div className="team-member_one text-center mb-40 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/img-1.jpg" alt="" />
                </div>
                <div className="member-info">
                  <h3 className="title">
                    <Link href="/farmers">
                      <a>Dennis P. Russell</a>
                    </Link>
                  </h3>
                  <p className="position">Food Farmers</p>
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
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="team-member_one text-center mb-40 wow fadeInDown">
                <div className="member-img">
                  <img src="assets/images/team/img-2.jpg" alt="" />
                </div>
                <div className="member-info">
                  <h3 className="title">
                    <Link href="/farmers">
                      <a>David M. Hower</a>
                    </Link>
                  </h3>
                  <p className="position">General Manager</p>
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
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="team-member_one text-center mb-40 wow fadeInUp">
                <div className="member-img">
                  <img src="assets/images/team/img-3.jpg" alt="" />
                </div>
                <div className="member-info">
                  <h3 className="title">
                    <Link href="/farmers">
                      <a>Richard M. Howell</a>
                    </Link>
                  </h3>
                  <p className="position">Food Farmers</p>
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
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="team-member_one text-center mb-40 wow fadeInDown">
                <div className="member-img">
                  <img src="assets/images/team/img-4.jpg" alt="" />
                </div>
                <div className="member-info">
                  <h3 className="title">
                    <Link href="/farmers">
                      <a>Keneth R. Williams</a>
                    </Link>
                  </h3>
                  <p className="position">Food Farmers</p>
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
      </section>
      {/*====== End Farmers Section ======*/}
      {/*====== Start Portfolio Section ======*/}
      <section className="projects-section pt-90">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Project Gallery</span>
                <h2>
                  We’ve Done Many Other Projects Let’s See Gallery Insights
                </h2>
              </div>
            </div>
          </div>
          <Slider {...projectsSliderTwo} className="projects-slider-two">
            <div className="project-item-two wow fadeInDown">
              <div className="img-holder">
                <img
                  src="assets/images/portfolio/img-25.jpg"
                  alt="project image"
                />
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
            <div className="project-item-two wow fadeInUp">
              <div className="img-holder">
                <img
                  src="assets/images/portfolio/img-26.jpg"
                  alt="project image"
                />
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
            <div className="project-item-two wow fadeInDown">
              <div className="img-holder">
                <img
                  src="assets/images/portfolio/img-27.jpg"
                  alt="project image"
                />
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
            <div className="project-item-two wow fadeInUp">
              <div className="img-holder">
                <img
                  src="assets/images/portfolio/img-26.jpg"
                  alt="project image"
                />
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
      {/*====== End Portfolio Section ======*/}
      {/*====== Start Testimonial Section ======*/}
      <section className="testimonial-three pt-130 pb-130">
        <div className="container">
          <TestimonialSlider />
        </div>
      </section>
      {/*====== End Testimonial Section ======*/}
      {/*====== Start Blog Section ======*/}
      <section className="blog-two pb-90 pt-130 light-gray-bg pb-160">
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
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
              <div className="blog-post-item-two mb-40 wow fadeInUp">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/img-4.jpg" alt="Post Image" />
                </div>
                <div className="entry-content bg-white">
                  <a href="#" className="cat-btn">
                    Organic Foods
                  </a>
                  <h3 className="title">
                    <a href="#">Smashin Podcast Episode Ferdinande Web Dead</a>
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
                  <img src="assets/images/blog/img-5.jpg" alt="Post Image" />
                </div>
                <div className="entry-content bg-white">
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
              <div className="blog-post-item-two mb-40 wow fadeInUp">
                <div className="post-thumbnail">
                  <img src="assets/images/blog/img-6.jpg" alt="Post Image" />
                </div>
                <div className="entry-content bg-white">
                  <a href="#" className="cat-btn">
                    Organic Foods
                  </a>
                  <h3 className="title">
                    <a href="#">Smashin Podcast Episode Ferdinande Web Dead</a>
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
    </Layout>
  );
};
export default Index3;
