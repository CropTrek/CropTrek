
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
import Access from "./Access"
const Diseases = () => {

    
    const [connectedUser, setConnectedUser] = useState(null);
    const [resultat, setResultat] = useState(null);
    const [resultatTreatment, setResultatTreatment] = useState(null);
    const [image, setImage] = useState(null);
    const [astuce, setAstuce] = useState(false);
    const [astuceMessage, setAstuceMessage] = useState(null);
    const [loader, setLoader] = useState(false);
    const [active, setActive] = useState("collapse0");
    const [idFarm, setIdFarm] = useState(null);
    const[storedFarm,setStoredFarm] = useState(null);
    const router = useRouter();
    const activeLinkStyle = {
      color: 'yellow',
      textDecoration: 'underline yellow',
    };
    
    useEffect( ()=>{
      const profile = JSON.parse(localStorage.getItem('profile'));
      setConnectedUser(profile);
      const { id } = router.query;
      console.log(id);
      // Try to get the value of farmSelected from localStorage
    setStoredFarm(localStorage.getItem('farmSelected'));
    
      // If farmSelected is in query param, set it in state and localStorage
      // if (id) {
      //   setIdFarm(id);
      //   localStorage.setItem('farmSelected', id);
      // } 
    
     
    },[]);
   
    const handleChange = (event) => {
        setImage(event.target.files[0]);
      };
      const handleClick = async () => {
        setLoader(true);
        setAstuce(false);
        setResultat(null);
        setActive("collapse0");
        const formData = new FormData();
        formData.append("image", image);
        const responseUpload = await axios.post("http://localhost:5000/farms/upload", formData);
       
        // envoyer le chemin d'image dans la requête POST
        const imagePath = responseUpload.data.path;

        try {
            const response= await axios.post('http://localhost:5000/farms/diseaseDetect', { imagePath });
            console.log(response.data.message)
            const result = response.data.message.replace(/\r?\n|\r/g, "");
            const resultNew = response.data.message.replace(/___|_/g, " ");
            console.log(resultNew);
            setResultat(resultNew);
            console.log(idFarm);
            if(!resultNew.includes("We could not") && !resultNew.includes("healthy"))
          {  axios.get(`http://localhost:5000/farms/getDisease/${resultNew}`).then((response)=>{
                setResultatTreatment(response.data);
                 setAstuce(true);
             setAstuceMessage(resultNew+ "is " +response.data.description);
             axios.post(`http://localhost:5000/farms/addDiseaseHisto`, {
              name: resultNew,
              description: response.data.description,
              user: connectedUser._id,
              farm: storedFarm
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });





          })
        }

               }
           catch(error){} 
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
                {!resultat && loader  && (<>
<div className="loader-container">
  <div className="lds-facebook">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>

<style jsx>{`
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;

}
  .lds-facebook {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-facebook div {
    display: inline-block;
    position: absolute;
    left: 8px;
    width: 16px;
    background: #ffdd2c;
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }
  .lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }
  .lds-facebook div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }
  .lds-facebook div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }
  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }
    50%, 100% {
      top: 24px;
      height: 32px;
    }
  }
`}</style></>)}
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
                  <li className="list-group-item">
  {astuceMessage}
  <div style={{ textAlign: 'right', fontSize: '12px' }}>by ChatGpt</div>
</li>

  
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
 
</div> 

             </div>
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

     
</Layout>}
</> 
  );
};
export default Diseases;