import PageBanner from "../src/components/PageBanner";
// import PortfolioGridIsotope from "../src/components/PortfolioGridIsotope";
import Link from "next/link";
import Layout from "../src/layouts/Layout";

import dynamic from "next/dynamic";

const PortfolioGridIsotope = dynamic(
  () => import("../src/components/PortfolioGridIsotope"),
  {
    ssr: false,
  }
);

const Portfolio = () => {
  return (
    <Layout>
      <PageBanner pageTitle={"Portfolio"} pageName="Portfolio Grid" />
      <section
        className="project-grid-page p-r z-1 pt-170 pb-130"
        id="project-filter"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-10">
              <div className="section-title text-center mb-50 wow fadeInUp">
                <span className="sub-title">Project Gallery</span>
                <h2>
                  We’ve Done Many Other Projects Let’s See Gallery Insights
                </h2>
              </div>
            </div>
          </div>
          <PortfolioGridIsotope />
          <div className="row">
            <div className="col-lg-12">
              <div className="button-box text-center mt-30 wow fadeInDown">
                <Link href="/portfoloio-grid">
                  <a className="main-btn bordered-btn bordered-yellow">
                    View More Projects
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Portfolio;
