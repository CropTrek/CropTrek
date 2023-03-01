import Link from "next/link";
import Slider from "react-slick";
import PageBanner from "../src/components/PageBanner";
import TestimonialSlider from "../src/components/sliders/TestimonialSlider";
import Layout from "../src/layouts/Layout";
import { logoSlider, projectsSliderTwo } from "../src/sliderProps";
const Services = () => {
  return (
    <Layout>
      <PageBanner pageName={"Services"} />
      <section className="service-section pt-170 pb-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-title section-title-left mb-50 wow fadeInLeft">
                <span className="sub-title">Healthy Foods</span>
                <h2>What We Provide For Your Better Health</h2>
              </div>
            </div>
            <div className="col-lg-6 mb-50">
              <p className="wow fadeInRight">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium totam rem aperiam eaque
                inventore veritatis quasi architecto beatae vitae dicta suntexpc
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur audit
                aut fugit sed quia consequuntur magni dolores
              </p>
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
        </div>
      </section>
      {/*====== End Service Section ======*/}
      {/*====== Start Skill Section ======*/}
      <section className="skill-section-two pt-lg-130">
        <div className="container-fluid">
          <div
            className="skill-wrapper-one pb-90 bg_cover"
            style={{ backgroundImage: "url(assets/images/bg/skill-bg-2.jpg)" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-7">
                  <div className="skill-two_content-box content-box-gap mb-40 wow fadeInUp">
                    <div className="section-title section-title-left mb-30">
                      <span className="sub-title">Experience</span>
                      <h2>We’re Best Agriculture &amp; Organic Firms</h2>
                    </div>
                    <p>
                      Natus error sit voluptatem accusantium doloremque
                      laudatium, totam rem aperiam, eaque ipsa quae ab illo
                      inventore veritatis et quasi architecto beatae vitae dicta
                      sunt
                    </p>
                    <div className="skill-bar">
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
                    <div className="skill-bar">
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
                    <div className="skill-button">
                      <Link href="/about">
                        <a className="main-btn bordered-btn">Learn More Us</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Skill Section ======*/}
      {/*====== Start Service Section ======*/}
      <section className="popular-service pt-130 pb-80">
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
              <div className="single-service-item mb-50 card-rtl wow fadeInUp">
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
      {/*====== Start Partners Section ======*/}
      <section className="partners-section">
        <div className="container-1350">
          <div className="partners-wrap-three yellow-bg pb-60 pt-50 p-r z-1">
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
      </section>{" "}
      {/*====== End Partners Section ======*/}
      {/*====== Start Portfolio Section ======*/}
      <section className="projects-section pt-130">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title text-center mb-60">
                <span className="sub-title">Project Gallery</span>
                <h2>
                  We’ve Done Many Other Projects Let’s See Gallery Insights
                </h2>
              </div>
            </div>
          </div>
          <Slider {...projectsSliderTwo} className="projects-slider-two">
            <div className="project-item-two wow fadeInUp">
              <div className="img-holder">
                <img src="assets/images/portfolio/img-25.jpg" alt="" />
                <div className="hover-portfolio">
                  <div className="hover-content">
                    <Link href="/portfolio-details">
                      <a className="icon-btn">
                        <i className="far fa-arrow-right" />
                      </a>
                    </Link>
                    <h3 className="title">
                      <Link href="/portfolio-details">
                        <a>Cow Eating Gress From Farms</a>
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="project-item-two wow fadeOutDown">
              <div className="img-holder">
                <img src="assets/images/portfolio/img-26.jpg" alt="" />
                <div className="hover-portfolio">
                  <div className="hover-content">
                    <Link href="/portfolio-details">
                      <a className="icon-btn">
                        <i className="far fa-arrow-right" />
                      </a>
                    </Link>
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
                <img src="assets/images/portfolio/img-27.jpg" alt="" />
                <div className="hover-portfolio">
                  <div className="hover-content">
                    <Link href="/portfolio-details">
                      <a className="icon-btn">
                        <i className="far fa-arrow-right" />
                      </a>
                    </Link>
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
    </Layout>
  );
};
export default Services;
