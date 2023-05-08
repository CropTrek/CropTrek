
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import { useRouter } from 'next/router';
import {useEffect,useState} from "react";
import { Alert, Button, Col, Row } from "reactstrap";
import { FormGroup,Label,Input,FormText} from "reactstrap";
import { Form} from "react-bootstrap";
import Access from "./Access"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faTimes } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { polygon, area } from '@turf/turf';

const MapContainer = dynamic(() => import('react-leaflet').then((module) => module.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((module) => module.TileLayer), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((module) => module.Popup), { ssr: false });
const Polygon = dynamic(() => import('react-leaflet').then((module) => module.Polygon), { ssr: false });

const addFarm = () => {   const styles = {
  color: 'white' }
  const [farm, setFarm] = useState({ crops: [] ,name:null,   employees:0 , soilType:"", farmingType:""  ,country:""});
  const [connectedUser, setConnectedUser] = useState('');
  const [visible, setVisible] = useState(false);
  const [cropNames, setCropsNames] = useState([]);
  const [crops, setCrops] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [file, setFile] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedCropName, setSelectedCropName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [confirmedCrops, setConfirmedCrops] = useState([]);
  const [terrain, setTerrain] = useState([]);
  const [searchCount, setSearchCount] = useState({});
  const [useMapEvents, setMapEvents] = useState(null);
  const [targetCrop, setTragetCrop] = useState(null);
  const [valArea, setValArea] = useState(0);
  const polygonRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter()
  const [surfaceMeasure, setSurfaceMeasure] = useState(0);
  const addConfirmedCrop = (crop) => {
    if (!confirmedCrops.includes(crop)) {
      setConfirmedCrops([...confirmedCrops, crop]);
    }
  };

  const removeConfirmedCrop = (cropType) => {
    const index = confirmedCrops.indexOf(cropType);
    if (index !== -1) {
      const newConfirmedCrops = [...confirmedCrops];
      newConfirmedCrops.splice(index, 1);
      setConfirmedCrops(newConfirmedCrops);
    }
  };
const handleSearchChange = (event) => {
  const term = event.target.value.toLowerCase();
  const filteredCrops = crops.filter(
    (crop) =>
      crop.type.toLowerCase().includes(term) &&
      !confirmedCrops.includes(crop.type)
  );
  setSearchTerm(term);
  setSearchResults(filteredCrops);

};


function handleRetour() {
  router.push("/farms")
};




const handleClosePopup = () => {
  setShowPopup(false);
};

const handleButtonClick = (mot) => {

  setTragetCrop(mot);
  verifAcount(mot);
  setShowPopup(true);
};
 
  useEffect(() => {
  
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
    const storedCount = localStorage.getItem("searchCount");
    if (storedCount) {
      setSearchCount(JSON.parse(storedCount));
    }
   
    let timeoutId;
    if (alertMessage  ) {
      timeoutId = setTimeout(() => {
        setAlertMessage('');
      
      }, 20000); // affiche l'alerte pendant 3 secondes avant de la masquer
    }

    fetch('http://localhost:5000/farms/getTrees', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(data => {
      const cropNames = data.map(crop => crop.type);
      setCropsNames(cropNames);
      const crops=data;
      setCrops(data);
      console.log(crops);
    })
    .catch(err => console.log(err));
    //user farmer
  

  }, [alertMessage]);
  useEffect(() => {
    import("leaflet").then((L) => {
      
      import("react-leaflet").then((RL) => {
        setMapEvents(() => RL.useMapEvent);
        // SetUseMap(() => RL.useMap);
      });

    });
    if (terrain.length > 0) {
      const firstPoint = terrain[0];
      const [latitude, longitude] = firstPoint; 
     
      getCountryFromCoords(latitude, longitude).then(country => {
        setFarm({ ...farm, country: country })
      });
     
    }
    if (terrain) { 
     setValArea(calculateSurfaceMeasure(terrain));
    
    }

  }, [terrain]);
  
  useEffect(() => {
    // On sauvegarde la valeur du compteur dans le local storage à chaque fois qu'elle change
    localStorage.setItem("searchCount", JSON.stringify(searchCount));
  }, [searchCount]);
  const handleGoBack = async (event) => {
    router.push("/farms")
  }
 
  const verifAcount = (searchTerm) => {
    console.log(searchTerm);
      const currentCount = searchCount[searchTerm] || 0;
     
      const description=`The crop ${searchTerm} is reported to be in demand more than 3 times by the farmers `
     
      if (currentCount >= 3) {
        fetch('http://localhost:5000/farms/addTreeN', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ description: description})
        })
        .then(res => res.json())
        .then(data => {
         
          console.log(data);
        })
        .catch(err => console.log(err));
        //user farmer
      
      } else {
        // Le crop type n'est pas disponible, mettre à jour le compteur de recherche
        setSearchCount({
          ...searchCount,
          [searchTerm]: currentCount + 1,
        });

        // Vérifier le nombre de recherches pour ce terme de recherche
        if (currentCount + 1 >= 5) {
          checkSearchCount(searchTerm);
        }

        
      }
    
  };

  const checkSearchCount = (term) => {
    alert("Plus de 5 personnes ont cherché ce type de culture");
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const formDataToSend = new FormData();
    formDataToSend.append("file", file);
    farm.user=connectedUser?._id;
    formDataToSend.append("user", farm.user);
    formDataToSend.append("name", farm.name);
    formDataToSend.append("farmingType", farm.farmingType);
    const cropsJson = JSON.stringify(farm.crops);
    formDataToSend.append("crops", cropsJson);
    formDataToSend.append("country", farm.country);
    formDataToSend.append("employees", farm.employees); 
    formDataToSend.append("area", valArea); 
    formDataToSend.append("soilType", farm.soilType); 
   
    const espace =JSON.stringify(terrain)

    formDataToSend.append("coordinates", espace);
   
   
        fetch(`http://localhost:5000/farms/addFarm`, {
          method: "POST",
          body: formDataToSend,
        })
        .then(res => res.json())
        .then(data => {
         
          if (data.success) {
            setVisible(true);
          
          }
        if(!data.success){
          setAlertMessage(data.message)
        }
        })
        .catch(error => {
          console.log(error.message);
          console.log("An error occurred while submitting your request");
        });
        
  };
  
 


//file verification 

const handleFileChange = async(event) => {
       
  setFile(event.target.files[0]);

 
  };

/////////////////////////////////////////////////////////////////////////////////////// map 
const handleDeletePoint = (e) => {
  e.preventDefault();
  // Create a new array that excludes the last point in the terrain array
  const updatedTerrain = [...terrain.slice(0, -1)];
  // Update the terrain state with the new array
  setTerrain(updatedTerrain);
  console.log("New terrain coordinates:", terrain);
  // Update the Polygon component with the new coordinates
  if (polygonRef.current) {
    polygonRef.current.setLatLngs(updatedTerrain);
  }
};

function MapClick2Handler() {
  useMapEvents({
    click: handleMap2Click,
  });
  return null;
}



const handleMap2Click = (event) => {
  const { lat, lng } = event.latlng;
  const updatedTerrain = [...terrain, [lat, lng]];
  setTerrain(updatedTerrain);
  console.log("polygonRef.current:", polygonRef.current);
  if (polygonRef.current) {
    polygonRef.current.setLatLngs(updatedTerrain);
  }
  console.log("New terrain coordinates:", terrain);
};


async function getCountryFromCoords(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const country = data.address.country;
    const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || null; // Try to get the city using multiple address fields
    console.log(city);
    console.log(country);
    return `${city}, ${country}`; // Return a string with both the city and country


  } catch (error) {
    console.error(error);
    return null;
  }
}
function calculateSurfaceMeasure(coordinates) {
  const newCoordinates = [...coordinates, coordinates[0]];

  if (newCoordinates.length < 4) {
    return 0;
  }

  const poly = polygon([newCoordinates]);
  const areaMeters = area(poly);
  return areaMeters;
}









////////////////////////////////////////////////////


  const renderStepOne = () => (
    <div>
    <Form.Group>
      <Form.Label>Farm Name:</Form.Label>
      <Form.Control 
        type="text"
        name="name"
        onChange={(e) => setFarm({ ...farm,name: e.target.value })}
      />
   {/* <Form.Label>Country:</Form.Label>
      <Form.Control 
        type="text"
        name="country"
        onChange={(e) => setFarm({ ...farm, country: e.target.value })}
      /> */}

{/* <Form.Label>Area (m²):</Form.Label>
      <Form.Control 
        type="number"
        name="Employees number"
        onChange={(e) => setFarm({ ...farm, area: e.target.value })}
      />   */}
 <Form.Label>Employees number:</Form.Label>
      <Form.Control 
        type="number"
        name="Employees number"
        onChange={(e) => setFarm({ ...farm, employees: e.target.value })}
      />
      <br/>
      <Row>
  <Col>
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-farming-type">
        {farm.farmingType ? farm.farmingType : "Select Farming type"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setFarm({ ...farm, farmingType: "Conventional Farming" })}>
          Conventional Farming
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFarm({ ...farm, farmingType: "Organic Farming" })}>
          Organic Farming
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFarm({ ...farm, farmingType: "Aquaculture" })}>
          Aquaculture
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFarm({ ...farm, farmingType: "Agroforestry" })}>
          Agroforestry
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col>
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-soil-type">
        {farm.soilType ? farm.soilType : "Select Soil type"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setFarm({ ...farm, soilType: "Alluvial soils" })}>
          Alluvial soils
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFarm({ ...farm, soilType: "Red soils" })}>
          Red soils
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setFarm({ ...farm, soilType: "Brown soils" })}>
          Brown soils
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>
</Row>

      <div className="d-flex justify-content-between mt-4">
       
        <button
          className="main-btn yellow-bg"
          type="button"
          onClick={() => setStep(2)}
          
        >
          Next
        </button>
      </div>
    </Form.Group>
    </div>
  );


  const renderStepTwo = () => (
    <div>
    <Form.Group>
    <Form.Label>Select your crops:</Form.Label>
      <div className="form_group select-100">
        <div className="d-flex mb-2 align-items-center">
          <Input
            className="wide custom-select mr-2"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search crop..."
          
          />
           
          {searchTerm !== "" && searchResults.length > 0 && (
            <Button type="button" onClick={() => setSearchTerm("")}>
              Clear
            </Button>
          )}
        </div>
        {searchTerm !== "" && searchResults.length > 0 ? (
          searchResults.map((crop, index) => {
            const cropIndex = farm.crops.findIndex((c) => c.crop === crop._id);
            const count = cropIndex !== -1 ? farm.crops[cropIndex].count : 0;
            const isConfirmed = confirmedCrops.includes(crop.type);
            return (
              <div key={index} className="mb-2 d-flex align-items-center">
                <label htmlFor={crop._id}>{crop.type + ' area  (m²)  ' +':'}</label>
                &nbsp;
                <input
                  id={crop._id}
                  type="number"
                  value={count}
                  onChange={(e) => {
                    const newCrops = [...farm.crops];
                    if (cropIndex !== -1) {
                      newCrops[cropIndex].count = parseInt(e.target.value);
                    } else {
                      newCrops.push({ crop: crop._id, count: parseInt(e.target.value) });
                     
                    }
                    setTragetCrop(e.target.value)
                    setFarm({ ...farm, crops: newCrops });
                  }}
                  disabled={isConfirmed}
                />
                &nbsp; &nbsp;
                {!isConfirmed ? (
                  <Button type="button" onClick={() => addConfirmedCrop(crop.type)}>
                    <FontAwesomeIcon icon={faCheck} className="text-primary mr-2" />
                  </Button>
                ) : (
                  <Button type="button" onClick={() => removeConfirmedCrop(crop.type)}>
                    <FontAwesomeIcon icon={faTimes} className="text-danger mr-2" />
                  </Button>
                )}
              </div>
            );
          })
        ) : (
          searchTerm !== "" && (
            <>
            <p>This crop type is not available.</p>
            <Button onClick={()=>handleButtonClick(searchTerm)}>Want to add it ?</Button>
            {showPopup && (
    <div className="popup-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="popup-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <h4>The selected Crop type is not present now , we will try to add it as soon as possible !</h4>
        <p>This action cannot be undone.</p>
        <div className="popup-buttons" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleRetour} color="danger" >Cancel ?</Button>
          <Button onClick={()=>handleClosePopup()} color="info" >Add other crops ?</Button>
        </div>
      </div>
    </div>
  )}

      </>
          )
          


        )}
      </div>
  
        <div className="d-flex justify-content-between mt-4">
          <button className="main-btn gray-bg" type="button" onClick={() => setStep(1)}>
            Previous
          </button>
          <button className="main-btn yellow-bg" type="button" onClick={() => setStep(3)}>
            Next
          </button>
        </div>
      </Form.Group>
      <br/> <br/> <br/>
      {confirmedCrops.length > 0 && (
        <div>
          <p>Confirmed Crops:</p>
          {confirmedCrops.map((crop) => (
            <span key={crop} className="badge badge-secondary mr-2">
              {crop}
            </span>
          ))}
        </div>
      )}
    </div>
    
  );
  




  const renderStepThree = () => (
   <>
   <p>{valArea && ( <>Surface measure: {valArea} m² </> )}</p>
   <p>{farm.country && ( <>Counrty : {farm.country}</>)} </p>

<Form.Group>
 

  <button className="btn yellow-bg" onClick={handleDeletePoint}>
    Delete Last Point
  </button>

  <MapContainer
    center={[36.8065, 10.1815]}
    zoom={13}
    style={{ height: "300px", marginBottom: "20px" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    />
    <MapClick2Handler />
    {terrain.length > 0 && (
      <Polygon pathOptions={{ color: "red" }} positions={terrain} />
    )}
  </MapContainer>

 
  <div className="d-flex justify-content-between mt-4">
          <button className="main-btn gray-bg" type="button" onClick={() => setStep(2)}>
            Previous
          </button>
          <button className="main-btn yellow-bg" type="button" onClick={() => setStep(4)}>
            Next
          </button>
        </div>
    </Form.Group>
   
</>
  
  );






  
  const renderStepFour = () => (
    <div>
    <Form.Group>
    <Form.Label>Select your verification property file:</Form.Label>
    <Input 
    id="exampleFile" 
    name="file" 
    type="file" 
   
    onChange={handleFileChange} 
  />
               

                <div className="d-flex justify-content-between mt-4">
        <button
          className="main-btn gray-bg"
          type="button"
          onClick={() => setStep(3)}
        >
          Previous
        </button>
        <button  className="main-btn yellow-bg">
         Confirm
        </button>
       
      </div>
    </Form.Group>
    </div>
  );

  
  
  
  
  


  return (
    <>
    {!connectedUser && <Access/> }
   {connectedUser &&  
   
   <Layout>
       <PageBanner pageName={"Checkout"} />
       { !visible  &&  ( <> <section
          className="contact-one p-r z-2"
          style={{ paddingTop: "600px", paddingBottom: "250px" }}
        >
          <div className="container-fluid">
            <div className="row no-gutters">
              <div className="col-lg-6">
                <div className="contact-one_content-box fadeInLeft">
                  <div className="contact-wrapper">
                    <div className="section-title section-title-left mb-40">
                    <span className="sub-title">Add your farm </span>
               
                    </div>
                    <div className="contact-form">
                  

                    

                      <Form onSubmit={handleSubmit}>
                        {step === 1 && renderStepOne()}

                       {step === 2 && (
                          <>
                           
                            {renderStepTwo()}
                          </>
                        )} 
                          {step === 3 && renderStepThree()} 
                      {step === 4 && renderStepFour()} 

                      {alertMessage && (
        <h6 onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </h6>
)}
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="contact-one_information-box bg_cover fadeInRight"
                  style={{
                   backgroundImage: "url(assets/images/hero/hero_one-slider-4.jpg)",
                    width: "80%",
                    height: 700,
                    borderRadius: "120px 120px 120px 120px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
        </>   )  } 
        {visible && ( 
   
   
   <section  className="page-banner bg_cover position-relative z-1"
      style={{ backgroundImage: "url(assets/images/bg/page-bg-1.jpg)" }}
    > 
        <div className="container">
        <div className="contact-four_content-box fadeInLeft mb-50">
                <div className="section-title section-title-white mb-60">
                  <span className="sub-title">Add your farm </span>
                  <h2>Thank you for your confidence, your request is in progress! You will receive an mail for the confirmation</h2>
               
   
 
                    <Button className="btn" color="warning"  onClick={handleGoBack}>Back To Farms</Button>
                    </div>
                    </div>
         </div>
     
      </section>
    
                    )}
      </Layout>
      }
      </>
  );
};
export default addFarm;
