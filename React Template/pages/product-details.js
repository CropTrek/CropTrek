import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import PageBanner from "../src/components/PageBanner";
import ProductDetailsSlider from "../src/components/sliders/ProductDetailsSlider";
import Layout from "../src/layouts/Layout";
import { recentProductSlider } from "../src/sliderProps";
const ProductsDetails = () => {
  return (
    <Layout>
      <PageBanner pageTitle={"Product"} pageName="Product Details" />
      <section className="prodcuts-details-page pt-170 pb-130">
        <div className="container">
          <div className="product-details-wrapper wow fadeInUp">
            <div className="row">
              <div className="col-lg-7">
                <ProductDetailsSlider />
              </div>
              <div className="col-lg-5">
                <div className="product-info mb-50">
                  <h3 className="title">Organic Strawberry</h3>
                  <div className="products-rating-price d-flex">
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
                    <span className="price">
                      <span className="curreny">$</span>59.56
                    </span>
                  </div>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error silupt atem
                    accusantium doloremque laudantium rem riams eaque quae
                    abillo inventore quasi architecto beatae vitae dicta sunt
                    explicabo. Nemo enim psaml uptatem quia voluptas sit
                    aspernatur aut odit aut fugit sedes quia consequuntur magni
                    dolores eos
                  </p>
                  <ul className="product-meta">
                    <li>
                      <span>Categories :</span>
                      <a href="#">Organic, Fruits, Food</a>
                    </li>
                    <li>
                      <span>Tags :</span>
                      <a href="#">Fruits, Juice, Drink</a>
                    </li>
                  </ul>
                  <div className="product-cart">
                    <ul>
                      <li>
                        <input type="number" defaultValue={1} />
                      </li>
                      <li>
                        <a href="#" className="main-btn btn-yellow">
                          Add to cart
                        </a>
                      </li>
                      <li>
                        <a href="#" className="wishlist-btn">
                          <i className="far fa-heart" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Tab.Container defaultActiveKey={"descrptions"}>
            <div className="discription-area pb-120">
              <div className="discription-tabs mb-20">
                <Nav as="ul" className="nav">
                  <li className="nav-item">
                    <Nav.Link
                      className="nav-link"
                      as="a"
                      data-toggle="tab"
                      eventKey="descrptions"
                      href="#descrptions"
                    >
                      Descrptions
                    </Nav.Link>
                  </li>
                  <li className="nav-item">
                    <Nav.Link
                      className="nav-link"
                      as="a"
                      data-toggle="tab"
                      eventKey="information"
                      href="#information"
                    >
                      Information
                    </Nav.Link>
                  </li>
                </Nav>
              </div>
              <Tab.Content className="tab-content">
                <Tab.Pane className="tab-pane fade" eventKey="descrptions">
                  <div className="content-box">
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore verit atis et
                      quasi architecto beatae vitae dicta sunt explicabo. Nemo
                      enim ipsam voluptatem quia voluptas sit aspernatur aut
                      odit aut fugit, sed quia consequuntur magni dolores eos
                      qui ratione voluptatem sequi nesciunt. Neque porro
                      quisquam est, qui dolorem ipsum quia dolor sit amet,
                      consectetur, adipisci velit sed quia non numquam eius modi
                      tempora incidunt ut labore et dolore magnam aliquam
                      quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                      exercitationem ullam corporis suscipit laboriosam, nisi ut
                      aliquid ex ea commodi consequatur? Quis autem vel eum iure
                      reprehenderit qui in ea voluptate velit esse quam nihil
                      molestiae consequatur, vel illum qui dolorem eum
                    </p>
                  </div>
                </Tab.Pane>
                <Tab.Pane className="tab-pane fade" eventKey="information">
                  <div className="content-box">
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore verit atis et
                      quasi architecto beatae vitae dicta sunt explicabo. Nemo
                      enim ipsam voluptatem quia voluptas sit aspernatur aut
                      odit aut fugit, sed quia consequuntur magni dolores eos
                      qui ratione voluptatem sequi nesciunt. Neque porro
                      quisquam est, qui dolorem ipsum quia dolor sit amet,
                      consectetur, adipisci velit sed quia non numquam eius modi
                      tempora incidunt ut labore et dolore magnam aliquam
                      quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                      exercitationem ullam corporis suscipit laboriosam, nisi ut
                      aliquid ex ea commodi consequatur? Quis autem vel eum iure
                      reprehenderit qui in ea voluptate velit esse quam nihil
                      molestiae consequatur, vel illum qui dolorem eum
                    </p>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
          <div className="review-form">
            <h3 className="title mb-15">Leave Your Reviews</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form_group">
                    <ul className="ratings mb-25">
                      <li>
                        <span className="mr-2">Your Rating:</span>
                      </li>
                      <li className="star">
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                      <li className="star">
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                      <li className="star">
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                      <li className="star">
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                      <li className="star">
                        <a href="#">
                          <i className="fas fa-star" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form_group">
                    <input
                      type="text"
                      className="form_control"
                      placeholder="Full Name"
                      name="name"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form_group">
                    <input
                      type="text"
                      className="form_control"
                      placeholder="Email Address"
                      name="email"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form_group">
                    <input
                      type="text"
                      className="form_control"
                      placeholder="Phone Number"
                      name="phone"
                      required=""
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form_group select-100">
                    <select className="wide">
                      <option data-display="Subject :">Subject :</option>
                      <option value={1}>Customer Support</option>
                      <option value={2}>Best Product</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form_group">
                    <textarea
                      name="message"
                      className="form_control"
                      placeholder="Write Message"
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form_group">
                    <button className="main-btn btn-yellow">
                      Write Message
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/*====== End Product Details Page Section ======*/}
      {/*====== Start Recent Product ======*/}
      <section className="recent-product-section border-top-1 pt-130 pb-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-60">
                <span className="sub-title">Popular Products</span>
                <h2>Some Category Organic Products Collect Our Shop</h2>
              </div>
            </div>
          </div>
          <Slider {...recentProductSlider} className="recent-product-slider">
            <div className="single-product-item wow fadeInUp">
              <div className="product-img">
                <img src="assets/images/products/img-1.png" alt="" />
                <div className="pc-btn">Food</div>
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
            <div className="single-product-item wow fadeInDown">
              <div className="product-img">
                <img src="assets/images/products/img-2.png" alt="" />
                <div className="pc-btn">Fish</div>
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
            <div className="single-product-item wow fadeInUp">
              <div className="product-img">
                <img src="assets/images/products/img-3.png" alt="" />
                <div className="pc-btn">Food</div>
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
            <div className="single-product-item wow fadeInDown">
              <div className="product-img">
                <img src="assets/images/products/img-4.png" alt="" />
                <div className="pc-btn">Vegetable</div>
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
            <div className="single-product-item wow fadeInUp">
              <div className="product-img">
                <img src="assets/images/products/img-5.png" alt="" />
                <div className="pc-btn">Fruits</div>
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
          </Slider>
        </div>
      </section>
    </Layout>
  );
};
export default ProductsDetails;
