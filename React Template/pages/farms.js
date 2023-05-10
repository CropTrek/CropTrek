import axios from "axios";
import Link from "next/link";
import { useEffect, useState,useMemo } from "react";
import Access from "./Access"
import Pagination from "react-bootstrap/Pagination";
import Carousel from 'react-bootstrap/Carousel';
import Layout from "/src/layouts/Layout";
import { Button, Row } from "reactstrap";
import { Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import PreLoader from "../src/layouts/PreLoader";
import Rating from "../src/components/Rating";
import { Alert, } from "reactstrap";
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
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
  const [products, setProducts] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [season, setSeason] = useState('');
  const [result, setResult] = useState('');
  const [N, setN] = useState('');
  const [P, setP] = useState('');
  const [K, setK] = useState('');
  const [pH, setpH] = useState('');
  const [Tmin, setTmin] = useState('');
  const [Tmax, setTmax] = useState('');
  let isPlanting= false;
  let typesPlanting=[];
 
  const activeLinkStyle = {
    color: 'yellow',
    textDecoration: 'underline yellow',
  };
  
  const styleTitre = {
    h1: {
      textShadow: '4px 3px 0px #fff, 9px 8px 0px rgba(0,0,0,0.15)',
      color: 'green',
      fontSize: '40px',
      textDecoration: 'none'
    }
  };
  const style3 = {
    color: 'black',
    fontSize: '40px', }
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

   
   
    axios.get('http://localhost:5000/farms/getSeason')
    .then(res => {
      setSeason(res.data.season);
    })
    .catch(err => {
      console.log(err);
    });
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:5000/api/products/users/6451a445eb3c4d8ec782c931/products`);

      setProducts(result.data)

  };

 
  
  fetchData();
  
   
  }, [pays]);

  function handlePlantClick(id) {
    localStorage.setItem('farmSelected', id);
  }
  useEffect(() => {
    if (connectedUser && connectedUser._id) {
      getFarms();
      let timeoutId;
      const fetchDiseases = async () => {
        const result = await axios.get(`http://localhost:5000/farms/getDiseaseHistoByUser/${connectedUser._id}`);
    
        setDiseases(result.data)
    
    };
    fetchDiseases();
    console.log(diseases);
     

   
    


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


const fetchCropRegData = () => {
  fetch('http://localhost:5000/farms/cropReg')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const { result, N, P, K, pH, Tmin, Tmax } = data.message;
        setResult(result);
        console.log(N);
        setN(N);
        setP(P);
        setK(K);
        setpH(pH);
        setTmin(Tmin);
        setTmax(Tmax);
      } else {
        setAlertMessage(data.message);
      }
    })
    .catch(error => {
      console.log(error.message);
      setAlertMessage("An error occurred while submitting your request");
    });
};

const handlePopup = () => {
  setShowPopup(true);
  startDeviceAnimation();

  fetchCropRegData();

};




// const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
// const endIndex = startIndex + ITEMS_PER_PAGE;
// const visibleFarms = farms.slice(startIndex, endIndex);
 





const [currentPage, setCurrentPage] = useState(0);
const [farmsPerPage, setFarmsPerPage] = useState(1);
        const indexOfLastFarm = (currentPage + 1) * farmsPerPage;
        const indexOfFirstFarm = indexOfLastFarm - farmsPerPage;
const handlePageClick = ({ selected }) => {
  setCurrentPage(selected);
  console.log("icii ",selected);
}; 


const currentFarms = useMemo(() => {
  const indexOfLastFarm = (currentPage + 1) * farmsPerPage;
  const indexOfFirstFarm= indexOfLastFarm- farmsPerPage;
  return farms.slice(indexOfFirstFarm, indexOfLastFarm);
},[currentPage, farms, farmsPerPage]);
  
  
const [params, setParams] = useState(['Azote', 'Phosphore', 'Potassium', 'pH', 'Tmin', 'Tmax']);
const [currentParamIndex, setCurrentParamIndex] = useState(0);
const [showDeviceAnimation, setShowDeviceAnimation] = useState(false);




const [showAzote, setShowAzote] = useState(false);

useEffect(() => {
if (showDeviceAnimation) {
  const intervalId = setInterval(() => {
    setCurrentParamIndex((currentParamIndex) => currentParamIndex + 1);
  }, 5000);

  setTimeout(() => {
    setShowAzote(true);
  }, 3000); // Attente de 3 secondes avant d'afficher le paramètre "Azote"

  return () => {
    clearInterval(intervalId);
  };
}
}, [showDeviceAnimation]);



const currentParam = params[currentParamIndex];
const startDeviceAnimation = () => {
  setShowDeviceAnimation(true);
};
const deviceAnimationStyles = `
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 400px;
height: 600px;
display: flex;
justify-content: center;
align-items: center;
z-index: 9999;
background-color: #252525;
`;




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




        




{existFarm &&  currentFarms.map((element) => ( 
                   
                     <div key={element._id}>   
                         
<section className="project-details-page pt-170 wow fadeInUp">
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="section-title text-center mb-50 wow fadeInDown">
                
             
          
              <h2  className="sub-title" style={styleTitre.h1}  >{element.name} </h2>
             
              </div>
      
            </div>
            
          </div>
       
          <br/>
          <br/>
          <div className="row">
            <div className="col-lg-12">
              <div className="project-details-wrapper">
             
                <div className="project-content pb-75">
                  <div className="content-box">
                    <div className="row">
                   
                      <div className="col-lg-5">
                     
                        <h4    className="title mb-15"> <i class="fas fa-exclamation-circle"></i>  &nbsp; &nbsp;General information</h4>
                        <div className="d-flex justify-content-between align-items-start " style={{paddingTop:'30px'}}>
                  
                  <Link href={`/up?id=${element._id}`}>
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
  <div id="device-animation" style={{ cssText: deviceAnimationStyles }}>
    <div className="device-body">
      <div className="device-screen">
        {currentParam === 'Azote' && showAzote && (
          <div id="Azote">
            Azote: {N}
          </div>
        )}
        {currentParam === 'Phosphore' && (
          <div id="Phosphore">
            Phosphore: {P}
          </div>
        )}
        {currentParam === 'Potassium' && (
          <div id="Potassium">
            Potassium: {K}
          </div>
        )}
        {currentParam === 'pH' && (
          <div id="ph">
            pH: {pH}
          </div>
        )}
        {currentParam === 'Tmin' && (
          <div id="tmin">
            Tmin: {Tmin}
          </div>
        )}
   {currentParam === 'Tmax' && (
                <div id="tmax">
                  Tmax: {Tmax}
                </div>
              )}
             {currentParamIndex === params.length && (
   <div className="result-message text-center mx-auto">
    Based on soil parameter data, you can plant  : {result}
   </div>
)}
              {currentParamIndex !== params.length && (
                <div className="lds-ripple"><div></div><div></div></div>
              )}
                      <div className="exit-button" onClick={() => {setShowPopup(false)}}>X</div>
            </div>
      <div className="device-footer">
        <div className="device-light"></div>
      </div>
    </div>
  </div>
)}

<style jsx>{`
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid #ffdd2c;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`}</style>


      <style jsx>{`
        .device-body {
          width: 100%;
          height: 90%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          border: 4px solid #444444;
          border-radius: 20px;
          padding: 20px;
        }

        .device-screen {
          width: 80%;
          height: 80%;
          background-color: #101010;
          border: 2px solid #444444;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        #azote,
        #phosphore {
          font-size: 24px;
          font-weight: bold;
          color: white;
          position: relative;
          margin-bottom: 10px;
        }
     
    
        .loader {
          border: 10px solid #f3f3f3;
          border-top: 10px solid #ffdd2c; /* Modifier la couleur de la bordure */
          border-radius: 50%;
          width: 100px;
          height: 100px;
          animation: spin 2s linear infinite;
        }
      
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .exit-button {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 20px;
          cursor: pointer;
        }
        .result-message {
          font-size: 24px;
          font-weight: bold;
          color: #00b300;
        
        }
        
        .device-footer {
          display: flex;
          justify-content: center;
        }
        
        .device-light {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: #00b300;
          box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00,
            0 0 40px #00ff00, 0 0 50px #00ff00, 0 0 60px #00ff00, 0 0 70px #00ff00;
          animation: pulse 2s infinite;
        }
   
        @keyframes pulse {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1);
          }
          100% {
            transform: scale(0.8);
          }
        }
`}</style>














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
                              <p>{element.employees}   {diseases.name} </p>
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



                  {diseases && 
  <div className="content-box">
    <div className="row">
      <div className="col-lg-5">
        <h4 className="title mb-15"><i className="bi bi-heart-fill"></i>&nbsp;&nbsp;Plant diseases</h4>
      </div>
      <div className="col-lg-7">
        <div className="content">
          <div className="row">
            <div className="col-lg-12">
              <div style={{maxHeight: '150px', overflowY: 'auto'}}>
              {diseases
              
  .filter(disease => disease.farm === `${element._id}`)
  .map(disease => (
    <div key={disease.id} className="disease-row">
      <p>{disease.name}</p>
      <p>{Moment(disease.createdAt).format('Do MMMM, h:mm a')}</p>
      <style jsx>{`.disease-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
      }`}</style>
    </div>
  ))
}

              </div>
            </div>
            <div className="call-button text-center">
            <span>
        <a href={`/disease?id=${element._id}`} onClick={() => handlePlantClick(element._id)}>Check your plants?</a>
      </span>
        </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
}






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
          {crops && crops[element._id]?.map((crop , index) => (
           
           
            <Carousel.Item key={index}>
  
  
     
          <div className="row align-items-center">
        
            <div className="col">
            <div className="skill-bar">
            <div className="skill-title d-flex justify-content-between align-items-cente">
            <h6>
  {crop.type && cropIcons[crop.type] ? (
    <i className="vegetable-icon">{cropIcons[crop.type]}</i>
  ) : (
    <i className="bi bi-tree"></i>
  )}
  &nbsp; &nbsp;
  {crop.type}
</h6>
<p className="crop-count">{element.crops[index].count} m²</p>
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
<p >{crop.sunlight}</p>
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
{crop.plantingTime && crop.plantingTime.toLowerCase().includes(season.toLowerCase()) && (
 <>
  {isPlanting = true && typesPlanting.push(crop.type)}

  </>
)}
                      
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
   
    {isPlanting && (  <section className="farmers-team_one pt-130">
  <div className="container">
    <div className="row align-items-end">
      <div className="col-lg-8">
        <div className="section-title section-title-left mb-50 wow fadeInLeft">
        <h6>It's planting Time for: {typesPlanting.join(' & ')}</h6>
          <p>Discover our products for planting </p>
        </div>
      </div>
    </div>
    <div className="row">
      {products.map((product) => (
        <div className="col-lg-3" key={product._id}>
          <div className="single-product-item mb-60 wow fadeInUp">
            <div className="product-img">
              <img src={`http://localhost:5000/api/products/getImage/${product._id}/products`} alt="" />
              <div className="pc-btn">Planting Products</div>
              <div className="cart-button">
                <Link href="/products">
                  <a className="main-btn btn-yellow">Add to cart</a>
                </Link>
              </div>
            </div>
            <div className="product-info">
              <Rating value={product.rating} text=""></Rating>
              <h3 className="title">
                <Link href={`/Products/ProductDetails/${product._id}`}>
                  <a>{product.name}</a>
                </Link>
              </h3>
              <span className="price">
                {product.price} <span className="curreny">DT</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    )} 


     
    
     
      
      
    
  
      {/* <div className="d-flex justify-content-center">   
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

  </div> */}

  <div className="d-flex justify-content-center pagination mb-50 wow fadeInUp">
<ReactPaginate

  previousLabel={<i className="far fa-angle-left" />}
  nextLabel={<i className="far fa-angle-right" />}
  breakLabel={'...'}
  pageCount={Math.ceil(farms.length / farmsPerPage)}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={handlePageClick}
  containerClassName={'pagination'}
  activeClassName={'active'}
/>
</div>








  <br/>
      </div>

    ))}
    </Layout>}
    </> 
  );
};
export default Farms;
