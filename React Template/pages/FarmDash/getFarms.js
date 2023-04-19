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
import AccessDach from "../AccessDach";

const getFarms = () => {


 
  const [connectedUser, setConnectedUser] = useState(null);
    const [farms, setFarms] = useState([]);
 const[user,setUser]=useState(null);
 const [userMap, setUserMap] = useState({});

 const[crops,setCrops]=useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [filteredFarms, setFilteredFarms] = useState([]);
    const [selectedName, setSelectedName] = useState('');
   

    useEffect(() => {
     
  
      fetchFarms();
  
      const profile = JSON.parse(localStorage.getItem('profile'));
      setConnectedUser(profile);
   
    
      let timeoutId;
      if (alertMessage  ) {
        timeoutId = setTimeout(() => {
          setAlertMessage('');
        
        }, 3000); // affiche l'alerte pendant 3 secondes avant de la masquer
      }
      
      return () => clearTimeout(timeoutId);
    }, [alertMessage]);

    useEffect(() => {
     
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
   
  return (

<>

{!connectedUser || connectedUser.role != "admin" && <AccessDach/> }
{connectedUser && <FullLayout>
  

<Breadcrumb>
             
           
              <BreadcrumbItem active>Farms
              </BreadcrumbItem>
              <BreadcrumbItem><Link href="getTrees">Trees</Link> </BreadcrumbItem>
            
            </Breadcrumb>
 

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
                  <th>Area</th>
                  <th>Employees</th>
                <th>Soil</th>
               
                <th>Crops </th>
<th>Verifed</th>

<th></th>    
              </tr>
            </thead>
            <tbody>
    {filteredFarms && filteredFarms.map((tdata) => (
    
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
          <td>{tdata.area} hectar</td>
          <td>{tdata.employees} 👥</td>
          <td>{tdata.soilType}</td>
          <td>
            {crops[tdata._id] && crops[tdata._id].map((crop , index) => (
              <div key={index}>  {tdata.crops && tdata.crops[index].count} &nbsp;{crop.type} </div>
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
      </CardBody>
    </Card>
   {/***Sales & Feed***/}
   <Row>
            <Col sm="12" lg="12">
              <FarmChart />
            </Col>
          </Row>
        
    </FullLayout>}
</>


  );
};

export default getFarms;