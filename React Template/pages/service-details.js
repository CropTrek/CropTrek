import Link from "next/link";
import Slider from "react-slick";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import { serviceSliderOne } from "../src/sliderProps";
const ServicesDetails = () => {
  return (
    <Layout>
      <PageBanner pageTitle={"Services"} pageName={" Service Details"} />
      <section className="service-details-section pt-170 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="service-details-wrapper">
                <div className="img-holder wow fadeInUp">
                  <img src="assets/images/service/single-img-1.jpg" alt="" />
                </div>
                <div className="content text-center wow fadeInDown">
                  <h3 className="title">
                    Organic Fresh Whats &amp; Vegetables
                  </h3>
                  <p>
                    Nemo enim epsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit seduia consequuntur magni dolores eosratione
                    voluptatem
                  </p>
                </div>
                <div className="service-content wow fadeInUp">
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim
                    ad minima veniam, quis nostrum exercitationem ullam corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequatur Quis autem vel eum iure reprehenderit qui in ea
                    voluptate velit esse quam nihil molestiae consequatur
                    veillum
                  </p>
                  <div className="choose-item-list mb-50">
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
                  <div className="content-img wow fadeInDown">
                    <img src="assets/images/service/single-img-2.jpg" alt="" />
                  </div>
                  <h4>Benitif Agriculture Foods</h4>
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    oditaut fugised quia consequunte magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem quia dolor sit amet consectetur adipisci velit
                    sed quia non numquam eius modi tempora incidunt ut labore et
                    dolore magnam aliquam quaerat voluptatem.
                  </p>
                  <div className="row">
                    <div className="col-xl-6 col-lg-12 col-md-6">
                      <div className="features-item-three d-flex mb-40 wow fadeInUp">
                        <div className="icon">
                          <i className="flaticon-tractor" />
                        </div>
                        <div className="text">
                          <h5>Modern Agriculture Equipment</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-6">
                      <div className="features-item-three d-flex mb-40 wow fadeInUp">
                        <div className="icon">
                          <i className="flaticon-tractor" />
                        </div>
                        <div className="text">
                          <h5>Organic and Fresh Harvest of Wheat</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-6">
                      <div className="features-item-three d-flex mb-40 wow fadeInUp">
                        <div className="icon">
                          <i className="flaticon-tractor" />
                        </div>
                        <div className="text">
                          <h5>Lot’s Professional &amp; Expert Farmers</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-6">
                      <div className="features-item-three d-flex mb-40 wow fadeInUp">
                        <div className="icon">
                          <i className="flaticon-tractor" />
                        </div>
                        <div className="text">
                          <h5>Provide Full Natural Goodness</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5">
              <div className="sidebar-widget-area">
                <div className="widget search-widget mb-40 wow fadeInUp">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form_group">
                      <input
                        type="email"
                        className="form_control"
                        placeholder="Search here"
                        name="email"
                        required=""
                      />
                      <button className="search-btn">
                        <i className="far fa-search" />
                      </button>
                    </div>
                  </form>
                </div>
                <div className="widget category-widget mb-40 wow fadeInUp">
                  <h4 className="widget-title">Category</h4>
                  <ul className="category-nav">
                    <li>
                      <a href="#">
                        Organic Vegetables
                        <span>
                          <i className="far fa-arrow-right" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Fresh Jack Fruits
                        <span>
                          <i className="far fa-arrow-right" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Chicken Meat &amp; Eggs
                        <span>
                          <i className="far fa-arrow-right" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Organic Wheats
                        <span>
                          <i className="far fa-arrow-right" />
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Cow Meat &amp; Milk
                        <span>
                          <i className="far fa-arrow-right" />
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className="widget contact-info-widget bg_cover mb-40 wow fadeInUp"
                  style={{
                    backgroundImage: "url(assets/images/widget/contact-1.jpg)",
                  }}
                >
                  <div className="contact-info-box text-center">
                    <div className="icon">
                      <i className="far fa-phone" />
                    </div>
                    <div className="info">
                      <h4>
                        <a href="tel:+01234567899">+0123 (456) 7899</a>
                      </h4>
                      <h5>
                        <a href="mailto:support@gmail.com">support@gmail.com</a>
                      </h5>
                      <a
                        href="#"
                        className="main-btn bordered-btn bordered-black"
                      >
                        Contact us
                      </a>
                    </div>
                  </div>
                </div>
                <div className="widget download-widget mb-40 wow fadeInUp">
                  <a href="#">
                    <i className="far fa-file-pdf" />
                    Download pdf
                  </a>
                  <a href="#">
                    <i className="far fa-file-word" />
                    Download doc.
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End service-details-section Section ======*/}
      <section className="service-section light-gray-bg pt-130 pb-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title text-center mb-50">
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
      </section>{" "}
    </Layout>
  );
};
export default ServicesDetails;
