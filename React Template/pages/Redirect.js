import Link from "next/link";
import React from "react";


const Redirect = () =>{

    return(
        <section className="service-one dark-black-bg pt-130 pb-125 p-r z-1">
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-10">
            <div className="section-title section-title-white text-center mb-60 wow fadeInUp">
              <span className="sub-title">CropTrek</span>
              <h2>Oops ! Something Went Wrong ! We Will Provide You With A Verification Mail </h2>
              <br/>
              <a href="/"><button className="main-btn yellow-bg" >
                          Home
                        </button></a>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-12">
            <div
              className="play-one_content-box bg_cover wow fadeInDown"
              style={{
                backgroundImage: "url(assets/images/bg/intro-bg-1.jpg)",
              }}
            >
              
            </div>
          </div>
        </div>
      </div></section>
    )
}


export default Redirect;