import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Access from "./Access"
import Pagination from "react-bootstrap/Pagination";
import Carousel from 'react-bootstrap/Carousel';
import Layout from "/src/layouts/Layout";
import { Button, Row } from "reactstrap";
import { Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import PreLoader from "../src/layouts/PreLoader";
const ITEMS_PER_PAGE = 1;

const Farms = () => {
  const [farms,setFarms] =useState([]);
  const [pays,setPays] =useState("Tunis");
  const [connectedUser, setConnectedUser] = useState('');
  const [registerFarm, setRegisterFarm] = useState(false);
  const [existFarm, setExistFarm] = useState(false);
  const[crops,setCrops]=useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  
  const [weatherData, setWeatherData] = useState({ location: "Tunis",
  current: {
    condition: "sunny"
  }});
  const activeLinkStyle = {
    color: 'yellow',
    textDecoration: 'underline yellow',
  };
  const styles = {
    color: 'gray' }
    const styles2 = {
      color: 'black' }
      const cropIcons = {
        "Cucumber": "🥒",
        "Eggplant": "🍆",
        "Garden onion": "🧅",
        "Potato": "🥔",
        "Cabbage": "🥬",
        "Cauliflower": "🥦",
        "Kohlrabi": "🥔",
        "Turnip rape": "🌱",
        "Brussel sprouts": "🥦",
        "Bok choy": "🥬",
        "Cayenne pepper": "🌶️",
        "Field pumpkin": "🎃",
        "Beet": "🫒",
        "Common bean": "🌱",
        "Winter squash": "🎃",
        "Sweetpotato": "🍠",
        "Coriander": "🌿",
        "Wild celery": "🌿",
        "Maize": "🌽",
        "Spinach": "🍃",
        "Okra": "🌿",
        "Garlic": "🧄",
        "Pea": "🌱",
        "Crookneck squash": "🎃",
        "Garden asparagus": "🍆",
        "Globe artichoke": "🌱",
        "Lettuce": "🥬",
        "Garden carrot": "🥕",
        "Tomato": "🍅",
        "Ginger": "🍃",
        "Common coconut palm": "🥥",
        "Peach": "🍑",
        "Mango tree": "🥭",
        "Sweet cherry": "🍒",
        "Red raspberry": "🍓",
        "Avocado": "🥑",
        "Lemon": "🍋",
        "Common fig": "🌿",
        "Date palm": "🌴",
        "Mandarin orange": "🍊",
        "European plum": "🍑",
        "Pomegranate": "🍎",
        "Paradise apple": "🍎",
        "Cantaloupe": "🍈",
        "Wine grape": "🍇",
        "Blackthorn": "🍒",
        "Pineapple": "🍍",
        "Papaya": "🍈",
        "Common passionfruit": "🍇",
        "Common pear": "🍐",
        "Dragon fruit": "🐉",
        "Japanese persimmon": "🍂",
        "Garden strawberry": "🍓",
        "Highbush blueberry": "🍇",
        "Cape gooseberry": "🍒",
        "Common sugarcane": "🎋",
        "Banana": "🍌",
        "Common guava": "🍈",
        "Kiwi": "🥝"
    }

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
    async function fetchWeatherData() {
      const response = await fetch(

        `https://api.weatherapi.com/v1/current.json?key=81d33bc2e5f34ab196c125805230904&q=${pays}&aqi=no`

      );
      const data = await response.json();
      setWeatherData(data);
    }
    fetchWeatherData();

  }, [pays]);

  useEffect(() => {
    if (connectedUser && connectedUser._id) {
      getFarms();
    
    }
  }, [connectedUser]);
 
 
 
  const getFarms = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/farms/getFarmsByUser/${connectedUser._id}`);
      setFarms(response.data);
      setExistFarm(true)
      const farms = response.data;
      for (const farm of farms) {
       
        const cropResponses = await Promise.all(farm.crops.map(cropId => axios.get(`http://localhost:5000/farms/getCrop/${cropId.crop}`)));
        const crops = cropResponses.map(response => response.data);
        // Create an array specific to this farm to store its crops
        const farmCrops = [];
        for (const crop of crops) {
          // Add each crop to the farmCrops array
          farmCrops.push(crop);
        }
        // Set the crops state for this farm
        setCrops(prevState => ({ ...prevState, [farm._id]: farmCrops }));
        if(cropResponses.status===404) {
          setExistFarm(false)
        }
      }
    } catch (error) {
      if(error.response.status===404) {
        setRegisterFarm(true);
      }
    }
  };
  
 

const [activePage, setActivePage] = useState(1);

const handlePageChange = (pageNumber) => {
  setActivePage(pageNumber);
};




const handlePopup = () => {
  setShowPopup(true);


  fetch(`http://localhost:5000/farms/cropReg`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
       
      })
      .then(res => res.json())
      .then(data => {
       
        if (data.success) {
         
          setAlertMessage(data.message);
        }
      if(!data.success){
        setAlertMessage(data.message)
      }
      })
      .catch(error => {
        console.log(error.message);
        setAlertMessage("An error occurred while submitting your request");
      });
  





};

const handleClosePopup = () => {
  setShowPopup(false);
};



const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;
const visibleFarms = farms.slice(startIndex, endIndex);
 

 
  
  


  return (

<>

    {!connectedUser && <Access/> }
    {connectedUser &&
    <Layout>
 
 <section
  className="page-banner bg_cover position-relative z-1"
  style={{ backgroundImage: "url(assets/images/bg/page-bg-2.jpg)" }}
>
 
   
      <div
      className="container"
      style={{
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        right: '60px',
      }}
    >
       <img
      src={`http://localhost:5000/api/users/file/${connectedUser?._id}`}
        alt="profile"
        style={{
          width: "150%",
          height: "90%",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-10">
          <div className="page-title">
  <h1 style={{ textTransform: 'capitalize' }}>
    {connectedUser?.surname} {connectedUser?.name ?? 'Unknown User'}
  </h1>
  <ul className="breadcrumbs-link">
    <li>
      <Link href="HomePagePost">Home</Link>
    </li>
    <li>
      <Link href="Card">Job Offers</Link>
    </li>
   <li>
    <Link href="" activeClassName="active">
    <a style={activeLinkStyle}>Farms</a>
          </Link>
        
          </li> 
    <li>
      <Link href="disease">Diseases</Link>
    </li>
    <li>
      <Link href="farmInfo">Farm Informations</Link>
    </li>
    <li>
      <Link href="cropPrediction">Analyze Soil</Link>
    </li>
  </ul>
</div>


            
          </div>
          
        </div>
        
      </div>
      
    </section>
  



    

    {/* <br/><br/><br/><br/> */}





{registerFarm &&  <section className="cta-section">
        <div className="container-fluid">
          <div
            className="cta-wrap-two bg_cover pb-130"
            style={{ backgroundImage: "url(assets/images/bg/cta-bg-1.jpg)" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="cta-content-box wow fadeInDown">
                    <span className="tag-line">You have not register your farm yet</span>
                    <h2>Register your farm now </h2>
                    <p>
                    Looking to grow your farm business and connect with a community of food lovers? Register your farm on our platform and gain access to increased visibility, direct communication with customers, and sales growth opportunities. Join today and showcase your farm to a passionate audience of foodies.
                    </p>
                    <Link href="/addFarm">
                      <a className="main-btn bordered-btn">Register</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>






}



         




{existFarm &&  visibleFarms.map((element) => ( 
                     
                     <div key={element._id}>   
                           
<section className="project-details-page pt-170 wow fadeInUp">
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title" style={{ fontSize: '40px' }}> {element.name} Farm</span>
             
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="project-details-wrapper">
             
                <div className="project-content pb-75">
                  <div className="content-box">
                    <div className="row">
                   
                      <div className="col-lg-5">
                     
                        <h4    className="title mb-15"> <i class="fas fa-exclamation-circle"></i>  &nbsp; &nbsp;General information</h4>
                        <div className="d-flex justify-content-between align-items-start " style={{paddingTop:'30px'}}>
                  
                  <Link href={`/updateFarm?id=${element._id}`}>
<a>Manage your farm?</a>
</Link>
      </div>
      <div className="d-flex justify-content-between align-items-start " style={{paddingTop:'30px'}}>
                
                  <Link href={`/addFarm`}>
<a>Register a new farm?</a>
</Link>
      </div>
                    
                      </div>
                      <div className="col-lg-7">
                        <div className="row">
                       
                         
                          <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="project-info-box mb-45">
                              <h6 className="mb-10">Farming type</h6>
                              <p>{element.farmingType}</p>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="project-info-box mb-45">
                              <h6 className="mb-10">Soil Type</h6>
                              <p>{element.soilType}</p>
                            </div>
                          </div>
                          <div
                  className="cta-item_one bg_cover text-white mb-40 wow fadeInLeft"
                  style={{
                    backgroundImage: "url(assets/images/cta/cta-2.jpg)",
                  }}
                >
                  <div className="text d-flex justify-content-between align-items-center">
                    <h2> Which crop to plant ? </h2>
                    <Button onClick={handlePopup}>
                    
                        Analyze now 
                     
                    </Button>
                  </div>


                 
                  {showPopup && (
        <div className="popup-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {alertMessage == null ? (
            <div className="loader" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
              <PreLoader />
            </div>
          ) : (
            <div className="popup-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              <h3 style={styles2}>Based on soil parameter data, you can plant</h3>
             <br/> <br/>
              <div className="section-title text-center mb-50 wow fadeInDown">
  <span className="sub-title" style={{ fontSize: '40px' }}>{alertMessage}</span>
</div>

              
              <div className="popup-buttons" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px' }}>
                <Button onClick={handleClosePopup} color="info" >Cancel</Button>
              </div>
            </div>
          )}
        </div>
      )}















                </div> 
                        </div>
                        </div> 
                     
                  </div>
                  </div>
                  
                  <div className="content-box">
                    <div className="row">
                      <div className="col-lg-5">
                  

                        <h4    className="title mb-15"> <i class="fas fa-map-marker-alt"></i> &nbsp; &nbsp;Position information</h4>
                       
                      </div>
                      <div className="col-lg-7">
                        <div className="content">
                        <div className="row">
                       
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="project-info-box mb-45">
                              <h6 className="mb-10">Counrty</h6>
                              <p>{element.country}</p>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="project-info-box mb-45">
                              <h6 className="mb-10">Area (m²)</h6>
                              <p>{element.area}</p>
                            </div>
                          </div>
                         
                          </div>
                       
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content-box">
                    <div className="row">
                      <div className="col-lg-5">
                     
                        <h4    className="title mb-15"> <i class="fas fa-briefcase"></i> &nbsp; &nbsp;Employement information</h4>
                       
                      </div>
                      <div className="col-lg-7">
                        <div className="content">
                        <div className="row">
                       
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="project-info-box mb-45">
                              <h6 className="mb-10">Employees</h6>
                              <p>{element.employees}</p>
                            </div>
                          </div>
                          <div className=" next-navigation d-flex align-items-center">
                        <div className="thumb">
                          <img
                  src="assets/images/testimonial/img-4.jpg"
                  alt="author Image"
                />
                           
                        </div>
                        &nbsp; &nbsp; 
                        <div className="call-button text-center">
                <span>
                 
                  <a href="/HomePagePost">Want more employees ?</a>
                </span>
              </div>
                        

                      </div>
                     
                          </div>
                       <br/>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="content-box">
                    <div className="row">
                      <div className="col-lg-5">
                     
                        <h4    className="title mb-15"> <i class="bi bi-tree-fill"></i> &nbsp; &nbsp;Crop information</h4>
                       
                      </div>
                     
                      <div className="col-lg-7">
                        <div className="content">
                      
                        </div>
                      </div>
                      <br/>
                      <br/>
                      <br/>
                      <div className="container">
       
          <Carousel>
          {crops && crops[element._id].map((crop , index) => (
            <Carousel.Item key={index}>
  
      
     
          <div className="row align-items-center">
        
            <div className="col">
            <div className="skill-bar">
            <div className="skill-title">
  <h5>
    {crop.type && cropIcons[crop.type] ? (
      <i className="vegetable-icon">{cropIcons[crop.type]}</i>
    ) : (
      <i className="bi bi-tree"></i>
    )}
   
  <span className="crop-count">{element.crops[index].count}  &nbsp; &nbsp; m² </span> 
    &nbsp; &nbsp;
    {crop.type}
  </h5>
</div>

                      
                      <div
                        className="progress-bar wow slideInLeft"
                        style={{ width: "100%" }}
                      />
                      <div className="progress" />
                      
                    </div>
                    
                    <div className="skill-bar">
                      <div className="skill-title d-flex justify-content-between align-items-cente">
                      <h6><i className="bi bi-sun-fill"></i> &nbsp; &nbsp; Sunlight</h6> 
<p style={styles}>{crop.sunlight}</p>
                      </div>
                      
                      <div
                        className="progress-bar wow slideInLeft"
                        style={{ width: "100%" }}
                      />
                      <div className="progress" />
                      
                    </div>


                    <div className="skill-bar">
                     

                      <div className="skill-title d-flex justify-content-between align-items-cente">
                      <h6><i className="bi bi-flower1"></i> &nbsp; &nbsp; Soil</h6> 
<p>{crop.soil}</p>
                      </div>
                      
                      <div
                        className="progress-bar wow slideInLeft"
                        style={{ width: "100%" }}
                      />
                      <div className="progress" />
                      
                    </div>

                    



                    <div className="skill-bar">
               


                      <div className="skill-title d-flex justify-content-between align-items-cente">
                      <h6><i className="bi bi-clock-history"></i> &nbsp; &nbsp; Planting Time </h6> 
<p>{crop.plantingTime}</p>
                      </div>
                      
                      <div
                        className="progress-bar wow slideInLeft"
                        style={{ width: "100%" }}
                      />
                      <div className="progress" />
                      
                    </div>


                    <div className="skill-bar">
                      
                      
                      <div className="skill-title d-flex justify-content-between align-items-cente">
                      <h6><i className="bi bi-thermometer-snow"></i> &nbsp; &nbsp; Hardiness Zones</h6> 
<p>{crop.
hardinessZones
}</p>
                      </div>

                      
                      <div
                        className="progress-bar wow slideInLeft"
                        style={{ width: "100%" }}
                      />
                      <div className="progress" />
                      
                    </div>



                 


               
            
            
                    </div>      
            <div className="col">
            <div className="skill-bar">
                     
                      <div className="skill-title ">
                      <h6><i className="bi bi-droplet-fill"></i>  Water </h6> 
<p>{crop.water
}</p>
                      </div>    
                      <div
                        className="progress-bar wow slideInLeft"
                        style={{ width: "100%" }}
                      />
                      <div className="progress" />
                      
                    </div>

            


                    <div className="skill-bar">
                     
                      <div className="skill-title ">
                      <h6><i className="fas fa-flask"></i> Fertilization  </h6> 
<p>{crop.fertilization
}</p>
                      </div>    
                      <div
                        className="progress-bar wow slideInLeft"
                        style={{ width: "100%" }}
                      />
                      <div className="progress" />
                      
                    </div>
            </div>
          
          </div>
          
          
          </Carousel.Item>
        
))}
    </Carousel>
        </div>
                          </div>
                       
                        </div>
                      
                 

                
                  
                     
                     
               








                </div>
              
              </div>
            </div>
          </div>
        </div>
      </section>
   
 

     
    
     
      
      
    
  
      <div className="d-flex justify-content-center">   
      <Pagination>
    {[...Array(Math.ceil(farms.length / ITEMS_PER_PAGE)).keys()].map(
      (pageNumber) => (
        <Pagination.Item
        key={pageNumber}
        active={pageNumber + 1 === activePage}
        onClick={() => handlePageChange(pageNumber + 1)}
      >
        {pageNumber + 1}
      </Pagination.Item>
      
      )
    )}
  </Pagination>

  </div>
  <br/>
      </div>

    ))}
    </Layout>}
    </> 
  );
};
export default Farms;
