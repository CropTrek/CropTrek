import Link from "next/link";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
const ProductsRightSidebar = () => {
  return (
    <Layout>
      <PageBanner pageTitle={"Shop Right Sidebar"} pageName="Shop" />
      <section className="shaop-page pt-170 pb-70">
        <div className="container">
          <div className="product-search-filter wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row align-items-center">
                <div className="col-lg-3 order-2">
                  <div className="product-search mb-30">
                    <div className="form_group">
                      <input
                        type="search"
                        className="form_control"
                        placeholder="Search"
                        name="search"
                      />
                      <button className="search-btn">
                        <i className="far fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 order-1">
                  <div className="row justify-content-between align-items-center mb-15">
                    <div className="col-lg-4 col-md-6">
                      <div className="show-text mb-15">
                        <p>Showing 1 - 12 of 30 Results</p>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-6">
                      <div className="filter-category mb-15">
                        <ul>
                          <li>
                            <select className="wide">
                              <option data-display="Sort by Newness">
                                Sort by Newness
                              </option>
                              <option value={1}>Price High To Low</option>
                              <option value={2}>Price Low To High</option>
                            </select>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>
                                <i className="far fa-list" />
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products">
                              <a>
                                <i className="far fa-th" />
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 order-2">
              <div className="prodcut-sidebar">
                <div className="widget category-widget mb-30 wow fadeInUp">
                  <h4 className="widget-title">Category</h4>
                  <ul className="category-nav">
                    <li>
                      <a href="#">
                        <i className="far fa-plus" />
                        Canvas Basket <span>05</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="far fa-plus" />
                        Home Decoration <span>03</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="far fa-plus" />
                        Wood Essentials <span>07</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="far fa-plus" />
                        Home/Furniture <span>04</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="far fa-plus" />
                        Interior Office <span>09</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="far fa-plus" />
                        Interior Office <span>15</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="widget product-sidebar-widget mb-30 wow fadeInUp">
                  <h4 className="widget-title">Sale Products</h4>
                  <ul className="product-list">
                    <li className="product-item">
                      <div className="thumb">
                        <img src="assets/images/products/thumb-1.png" alt="" />
                      </div>
                      <div className="info">
                        <h6>
                          <Link href="/product-details">
                            <a>Soft Taddey</a>
                          </Link>
                        </h6>
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
                    </li>
                    <li className="product-item">
                      <div className="thumb">
                        <img src="assets/images/products/thumb-2.png" alt="" />
                      </div>
                      <div className="info">
                        <h6>
                          <Link href="/product-details">
                            <a>Arabian Horse</a>
                          </Link>
                        </h6>
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
                    </li>
                    <li className="product-item">
                      <div className="thumb">
                        <img src="assets/images/products/thumb-3.png" alt="" />
                      </div>
                      <div className="info">
                        <h6>
                          <Link href="/product-details">
                            <a>Multicolor Toys</a>
                          </Link>
                        </h6>
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
                    </li>
                    <li className="product-item">
                      <div className="thumb">
                        <img src="assets/images/products/thumb-4.png" alt="" />
                      </div>
                      <div className="info">
                        <h6>
                          <Link href="/product-details">
                            <a>Wood Building</a>
                          </Link>
                        </h6>
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
                    </li>
                  </ul>
                </div>
                <div className="widget price-range-widget mb-30 wow fadeInUp">
                  <h4 className="widget-title">Filter By Price</h4>
                  <div id="slider-range" />
                  <div className="price-number">
                    <span className="amount">
                      <input type="text" id="amount" />
                    </span>
                  </div>
                </div>
                <div className="widget product-tag-cloud mb-30 wow fadeInUp">
                  <h4 className="widget-title">Popular Tags</h4>
                  <a href="#">Pasta</a>
                  <a href="#">Burger</a>
                  <a href="#">Coffee</a>
                  <a href="#">Pizza Pasta</a>
                  <a href="#">Organic</a>
                  <a href="#">Sea Fish</a>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 order-1">
              <div className="products-wrapper">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-product-item mb-60 wow fadeInUp">
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
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-product-item mb-60 wow fadeInDown">
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
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-product-item mb-60 wow fadeInUp">
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
                            <a>Organice Delicious Pomegranate</a>
                          </Link>
                        </h3>
                        <span className="price">
                          <span className="curreny">$</span>53.56
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-product-item mb-60 wow fadeInDown">
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
                            <a>Organice Delicious Pomegranate</a>
                          </Link>
                        </h3>
                        <span className="price">
                          <span className="curreny">$</span>53.56
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-product-item mb-60 wow fadeInUp">
                      <div className="product-img">
                        <img src="assets/images/products/img-5.png" alt="" />
                        <div className="pc-btn">Fruits</div>
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
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-product-item mb-60 wow fadeInDown">
                      <div className="product-img">
                        <img src="assets/images/products/img-6.png" alt="" />
                        <div className="pc-btn">Orange</div>
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
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-product-item mb-60 wow fadeInUp">
                      <div className="product-img">
                        <img src="assets/images/products/img-7.png" alt="" />
                        <div className="pc-btn">Fruits</div>
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
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-product-item mb-60 wow fadeInDown">
                      <div className="product-img">
                        <img src="assets/images/products/img-8.png" alt="" />
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
                            <a>Organice Delicious Pomegranate</a>
                          </Link>
                        </h3>
                        <span className="price">
                          <span className="curreny">$</span>53.56
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="single-product-item mb-60 wow fadeInUp">
                      <div className="product-img">
                        <img src="assets/images/products/img-9.png" alt="" />
                        <div className="pc-btn">Banana</div>
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
export default ProductsRightSidebar;
