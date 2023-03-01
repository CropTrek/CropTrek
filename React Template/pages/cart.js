import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
const Cart = () => {
  return (
    <Layout>
      <PageBanner pageName={"Cart"} />
      <section className="cart-section pt-170 pb-130">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cart-wrapper">
                <div className="cart-table table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="remove">
                          <a href="#">
                            <i className="fas fa-trash-alt" />
                          </a>
                        </td>
                        <td className="thumbnail-title">
                          <img
                            src="assets/images/products/product-thumb-4.jpg"
                            alt=""
                          />
                          <span className="title">Strawberry Fruits</span>
                        </td>
                        <td className="price">$25</td>
                        <td className="quantity">
                          <div className="quantity-input">
                            <button className="quantity-down">-</button>
                            <input
                              className="quantity"
                              type="text"
                              defaultValue={1}
                              name="quantity"
                            />
                            <button className="quantity-up">+</button>
                          </div>
                        </td>
                        <td className="subtotal">$25</td>
                      </tr>
                      <tr>
                        <td className="remove">
                          <a href="#">
                            <i className="fas fa-trash-alt" />
                          </a>
                        </td>
                        <td className="thumbnail-title">
                          <img
                            src="assets/images/products/product-thumb-5.jpg"
                            alt=""
                          />
                          <span className="title">Apple Fruits</span>
                        </td>
                        <td className="price">$25</td>
                        <td className="quantity">
                          <div className="quantity-input">
                            <button className="quantity-down">-</button>
                            <input
                              className="quantity"
                              type="text"
                              defaultValue={1}
                              name="quantity"
                            />
                            <button className="quantity-up">+</button>
                          </div>
                        </td>
                        <td className="subtotal">$35</td>
                      </tr>
                      <tr>
                        <td className="remove">
                          <a href="#">
                            <i className="fas fa-trash-alt" />
                          </a>
                        </td>
                        <td className="thumbnail-title">
                          <img
                            src="assets/images/products/product-thumb-6.jpg"
                            alt=""
                          />
                          <span className="title">Tomato vegetable</span>
                        </td>
                        <td className="price">$25</td>
                        <td className="quantity">
                          <div className="quantity-input">
                            <button className="quantity-down">-</button>
                            <input
                              className="quantity"
                              type="text"
                              defaultValue={1}
                              name="quantity"
                            />
                            <button className="quantity-up">+</button>
                          </div>
                        </td>
                        <td className="subtotal">$55</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="cart-middle mt-40 mb-20">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="coupon-box mb-40">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form_group">
                          <input
                            type="text"
                            className="form_control"
                            placeholder="Coupon Code"
                          />
                          <button className="main-btn btn-yellow">
                            Appply Coupon
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="update-cart float-lg-right mb-40">
                      <a href="#" className="main-btn btn-yellow mr-2">
                        Shopping
                      </a>
                      <a href="#" className="main-btn btn-yellow">
                        Update Cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-lg-5">
              <div className="shopping-cart-total">
                <h4 className="title">Cart Totals</h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Cart Subtotal</td>
                      <td>$200</td>
                    </tr>
                    <tr>
                      <td>Shipping Fee</td>
                      <td>$50</td>
                    </tr>
                    <tr>
                      <td className="total">
                        <span>Order Total</span>
                      </td>
                      <td className="total">
                        <span>$250</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="main-btn btn-yellow">
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Cart;
