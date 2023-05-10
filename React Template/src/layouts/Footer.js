import Link from "next/link";
const Footer = ({ footer }) => {
  switch (footer) {
    case 3:
      return <Footer3 />;
    case 4:
      return <Footer4 />;
    default:
      return <DefaultFooter />;
  }
};
export default Footer;

const DefaultFooter = () => (
  <footer className="footer-default footer-white dark-black-bg">
    <div className="container">
      <div className="footer-top wow fadeInUp">
        <div className="row">
          <div className="col-lg-4 col-md-12 footer-contact-item">
            <div className="contact-info d-flex justify-content-center">
              <div className="site-logo text-center">
                <Link href="/">
                  <a className="brand-logo">
                    <img
                      src="assets/images/logo/logo-2.png"
                      alt="Footer Logo"
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 footer-contact-item">
            <div className="contact-info d-flex">
              <div className="icon">
                <i className="flaticon-placeholder" />
              </div>
              <div className="text">
                <h5>Locations</h5>
                <h6>Ariana, Tunis</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 footer-contact-item">
            <div className="contact-info d-flex">
              <div className="icon">
                <i className="flaticon-placeholder" />
              </div>
              <div className="text">
                <h5>Email Us</h5>
                <h6>
                  <a href="mailto:hotlineinfo@gmial.com">
                    FSociety@gmail.com
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-widget pt-70 pb-25">
        <FooterMenu />
      </div>
     
      <div className="footer-copyright">
        <div className="col-lg-12">
          <div className="copyright-text text-center">
            <p>© 2023 FSociety</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const Footer3 = () => (
  <footer
    className="footer-bg bg_cover p-r z-1 footer-white"
    style={{ backgroundImage: "url(assets/images/bg/footer-bg-1.jpg)" }}
  >
    <div className="container">
      <div className="footer-newsletter footer-newsletter-two yellow-bg">
        <div className="row">
          <div className="col-xl-3">
            <div className="footer-text">
              <h5>Subscrive Our Newsletter To Get More Updates</h5>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="newsletter-form">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="col-lg-5">
                    <div className="form_group">
                      <input
                        type="email"
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
                        placeholder="Phone"
                        name="phone"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form_group">
                      <button className="main-btn bordered-btn">
                        Subscribe Now
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-widget pb-25">
        <FooterMenu />
      </div>
      <div className="footer-copyright border-top-white-1">
        <div className="col-lg-12">
          <div className="copyright-text text-center">
            <p>© 2022 Orgrarium. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const Footer4 = () => (
  <footer className="footer-default footer-white dark-black-bg">
    <div className="container">
      <div className="footer-newsletter footer-newsletter-two yellow-bg">
        <div className="row">
          <div className="col-xl-3">
            <div className="footer-text">
              <h5>Subscrive Our Newsletter To Get More Updates</h5>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="newsletter-form">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="col-lg-5">
                    <div className="form_group">
                      <input
                        type="email"
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
                        placeholder="Phone"
                        name="phone"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form_group">
                      <button className="main-btn bordered-btn">
                        Subscribe Now
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-widget pb-25">
        <FooterMenu />
      </div>
      <div className="footer-copyright border-top-white-1">
        <div className="col-lg-12">
          <div className="copyright-text text-center">
            <p>© 2022 Orgrarium. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const FooterMenu = () => (
  <div className="row">
    <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12">
      <div className="footer-widget about-widget mb-40 wow fadeInDown">
       
      </div>
    </div>
    
   
  </div>
);
