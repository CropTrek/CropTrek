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
import TimeLine from './Timeline';
import { Button,Form,Modal, FormGroup, Label, Input} from "reactstrap";
import { FormControl } from 'react-bootstrap';
import axios from "axios";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { nanoid } from 'nanoid';   
import ReactSwitch from 'react-switch';
import JobPosts from './JobPosts';


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


      const [jobPosts, setJobPosts] = useState([]);
      const [modalDefaultOpen, setModalDefaultOpen] = React.useState(false);

      const [location, setLocation] = useState('');
      const handleLocationChange = (newLocation) => {
        setLocation(newLocation);
      };
      const [title, setTitle] = useState('')
      const [description, setDescription] = useState('')
      const [salary, setSalary] = useState('')
      const [file, setFile] = useState(null);
      const profile = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('profile'));
      const userId= profile._id

      const jobSeeker = profile.role

      const handleResetForm = () => {
        setTitle('');
        setDescription('');
        setSalary('');
        setFile(null);
        setUserId('');
      }

      const [checked, setChecked] = useState(true);

      const handleChange = val => {
        setChecked(val)
      }

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
     



  return (
  <>
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
                    <FormControl type="text" required placeholder="Enter Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="form_control" style={{border: '1px solid grey'}}/>
                    </FormGroup>   
                    </div> 
            

                    <FormGroup>
                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                     <Input id="exampleFormControlTextarea1" required placeholder="Enter Description" rows="3" type="textarea" name='description' value={description} onChange={(e) => setDescription(e.target.value)} style={{border: '1px solid grey'}}></Input>
                    </FormGroup>
                  <div className="form_group">
                    <FormGroup className="mb-3" controlId="formBasicEmail">
                    <Label>Salary</Label>
                    <FormControl type="text" required placeholder="Enter Salary" name="salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="form_control" style={{border: '1px solid grey'}}/>
                    
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
            
                {v===4 && <div><MDBIcon fas icon="gem"  size="3x" style={{ color: '#CD7F32' }} /><br/><span>Suggested</span></div> }
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
                    <MDBCardText className="mb-1 h5">8471 </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">8512</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">4751 <i class="fas fa-star"></i></MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Total Ranking</MDBCardText>
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
     
    </section>
    </>
  );
}