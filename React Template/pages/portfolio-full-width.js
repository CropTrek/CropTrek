import Link from "next/link";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";

import dynamic from "next/dynamic";
// import PortfolioFullWidthIsotope from "../src/components/PortfolioFullWidthIsotope";

const PortfolioFullWidthIsotope = dynamic(
  () => import("../src/components/PortfolioFullWidthIsotope"),
  {
    ssr: false,
  }
);
const PortfolioFullWidth = () => {
  return (
    <Layout>
      <PageBanner pageTitle={"Portfolio"} pageName=" Portfolio Full Width" />
      <section className="portfolio-full-page pt-170 pb-130">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">Project Gallery</span>
                <h2>
                  We’ve Done Many Other Projects Let’s See Gallery Insights
                </h2>
              </div>
            </div>
          </div>
          <PortfolioFullWidthIsotope />
          <div className="row">
            <div className="col-lg-12">
              <div className="button-box text-center mt-30 wow fadeInUp">
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
export default PortfolioFullWidth;
