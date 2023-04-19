
import { Button, Table, Card, CardTitle, CardBody ,Alert } from "reactstrap";
import FullLayout from "../../src/layouts/FullLayout";
import React ,{useEffect,useState} from "react";
import AccessDach from "../accessDach";

import {
    Breadcrumb,
    BreadcrumbItem,
  } from "reactstrap";
  import Link from "next/link";
import axios from "axios";
const getTrees = () => {
  const cropIcons = {
    "Tomato": "🍅",
    "Potato": "🥔",
    "Cucumber": "🥒",
    "Coriander": "🌿",
    "Pumpkin": "🎃",
    "Maize": "🌽",
    "Onion": "🧅"
  };
  

  const [showFullText, setShowFullText] = useState(false);
  const [showFullText1, setShowFullText1] = useState(false);
  const [connectedUser, setConnectedUser] = useState(null);
    const [trees, setTrees] = useState([]);
    const [treesR, setTreesR] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [file, setFile] = useState(null);
    const [filteredTrees, setFilteredTrees] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    useEffect(() => {
     
  
      fetchTrees();
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
      // Fetch trees by selected type
      async function fetchTreesByType() {
        if (selectedType) {
        const response = await axios.get(`http://localhost:5000/farms/getTreeBySeason/${selectedType}`);
        setFilteredTrees(response.data);
      }else{
        setFilteredTrees(trees);
      }
    }
      fetchTreesByType();
    }, [selectedType]);
  
    const handleTypeSelect = (event) => {
      console.log(event.target.value)
      setSelectedType(event.target.value);
    };
    
    function deleteTree(id) {
        const filteredTrees = trees.filter(tree => tree._id !== id);
       axios.delete(`http://localhost:5000/farms/deleteTree/${id}`).then(()=>{
        setAlertMessage(`A tree has been deleted  `);
       setTrees(filteredTrees)});
      }

      async function fetchTrees() {
        await axios.get('http://localhost:5000/farms/getTrees').then((res)=>{
          setTrees(res.data);
          setFilteredTrees(res.data);
        console.log(res)})
         .catch((error)=>console.log(error))
      
       }
      
       

    
      
      const handleFileChange = async(event) => {
       
      setFile(event.target.files[0]);
   

      };
    
      // const click = async(event) => {
   
        
      //   const formData = new FormData();
      //   formData.append("file", file);
      //   try {
      //     const response =  await axios.post('http://localhost:5000/farms/addTree', formData);
      //     if(response.status==200)
      //  fetchTrees()
      //   else setAlertMessage("wrong data , please verfiy !")
     
         
      //   } catch (error) {
      //     console.error(error);
      //   }
      
   

      // };
    
      
      














  return (

<>

{!connectedUser || connectedUser.role != "admin" && <AccessDach/> }
{connectedUser && <FullLayout>
  

<Breadcrumb>
             
             
              <BreadcrumbItem>
                <Link href="getFarms">Farms</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Trees</BreadcrumbItem>
            
            </Breadcrumb>
          
            {/* <FormGroup >
                <Label for="exampleFile">File</Label>
                 <Input 
    id="exampleFile" 
    name="file" 
    type="file" 
    accept=".json" 
    onChange={handleFileChange} 
  />
                <FormText>
                  Select your json file to add new tree types or to update your database 
                </FormText>
             <Button onClick={click}>Fetch</Button>
              </FormGroup> */}
           



         
       



    <Card>
    {alertMessage && (
        <Alert color="success" onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </Alert>
)}

      <CardBody>
    

     
        <CardTitle tag="h5">Tree list</CardTitle>



        <label>
        <select value={selectedType} onChange={handleTypeSelect}>
          <option value="">No filter</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
        </select>
      </label>
        <div className="table-responsive">
          <Table className="text-wrap mt-3 align-middle" borderless  >
            <thead>
              <tr>
              <th>Type</th>
                <th>Sunlight</th>
                <th>Timing</th>
                  <th>Soil</th>
                  <th>Zones</th>
                <th>Water</th>
               
                <th>Fertilization</th>
<th></th>

               
              </tr>
            </thead>
            <tbody>
           {filteredTrees && filteredTrees.map((tdata, index) => (
            <>
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      
                    
<div className="ms-3">
  <h6 className="mb-0">{cropIcons[tdata.type]} {tdata.type}</h6>
</div>
                    </div>
                  </td>
                  <td>{tdata.sunlight}</td>
                  <td>{tdata.plantingTime}</td>
                  
                  <td>{tdata.soil}</td>
                  <td>{tdata.hardinessZones}</td>
                  <td >{showFullText ? tdata.water : `${tdata.water.slice(0, 50)}...`} <button onClick={() => setShowFullText(!showFullText)}>
  {showFullText ? "Voir moins" : "Voir plus"}
</button></td>

<td >{showFullText1 ? tdata.fertilization : `${tdata.fertilization.slice(0, 50)}...`} <button onClick={() => setShowFullText1(!showFullText1)}>
  {showFullText1 ? "Voir moins" : "Voir plus"}
</button></td>

                  <td>
                 
    <Button onClick={() => deleteTree(tdata._id)} className="btn" outline color="warning">
    <i class="bi bi-trash3-fill"></i>
    </Button>
    &nbsp;
 
  </td>
  </tr>
  </>
   ))}           
              
    
         
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  
    </FullLayout>}
</>


  );
};

export default getTrees;