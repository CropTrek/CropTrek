
import Layout from "../src/layouts/Layout";
import { useRouter } from 'next/router';
import { Dropdown } from "react-bootstrap";
import {useEffect,useState} from "react";
import { Button } from "reactstrap";
import { FormGroup,Label,Input,FormText} from "reactstrap";
import Access from "./Access"
import Link from "next/link";
import { Form } from "react-bootstrap";

const cropPrediction = () => {   const styles = {
  color: 'white' }
  const activeLinkStyle = {
    color: 'yellow',
    textDecoration: 'underline yellow',
  };
  const [soil, setSoil] = useState({ N:0,P:0, K:0, pH:0, Tmin:0 , Tmax:0});
  const [connectedUser, setConnectedUser] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedTempInterval, setSelectedTempInterval] = useState('');
  
 
  useEffect(() => {
  
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
  
   
    let timeoutId;
    if (alertMessage  ) {
      timeoutId = setTimeout(() => {
        setAlertMessage('');
      
      }, 30000); // affiche l'alerte pendant 3 secondes avant de la masquer
    }

   

  }, [alertMessage]);
  
 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSoil({ ...soil, [name]: value });
  };
  const handleInputChangeTemp = (e) => {
    console.log(e)
    const selectedTempInterval = e;
    setSelectedTempInterval(e);
    const [tMin, tMax] = selectedTempInterval.substring(1, selectedTempInterval.length - 1).split(',');
    setSoil({ ...soil, 'Tmin': parseInt(tMin), 'Tmax': parseInt(tMax) });
    
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(soil);
    fetch(`http://localhost:5000/farms/cropReg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(soil)
      })
      .then(res => res.json())
      .then(data => {
       
        if (data.success) {
         
          setAlertMessage("Based on soil parameter data, you can plant  "+data.message);
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




 

 <br/><br/><br/><br/>
 <section className="contact-section dark-black-bg pt-130 pb-80">
<div className="container">
  <div className="row">
    <div className="col-lg-5">
      <div className="contact-four_content-box wow fadeInLeft mb-50">
        <div className="section-title section-title-white mb-60">
          <span className="sub-title">Crop prediction</span>
          <p style={styles}>Recording soil data such as pH, K, and N can help predict the crops that are best suited for your land. Start tracking this valuable information today to maximize your yield and grow your farm business!</p>
        </div>
        <div className="contact-form">
          <Form >
          <Dropdown onSelect={handleInputChangeTemp }>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      {selectedTempInterval !== '' ? selectedTempInterval : 'Temperature interval'}

      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="[10,25]">[10,25]</Dropdown.Item>
        <Dropdown.Item eventKey="[10,30]">[10,30]</Dropdown.Item>
        <Dropdown.Item eventKey="[15,20]">[15,20]</Dropdown.Item>
        <Dropdown.Item eventKey="[15,25]">[15,25]</Dropdown.Item>
        <Dropdown.Item eventKey="[15,30]">[15,30]</Dropdown.Item>
        <Dropdown.Item eventKey="[20,30]">[20,30]</Dropdown.Item>
        <Dropdown.Item eventKey="[20,40]">[20,40]</Dropdown.Item>
        <Dropdown.Item eventKey="[25,30]">[25,30]</Dropdown.Item>
        <Dropdown.Item eventKey="[25,35]">[25,35]</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> <br/> <br/>
            <div className="form_group">
              <input
                type="number"
                className="form_control"
                placeholder="Azote(N)"
                name="N"
               
                onChange={handleInputChange}
                required=""
              />
            </div>
            <div className="form_group">
              <input
                type="number"
                className="form_control"
                placeholder="Phosphore(P)"
                name="P"
              
                onChange={handleInputChange}
                required=""
              />
            </div>
            <div className="form_group">
              <input
               type="number"
                className="form_control"
                placeholder="Potassium(K)"
                name="K" 
                onChange={handleInputChange}
               
              />
            </div>
            <div className="form_group">
              <input
               type="number"
                className="form_control"
                placeholder="Potentiel Hydrogène(pH)"
                name="pH"
               
                onChange={handleInputChange}
               
              />
            </div>
           
<div className="form_group">
              <Button  onClick={handleSubmit} className="main-btn btn-yellow">
                Send
              </Button>
            </div>
            {alertMessage && (
        <h6 style={styles} onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </h6>
)}
          </Form>
        </div>
      </div>
    </div>
    <div className="col-lg-7">
    <div className="about-img_two wow fadeInRight">
    <img src="/assets/images/portfolio/img-15.jpg"  style={{ width: '600px' }}
                  fluid  alt="About Image" />
   
  </div>
    </div>
  </div>
</div>
</section>
<br/><br/><br/><br/>

     
</Layout>}
    </> 
  );
};
export default cropPrediction;
