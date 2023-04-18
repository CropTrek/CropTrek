
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import { useRouter } from 'next/router';
import {useEffect,useState} from "react";
import { Button } from "reactstrap";
import { FormGroup,Label,Input,FormText} from "reactstrap";
import Access from "./Access"
const addFarm = () => {   const styles = {
  color: 'white' }
  const [farm, setFarm] = useState({ crops: [] ,name:null,   employees:0 , soilType:"", farmingType:""  ,country:""});
  const [connectedUser, setConnectedUser] = useState('');
  const [visible, setVisible] = useState(false);
  const [cropNames, setCropsNames] = useState([]);
  const [crops, setCrops] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [file, setFile] = useState(null);

  
  const router = useRouter()
  useEffect(() => {
  
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
  
   
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
      setCrops(data);
      console.log(crops);
    })
    .catch(err => console.log(err));
    //user farmer
  

  }, [alertMessage]);
  
  const handleGoBack = async (event) => {
    router.push("/farms")
  }
  


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
    formDataToSend.append("area", farm.area); 
    formDataToSend.append("soilType", farm.soilType); 
    
        fetch(`http://localhost:5000/farms/addFarm`, {
          method: "POST",
          body: formDataToSend,
        })
        .then(res => res.json())
        .then(data => {
         
          if (data.success) {
            setVisible(true);
            setAlertMessage("Thank you for your confidence, your request is in progress! You will receive an mail for the confirmation");
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
  
 


//file verification 

const handleFileChange = async(event) => {
       
  setFile(event.target.files[0]);


  };

  return (
    <>
    {!connectedUser && <Access/> }
   {connectedUser &&  
    <Layout>
      
      <PageBanner pageName={"Checkout"} />
    
    { !visible  && ( <> <section  className="page-banner bg_cover position-relative z-1"
      style={{ backgroundImage: "url(assets/images/bg/page-bg-1.jpg)" }}
    > 
        <div className="container">
        <div className="contact-four_content-box wow fadeInLeft mb-50">
                <div className="section-title section-title-white mb-60">
                  <span className="sub-title">Add your farm </span>
                  <h2>Add your farm now and join us</h2>
                </div></div>
         
          <div className="row">
            <div className="col-lg-12">
              <div className="checkout-wrapper mt-50 mb-80">
                <h4 style={styles} className="title mb-15">Farm Details</h4>
                <form
               
                  className="checkout-form"
                >
                  <div className="row">
                   
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Farm name"
                          name="name"
                        
                          onChange={(e) => setFarm({ ...farm,name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group select-100">
                      {crops.length > 0 && (
                        <select className="wide  custom-select" onChange={(e) => setFarm({ ...farm,farmingType: e.target.value })}>
                          <option value="">Select Farming type</option>
                          <option value='Conventional Farming'>Conventional Farming</option>
                          <option value='Organic Farming'>Organic Farming</option>
                          <option value='Aquaculture'>Aquaculture</option>
                          <option value='Agroforestry'>Agroforestry</option>
                        
                        </select>
                      )}
                      </div>
                    </div>
                  
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="number"
                          className="form_control"
                          placeholder="Area (m²)"
                          name="phone"
                        
                          onChange={(e) => setFarm({ ...farm, area: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
  <div className="form_group select-100">
  {crops.length > 0 && (
    <select className="wide  custom-select"  onChange={(e) => setFarm({ ...farm, soilType: e.target.value })}>
      <option value="">Select Soil type</option>
      <option value="Alluvial soils">Alluvial soils</option>
      <option value="Red soils">Red soils</option>
      <option value="Brown soils">Brown soils</option>
    </select>
  )}
  </div>
</div>
                
                    <div className="col-lg-12">
                      <h5></h5>
                    </div>
                    <div className="col-lg-12">
                      <h5></h5>
                    </div>
                    <div className="col-lg-6">
                      <h5 style={styles}>Select crops</h5>
  <div className="form_group select-100">
    {cropNames.length > 0 && (
      <select
        className="wide custom-select"
        multiple
        onChange={(e) => {
          const selectedCrops = Array.from(e.target.selectedOptions, (option) => option.value);
          const newCrops = [...farm.crops]; // copy the existing crops
          selectedCrops.forEach((selectedCropName) => {
            const selectedCrop = crops.find((crop) => crop.type === selectedCropName);
            if (selectedCrop) {
              const cropIndex = newCrops.findIndex((crop) => crop.crop === selectedCrop._id);
              if (cropIndex === -1) {
                // if crop not already added, add it with count of 0
                newCrops.push({ crop: selectedCrop._id, count: 0 });
              }
            }
          });
          setFarm({ ...farm, crops: newCrops });
        }}
      >
      
        {cropNames.map((cropName, index) => (
          <option key={index} value={cropName}>
            {cropName}
          </option>
        ))}
      </select>
    )}
    {farm.crops.length > 0 && (
      farm.crops.map((crop, index) => {
        const selectedCrop = crops.find((c) => c._id === crop.crop);
        return (
          <row key={index}>
            {selectedCrop && <label style={styles}>{selectedCrop.type} count:</label>}
            <input
              type="number"
              value={crop.count}
              onChange={(e) => {
                const newCrops = [...farm.crops];
                newCrops[index].count = parseInt(e.target.value);
                setFarm({ ...farm, crops: newCrops });
              }}
            />{" "}
            &nbsp; &nbsp;
          
            <Button
              type="button"
              onClick={() => {
                const newCrops = [...farm.crops];
                newCrops.splice(index, 1);
                setFarm({ ...farm, crops: newCrops });
              }}
            >
              X
            </Button>
          </row>
        );
      })
    )}
  </div>
</div>


                

  
<div className="col-lg-12">
                      <h5></h5>
                    </div>
                    <div className="col-lg-12">
                      <h5></h5>
                    </div>



                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="number"
                          className="form_control"
                          placeholder="Employees number"
                          name="phone"
                          required=""
                          onChange={(e) => setFarm({ ...farm, employees: e.target.value })}
                        />
                      </div>
                    </div>
                 
                    <div className="col-lg-6">
  <div className="form_group select-100">
  {crops.length > 0 && (
    <select className="wide  custom-select" onChange={(e) => setFarm({ ...farm, country: e.target.value })}>
      <option value="">Select Governorate</option>
      <option value="Tunis">Tunis</option>
      <option value="Ariana">Ariana</option>
      <option value="Ben Arous">Ben Arous</option>
      <option value="Manouba">Manouba</option>
      <option value="Nabeul">Nabeul</option>
      <option value="Zaghouan">Zaghouan</option>
      <option value="Bizerte">Bizerte</option>
      <option value="Beja">Beja</option>
      <option value="Jendouba">Jendouba</option>
      <option value="Kef">Kef</option>
      <option value="Siliana">Siliana</option>
      <option value="Sousse">Sousse</option>
      <option value="Monastir">Monastir</option>
      <option value="Mahdia">Mahdia</option>
      <option value="Sfax">Sfax</option>
      <option value="Kairouan">Kairouan</option>
      <option value="Kasserine">Kasserine</option>
      <option value="Sidi Bouzid">Sidi Bouzid</option>
      <option value="Gabes">Gabes</option>
      <option value="Medenine">Medenine</option>
      <option value="Tataouine">Tataouine</option>
      <option value="Gafsa">Gafsa</option>
      <option value="Tozeur">Tozeur</option>
      <option value="Kebili">Kebili</option>
    </select>
  )}
  </div>
</div>
  <div className="col-lg-6">
  <FormGroup >
                
                 <Input 
    id="exampleFile" 
    name="file" 
    type="file" 
   
    onChange={handleFileChange} 
  />
                <FormText  style={styles}>
                  Please select your verification property file
                </FormText>
           
              </FormGroup>
              </div>



                
                  </div>
                  {alertMessage && (
        <h6 style={styles} onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </h6>
)}
                  <div className="col-lg-12">
                <Button className="btn" color="warning"  onClick={handleSubmit}>Register</Button>
                </div>


                </form>
                
              </div>
            </div>
          </div>
         </div>
      </section>
      <br/> <br/>    <br/> <br/>     <br/> <br/> 
      </>   )  } 
      
   {visible && ( 
   
   
   <section  className="page-banner bg_cover position-relative z-1"
      style={{ backgroundImage: "url(assets/images/bg/page-bg-1.jpg)" }}
    > 
        <div className="container">
        <div className="contact-four_content-box wow fadeInLeft mb-50">
                <div className="section-title section-title-white mb-60">
                  <span className="sub-title">Add your farm </span>
                  <h2>Thank you for your confidence, your request is in progress! You will receive an mail for the confirmation</h2>
               
   
 
                    <Button className="btn" color="warning"  onClick={handleGoBack}>Back To Farms</Button>
                    </div>
                    </div>
         </div>
      </section>
                    )}






      </Layout>}
      </>
  );
};
export default addFarm;
