import FarmChart from "../../src/components/dashboard/FarmChart";
import { Button, Row, Col, Table, Card, CardTitle, CardBody ,Alert, } from "reactstrap";
import FullLayout from "../../src/layouts/FullLayout";
import React ,{useEffect,useState} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
  } from "reactstrap";
  import Link from "next/link";
import axios from "axios";
import { Image } from "react-bootstrap";
import AccessDach from "../accessDach";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { polygon, area } from '@turf/turf';
import Pagination from "react-bootstrap/Pagination";
const MapContainer = dynamic(() => import('react-leaflet').then((module) => module.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((module) => module.TileLayer), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((module) => module.Popup), { ssr: false });
const Polygon = dynamic(() => import('react-leaflet').then((module) => module.Polygon), { ssr: false });
const ITEMS_PER_PAGE = 5;

const getFarms = () => {

  const [connectedUser, setConnectedUser] = useState(null);
    const [farms, setFarms] = useState([]);
 const[user,setUser]=useState(null);
 const [userMap, setUserMap] = useState({});
 const [valArea, setValArea] = useState(0);
 const[crops,setCrops]=useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [filteredFarms, setFilteredFarms] = useState([]);
    const [selectedName, setSelectedName] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [numUnread, setNumUnread] = useState(0);  
    const [country, setCountry] = useState([]);
    const [L, setL] = useState(null);
    const [Marker, setMarkerr] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [mapEvents, setMapEvents] = useState(null);
    const [icon, setIcon] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
     
  
      fetchFarms();
  if(country){
    console.log(country)
  }
      const profile = JSON.parse(localStorage.getItem('profile'));
      setConnectedUser(profile);
   
      fetch('http://localhost:5000/farms/getTreeN')
      .then(response => response.json())
      .then(data => {setNotifications(data),
      setNumUnread(data.filter((notif) => !notif.isRead).length)})
      .catch(error => console.error(error));
      let timeoutId;
      if (alertMessage  ) {
        timeoutId = setTimeout(() => {
          setAlertMessage('');
        
        }, 3000); // affiche l'alerte pendant 3 secondes avant de la masquer
      }
      
      return () => clearTimeout(timeoutId);
    }, [alertMessage]);
    useEffect(() => {
      if(data){
     console.log(data)}
      async function fetchFarmsByFarmerName() {
        if (selectedName) {
          try {
            const response = await axios.get(`http://localhost:5000/farms/getFarmsByFarmerName/${selectedName}`);
            if (response.status === 200) {
              setFilteredFarms(response.data);
            } else if (response.status === 404) {
              setFilteredFarms(null);
            }
            
          } catch (err) {
            //console.error(err);
            setFilteredFarms(null);
          }
        } else {
          setFilteredFarms(farms);
        }
      
    }
    fetchFarmsByFarmerName();





    });
    useEffect(() => {
      import("leaflet").then((L) => {
        setL(L);
        import("react-leaflet").then((RL) => {
          setMapEvents(() => RL.useMapEvents);
          setMarkerr(() => RL.Marker);
        });
      });
    
    }, []);
     
  
   
   
    
    function deleteFarm(id) {
        const filteredFarms = farms.filter(farm => farm._id !== id);
       axios.delete(`http://localhost:5000/farms/deleteFarm/${id}`).then(()=>{
        setAlertMessage(`A farm has been deleted  `);
       setFarms(filteredFarms)});
      }
   
    
        async function fetchFarms() {
        
            try {
              const response = await axios.get('http://localhost:5000/farms/getFarms');
              const farms = response.data;
              setFarms(farms);
      
              const userIds = [...new Set(farms.map(farm => farm.user))];
      
              const userResponses = await Promise.all(userIds.map(userId => axios.get(`http://localhost:5000/api/users/${userId}`)));
              const users = userResponses.reduce((userMap, userResponse) => {
                const user = userResponse.data;
                return { ...userMap, [user._id]: user };
              }, {});
              setUserMap(users);
              for (const farm of farms) {
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
    
    
      
       function MapClick2Handler() {
        if (mapEvents) {
          mapEvents({
            click: handleMap2Click,
          });
        }
        return null;
      }
      
      
      
      const handleMap2Click = (event) => {
        const { lat, lng } = event.latlng;
        setMarkerPosition([lat, lng]);
       getCountryFromCoords(lat, lng).then(country => {
        setCountry(country);
         async function fetchData() {
      try {
        if(country){
          
        const response = await fetch(`http://localhost:5000/farms/statistics/${country}`);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData)
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();

       });
      
   
      };
  
      
      async function getCountryFromCoords(lat, lng) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;
      
        try {
          const response = await fetch(url);
          const data = await response.json();
          const country = data.address.country;
          const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || null; // Try to get the city using multiple address fields
        
          return `${city}, ${country}`; // Return a string with both the city and country
      
      
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    
      useEffect(() => {
        if (!L) return;
    
        const myIcon = L.icon({
          iconUrl:
            "https://cdn-icons-png.flaticon.com/512/4852/4852907.png",
          iconRetinaUrl:
            "https://cdn-icons-png.flaticon.com/512/4852/4852907.png",
    
          iconSize: [55, 75],
          iconAnchor: [15, 45],
          popupAnchor: [0, -40],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [41, 41],
          shadowAnchor: [13, 41],
        });
        setIcon(() => myIcon);
      }, [L]);


      const [activePage, setActivePage] = useState(1);

      const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
      };
      const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const visibleFarms = farms.slice(startIndex, endIndex);
             
      
  return (

<>

{!connectedUser || connectedUser.role != "admin" && <AccessDach/> }
{connectedUser && <FullLayout>
  

  <Breadcrumb>
 
    <BreadcrumbItem>Farms</BreadcrumbItem>
    <BreadcrumbItem>
      <Link href="getTrees">Trees</Link>
    </BreadcrumbItem>
 
 
  <div className="ml-auto">
    <a href="notifTree" onClick={() => setNumUnread(0)}>
      <i className="bi bi-bell me-2"></i>
     
    {numUnread > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{numUnread}</span>}
    </a>
  </div>
</Breadcrumb>


<MapContainer
    center={[36.8065, 10.1815]}
    zoom={13}
    style={{ height: "500px", marginBottom: "20px" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    />
    <MapClick2Handler />
    {markerPosition && (
        <Marker position={markerPosition} icon={icon}>
          <Popup>
       
            <h6>Crop statistics 🌲 </h6>
          {/* {data && data.treeStats.map(tree => (
          <li key={tree.type}>
            {tree.type}:  ({tree.percentage.toFixed(2)}%)
          </li>
        ))} */}
    {/* {
  data && data.treeStats.sort((a, b) => b.percentage - a.percentage).map((tree, index, array) => (
    <div key={index}>
      {array.every(item => item.percentage === tree.percentage) ? null : index === 0 ? <span role="img" aria-label="Crop">⭐</span> : null} {tree.type}: ({tree.percentage.toFixed(2)}%)
    </div>
  ))
} */}
{
  data &&
  data.treeStats
    .sort((a, b) => b.percentage - a.percentage)
    .map((tree, index, array) => (
      <div key={index}>
        {array.every(item => item.percentage === tree.percentage) ? null : (
          index === 0 && array[0].percentage !== array[1].percentage ? (
            <span role="img" aria-label="Crop">⭐</span>
          ) : null
        )}
        {tree.type}: ({tree.percentage.toFixed(2)}%)
      </div>
    ))
}


          <h6> Diseases statistics 💊 </h6>
          {data && data.diseaseStats.map(disease => (
          <li key={disease.name}>
            {disease.name}:  ({disease.percentage.toFixed(2)}%)
          </li>
        ))}
           
          </Popup>
        </Marker>
      )}
  </MapContainer>

    <Card>
    {alertMessage && (
        <Alert color="success" onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </Alert>
)}

      <CardBody>
    

     
        <CardTitle tag="h5">Farm list</CardTitle>
        <div class="search-container" >
         <input type="text" value={selectedName} onChange={(e) => setSelectedName(e.target.value)} placeholder="Search by farmer name" />
         </div> 
        <div className="table-responsive">
          <Table className="text-wrap mt-3 align-middle" borderless  >
            <thead>
              <tr>
              <th>Name</th>
              <th>Farmer</th>
                <th>Country</th>
                  <th>Area(m²) </th>
                  <th>Employees</th>
                <th>Soil</th>
               
                <th>Crops </th>
<th>Verifed</th>

<th></th>    
              </tr>
            </thead>
            <tbody>
    {visibleFarms && visibleFarms.map((tdata) => (
    
      <React.Fragment key={tdata._id}>
        <tr className="border-top">
          <td>
            <div className="d-flex align-items-center p-2">
         
              <div className="ms-3">
                <h6 className="mb-0"> 🌴 {tdata.name}</h6>
                <span className="text-muted">{tdata.farmingType}</span>
              </div>
            </div>
          </td>

          <td>{userMap[tdata.user] ? '👨‍🌾'+' '+ userMap[tdata.user]?.surname +' '+ userMap[tdata.user]?.name : "Loading..."}</td>
          <td>{tdata.country}</td>
          <td>{tdata.area} </td>
          <td>{tdata.employees} 👥</td>
          <td>{tdata.soilType}</td>
          <td>
            {crops[tdata._id] && crops[tdata._id].map((crop , index) => (
              <div key={index}>  {tdata.crops && tdata.crops[index].count} m² &nbsp;{crop.type} </div>
            ))}
          </td>
          <td>
            {tdata.status == true ? (
              <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
            )  : (
              <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
            )}
          </td>
          <td>
            <Button onClick={() => deleteFarm(tdata._id)} className="btn" outline color="warning">
              <i className="bi bi-trash3-fill"></i>
            </Button>
            &nbsp;
          </td>
        </tr>
      </React.Fragment>
    ))}
  </tbody>
          </Table>
        </div>
         <div className="d-flex justify-content-center">   
      <Pagination>
    {[...Array(Math.ceil(filteredFarms.length / ITEMS_PER_PAGE)).keys()].map(
      (pageNumber) => (
        <Pagination.Item
        key={pageNumber}
       
        active={pageNumber + 1 === activePage}
        onClick={() => handlePageChange(pageNumber + 1)}
      >
        {pageNumber + 1}
      </Pagination.Item>
      
      )
    )}
  </Pagination>

  </div>
      </CardBody>
    </Card>
   {/***Sales & Feed***/}
   <Row>
            <Col sm="12" lg="12">
              {/* <FarmChart /> */}
            </Col>
          </Row>
        
    </FullLayout>}
</>


  );
};

export default getFarms;