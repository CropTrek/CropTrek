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
    <>
     
        <div className="container">
         
          <PortfolioGridIsotope />
         
        </div>
    </>
  );
};
export default Portfolio;
