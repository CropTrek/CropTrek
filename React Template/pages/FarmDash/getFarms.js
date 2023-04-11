// import FarmChart from "../../src/components/dashboard/FarmChart";
import { Button, Row, Col, Table, Card, CardTitle, CardBody ,Alert, } from "reactstrap";
import FullLayout from "../../src/layouts/FullLayout";
import React ,{useEffect,useState} from "react";
import AccessDach from "../accessDach";

import {
    Breadcrumb,
    BreadcrumbItem,
  } from "reactstrap";
  import Link from "next/link";
import axios from "axios";
import { Image } from "react-bootstrap";

const getTrees = () => {


 
  const [connectedUser, setConnectedUser] = useState(null);
    const [farms, setFarms] = useState([]);
 const[user,setUser]=useState(null);
 const[crops,setCrops]=useState([]);
    const [alertMessage, setAlertMessage] = useState('');
   
   

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
  
   
    
    function deleteFarm(id) {
        const filteredFarms = farms.filter(farm => farm._id !== id);
       axios.delete(`http://localhost:5000/farms/deleteFarm/${id}`).then(()=>{
        setAlertMessage(`A farm has been deleted  `);
       setFarms(filteredFarms)});
      }
   
    
        async function fetchFarms() {
            try {
                const response = await axios.get('http://localhost:5000/farms/getFarms');
                setFarms(response.data);
              
                const farms = response.data;
                for (const farm of farms) {
                  const userResponse = await axios.get(`http://localhost:5000/api/users/${farm.user}`);
                  const user = userResponse.data;
                  setUser(user)
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
        {/* <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search user" />  */}
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
    {farms.map((tdata) => (
    
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
          <td>{user ? '👨‍🌾'+' '+ user.surname +' '+ user.name : "Loading..."}</td>
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
   {/* **Sales & Feed**
   <Row>
            <Col sm="12" lg="12">
              <FarmChart />
            </Col>
          </Row> */}
        
    </FullLayout>}
</>


  );
};

export default getTrees;