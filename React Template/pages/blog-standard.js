import Link from "next/link";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
const BlogStandard = () => {
  return (
    <Layout>
      <PageBanner pageName={"Blog Standard"} />
      <section className="blog-standard-section pt-170 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="blog-standard-wrapper">
                <div className="blog-post-item-three mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                    <img
                      src="assets/images/blog/blog-standard-1.jpg"
                      alt="Post Image"
                    />
                  </div>
                  <div className="entry-content white-bg">
                    <a href="#" className="cat-btn">
                      Organic Foods
                    </a>
                    <h3 className="title">
                      <Link href="/blog-details">
                        <a>
                          Powerful Terminal And Command Line Seeny Tools Modern
                          Web Development
                        </a>
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
                <div className="blog-post-item-three mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                    <img
                      src="assets/images/blog/blog-standard-2.jpg"
                      alt="Post Image"
                    />
                    <div className="play-content-box">
                      <a
                        href="https://www.youtube.com/watch?v=gOZ26jO6iXE"
                        className="video-popup"
                      >
                        <i className="fas fa-play" />
                      </a>
                    </div>
                  </div>
                  <div className="entry-content white-bg">
                    <a href="#" className="cat-btn">
                      Organic Foods
                    </a>
                    <h3 className="title">
                      <Link href="/blog-details">
                        <a>
                          Powerful Terminal And Command Line Seeny Tools Modern
                          Web Development
                        </a>
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
                <div className="blog-post-item-three blog-post-bg mb-60 wow fadeInUp">
                  <div className="entry-content yellow-bg">
                    <a href="#" className="cat-btn">
                      Organic Foods
                    </a>
                    <h3 className="title">
                      <Link href="/blog-details">
                        <a>
                          Powerful Terminal And Command Line Seeny Tools Modern
                          Web Development
                        </a>
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
                <div className="blog-post-item-three mb-60 wow fadeInUp">
                  <div className="post-thumbnail">
                    <img
                      src="assets/images/blog/blog-standard-3.jpg"
                      alt="Post Image"
                    />
                  </div>
                  <div className="entry-content white-bg">
                    <a href="#" className="cat-btn">
                      Organic Foods
                    </a>
                    <h3 className="title">
                      <Link href="/blog-details">
                        <a>
                          Powerful Terminal And Command Line Seeny Tools Modern
                          Web Development
                        </a>
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
                <div className="blog-post-item-three blog-post-bg mb-60 wow fadeInUp">
                  <div className="entry-content light-gray-bg">
                    <a href="#" className="cat-btn">
                      Organic Foods
                    </a>
                    <h3 className="title">
                      <Link href="/blog-details">
                        <a>
                          Powerful Terminal And Command Line Seeny Tools Modern
                          Web Development
                        </a>
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
              <div className="pagination mb-50 wow fadeInUp">
                <ul>
                  <li>
                    <a href="#">01</a>
                  </li>
                  <li>
                    <a href="#">02</a>
                  </li>
                  <li>
                    <a href="#">03</a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="far fa-angle-right" />
                    </a>
                  </li>
                </ul>
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
                <div className="widget author-widget mb-40 wow fadeInUp">
                  <div className="author-content">
                    <img
                      src="assets/images/widget/uuser-1.jpg"
                      alt="User Image"
                    />
                    <h4>Robert T. Patterson</h4>
                    <p>
                      Sed ut perspiciat unde omnis istenatus error sit
                      voluptatem accusantium emque laudantium totam aperiam
                      eaque ipquae abillo inventore veritatis quase
                    </p>
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
                          <i className="fab fa-linkedin-in" />
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
                <div className="widget recent-post-widget mb-40 wow fadeInUp">
                  <h4 className="widget-title">Recent News</h4>
                  <ul className="recent-post-list">
                    <li className="post-thumbnail-content">
                      <img
                        src="assets/images/widget/news-1.jpg"
                        alt="post image"
                      />
                      <div className="post-title-date">
                        <h6>
                          <Link href="/blog-details">
                            <a>Guide Modern CSS Colors HWB, LAB</a>
                          </Link>
                        </h6>
                        <span className="posted-on">
                          By <a href="#">Somalia D. Silba</a>
                        </span>
                      </div>
                    </li>
                    <li className="post-thumbnail-content">
                      <img
                        src="assets/images/widget/news-2.jpg"
                        alt="post image"
                      />
                      <div className="post-title-date">
                        <h6>
                          <Link href="/blog-details">
                            <a>Guide Modern CSS Colors HWB, LAB</a>
                          </Link>
                        </h6>
                        <span className="posted-on">
                          By <a href="#">Somalia D. Silba</a>
                        </span>
                      </div>
                    </li>
                    <li className="post-thumbnail-content">
                      <img
                        src="assets/images/widget/news-3.jpg"
                        alt="post image"
                      />
                      <div className="post-title-date">
                        <h6>
                          <Link href="/blog-details">
                            <a>Guide Modern CSS Colors HWB, LAB</a>
                          </Link>
                        </h6>
                        <span className="posted-on">
                          By <a href="#">Somalia D. Silba</a>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="widget tag-cloud-widget mb-40 wow fadeInUp">
                  <h4 className="widget-title">Popular Tags</h4>
                  <a href="#">Milk &amp; Meat</a>
                  <a href="#">Fruits</a>
                  <a href="#">Vegetable</a>
                  <a href="#">Coffee</a>
                  <a href="#">Pizza Pasta</a>
                  <a href="#">Organic</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default BlogStandard;
