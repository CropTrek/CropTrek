import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import PageBanner from "../src/components/PageBanner";

import Layout from "../src/layouts/Layout";
import Carousel from 'react-bootstrap/Carousel';


const Farms = () => {

  const [farms,setFarms] =useState([]);
  const getFarms=()=>{
    axios.get('http://localhost:5000/farms/getFarmsByUser/63e6444963343c4cdd19446f').then((response)=>{
      console.log(response);
      const myFarms=response.data;
      setFarms(myFarms);
    })
  };
 
 
  useEffect( ()=>{
    getFarms()
  },[]);
  
 
  



  return (
    <Layout>
      <PageBanner pageName={"Farms"} />
  




         


      {/*====== Start Skill Section ======*/}
      {farms.map((element)=>(  
                      <>
      <section className="skill-section-two pt-lg-130">
    
        <div className="container-fluid">
          <div
            className="skill-wrapper-one pb-90 bg_cover"
            style={{ backgroundImage: "url(assets/images/bg/skill-bg-2.jpg)" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-7">
                  <div className="skill-two_content-box content-box-gap mb-40 wow fadeInUp">
                    <div className="section-title section-title-left mb-30">
                      <span className="sub-title">Farm</span>
                      <h2>Your farm's informations </h2>
                    </div>
                  
                      
                      <p><h5>
                     {element.description}
                      </h5></p>
                    <div className="skill-bar">
                      <div className="skill-title">
                        <h5>
                         Country<span>{element.country}</span>
                        </h5>
                      </div>
                      
                      <div
                        className="progress-bar wow slideInLeft"
                        style={{ width: "100%" }}
                      />
                      <div className="progress" />
                      
                    </div>
                  
                  < div className="skill-bar">
                    <div className="skill-title">
                      <h5>
                       Area<span>{element.area} m² </span>
                      </h5>
                    </div>
                    
                    <div
                      className="progress-bar wow slideInLeft"
                      style={{ width: "100%" }}
                    />
                    <div className="progress" />
                  
                  </div>
                  < div className="skill-bar">
                    <div className="skill-title">
                      <h5>
                       Number of trees<span>{element.trees.length}  </span>
                      </h5>
                    </div>
                    
                    <div
                      className="progress-bar wow slideInLeft"
                      style={{ width: "100%" }}
                    />
                    <div className="progress" />
                  
                  </div>
                  
              
              
                    
                  
                   
                    
                   <div className="skill-button">
                      <Link href="#divTree">
                        <a className="main-btn bordered-btn">Discover your trees</a>
                      </Link>
                    </div> 
                  
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Skill Section ======*/}
      {/*====== Start Service Section ======*/}
      <div  id="divTree">
      <section className="popular-service pt-130 pb-80">
     
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title">Trees</span>
                <h2>Tree's information</h2>
              </div>
            </div>
          </div>
          <Carousel>
          { element.trees.map((tree)=>(
      <Carousel.Item>
          <div className="row align-items-center">
            
            <div className="col">
            <div className="skill-bar">
                      <div className="skill-title">
                        <h5>
                         Name<span>{tree.name}</span>
                        </h5>
                      </div>
                      
                      <div
                        className="progress-bar wow slideInLeft"
                        style={{ width: "100%" }}
                      />
                      <div className="progress" />
                      
                    </div>
            
               
              <div className="skill-bar">
                      <div className="skill-title">
                        <h5>
                        Type<span>{tree.type}</span>
                        </h5>
                      </div>
                      
                      <div
                        className="progress-bar wow slideInLeft"
                        style={{ width: "100%" }}
                      />
                      <div className="progress" />
                      
                    </div>
                    <div className="skill-bar">
                      <div className="skill-title">
                        <h5>
                         Season<span>{tree.season}</span>
                        </h5>
                      </div>
                      
                      <div
                        className="progress-bar wow slideInLeft"
                        style={{ width: "100%" }}
                      />
                      <div className="progress" />
                      
                    </div>
                   
                    </div>
            
            
            <div className="col">
              <div className="img-holder mb-50 wow fadeInDown">
                <img
                  src={"assets/imagesTree/"+tree.image}
                  alt="Service Image"
                />
              </div>
            </div>
          
          </div>
          </Carousel.Item>
             ))}
    </Carousel>
        </div>
    
      </section>
     
      </div>
      </> 
        )) }
     
    
    </Layout>
  );
};
export default Farms;
