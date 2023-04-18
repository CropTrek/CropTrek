import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useRouter } from 'next/router';
import JobPosts from './JobPosts';
import { Button,Form,Modal, FormGroup, Label, Input} from "reactstrap";
import { FormControl } from 'react-bootstrap';
import axios from "axios";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { nanoid } from 'nanoid';   
import ReactSwitch from 'react-switch';
import Layout from "/src/layouts/Layout";
import Access from "./Access"
import Link from "next/link";

mapboxgl.accessToken = 'pk.eyJ1IjoiZWxtZWRkZWJ5YXNzbWluIiwiYSI6ImNsZnBoOWpsMjAweGgzdmwwZXFxc3R4anMifQ.AHBgMj0tbhmwzf9-zzXgYA';

function Map({ location, onLocationChange }) { 
  const [mapId, setMapId] = useState(null);

  useEffect(() => {
    if (!mapId) {
      setMapId(nanoid());
    } else {
      const map = new mapboxgl.Map({
        container: mapId,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-77.050, 38.889],
        zoom: 9,
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Enter Location',
        countries: 'tn',
        // limit:3
      });

      map.addControl(geocoder);

      geocoder.on('result', (e) => {
        const newLocation = e.result.place_name;
        onLocationChange(newLocation);
        console.log(newLocation);
      });

      return () => map.remove();
    }
  }, [mapId]);

  return (
    <>
      <div>{location}</div>
      <div id={mapId} className="map"></div>
    </>
  );
}


export default function ProfilePage() {

  let v=4;
  const [connectedUser, setConnectedUser] = useState(null);
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
    
  }, []);

  const router = useRouter()

      async function  updateProfile(){
        await router.push(`/User/${connectedUser?._id}`)
          }

      const [value, setValue] = useState(0);
      const [ratedPosts, setRatedPosts] = useState('')
      const [TotalRates, setTotalRates] = useState('')
      const [availableEmp, setAvailableEmp] = useState('')

      const [jobPosts, setJobPosts] = useState([]);
      const [modalDefaultOpen, setModalDefaultOpen] = React.useState(false);

      const [location, setLocation] = useState('');
      const handleLocationChange = (newLocation) => {
        setLocation(newLocation);
      };
      const [title, setTitle] = useState('')
      const [description, setDescription] = useState('')
      const [salary, setSalary] = useState('')
      const [employees, setEmployees] = useState('')
      const [file, setFile] = useState(null);
      const profile = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('profile'));
      const userId= profile._id

      const jobSeeker = profile.role



      const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    
        if (value === 'Crop Management') {
          setDescription('We\'re hiring a Crop Manager that covers the planning, planting, maintenance, and harvesting of crops. This may include irrigation, fertilization, weed and pest control.');
        } else if (value === 'Livestock Management') {
          setDescription('We\'re hiring a Livestock Manager that covers the management of livestock, including feeding, breeding, health, and welfare.');
        } else if (value === 'Food Processing') {
          setDescription('We\'re hiring a Food Processing Manager that covers the processing of crops and animal products into food for human or animal consumption. This may involve processing steps such as cheese making, baking, meat processing, etc.');
        } else if (value === 'Soil Management') {
          setDescription('We\'re hiring a Soil Manager that covers the conservation and improvement of soil quality to maintain the fertility of agricultural land.');
        } else if (value === 'Research And Development') {
          setDescription('We\'re hiring a Research And Development Manager that may include the development of new crop varieties, more sustainable farming practices, and new technologies to improve food production and quality.');
        } else if (value === 'Supply Chain Management') {
          setDescription('We\'re hiring a Supply Chain Manager that covers the management of logistics to transport food products from the farm to consumers, including packaging, storage, transportation, and distribution.');
        } else if (value === 'Financial Management') {
          setDescription('We\'re hiring a Financial Manager that covers the management of the farm\'s finances, including cost management, budgeting, cash management, and income tracking.');
        } else if (value === 'Human Resource Management') {
          setDescription('We\'re hiring a Human Resource Manager that covers the management of the personnel working in the farm, including scheduling, training, workplace safety, and compliance with employment rules.');
        } else {
          setDescription('');
        }
      };

      const handleResetForm = () => {
        setTitle('');
        setDescription('');
        setSalary('');
        setFile(null);
        setEmployees('');
      }

      const [checked, setChecked] = useState(true);

      const handleChange = val => {
        setChecked(val)
      }
      const [salaryError, setSalaryError] = useState('');
      

      const handleSalaryChange = (e) => {
        const value = e.target.value;
        const regex = /^[0-9]+$/; 

        if (regex.test(value) || value === '') {
          setSalary(value);
          setSalaryError('');
        } else {
          setSalaryError('Le salaire ne peut contenir que des chiffres.');
        }
      };

      useEffect(() => {
        async function fetchData() {
          const res = await axios.get('http://localhost:5000/job/getJobPosts');
          setJobPosts(res.data);
        }
        fetchData();
      }, []);
      
      const handleSubmit = async (e) => {
        console.log(userId);
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('location', location);
        formData.append('description', description);
        formData.append('salary', salary);
        formData.append('employees', employees);
        formData.append('file', file);
        formData.append('author', userId); 

        console.log(formData.get('userId'));
        try {
          const res = await axios.post('http://localhost:5000/job/addJobPost', formData);
          setModalDefaultOpen(false)
          const updatedJobPosts = await axios.get('http://localhost:5000/job/getJobPosts');
          setJobPosts(updatedJobPosts.data);
          handleResetForm()
          console.log(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      
      useEffect(() => {
        async function nbRatedPosts() {
          try {
            const res = await fetch(`http://localhost:5000/job/countRatingsByCurrentUser/${userId}`);
            const data = await res.json(); 
            setRatedPosts(data);
            console.log(ratedPosts);
          } catch (error) {
            console.error(error);
          }
        }
        nbRatedPosts();
        const intervalId = setInterval(nbRatedPosts, 1000);

        // Clean up the interval when the component unmounts
        return () => {
          clearInterval(intervalId);
        };
      }, []);
      
      

      useEffect(() => {
        async function nbTotalRates() {
          try {
            const res = await fetch(`http://localhost:5000/job/countRatingsByUser/${userId}`);
            const data = await res.json(); 
            //setTotalRates(total => total.filter(post => post._id !== id));
            setTotalRates(data);
          } catch (error) {
            console.error(error);
          }
        }
        nbTotalRates();
        const intervalId = setInterval(nbTotalRates, 1000);

        // Clean up the interval when the component unmounts
        return () => {
          clearInterval(intervalId);
        };
        
      }, []);

      useEffect(() => {
        async function availableUsers() {
          try {
            const res = await fetch(`http://localhost:5000/auth`);
            const data = await res.json(); 
            // console.log("ooooooooooooooooooooooooooooooooooooooo",data);
            setAvailableEmp(data)
          } catch (error) {
            console.error(error);
          }
        }
        availableUsers();
        const intervalId = setInterval(availableUsers, 1000);
        // Clean up the interval when the component unmounts
        return () => {
          clearInterval(intervalId);
        };
        
      }, []);

      const [employeesError, setEmployeesError] = useState('');
      const handleEmployeesChange = (e) => {
        const value = e.target.value;
        if (value > availableEmp) {
          setEmployeesError("No More Available Employees");
        } else {
          setEmployeesError("");
        }
        setEmployees(value);
      };
      

  return (
  <>
  {/* {!connectedUser && <Access/> } */}
    {connectedUser &&
    <Layout>
 
 <section
      className="page-banner bg_cover position-relative z-1"
      style={{ backgroundImage: "url(assets/images/bg/page-bg-2.jpg)" }}
    >
      <div
        className="brand-card text-center"
        style={{
          width: '300px',
          height: '300px',
          position: 'absolute',
          right: '60px',
        }}
      >
        <img
          src={`http://localhost:5000/api/users/file/${connectedUser?._id}`} 
          className="rounded-circle" fluid style={{ width: '150px', height:"150px" }}
        />
        <h4>{connectedUser?.name ?? 'Unknown User'}</h4>
      </div>
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
                  <Link className="active" href="">Home</Link>
                </li>
                <li>
                  <Link href="Card">Job Offers</Link>
                </li>
                <li>
                  <Link href="farms">Farms</Link>
                </li>
                
                
               
              </ul>
              
            </div>
            
          </div>
          
        </div>
        
      </div>
      
    </section>
    <section className="my-5" style={{ minHeight: '80vh' }}>
    <div style={{ width: '300px', marginLeft: 'auto', paddingRight:'95px', paddingTop:'30px' }}>
  <Button
    block
    className="main-btn yellow-bg"
    onClick={() => setModalDefaultOpen(true)}
    type="button"
  >
    New Post
  </Button>
</div>

  <MDBContainer  style={{ maxWidth: '1700px' }}>
  <div className="d-flex justify-content-end">
  
  

  
          <Modal
            isOpen={modalDefaultOpen}
            toggle={() => setModalDefaultOpen(false)}
            size="xl"
          >
            <div className=" modal-header">
              <h6 className=" modal-title" id="modal-title-default">
                New Job Offer
              </h6>
              <button
                aria-label="Close"
                className=" close"
                onClick={() => setModalDefaultOpen(false)}
                type="button"
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className=" modal-body">
            <Form onSubmit={handleSubmit}>
              
                    <div className="form_group">
                    <FormGroup className="mb-3" controlId="formBasicEmail">
                      <Label>Title</Label>
                      <FormControl as="select" required name="title" value={title} onChange={(e) => {setTitle(e.target.value); handleTitleChange(e) }} className="form_control" style={{border: '1px solid grey'}}>
                        <option value="">--Select Title--</option>
                        <option value="Crop Management">Crop Management.</option>
                        <option value="Livestock Management">Livestock Management.</option>
                        <option value="Food Processing">Food Processing.</option>
                        <option value="Soil Management">Soil Management.</option>
                        <option value="Research And Development">Research And Development.</option>
                        <option value="Supply Chain Management">Supply Chain Management.</option>
                        <option value="Financial Management">Financial Management.</option>
                        <option value="Human Resource Management">Human Resource Management.</option>
                      </FormControl>
                    </FormGroup>
  
                    </div> 
                    <FormGroup>
                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                     <Input id="exampleFormControlTextarea1" required placeholder="Enter Description" rows="3" type="textarea" name='description' value={description} onChange={(e) => setDescription(e.target.value)} style={{border: '1px solid grey'}}></Input>
                    </FormGroup>
                  <div className="form_group">
                    <FormGroup className="mb-3" controlId="formBasicEmail">
                    <Label>Salary</Label>
                    <FormControl type="text" required placeholder="Enter Salary" name="salary" value={salary} onChange={(e) => {setSalary(e.target.value); handleSalaryChange(e)}} className="form_control" style={{border: '1px solid grey'}}/>
                    {salaryError && <span style={{color: 'red'}}>{salaryError}</span>}
                    </FormGroup>  
                    <FormGroup>
                    <label htmlFor="exampleFormControlTextarea1">Employees</label>
                     <Input id="exampleFormControlTextarea1" required placeholder="Enter The Required Number Of Employees" type="number" min={0} name='employees' value={employees} onChange={(e) => {setEmployees(e.target.value); handleEmployeesChange(e)}} style={{border: '1px solid grey'}}></Input>
                     {employeesError && <span style={{ color: 'red' }}>{employeesError}</span>}
                    </FormGroup>
                    <div className="custom-file mb-4 mt-4" >
                    <input required
                      className=" custom-file-input mb-3"
                      id="customFileLang"
                      lang="en"
                      type="file" name="file" onChange={(e) => setFile(e.target.files[0])}></input>
                    <label className="custom-file-label mb-3" htmlFor="customFileLang">
                      {file ? file.name : 'Select file'}
                    </label>
                    </div> 
                      {/* <div>
                      <input type="number" value={value} onChange={e => setValue(prevValue => prevValue + 1)}  />
                      </div> */}
                    <div className="form_group mb-3">
                    <FormGroup className="mb-5"  controlId="formBasicEmail" >
                      
                    <Map location={location} onLocationChange={handleLocationChange} />                   
                       </FormGroup>   
                    </div> 
                 
                    </div> 
                    <div className='mb-3 '>
            <button className="main-btn yellow-bg" type='submit'>
                          save
                        </button>
             
              <Button
                className=" ml-auto"
                color="link"
                onClick={() => setModalDefaultOpen(false)}
                type="button"
              >
                Close
              </Button></div>

                    
                </Form>
            </div>
            
          </Modal>




</div>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="4" className="mx-auto">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage  src={`http://localhost:5000/api/users/file/${connectedUser?._id}`}
                    className="rounded-circle" fluid style={{ width: '150px', height:"150px" }} />
                </div>
            
                {
  <div>
    {TotalRates < 50 && <span>No Budge Yet</span>}
    {TotalRates >= 50 && TotalRates < 100 && (
      <div> 
        <MDBIcon fas icon="gem" size="3x" style={{ color: '#CD7F32' }} />
        <br />
        <span>Bronze</span>
      </div>
    )}
    {TotalRates >= 100 && TotalRates < 500 && (
      <div>
        <MDBIcon fas icon="gem" size="3x" style={{ color: 'silver' }} />
        <br />
        <span>Silver</span>
      </div>
    )}
    {TotalRates >= 500 && (
      <div>
        <MDBIcon fas icon="gem" size="3x" style={{ color: 'goldenrod' }} />
        <br />
        <span>Golden</span>
      </div>
    )}
  </div>
}
                <MDBCardText  tag="h6" className=" mb-2" style={{ textTransform: 'uppercase' , letterSpacing: '8px' }}>
                {connectedUser?.role ?? 'Unknown User'} 
                </MDBCardText>
                <MDBTypography tag="h4" style={{ textTransform: 'capitalize' }}> {connectedUser?.surname} {connectedUser?.name ?? 'Unknown User'}</MDBTypography>
                <MDBCardText className="text-muted mb-4" style={{ textTransform: 'capitalize' }}>
                {connectedUser?.email ?? 'Unknown User'} 
                </MDBCardText>
              
                {/* {jobSeeker === 'jobSeeker' && (   */}
               <div className="app mb-3" style={{textAlign: "center", display: "flex", alignItems: 'center', justifyContent: 'center'}}>
  <MDBCardText style={{ textTransform: 'capitalize', marginRight: "10px" }}> Availability </MDBCardText> 
  <ReactSwitch
    checked={checked}
    onChange={handleChange}
  />
</div>
{/* )} */}

                <button className="main-btn yellow-bg"  onClick={updateProfile}>Edit Profile
                        </button>
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <MDBCardText className="mb-1 h5">{ratedPosts} </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Rated Posts</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">8512</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{TotalRates} </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Total Rates</MDBCardText>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          
{/* Deuxieme Col */}
          <MDBCol md="8" className="mx-auto">
            <JobPosts></JobPosts>
          </MDBCol>

        </MDBRow>
            <MDBRow></MDBRow>
          
      </MDBContainer>
     
    </section></Layout>}
    </>
    
  );
}
