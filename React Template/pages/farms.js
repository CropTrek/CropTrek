import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Access from "./Access"
import Pagination from "react-bootstrap/Pagination";
import Carousel from 'react-bootstrap/Carousel';
import Layout from "/src/layouts/Layout";
import { Button, Row } from "reactstrap";

const ITEMS_PER_PAGE = 1;

const Farms = () => {
  const [farms,setFarms] =useState([]);
  const [pays,setPays] =useState("Tunis");
  const [connectedUser, setConnectedUser] = useState('');
  const [registerFarm, setRegisterFarm] = useState(false);
  const [existFarm, setExistFarm] = useState(false);
  const[crops,setCrops]=useState(null);
  const [weatherData, setWeatherData] = useState({location : "Tunis"});
  
  const styles = {
    color: 'gray' }
    const cropIcons = {
      "Tomato": "🍅",
      "Potato": "🥔",
      "Cucumber": "🥒",
      "Coriander": "🌿",
      "Pumpkin": "🎃",
      "Maize": "🌽",
      "Onion": "🧅"
    };

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
    async function fetchWeatherData() {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=****&q=${pays}&aqi=no`
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
  style={{
    width: '300px',
    height: '300px',
    position: 'absolute',
    right: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <img
    src={`http://localhost:5000/api/users/file/${connectedUser?._id}`} 
    alt="icon"
    style={{
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      objectFit: 'cover',
    }}
  />
  <h4>{connectedUser?.name ?? 'Unknown User'}</h4>
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
                  <Link className="active" href="">Farms</Link>
                </li>
                <li>
                  <Link  href="disease">Diseases</Link>
                </li>
                <li>
                  <Link href="farmInfo">Farm Informations</Link>
                </li>
                
               
              </ul>
              
            </div>
            
          </div>
          
        </div>
        
      </div>
      
    </section>
  



    

    <br/><br/><br/><br/>





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










         

 
      {/*====== Start Skill Section ======*/}
      {existFarm &&  visibleFarms.map((element) => ( 
                     
             <div key={element._id}>   
                   
      <section className="skill-section-two pt-lg-130">
        
        <div className="container-fluid">
    
        
          <div
            className="skill-wrapper-one pb-90 bg_cover"
            style={{ backgroundImage: "url(assets/images/bg/skill-bg-2.jpg)" }}
          >
          
            <div className="container">

            <div className="row justify-content-end">
  <div className="col-lg-5">
    <div className="shopping-cart-total text-center">
               
      <div>
        {weatherData && (
          <div>
            <h3>{ weatherData && weatherData.location.name}</h3>
            <img src={weatherData.current.condition.icon} alt="Weather icon" />
            <p>{weatherData.current.condition.text}</p>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Feels like: {weatherData.current.feelslike_c}°C</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Wind speed: {weatherData.current.wind_kph} km/h</p>
          </div>
        )}
      </div>
               
    </div>
  </div>
</div>

              <div className="row">
             
                <div className="col-lg-7">
               
                  <div className="skill-two_content-box content-box-gap mb-40 wow fadeInUp">
                 
                    <div className="section-title section-title-left mb-30">
                   
                      <span className="sub-title">Farm</span>
                      <Row>
  <h3>{element.name} 's informations</h3>
  <Button onClick={() => setPays(element.country)} className="ml-auto" outline color="warning">
    <i class="bi bi-cloud-sun"></i>
  </Button> 
</Row>
                      
                     
                    </div>
                  
                   
                     
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
                       Farming type<span>{element.farmingType}  </span>
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
                       Soil type<span>{element.soilType}  </span>
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
                       Number of employees<span>{element.employees}  </span>
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

                    <div className="d-flex justify-content-between align-items-start " style={{paddingTop:'30px'}}>
                  
                    <Link href={`/updateFarm?id=${element._id}`}>
  <a>Want to manage your farm?</a>
</Link>
        </div>
        <div className="d-flex justify-content-between align-items-start " style={{paddingTop:'30px'}}>
                  
                    <Link href={`/addFarm`}>
  <a>Want to add new farm?</a>
</Link>
        </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 
      <br/><br/> 
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
   
  <span className="crop-count">{element.crops[index].count}  &nbsp; &nbsp; Trees </span> 
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
                      <div className="skill-title">
                        <h5> <i className="bi bi-sun-fill"></i> &nbsp; &nbsp; 
                       
Sunlight<span>{crop.sunlight}</span>
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
                        <i className="bi bi-flower1"></i>
 &nbsp; &nbsp; 
Soil<span>{crop.soil}</span>
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
                        <i className="bi bi-clock-history"></i> &nbsp; &nbsp; 
                        Planting Time 
<span>{crop.plantingTime}</span>
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
                        <i className="bi bi-thermometer-snow"></i>  &nbsp; &nbsp; 
                      
Hardiness Zones

<span>{crop.
hardinessZones
}</span>
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
            <div className="skill-bar">
                      <div className="skill-title">
                        <h5 ><i className="bi bi-droplet-fill">
                       
                      
                        &nbsp;&nbsp;
                        

   Water </i> </h5><h6 style={styles}>{crop.water
}</h6>
                       
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
                       
                      
                        <i className="fas fa-flask"></i>
                        
                        &nbsp;&nbsp;
   
Fertilization  </h5><h6 style={styles}>{crop.fertilization
}</h6>
                      
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
      
      </section>
     
      </div>
      </div>
        )) }
      

     <br/><br/><br/><br/>
    </Layout>}
    </> 
  );
};
export default Farms;
