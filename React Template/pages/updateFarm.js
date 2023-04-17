import axios from "axios";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import { useRouter } from 'next/router';
import {useEffect,useState} from "react";
import { Button, Row } from "reactstrap";
import Access from "./Access"
import Link from "next/link";
const addFarm = () => {   const styles = {
  color: 'white' }
  const [farm, setFarm] = useState({crops :[]});
  const [connectedUser, setConnectedUser] = useState('');
  const [visible, setVisible] = useState(false);
  const [cropNames, setCropsNames] = useState([]);
  const [crops, setCrops] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [idFarm, setIdFarm] = useState(null);
  const router = useRouter();
  useEffect(() => {
  
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
  
        getFarms();
      
    
    console.log(farm);
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
        className="brand-card text-center"
        style={{
          width: '300px',
          height: '300px',
          position: 'absolute',
          right: '60px',
        }}
      >
       <img
    src={`http://localhost:5000/api/users/file/${connectedUser?._id}`} 
    alt="icon"
    style={{
      width: '300px',
      height: '220px',
      borderRadius: '50%',
      objectFit: 'cover',
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
               <Link href="/">Home</Link>
             </li>
             <li>
               <Link href="Profile">Profile</Link>
             </li>
             <li>
               <Link className="active" href="farms">Farms</Link>
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
    
    { !visible  && ( <> <section  className="page-banner bg_cover position-relative z-1"
      style={{ backgroundImage: "url(assets/images/bg/page-bg-1.jpg)" }}
    > 
        <div className="container">
        <div className="contact-four_content-box wow fadeInLeft mb-50">
                <div className="section-title section-title-white mb-60">
                  <span className="sub-title">Update your farm </span>
                  <h2>Update your farm now and join us</h2>
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
                          placeholder={farm.name}
                          name="name"
                         value ={farm.name || ''}
                          onChange={(e) => setFarm({ ...farm,name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group select-100">
                      {crops.length > 0 && (
                        <select className="wide  custom-select" onChange={(e) => setFarm({ ...farm,farmingType: e.target.value })}>
                          <option value="">{farm.farmingType || ""}</option>
                          <option value='Conventional Farming'>Conventional Farming</option>
                          <option value='Organic Farming'>Organic Farming</option>
                          <option value='Aquaculture'>Aquaculture</option>
                          <option value='Agroforestry'>Agroforestry</option>
                        
                        </select>
                      )}
                      </div>
                    </div>
                  
                   
                    <div className="col-lg-6">
  <h5 style={styles}>Select crops</h5>
  <div className="form_group select-100">
    {cropNames.length > 0 && (
      <select
        className="wide custom-select"
        multiple
        value={farm.crops.map((crop) => crops.find((c) => c._id === crop.crop).type)}
        onChange={(e) => {
          const selectedCrops = Array.from(e.target.selectedOptions, (option) => option.value);
          const newCrops = [...farm.crops];
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
          <Row key={index}>
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
          </Row>
        );
      })
    )}
  </div>
</div>

<div className="col-lg-6">
  <div className="form_group select-100">
  {crops.length > 0 && (
    <select className="wide  custom-select" onChange={(e) => setFarm({ ...farm, country: e.target.value })}>
      <option value="">{farm.country || ""}</option>
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
                          placeholder="Area (m²)"
                          name="phone"
                        value={farm.area || ''}
                          onChange={(e) => setFarm({ ...farm, area: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="number"
                          className="form_control"
                          placeholder="Employees number"
                          name="phone"
                          value={farm.employees || ""}
                          onChange={(e) => setFarm({ ...farm, employees: e.target.value })}
                        />
                      </div>
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
               

<>
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
</>


                </form>
                
              </div>
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
      </Layout>}</>
  );
};
export default addFarm;
