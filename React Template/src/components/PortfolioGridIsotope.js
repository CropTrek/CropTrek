import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
const PortfolioGridIsotope = () => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".project-row", {
        itemSelector: ".project-column",
        //    layoutMode: "fitRows",
        percentPosition: true,
        masonry: {
          columnWidth: ".project-column",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);
    //     return () => isotope.current.destroy();
  }, []);
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  const activeBtn = (value) => (value === filterKey ? "active" : "");
  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="portfolio-filter-button text-center mb-60 wow fadeInDown">
            <ul className="filter-btn">
              <li
                className={`c-pointer ${activeBtn("*")}`}
                onClick={handleFilterKeyChange("*")}
                data-filter="*"
              >
                Show All
              </li>
              <li
                className={`c-pointer ${activeBtn("cat-1")}`}
                onClick={handleFilterKeyChange("cat-1")}
                data-filter=".cat-1"
              >
                Cow
              </li>
              <li
                className={`c-pointer ${activeBtn("cat-2")}`}
                onClick={handleFilterKeyChange("cat-2")}
                data-filter=".cat-2"
              >
                Vegetables
              </li>
              <li
                className={`c-pointer ${activeBtn("cat-3")}`}
                onClick={handleFilterKeyChange("cat-3")}
                data-filter=".cat-3"
              >
                Chicken
              </li>
              <li
                className={`c-pointer ${activeBtn("cat-4")}`}
                onClick={handleFilterKeyChange("cat-4")}
                data-filter=".cat-4"
              >
                Fruits
              </li>
              <li
                className={`c-pointer ${activeBtn("cat-5")}`}
                onClick={handleFilterKeyChange("cat-5")}
                data-filter=".cat-5"
              >
                Sea Fish
              </li>
              <li
                className={`c-pointer ${activeBtn("cat-6")}`}
                onClick={handleFilterKeyChange("cat-6")}
                data-filter=".cat-6"
              >
                Milk &amp; Meats
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row project-row">
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-1">
          <div className="project-item-three mb-30 wow fadeInUp">
            <div className="img-holder">
              <img src="assets/images/portfolio/img-4.jpg" alt="" />
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
                      <a>Golder Wheat</a>
                    </Link>
                  </h3>
                  <p>
                    <a href="#">Agriculture</a>,<a href="#">Foods</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-2">
          <div className="project-item-three mb-30 wow fadeInDown">
            <div className="img-holder">
              <img src="assets/images/portfolio/img-5.jpg" alt="" />
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
                      <a>Organic Grap</a>
                    </Link>
                  </h3>
                  <p>
                    <a href="#">Agriculture</a>,<a href="#">Foods</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-3">
          <div className="project-item-three mb-30 wow fadeInUp">
            <div className="img-holder">
              <img src="assets/images/portfolio/img-6.jpg" alt="" />
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
                      <a>Golder Wheat</a>
                    </Link>
                  </h3>
                  <p>
                    <a href="#">Agriculture</a>,<a href="#">Foods</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-4">
          <div className="project-item-three mb-30 wow fadeInDown">
            <div className="img-holder">
              <img src="assets/images/portfolio/img-7.jpg" alt="" />
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
                      <a>Golder Wheat</a>
                    </Link>
                  </h3>
                  <p>
                    <a href="#">Agriculture</a>,<a href="#">Foods</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-5">
          <div className="project-item-three mb-30 wow fadeInUp">
            <div className="img-holder">
              <img src="assets/images/portfolio/img-8.jpg" alt="" />
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
                      <a>Fresh Chicken</a>
                    </Link>
                  </h3>
                  <p>
                    <a href="#">Agriculture</a>,<a href="#">Foods</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-6 cat-1">
          <div className="project-item-three mb-30 wow fadeInDown">
            <div className="img-holder">
              <img src="assets/images/portfolio/img-9.jpg" alt="" />
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
                      <a>Golder Wheat</a>
                    </Link>
                  </h3>
                  <p>
                    <a href="#">Agriculture</a>,<a href="#">Foods</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-3 cat-6">
          <div className="project-item-three mb-30 wow fadeInUp">
            <div className="img-holder">
              <img src="assets/images/portfolio/img-10.jpg" alt="" />
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
                      <a>Organic Cow</a>
                    </Link>
                  </h3>
                  <p>
                    <a href="#">Agriculture</a>,<a href="#">Foods</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-2 cat-5">
          <div className="project-item-three mb-30 wow fadeInDown">
            <div className="img-holder">
              <img src="assets/images/portfolio/img-11.jpg" alt="" />
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
                      <a>Golder Wheat</a>
                    </Link>
                  </h3>
                  <p>
                    <a href="#">Agriculture</a>,<a href="#">Foods</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-4">
          <div className="project-item-three mb-30 wow fadeInUp">
            <div className="img-holder">
              <img src="assets/images/portfolio/img-12.jpg" alt="" />
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
                      <a>Golder Sunflower</a>
                    </Link>
                  </h3>
                  <p>
                    <a href="#">Agriculture</a>,<a href="#">Foods</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default PortfolioGridIsotope;
