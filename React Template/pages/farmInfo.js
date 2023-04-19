import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { Button, Input } from "reactstrap";
import { Alert } from "react-bootstrap";
import Layout from "/src/layouts/Layout";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { addData } from '../Redux/Actions/farmAction';


const FarmInfo = () => {
    const [connectedUser, setConnectedUser] = useState(null);
    const [data,setData] =useState([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const activeLinkStyle = {
      color: 'yellow',
      textDecoration: 'underline yellow',
    };
    const getScrapedData=async()=>{
        axios.get('http://localhost:5000/farms/scrapingData').then((response)=>{
          console.log(response.data[7]?.img);
          const myData=response.data;
          setData(response.data);
        })
      };
      useEffect( ()=>{
        const profile = JSON.parse(localStorage.getItem('profile'));
      setConnectedUser(profile);
        getScrapedData()
       
      
      },[]);
      const click = (num) => {
        dispatch(addData(data[num]));
        router.push("/farmInfoDetail");
      };
      



    return (
      
        <Layout>
           
          <>
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
                  <Link href="farms">Farms</Link>
                </li>
                <li>
                  <Link  href="disease">Diseases</Link>
                </li>
                
             
                <li>
    <Link href="" activeClassName="active">
    <a style={activeLinkStyle}>Farm Informations</a>
          </Link>
        
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
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="portfolio-filter-button text-center mb-60 wow fadeInDown">
           <h3>Vegetable Gardens</h3>
          </div>
        </div>
      </div>
      <div className="row project-row">
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-1">
          <div className="project-item-three mb-30 wow fadeInUp">
            <div className="img-holder">
              <img src={data[0]?.img} alt="" />
              <div className="hover-portfolio">
                <div className="icon-btn">
                <Button onClick={() => click(0)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
 >

                    <a>
                      <i className="far fa-arrow-right" />
                    </a>
                  </Button>
                </div>
                <div className="hover-content">
                  <h3 className="title">
                   
                      <a>Growing Potatoes</a>
                  
                  </h3>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-2">
          <div className="project-item-three mb-30 wow fadeInDown">
            <div className="img-holder">
              <img src={data[1]?.img} alt="" />
              <div className="hover-portfolio">
                <div className="icon-btn">
                {/* <Link href={{ pathname: '/farmInfoDetail',  query: { data: JSON.stringify("episode") }}}> */}
                <Button onClick={() => click(1)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
 >
   
 

                    <a>
                      <i className="far fa-arrow-right" />
                    </a>
                  </Button>
                </div>
                <div className="hover-content">
                  <h3 className="title">
                  
                      <a>Growing Tomato</a>
                   
                  </h3>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-3">
          <div className="project-item-three mb-30 wow fadeInUp">
            <div className="img-holder">
              <img src={data[2]?.img} alt="" />
              <div className="hover-portfolio">
                <div className="icon-btn">
                <Button onClick={() => click(2)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
 >

                    <a>
                      <i className="far fa-arrow-right" />
                    </a>
                  </Button>
                </div>
                <div className="hover-content">
                  <h3 className="title">
                  
                      <a>Growing Onions</a>
                   
                  </h3>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-4">
          <div className="project-item-three mb-30 wow fadeInDown">
            <div className="img-holder">
              <img src={data[3]?.img} alt="" />
              <div className="hover-portfolio">
                <div className="icon-btn">
                <Button onClick={() => click(3)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
 >

                    <a>
                      <i className="far fa-arrow-right" />
                    </a>
                  </Button>
                </div>
                <div className="hover-content">
                  <h3 className="title">
                   
                      <a>Growing Corn</a>
                 
                  </h3>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-5">
          <div className="project-item-three mb-30 wow fadeInUp">
            <div className="img-holder">
              <img src={data[4]?.img} alt="" />
              <div className="hover-portfolio">
                <div className="icon-btn">
                <Button onClick={() => click(4)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
 >

                    <a>
                      <i className="far fa-arrow-right" />
                    </a>
                  </Button>
                </div>
                <div className="hover-content">
                  <h3 className="title">
                   
                      <a>Growing Peppers</a>
                   
                  </h3>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-6 cat-1">
          <div className="project-item-three mb-30 wow fadeInDown">
            <div className="img-holder">
              <img src={data[5]?.img} alt="" />
              <div className="hover-portfolio">
                <div className="icon-btn">
                <Button onClick={() => click(5)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
 >

                    <a>
                      <i className="far fa-arrow-right" />
                    </a>
                  </Button>
                </div>
                <div className="hover-content">
                  <h3 className="title">
                    
                      <a>Growing Pumpkins</a>
                   
                  </h3>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-3 cat-6">
          <div className="project-item-three mb-30 wow fadeInUp">
            <div className="img-holder">
              <img src={data[6]?.img} alt="" />
              <div className="hover-portfolio">
                <div className="icon-btn">
                <Button onClick={() => click(6)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
 >

                    <a>
                      <i className="far fa-arrow-right" />
                    </a>
                  </Button>
                </div>
                <div className="hover-content">
                  <h3 className="title">
                    
                      <a>Growing Artichoke</a>
                  
                  </h3>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-2 cat-5">
          <div className="project-item-three mb-30 wow fadeInDown">
            <div className="img-holder">
              <img src={data[7]?.img} alt="" />
              <div className="hover-portfolio">
                <div className="icon-btn">
                <Button onClick={() => click(7)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
 >

                    <a>
                      <i className="far fa-arrow-right" />
                    </a>
                  </Button>
                </div>
                <div className="hover-content">
                  <h3 className="title">
                   
                      <a>Growing Carrots</a>
                  
                  </h3>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12 project-column cat-4">
          <div className="project-item-three mb-30 wow fadeInUp">
            <div className="img-holder">
              <img src={data[8]?.img} alt="" />
              <div className="hover-portfolio">
                <div className="icon-btn">
                <Button onClick={() => click(8)} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
 >

                    <a>
                      <i className="far fa-arrow-right" />
                    </a>
                  </Button>
                </div>
                <div className="hover-content">
                  <h3 className="title">
                   
                      <a>Growing Garlic</a>
                  
                  </h3>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </> 
     
    
    </Layout>
  );
      };
      export default FarmInfo;