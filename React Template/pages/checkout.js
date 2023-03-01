import { Accordion } from "react-bootstrap";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
const Checkout = () => {
  return (
    <Layout>
      <PageBanner pageName={"Checkout"} />
      <section className="checkout-section pt-170 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="checkout-faqs" id="checkout-faqs">
                <Accordion>
                  <div className="alert">
                    <h6>
                      Returning customer?{" "}
                      <Accordion.Toggle
                        as={"a"}
                        className="card-header c-pointer"
                        data-toggle="collapse"
                        data-target="#collapse0"
                        aria-expanded="false"
                        eventKey="collapse0"
                      >
                        Click here to login
                      </Accordion.Toggle>
                    </h6>
                    <Accordion.Collapse
                      eventKey="collapse0"
                      className="content"
                    >
                      <form onSubmit={(e) => e.preventDefault()} action="#">
                        <p>Please login your accont.</p>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="email"
                                id="email-address"
                                name="email-address"
                                className="form_control"
                                defaultValue=""
                                placeholder="Your Email Address"
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                type="password"
                                id="password"
                                name="password"
                                className="form_control"
                                defaultValue=""
                                placeholder="Your Password"
                                required=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-footer d-flex align-items-center">
                          <button type="submit" className="main-btn btn-yellow">
                            login <i className="fas fa-angle-double-right" />
                          </button>
                          <input
                            type="checkbox"
                            name="loss-passowrd"
                            id="loss-passowrd"
                            required=""
                          />
                          <label htmlFor="loss-passowrd">Remember me</label>
                        </div>
                        <a href="#">Lost your password?</a>
                      </form>
                    </Accordion.Collapse>
                  </div>
                </Accordion>
                <Accordion>
                  <div className="alert">
                    <h6>
                      Have a coupon?{" "}
                      <Accordion.Toggle
                        as={"a"}
                        className="c-pointer card-header"
                        data-toggle="collapse"
                        eventKey="collapse3"
                        aria-expanded="false"
                      >
                        Click here to enter your code
                      </Accordion.Toggle>
                    </h6>
                    <Accordion.Collapse
                      eventKey="collapse3"
                      className="content"
                    >
                      <form onSubmit={(e) => e.preventDefault()} action="#">
                        <p>If you have a coupon code, please apply it below.</p>
                        <div className="form-group">
                          <input
                            type="text"
                            id="coupon-code"
                            name="coupon-code"
                            className="form_control"
                            defaultValue=""
                            placeholder="Coupon Code"
                            required=""
                          />
                        </div>
                        <button type="submit" className="main-btn btn-yellow">
                          apply coupon
                        </button>
                      </form>
                    </Accordion.Collapse>
                  </div>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="checkout-wrapper mt-50 mb-80">
                <h4 className="title mb-15">Billing Details</h4>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="checkout-form"
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <h5>Personal Information</h5>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="First Name"
                          name="name"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Last Name"
                          name="name"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
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
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="email"
                          className="form_control"
                          placeholder="Email Address"
                          name="phone"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Company Name (Optional)"
                          name="phone"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Company Address (Optional)"
                          name="phone"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <h5>Your Address</h5>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group select-100">
                        <select className="wide">
                          <option value={0}>Select Country</option>
                          <option value={1}>Australia</option>
                          <option value={2}>Bangladesh</option>
                          <option value={2}>Canada</option>
                          <option value={3}>China</option>
                          <option value={4}>Morocco</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="City"
                          name="city"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="State"
                          name="state"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Zip"
                          name="zip"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="House, street name"
                          name="street-name"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Apartment, suite, unit etc. (optional)"
                          name="apartment-name"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <h5>Order Notes (optional)</h5>
                    </div>
                    <div className="col-lg-12">
                      <textarea
                        name="order-note"
                        className="form_control"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="payment-cart-total">
            <div className="row">
              <div className="col-lg-6">
                <div className="payment-method mb-50">
                  <h4 className="title mb-20">Payment Method</h4>
                  <Accordion
                    defaultActiveKey="collapseOne"
                    as="ul"
                    id="paymentMethod"
                    className="mb-30"
                  >
                    {/* Default unchecked */}
                    <li className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="methodone"
                        name="defaultExampleRadios"
                        defaultChecked
                      />
                      <Accordion.Toggle
                        as="label"
                        className="custom-control-label"
                        htmlFor="methodone"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        eventKey="collapseOne"
                      >
                        Direct Bank Transfer{" "}
                        <i className="fas fa-money-check" />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey="collapseOne"
                        data-parent="#paymentMethod"
                        style={{}}
                      >
                        <p>
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped our account.
                        </p>
                      </Accordion.Collapse>
                    </li>
                    {/* Default unchecked */}
                    <li className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="methodtwo"
                        name="defaultExampleRadios"
                      />
                      <Accordion.Toggle
                        as="label"
                        className="custom-control-label collapsed"
                        htmlFor="methodtwo"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        eventKey="collapseTwo"
                      >
                        Cash On Delivery <i className="fas fa-truck" />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey="collapseTwo"
                        data-parent="#paymentMethod"
                        style={{}}
                      >
                        <p>Pay with cash upon delivery.</p>
                      </Accordion.Collapse>
                    </li>
                    {/* Default unchecked */}
                    <li className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="methodthree"
                        name="defaultExampleRadios"
                      />
                      <Accordion.Toggle
                        as="label"
                        className="custom-control-label collapsed"
                        htmlFor="methodthree"
                        data-toggle="collapse"
                        data-target="#collapsethree"
                        eventKey="collapsethree"
                      >
                        Paypal <i className="fab fa-cc-paypal" />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey="collapsethree"
                        data-parent="#paymentMethod"
                        style={{}}
                      >
                        <p>
                          Pay via PayPal; you can pay with your credit card if
                          you don’t have a PayPal account.
                        </p>
                      </Accordion.Collapse>
                    </li>
                  </Accordion>
                  <p>
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our privacy policy.
                  </p>
                  <button className="main-btn btn-yellow">Place Order</button>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="shopping-cart-total mb-50">
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
        </div>
      </section>
    </Layout>
  );
};
export default Checkout;
