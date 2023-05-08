import Head from "next/head";
import { Col, Row } from "reactstrap";
import SalesChart from "../../src/components/dashboard/SalesChart";
import Feeds from "../../src/components/dashboard/Feeds";
import ProjectTables from "../../src/components/dashboard/ProjectTable";
import TopCards from "../../src/components/dashboard/TopCards";
import Blog from "../../src/components/dashboard/Blog";
import bg1 from "../../src/assets/images/bg/bg1.jpg";
import bg2 from "../../src/assets/images/bg/bg2.jpg";
import bg3 from "../../src/assets/images/bg/bg3.jpg";
import bg4 from "../../src/assets/images/bg/bg4.jpg";
import FullLayout from "../../src/layouts/FullLayout";
import { useEffect, useState } from "react";
import AccessDach from "../accessDach";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const MapContainer = dynamic(() => import('react-leaflet').then((module) => module.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((module) => module.TileLayer), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((module) => module.Popup), { ssr: false });
const Polygon = dynamic(() => import('react-leaflet').then((module) => module.Polygon), { ssr: false });




const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

export default function dashboard() {
  const [connectedUser, setConnectedUser] = useState(null);
  const [terrainFarmer, setTerrainFarmer] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [L, setL] = useState(null);
  const [selectedFarmingType, setSelectedFarmingType] = useState(null);

  
  
  
  
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
    
  }, []);

  useEffect(() => {
    fetchFarms();
  

}, []);
  useEffect(() => {
    import("leaflet").then((L) => {
      setL(() => L);
  
    });

  }, []);

  async function fetchFarms() {
    try {
        const response = await axios.get('http://localhost:5000/farms/getFarms');
        setTerrainFarmer(response.data);
        const farms = response.data;
        for (const farm of farms) {
          const userIds = [...new Set(farms.map(farm => farm.user))];
      
          const userResponses = await Promise.all(userIds.map(userId => axios.get(`http://localhost:5000/api/users/${userId}`)));
          const users = userResponses.reduce((userMap, userResponse) => {
            const user = userResponse.data;
            return { ...userMap, [user._id]: user };
          }, {});
          setUserMap(users);
          const cropResponses = await Promise.all(farm.crops.map(cropId => axios.get(`http://localhost:5000/farms/getCrop/${cropId.crop}`)));
          const crops = cropResponses.map(response => response.data);
         
          const farmCrops = [];
          for (const crop of crops) {
          
            farmCrops.push(crop);
          }
        
          setCrops(prevState => ({ ...prevState, [farm._id]: farmCrops }));
         
        }
      } catch (error) {
        
      }


}

const handleLegendItemClick = (farmingType) => {
  setSelectedFarmingType(farmingType);
};

const filteredTerrainFarmer = selectedFarmingType
  ? terrainFarmer.filter((t) => t.farmingType === selectedFarmingType)
  : terrainFarmer;
    return (

<>
{!connectedUser || connectedUser.role != "admin" && <AccessDach/> }
{connectedUser && <FullLayout>


      <div>
        <Head>
          <title>Ample Admin Next Js Free Aadmin Dashboard</title>
          <meta
            name="description"
            content="Ample Admin Next Js Free Aadmin Dashboard"
          />
        
          
        </Head>
        <div>
          {/***Top Cards***/}
           
          <Row>
            <Col sm="6" lg="3">
              <TopCards
                bg="bg-light-success text-success"
                title="Profit"
                subtitle="Yearly Earning"
                earning="$21k"
                icon="bi bi-wallet"
              />
            </Col>
            <Col sm="6" lg="3">
              <TopCards
                bg="bg-light-danger text-danger"
                title="Refunds"
                subtitle="Refund given"
                earning="$1k"
                icon="bi bi-coin"
              />
            </Col>
            <Col sm="6" lg="3">
              <TopCards
                bg="bg-light-warning text-warning"
                title="New Project"
                subtitle="Yearly Project"
                earning="456"
                icon="bi bi-basket3"
              />
            </Col>
            <Col sm="6" lg="3">
              <TopCards
                bg="bg-light-info text-into"
                title="Sales"
                subtitle="Weekly Sales"
                earning="210"
                icon="bi bi-bag"
              />
            </Col>
          </Row>
          <MapContainer
        center={[36.8065, 10.1815]}
        zoom={9}
        zoomControl={true}
        style={{ height: "400px", width: "100%", border: "2px solid #ccc" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy;
    
    
    <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors '
        />

        {filteredTerrainFarmer.map((t, index) => {
          if (t.coordinates && t.coordinates.length > 0) {
            let color = "gray";
            if (t.farmingType === "Organic Farming") {
              color = "red";
            } else if (t.farmingType === "Aquaculture") {
              color = "blue";
            } else if (t.farmingType === "Agroforestry") {
              color = "green";
            }

            return (
              <Polygon key={index} pathOptions={{ color: color }} positions={t.coordinates}>
                <Popup>
                  Farmer: {userMap[t.user]?.surname +' '+ userMap[t.user]?.name} <br />
                  Farm name: {t.name} <br />
                  Adresse: {t.country}<br />
                  Farmer type: {t.farmingType}<br />
                  Soil type: {t.soilType}<br />
                  Area(m²): {t.area}
                </Popup>
              </Polygon>
            );
          } else {
            return null;
          }
        })}
      </MapContainer>
<div className="legend" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
<div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px', marginBottom: '5px' ,cursor:'pointer'}}  onClick={() => handleLegendItemClick(null)}
>
    <div className="legend-color" style={{ width: '20px', height: '20px', marginRight: '5px', borderRadius: '50%', backgroundColor: 'transparent', border:'1px solid black' }}></div>
    <div className="legend-text" style={{ fontSize: '14px' }}>All farms</div>
  </div>
  <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px', marginBottom: '5px',cursor:'pointer' }}  onClick={() => handleLegendItemClick("Organic Farming")}
>
    <div className="legend-color" style={{ width: '20px', height: '20px', marginRight: '5px', borderRadius: '50%', backgroundColor: 'red' }}></div>
    <div className="legend-text" style={{ fontSize: '14px' }}>Organic Farming</div>
  </div>
  <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px', marginBottom: '5px',cursor:'pointer' }} onClick={() => handleLegendItemClick("Aquaculture")}
>
    <div className="legend-color" style={{ width: '20px', height: '20px', marginRight: '5px', borderRadius: '50%', backgroundColor: 'blue' }}></div>
    <div className="legend-text" style={{ fontSize: '14px' }}>Aquaculture</div>
  </div>
  <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px', marginBottom: '5px' ,cursor:'pointer'}}onClick={() => handleLegendItemClick("Agroforestry")}
>
    <div className="legend-color" style={{ width: '20px', height: '20px', marginRight: '5px', borderRadius: '50%', backgroundColor: 'green' }}></div>
    <div className="legend-text" style={{ fontSize: '14px' }}>Agroforestry</div>
  </div>
  <div className="legend-item" style={{ display: 'flex', alignItems: 'center', marginRight: '10px', marginBottom: '5px',cursor:'pointer' }}onClick={() => handleLegendItemClick("Conventional Farming")}
>
    <div className="legend-color" style={{ width: '20px', height: '20px', marginRight: '5px', borderRadius: '50%', backgroundColor: 'gray' }}></div>
    <div className="legend-text" style={{ fontSize: '14px' }}>Conventional Farming</div>
  </div>
</div>

          {/***Sales & Feed***/}
          <Row>
            <Col sm="12" lg="12">
              <SalesChart />
            </Col>
          </Row>
          
          {/***Table ***/}
          <Row>
            <Col lg="6" xxl="8" sm="12">
              <ProjectTables />
            </Col>
            <Col sm="12" lg="6" xl="5" xxl="4">
              <Feeds />
            </Col>
          </Row>
          {/***Blog Cards***/}
          <Row>
            {BlogData.map((blg) => (
              <Col sm="6" lg="6" xl="3" key={blg.title}>
                <Blog
                  image={blg.image}
                  title={blg.title}
                  subtitle={blg.subtitle}
                  text={blg.description}
                  color={blg.btnbg}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>

      </FullLayout> } 

</>

    );
  }

