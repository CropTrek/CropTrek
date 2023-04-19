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

  const [L, setL] = useState(null);


  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
    
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/getcoordinates")
      .then((res) => res.json())
      .then((data) => {
        setTerrainFarmer(data);
      })
      .catch((error) => {
        console.error("Error retrieving terrain data:", error);
      });
  }, []);
  useEffect(() => {
    import("leaflet").then((L) => {
      setL(() => L);
  
    });

  }, []);


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
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />

      {terrainFarmer.map((t, index) => (
        t.coordinates.length > 0 && (
          <Polygon key={index} pathOptions={{ color: 'red' }} positions={t.coordinates}>
            <Popup>{t.name}</Popup>
          </Polygon>
        )
      ))}
    </MapContainer>
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

