
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { Button, Input } from "reactstrap";
import { Alert } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import OrgariumAcc from "/src/components/OrgariumAcc";
import Layout from "/src/layouts/Layout";
import { useRouter } from "next/router";
const Diseases = () => {

    
    const [connectedUser, setConnectedUser] = useState(null);
    const [resultat, setResultat] = useState(null);
    const [resultatTreatment, setResultatTreatment] = useState(null);
    const [image, setImage] = useState(null);
    const [astuce, setAstuce] = useState(null);
    const [astuceMessage, setAstuceMessage] = useState(null);
  
    const [active, setActive] = useState("collapse0");

   
    
    useEffect( ()=>{
      const profile = JSON.parse(localStorage.getItem('profile'));
      setConnectedUser(profile);
      axios.get('http://localhost:5000/farms/scrapingDisease').then((response)=>{
       setResultatTreatment(response.data);
      console.log(response.data[0].treatment[0])
      })
    },[]);
   
    const handleChange = (event) => {
        setImage(event.target.files[0]);
      };
      const handleClick = async () => {
        setAstuce(false);
        setActive("collapse0");
        const formData = new FormData();
        formData.append("image", image);
        const responseUpload = await axios.post("http://localhost:5000/farms/upload", formData);
       
        // envoyer le chemin d'image dans la requête POST
        const imagePath = responseUpload.data.path;

        try {
            const response= await axios.post('http://localhost:5000/farms/diseaseDetect', { imagePath });
            const result = response.data.result.replace(/\r?\n|\r/g, "");
            const resultNew = response.data.result.replace(/___|_/g, " ");
            console.log(resultNew);
            setResultat(resultNew); 
            const early=resultatTreatment[0].treatment;
            const late=resultatTreatment[1].treatment;
            const mosaic=resultatTreatment[2].treatment;
            const spot=resultatTreatment[3].treatment;
            if (resultNew.includes("Early blight")) {
              setAstuce(true);
             setAstuceMessage(early);
            }
           if (resultNew.includes("Late blight")) {
              setAstuce(true);
             setAstuceMessage(late);
            }
            if (resultNew.includes("mosaic virus")) {
              setAstuce(true);
             setAstuceMessage(mosaic);
            }
            if (resultNew.includes("leaf spot")) {
              setAstuce(true);
             setAstuceMessage(spot);
            }

               }
           catch(error){} 
          };
      
    
  
  
  
    return (
      
      <Layout>
        <>
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
                    <Link href="/">Home</Link>
                  </li>
                  <li href="../Profile">Profile</li>
                  <li>
                    <Link className="active" href="farms">Farms</Link>
                  </li>
                  <li>
                    <Link  href="">Diseases</Link>
                  </li>
                  <li>
                    <Link href="/farmInfo">Farm Informations</Link>
                  </li>
                  
                 
                </ul>
                
              </div>
              
            </div>
            
          </div>
          
        </div>
        
      </section>
<section className="about-section p-r z-1 pt-130 pb-80">
<div className="container">
  <div className="row align-items-center">
    <div className="col-xl-5 col-lg-6">
      <div className="about-one_content-box mb-50">
        <div className="section-title section-title-left mb-30 wow fadeInUp">
         
          <h3>Plant Disease Detection</h3>
        </div>
        <div
          className="quote-text mb-35 wow fadeInDown"
          data-wow-delay=".3s"
        >
          <p>
          The easiest way to keep your plants healthy is to  detect plant disease 
          

          </p>

        </div>
        <Tab.Container defaultActiveKey={"mission"}>
          <div className="tab-content-box wow fadeInUp">
            <Nav as={"ul"} className="nav nav-tabs mb-20">
              <li className="nav-item">
                <Nav.Link
                  as={"a"}
                  className="nav-link"
                  data-toggle="tab"
                  eventKey="mission"
                  href="#mission"
                >
                  What is it ? 
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link
                  as={"a"}
                  className="nav-link"
                  data-toggle="tab"
                  eventKey="vision"
                  href="#vision"
                >
                 Try it 
                </Nav.Link>
              </li>
            </Nav>
            <Tab.Content className="tab-content">
              <Tab.Pane className="tab-pane fade" eventKey="mission">
                <div className="content-box-gap">
                  <p>
                  Food security for billions of people on earth requires minimizing crop damage by timely detection of diseases.Developing methods for detection of plant diseases serves the dual purpose of increasing crop yield and reducing pesticide use without knowing about the proper disease. Along with development of better crop varieties, disease detection is thus paramount goal for achieving food security. The traditional method of disease detection has been to use manual examination by either farmers or experts, which can be time consuming and costly, proving infeasible for millions of small and medium sized farms around the world.
                  </p>
                  <div className="avatar-box d-flex align-items-center">
                   
                  </div>
                </div>
              </Tab.Pane>
             
              <Tab.Pane className="tab-pane fade" eventKey="vision">
              <h6>Just need to upload leaf image.</h6>
                <div className="content-box-gap">
                <Input id="exampleFile" name="file" type="file" onChange={handleChange}  />
                &emsp; 
                { resultat &&
              <Alert variant="success">
                {resultat}
                
              </Alert>
            }

         
            
        {astuce &&  <Accordion
                  defaultActiveKey="collapse0"
                  className="accordion"
                  id="accordionOne"
                >
                  <OrgariumAcc text={ <ol className="list-group-flush">
  <li className="list-group-item">{astuceMessage[0]}</li>
  <li className="list-group-item">{astuceMessage[1]}</li>
  <li className="list-group-item">{astuceMessage[2]}</li>
</ol>}
                    title={"How to avoid it ?"}
                    event={"collapse1"}
                    onClick={() => setActive("collapse1")}
                    active={active}
                  />
             </Accordion>
             }  
               &emsp; 
<div style={{ textAlign: "center" }}>
  <Button className="btn" color="warning" disabled={!image} onClick={handleClick}>Predict</Button>
 
</div>                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    </div>
    <div className="col-xl-7 col-lg-6">
      <div className="about-one_image-box p-r mb-50 pl-100">
      {image ? (
  <div className="about-img_two wow fadeInRight">
    <img src={URL.createObjectURL(image)} style={{ width: '600px' }}
                  fluid  alt="About Image" />
  </div>
) : (
  <div className="about-img_two wow fadeInRight">
    <img src="/assets/images/portfolio/img-12.jpg"  style={{ width: '600px' }}
                  fluid  alt="About Image" />
   
  </div>
)}
       
      </div>
    </div>
   
  </div>
</div>
</section>

      </> 
    
     
    
    </Layout>
  );
};
export default Diseases;