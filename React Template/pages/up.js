
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
import axios from "axios";
const updateFarm = () => {  
    const styleTitre = {
        h1: {
         
          color: 'green',
         
          textDecoration: 'none'
        }
      }; 
const [farm, setFarm] = useState({crops :[]});
const [connectedUser, setConnectedUser] = useState('');
const [visible, setVisible] = useState(false);
const [cropNames, setCropsNames] = useState([]);
const [crops, setCrops] = useState([]);
const [cropsAll, setCropsAll] = useState([]);
const [alertMessage, setAlertMessage] = useState('');
const [showPopup, setShowPopup] = useState(false);
const [idFarm, setIdFarm] = useState(null);
const router = useRouter();
const [step, setStep] = useState(1);
const [searchResults, setSearchResults] = useState([]);
const [confirmedCrops, setConfirmedCrops] = useState([]);
const [searchCount, setSearchCount] = useState({});
const [targetCrop, setTragetCrop] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
useEffect(() => {

  const profile = JSON.parse(localStorage.getItem('profile'));
  setConnectedUser(profile);

      getFarms();
    
  
  let timeoutId;
  if (alertMessage  ) {
    timeoutId = setTimeout(() => {
      setAlertMessage('');
    
    }, 10000); // affiche l'alerte pendant 3 secondes avant de la masquer
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
    console.log(crops);
   // const remainingCrops = crops.filter((crop) => !crops.includes(crop));

    setCropsAll(crops);
    console.log(crops);
  })
  .catch(err => console.log(err));
  const { id } = router.query;

  // Try to get the value of farmSelected from localStorage
  const storedFarmSelected = localStorage.getItem('farmSelected');

  // If farmSelected is in query param, set it in state and localStorage
  if (id) {
    setIdFarm(id);
    localStorage.setItem('farmSelected', id);
  } 
  // If farmSelected is not in query param but in localStorage, set it in state
  else if (storedFarmSelected) {
    setIdFarm(storedFarmSelected);
  }
}, [alertMessage]);


useEffect(() => {
  if (connectedUser && connectedUser._id) {
    getFarms();
    console.log(crops);
  console.log(farm);
  }
}, [connectedUser]);

const handleGoBack = async (event) => {
  router.push("/farms")
}

const getFarms =async () => {
  try {
    const response = await axios.get(`http://localhost:5000/farms/getFarmById/${idFarm}`);
    const rep=response.data
    console.log(rep)
    setFarm(rep);
   
    const farm = response.data;
 
       
        const cropResponses = await Promise.all(farm.crops.map(cropId => axios.get(`http://localhost:5000/farms/getCrop/${cropId.crop}`)));
        const crops = cropResponses.map(response => response.data);
        setCrops(crops)
        if(cropResponses.status===404)
        { console.log("test")}
  
} catch (error) {
console.log(error.message)
}
}
  const handleSubmit = async (event) => {
    event.preventDefault();
   
 farm.user=connectedUser?._id;

    fetch(`http://localhost:5000/farms/updateFarm/${farm._id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(farm),
})    .then(res => res.json())
.then(data => {  if (data.success) {
  setVisible(true);
  
} else {
  setAlertMessage("Error: " + data.message);
}
})
.catch(error => {
  console.log(error.message)
  setAlertMessage("Error: " + error.message);
});
    };


  

    function handleDeleteConfirm() {
      axios.delete(`http://localhost:5000/farms/deleteFarm/${idFarm}`)
          .then(() => {
              console.log("supp");
              router.push("/farms");
          })
          .catch((error) => {
              console.error("Error :", error);
              console.log("Error response: ", error.response);
          });
  };


    const handlePopup = () => {
      setShowPopup(true);
    };
  
    const handleClosePopup = () => {
      setShowPopup(false);
    };
 
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
      const filteredCrops = cropsAll.filter(
        (crop) =>
          crop.type.toLowerCase().includes(term) &&
          !confirmedCrops.includes(crop.type)
      );
      setSearchTerm(term);
      setSearchResults(filteredCrops);
    
    };




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
        <button
          className="main-btn gray-bg"
          type="button"
          onClick={() => setStep(1)}
        >
          Previous
        </button>
        <button  className="main-btn yellow-bg">
         Confirm
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
  



const renderStepOne=() =>(
<div>

<Form.Group>
      <Form.Label>Farm Name:</Form.Label>
      <Form.Control 
        type="text"
        name="name"
        value={farm.name }
        onChange={(e) => setFarm({ ...farm,name: e.target.value })}
      />
  


 <Form.Label>Employees number:</Form.Label>
      <Form.Control 
        type="number"
        name="Employees number"
        value={farm.employees || ""}
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
<br/>
<div style={{ height: "200px", overflowY: "scroll" }}>
  <h5 style={styleTitre.h1}>Your crops:</h5>
  <table>
    <tbody>
      {farm.crops.map((crop, index) => {
        const selectedCrop = crops.find((c) => c._id === crop.crop);
        return (
          <>
            <tr key={index}>
              <td>
                {selectedCrop && <>{selectedCrop.type}</>}
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={crop.count}
                  onChange={(e) => {
                    const newCrops = [...farm.crops];
                    newCrops[index].count = parseInt(e.target.value);
                    setFarm({ ...farm, crops: newCrops });
                  }}
                />
              </td>
            </tr>
            <tr key={`spacer-${index}`} style={{ height: "10px" }}></tr>
          </>
        );
      })}
    </tbody>
  </table>
</div>


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
                    <span className="sub-title">Update your farm </span>
               
                    </div>
                    <div className="contact-form">
                  

                    

                      <Form onSubmit={handleSubmit}>
                      {step === 1 && renderStepOne()}

                       {step === 2 && (
                          <>
                           
                            {renderStepTwo()}
                          </>
                        )} 

                 
                      </Form>
                      <div className="d-flex justify-content-between align-items-start " style={{paddingTop:'30px'}}>
                    <a href="#" onClick={handlePopup}  >Want to delete your farm  ?</a>
                    </div>
  {showPopup && (
    <div className="popup-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="popup-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <h3>Are you sure you want to delete your farm?</h3>
        <p>This action cannot be undone.</p>
        <div className="popup-buttons" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleClosePopup} color="info" >Cancel</Button>
          <Button onClick={()=>handleDeleteConfirm()} color="danger" >Delete</Button>
        </div>
      </div>
    </div>
  )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="contact-one_information-box bg_cover fadeInRight"
                  style={{
                   backgroundImage: "url(assets/images/portfolio/img-6.jpg)",
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
         <div className="contact-four_content-box wow fadeInLeft mb-50">
                 <div className="section-title section-title-white mb-60">
                   <span className="sub-title">Add your farm </span>
                   <h2>Great ! Your farm is updated ! </h2>
                
    
  
                     <Button className="btn" color="warning"  onClick={handleGoBack}>Display Farm ? </Button>
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
export default updateFarm;
