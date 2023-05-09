import Head from "next/head";
import { Col, Row } from "reactstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Profile from "./Profile"
const MapContainer = dynamic(() => import('react-leaflet').then((module) => module.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((module) => module.TileLayer), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((module) => module.Popup), { ssr: false });
const Polygon = dynamic(() => import('react-leaflet').then((module) => module.Polygon), { ssr: false });





export default function listFarm() {
  const [connectedUser, setConnectedUser] = useState(null);
  const [terrainFarmer, setTerrainFarmer] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [L, setL] = useState(null);
  const[crops,setCrops]=useState([]);
  
  
  
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
    return (

<>
{connectedUser && <Profile/> }
{!connectedUser && <Layout>
  <section className="blog-section pt-90 pb-130 p-r z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-10">
              <div className="section-title text-center mb-60 wow fadeInUp">
                <span className="sub-title">CropTrek Farms</span>
                <h2>Discover our farms </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
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

  {terrainFarmer.map((t, index) => {
    if (t.coordinates && t.coordinates.length > 0) {
      let color = "red";
      if (t.farmingType === "Organic Farming") {
        color = "blue";
      } else if (t.farmingType === "Aquaculture") {
        color = "green";
      } else if (t.farmingType === "Agroforestry") {
        color = "black";
      }

      return (
        <Polygon key={index} pathOptions={{ color: color }} positions={t.coordinates}>
          <Popup>
          <h6>Farmer:</h6>   {userMap[t.user]?.surname +' '+ userMap[t.user]?.name} <br />
          <h6>Farm name:</h6>  Farm name: {t.name} <br />
            <h6> Adresse:</h6>   Adresse: {t.country}<br />
            <h6>Farm type:</h6>   Farmer type: {t.farmingType}<br />
          <h6>Soil type:</h6>   {t.soilType}<br />
           <h6>Area(m²):</h6> {t.area}
           <h6>Crops: </h6> 
            {crops[t._id] && crops[t._id].map((crop , index) => (
              <div key={index}>  {t.crops && t.crops[index].count} m² &nbsp;{crop.type} </div>
            ))}
          </Popup>
        </Polygon>
      );
    } else {
      return null;
    }
  })}
</MapContainer>
          </div>
          <br/>
          <div className="row">
            <div className="col-lg-12">
              <div className="button-box text-center wow fadeInUp">
                <Link href="/Auth">
                  <a className="main-btn bordered-btn bordered-yellow">
                    Add your farm
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

   
    
      </Layout> } 

</>

    );
  }

