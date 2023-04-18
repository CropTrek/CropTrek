import React, { useEffect, useMemo, useState } from "react";
import Moment from 'moment';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBCardText,
  MDBCardFooter, 
  MDBBtn} from "mdb-react-ui-kit";
import { Modal, Button, FormGroup, Form, Label, Input } from "reactstrap";
import { FormControl } from "react-bootstrap";
import axios from "axios";
import MyComponent from "./Rating";
import { useRouter } from "next/router";
import ReactPaginate from 'react-paginate';
import Link from "next/link";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Rating = ({ value, onClick }) => {
  const stars = Array(5).fill(0).map((_, i) => i + 1);

  return (
    <div className="rating">
      {stars.map((star) => (
        <i
          key={star}
          className={
            value >= star
              ? "fas fa-star"
              : value >= star - 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
          onClick={() => onClick(star)}
        ></i>
      ))}
    </div>
  );
};

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

export default function TimeLine() {



    

    

    const handleDropdown = () => {
      setIsOpen(!isOpen);
    };
    const [comment, setComment]= useState('')
    const [commentValue, setCommentValue] = useState('') 
    const[post, setPost]=useState('')
    const [job, setJob]= useState('')

    const [isOpen, setIsOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = React.useState(false);
    const [modalLoadAppliers, setModalLoadAppliers] = React.useState(false);
    const [modalDefaultOpen, setModalDefaultOpen] = React.useState(false);
    const [modalNotificationOpen, setModalNotificationOpen] = React.useState(false);
    const [modalCommentOpen, setModalCommentOpen] = React.useState(false);
    const [modalRateOpen, setModalRateOpen] = React.useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = React.useState(false);
    const [modalDeleteSecondOpen, setModalDeleteSecondOpen] = useState(false);
    const [modalEditSecondOpen, setModalEditSecondOpen] = useState(false);
    const handleInputClick = (event) => {
      event.stopPropagation();
    }

    const [showPopup, setShowPopup] = useState(false);

    const profile = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('profile'));
    const author= profile._id
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const userId = profile._id
    const [user, setUser] = useState({}); 

    const [totalRates, setTotalRates] = useState('')


    const [rating, setRating] = useState(0);
    const handleRatingClick = (value) => { setRating(value) };

    useEffect(() => {
      async function nbTotalRates() {
        try {
          const res = await fetch(`http://localhost:5000/job/countRatingsByUser/${userId}`);
          const data = await res.json(); 
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

        const [searchTerm, setSearchTerm] = useState("");

        let storedSelectedFilter = '';
        if (typeof localStorage !== 'undefined') {
          storedSelectedFilter = localStorage.getItem('selectedFilter') || '';
        }
        
        const [selectedFilter, setSelectedFilter] = useState(storedSelectedFilter);
        const [selectedFilterLabel, setSelectedFilterLabel] = useState("Sort By");
        
        const [selectedOption, setSelectedOption] = useState("");

        const handleSelectChange = (event) => {
          setSelectedOption(event.target.value);
        }

        const handleFilterChange = (event) => {
          console.log("ooooooooooooooooooo");
          const newSelectedFilter = event.target.value;
          setSelectedFilter(newSelectedFilter);
          console.log("ooooooooooo",newSelectedFilter);
          localStorage.setItem('selectedFilter', newSelectedFilter);
        };
        
        
        const [currentPage, setCurrentPage] = useState(0);
        const [postsPerPage, setPostsPerPage] = useState(1);
        // const [currentPosts, setCurrentPosts] = useState([]);
        const indexOfLastPost = (currentPage + 1) * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const handlePageClick = ({ selected }) => {
          setCurrentPage(selected);
        }; 
        const filteredPosts = posts.filter((post) => {
          if (searchTerm === "") {
            return true;
          } else if (post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
          } else {
            return false;
          }
        }).sort((a, b) => { 
          // console.log(selectedFilter);
          if (selectedOption === "priceLowToHigh") {
            
            return a.salary - b.salary;
          } else if (selectedOption === "priceHighToLow") {
            return b.salary - a.salary;
          } else if (selectedOption === "sortByHighlyRecommended") {
            return b.rating - a.rating;
          } else {
            return 0;
          }
        });
        
        const currentPosts = useMemo(() => {
          const indexOfLastPost = (currentPage + 1) * postsPerPage;
          const indexOfFirstPost = indexOfLastPost - postsPerPage;
          return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
        }, [filteredPosts, currentPage, postsPerPage]);
        
        
        
        
        


    useEffect(()=>{
        async function loadData(){
          try{
            const res = await fetch(`http://localhost:5000/job/getAllPostsByUserId/${author}`)
            const posts = await res.json()
            
              setPosts(posts);
            } catch (error) {
              console.error(error);
            }
            
            
    }

    loadData();
  
    }, [posts])

    const [location, setLocation] = useState('');
    const handleLocationChange = (newLocation) => {
      setLocation(newLocation);
    };
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [salary, setSalary] = useState('')
    const [file, setFile] = useState(null);

    // const handleDescriptionChange = (newDescription) => {
    //   setDescription(newDescription);
    // };
    
    const handleSalary1Change = (newSalary) => {
      setSalary(newSalary);
    };
  
    const handleTitleChange1 = (newTitle) => {
      setTitle(newTitle);
    };

    const handleTitleChange = (event) => {
      const value = event.target.value;
      setTitle(value);
    
      let newDescription = '';
    
      // Update description based on selected title
      if (value === 'Crop Management') {
        newDescription = 'We\'re hiring a Crop Manager that covers the planning, planting, maintenance, and harvesting of crops. This may include irrigation, fertilization, weed and pest control.';
      } else if (value === 'Livestock Management') {
        newDescription = 'We\'re hiring a Livestock Manager that covers the management of livestock, including feeding, breeding, health, and welfare.';
      } else if (value === 'Food Processing') {
        newDescription = 'We\'re hiring a Food Processing Manager that covers the processing of crops and animal products into food for human or animal consumption. This may involve processing steps such as cheese making, baking, meat processing, etc.';
      } else if (value === 'Soil Management') {
        newDescription = 'We\'re hiring a Soil Manager that covers the conservation and improvement of soil quality to maintain the fertility of agricultural land.';
      } else if (value === 'Research And Development') {
        newDescription = 'We\'re hiring a Research And Development Manager that may include the development of new crop varieties, more sustainable farming practices, and new technologies to improve food production and quality.';
      } else if (value === 'Supply Chain Management') {
        newDescription = 'We\'re hiring a Supply Chain Manager that covers the management of logistics to transport food products from the farm to consumers, including packaging, storage, transportation, and distribution.';
      } else if (value === 'Financial Management') {
        newDescription = 'We\'re hiring a Financial Manager that covers the management of the farm\'s finances, including cost management, budgeting, cash management, and income tracking.';
      } else if (value === 'Human Resource Management') {
        newDescription = 'We\'re hiring a Human Resource Manager that covers the management of the personnel working in the farm, including scheduling, training, workplace safety, and compliance with employment rules.';
      }
    
      // Update user state with new title and description
      setUser({ ...user, title: value, description: newDescription });
    };
    

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

    const [alanBtn, setAlanBtn] = useState(null);

    const alanBtnOptions = {
      key: '5c9ddb668568af00a5386994a69d43e12e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, payload }) => {
        console.log('Command received:', command);  
        console.log('Payload:', payload);
        if (command === 'search') {
          const searchTerm = payload.searchTerm;
          const filteredPosts = posts.filter(post => post.title.includes(searchTerm));
          alanBtn.playText(`Here are the search results for "${searchTerm}"`);
          alanBtn.showCard({
            type: 'articles',
            data: {
              articles: filteredPosts.map(post => ({
                title: post.title,
                content: post.content,
                image: post.image
              }))
            }
          });
        }
      }
    };
    
    useEffect(() => {
      const loadAlanBtn = async () => {
        try {
          const { default: alanBtnInstance } = await import('@alan-ai/alan-sdk-web');
          const alanBtn = alanBtnInstance(alanBtnOptions);
          setAlanBtn(alanBtn);
        } catch (error) {
          console.error(error);
        }
      };
      loadAlanBtn();
    }, []);
    
    
    
    const handleResetForm = () => {
      setComment('');
    }

    const handleSubmitUpdate = async (event,jobId) => {
      event.preventDefault();
      console.log("ddddddddddddddddddd",user);
      const formData = new FormData();
      formData.append('title', user.title);
      formData.append('location', location);
      formData.append('description', user.description);
      formData.append('salary', user.salary);
      formData.append('file', file);
      try{
      const res = await axios.put(`http://localhost:5000/job/updateJobPost/${jobId}`,formData, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setModalEditOpen(false);
      console.log("done", res);
    } catch (error) {
      console.error(error);
    }}
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(job);
      const data = {
        comment,
        author,
        job
      }
      console.log(data);
      try {
        
        const res = await axios.post('http://localhost:5000/comment/addJobPostComment', data);
        const res2 = await fetch(`http://localhost:5000/job/getAllPostsByUserId/${author}`)
        console.log(res.data);
        setModalDefaultOpen(false)
        const res3 = await fetch(`http://localhost:5000/job/getAllPostsByUserId/${author}`)
        handleResetForm()
        
      } catch (error) {
        console.error(error);
      }
    };
    
    const launch = async(id)=>{
      console.log(id);
      try{const res = await fetch (`http://localhost:5000/comment/posts/${id}`)  
      const comments = await res.json()
      setComments(comments)
      console.log(comments);}
    catch (error) {
      console.error(error);
    }
      
      
    }

    const deleteComment = async(id, idL)=>{
      try{
        const res = await axios.delete(`http://localhost:5000/comment/deleteJobPostComment/${id}`, author)  
        launch(idL)
      console.log(res);
      }
    catch (error) {
      console.error(error);
    }
    }

    const deletePost = async(id)=>{
      try{
        const res = await axios.delete(`http://localhost:5000/job/deleteJobPost/${id}`)  
        setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
      console.log(res);
      }
    catch (error) {
      console.error(error); 
    }
    }

    const updatePost = async(id)=>{
      try{
        const res = await axios.get(`http://localhost:5000/job/findJobPostById/${id}`)  
        setUser(res.data)

      console.log(res.data);
      }
    catch (error) {
      console.error(error); 
    }
    }
    
    const ratePost = async(rating,id)=>{
      try{
        const res = await axios.put(`http://localhost:5000/job/updateJoRate/${id}`, {rating, userId})
      }catch (error){
        console.log(error);
      }
    }

    const applyForAJob = async(jobId)=>{
      try{
        const res = await axios.put(`http://localhost:5000/job/addApplierToJob/${jobId}/${userId}`)
        if(res.status===200)
        toast.success("Successfully applied for this job, you will receive an e-mail sooner !", { position: "top-right" });
      }catch (error){
        toast.error("Already applied for this job, you will receive an e-mail sooner !", { position: "top-right" });
        console.log(error);
      }
    }

    const [appliers, setAppliers] = useState([]);

    const appliersPerJob = async(jobId)=>{
      try{
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa",jobId);
        const res = await axios.get(`http://localhost:5000/job/appliersPerJob/${jobId}`)
        console.log(res.data.appliers);
        setAppliers(res.data.appliers)
        console.log("oooooooooooooooooooooooooooo",appliers);
      }catch (error){
        console.log(error);
      }
    }
    

    const removeApplier = async(jobId, applierId)=>{
      try{
        const res = await axios.delete(`http://localhost:5000/job/removeApplier/${jobId}/${applierId}`, author)  
        setAppliers(prevAppliers => prevAppliers.filter(applier => applier._id !== applierId));
        console.log(res);
      }
    catch (error) {
      console.error(error);
    }
    }

     const [appliesCount, setAppliesCount] = useState(0);
    const appliesCountPerApplier = async(applierId)=>{
      try{
        console.log("sssssssssssssssssssssssssssss", applierId);
        const res = await axios.get(`http://localhost:5000/job/getAppliesCount/${applierId}`)  
        setAppliesCount(res.data) 
        console.log("sssssssssssssssssssssssssssss", appliesCount);
      }
    catch (error) {
      console.error(error);
    }
    }
    const [totalRatesPerApplier, setTotalRatesPerApplier] = useState([])
    const countRatesPerApplier = async(applierId)=>{
      console.log("fffffffffffffffffff", applierId);
      try {
        const res = await fetch(`http://localhost:5000/job/countRatingsByUser/${applierId}`);
        setTotalRatesPerApplier(res.data)
      } catch (error) {
        console.error(error);
      }
    }

    const sendVideoCallId = async(applierId)=>{
      try{
        const data ={userId, applierId}
        
        const res = await axios.get(`http://localhost:5000/getCallID`,data)  
        
      }
    catch (error) {
      console.error(error);
    }
    }

  return (
    <>
    <ToastContainer />
    <div className="product-search-filter wow fadeInUp">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <div className="product-search mb-30">
                    <div className="form_group">
                    <input
                  type="search"
                  className="form_control"
                  placeholder="Search"
                  name="search"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                
                <button className="search-btn">
                  <i className="far fa-search" />
                </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row justify-content-between align-items-center mb-15">
                    <div className="col-lg-4 col-md-6">
                      <div className="show-text mb-15">
                        <p>Showing {postsPerPage} of {posts.length} Results</p>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-6">
                      <div className="filter-category mb-15">
                        <ul>
                          <li>
                          <select value={selectedOption} onChange={handleSelectChange}>
                          <option value="">--Sort By--</option>
                          <option value="sortByHighlyRecommended">Sort by Highly Recommended</option>
                          <option value="priceLowToHigh">Price Low To High</option>
                          <option value="priceHighToLow">Price High To Low</option>
                        </select>

                          </li>
                          <li>
                            <Link href="/products">
                              <a> 
                                <i className="far fa-list" />
                              </a>
                            </Link>
                          </li>
                         
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {
    currentPosts.map((post)=>(

      
    
    <MDBContainer fluid className="py-5" >
      

      <div className="main-timeline-2">
        <div className="timeline-2" >
        
          <MDBCard onChange={() => setJob(post._id)} >         
          <div  className="d-flex align-items-center justify-content-between mt-3 mb-4">   
         
            <div  className="d-flex align-items-center mt-3 mb-4" style={{paddingLeft:'25px'}}>
            <div style={{ position: 'relative' }}>
  <MDBCardImage src={`http://localhost:5000/api/users/file/${post.author?._id}`} className="rounded-circle" fluid style={{ width: '95px', height:"95px"}} />
  {totalRates >= 50 && totalRates < 100 && ( 
    <MDBIcon
      fas
      icon="gem"
      size="2x"
      style={{
        position: 'absolute',
        top: '80px',
        left: '60px',
        zIndex: '1',
        color: '#CD7F32'
      }}
    />
  )}
  {totalRates >= 100 && totalRates < 500 && (
    <MDBIcon
      fas
      icon="gem"
      size="2x"
      style={{
        position: 'absolute',
        top: '80px',
        left: '60px',
        zIndex: '1',
        color: 'silver'
      }}
    />
  )}
  {totalRates >= 500 && (
    <MDBIcon
      fas
      icon="gem"
      size="2x"
      style={{
        position: 'absolute',
        top: '80px',
        left: '60px',
        zIndex: '1',
        color: 'gold'
      }}
    />
  )}
</div>

<div className="d-flex flex-column align-items-center "><MDBCardText className=" mb-0" tag="h6" style={{ textTransform: 'capitalize'}}>{post.author.surname} {post.author.name}</MDBCardText>
                   <MDBCardText className="text-muted mb-0 ml-3" >
              
              <MDBIcon far icon="clock" /> {Moment(post.createdAt).format('h:mm a, Do MMMM')}
              
            </MDBCardText>
            
              
            {totalRates >= 50 && totalRates < 100 && ( 
             <MDBCardText className="text-muted mb-0 ml-3" > Suggested </MDBCardText>
  )}
  {totalRates >= 100 && totalRates < 500 && (
    <MDBCardText className="text-muted mb-0 ml-3" > Recommended </MDBCardText>
  )}
  {totalRates >= 500 && (
        <MDBCardText className="text-muted mb-0 ml-3" > Highly Recommended </MDBCardText>

  )}
              
            </div>

                </div>
                <div className="dropdown">
                <MDBIcon fas icon="ellipsis-v" onClick={handleDropdown} style={{ paddingRight :'95px'}}/>
                {isOpen && (
                  <ul>
                    <li ><Button color='link' rippleColor='dark' onClick={() => {setModalEditOpen(true); updatePost(post._id)}}>
                        Edit Post
                      </Button></li>
                      <Button color='link' rippleColor='dark'  onClick={() => deletePost(post._id)}>
                    <li>Delete Post</li></Button>
                    <li ><Button color='link' rippleColor='dark'  onClick={() =>{setModalLoadAppliers(true); appliersPerJob(post._id);}}>
                        Load Appliers 
                      </Button></li>
                  </ul>
                )}
              </div>
                </div>
                {/* Edit Post Modal */}
                <Modal
            isOpen={modalEditOpen}
            toggle={() => setModalEditOpen(false)}
            size="xl"
          >
            <div className=" modal-header">
              <h6 className=" modal-title" id="modal-title-default">
                New Job Offer
              </h6>
              <button
                aria-label="Close"
                className=" close"
                onClick={() => setModalEditOpen(false)}
                type="button"
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className=" modal-body">
            <Form onSubmit={(e) => handleSubmitUpdate(e, post._id)}>
              
              <div className="form_group">
              <FormGroup className="mb-3" controlId="formBasicEmail">
                <Label>Title</Label>
                <FormControl as="select" required name="title" value={user.title} onChange={(e) => {setUser({ ...user, title: e.target.value }); handleTitleChange(e) }} className="form_control" style={{border: '1px solid grey'}}>
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
               <Input id="exampleFormControlTextarea1" required placeholder="Enter Description" rows="3" type="textarea" name='description' value={user.description} onChange={(e) => setUser({ ...user, description: e.target.value })} style={{border: '1px solid grey'}}></Input>
              </FormGroup>
            <div className="form_group">
              <FormGroup className="mb-3" controlId="formBasicEmail">
              <Label>Salary</Label>
              <FormControl type="text" required placeholder="Enter Salary" name="salary" value={user.salary} onChange={(e) => {setUser({ ...user, salary: e.target.value }); handleSalaryChange(e)}} className="form_control" style={{border: '1px solid grey'}}/>
              {salaryError && <span style={{color: 'red'}}>{salaryError}</span>}
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
                <Modal
            isOpen={modalLoadAppliers}
            toggle={() => {setModalLoadAppliers(false);}}
            size="xl"
          >
            <div className=" modal-header">
              <h6 className=" modal-title" id="modal-title-default">
              Job Offer Appliers
              </h6>
              <button
                aria-label="Close"
                className=" close"
                onClick={() => setModalLoadAppliers(false)}
                type="button"
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
             <div className="modal-body" >
               
                  
             {appliers?.length === 0 ? (
  <p style={{ textAlign: "center" }}>No Appliers Available</p>
) : (
  appliers?.map((applier) => (
                    <div  className="d-flex align-items-center mt-3 mb-4" style={{paddingLeft:'25px'}} onLoad={()=>{appliesCountPerApplier(applier.applier._id); countRatesPerApplier(applier.applier._id)}}>
                                <div style={{ position: 'relative' }}>
  <MDBCardImage src={`http://localhost:5000/api/users/file/${applier.applier._id}`} className="rounded-circle" fluid style={{ width: '65px', height:"65px"}} />
  {totalRatesPerApplier >= 50 && totalRatesPerApplier < 100 && ( 
    <MDBIcon
      fas
      icon="gem"
      size="1x"
      style={{
        position: 'absolute',
        top: '50px',
        left: '50px',
        zIndex: '1',
        color: '#CD7F32'
      }}
    />
  )}
  {totalRatesPerApplier >= 100 && totalRatesPerApplier < 500 && (
    <MDBIcon
      fas
      icon="gem"
      size="1x"
      style={{
        position: 'absolute',
        top: '80px',
        left: '60px',
        zIndex: '1',
        color: 'silver'
      }}
    />
  )}
  {totalRatesPerApplier >= 500 && (
    <MDBIcon
      fas
      icon="gem"
      size="1x"
      style={{
        position: 'absolute',
        top: '80px',
        left: '60px',
        zIndex: '1',
        color: 'gold'
      }}
    />
  )}
</div>
                 
                 <div className="d-flex flex-column align-items-center "  style={{paddingLeft:'25px'}}><MDBCardText className=" mb-0" tag="h6" style={{ textTransform: 'capitalize'}}>{applier.applier.surname} {applier.applier.name}</MDBCardText>
                   <MDBCardText className="text-muted mb-0 ml-3" >

                   {totalRatesPerApplier <50 &&( 
             <MDBCardText className="text-muted mb-0 ml-3" > No Badge Yet </MDBCardText>
  )}          
                   {totalRatesPerApplier >= 50 && totalRatesPerApplier < 100 && ( 
             <MDBCardText className="text-muted mb-0 ml-3" > Suggested </MDBCardText>
  )}
  {totalRatesPerApplier >= 100 && totalRatesPerApplier < 500 && (
    <MDBCardText className="text-muted mb-0 ml-3" > Recommended </MDBCardText>
  )}
  {totalRatesPerApplier >= 500 && (
        <MDBCardText className="text-muted mb-0 ml-3" > Highly Recommended </MDBCardText>

  )}
              
            </MDBCardText>
          
           </div>
           <MDBCardText className=" mb-0 ml-3"  style={{fontSize:'18px'}}>
              
              Applied For <b style={{fontSize:'21px'}}>{appliesCount}</b> Recent Job Offer
              
            </MDBCardText>
           <div className="d-flex justify-content-end mt-3 mb-4" style={{paddingLeft:'25px'}}>
  <Button onClick={() => removeApplier(post._id, applier.applier._id)} className="btn mr-2" outline color="warning">
    <i class="bi bi-person-x-fill"></i>
  </Button>
  <Button onClick={() => blockUser(tdata._id)} className="btn" outline color="warning">
    <i class="bi bi-person-fill-check"></i>
  </Button>
</div>

                  </div>
                  )))}
                 
                </div>
             
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button" onClick={() => setModalLoadAppliers(false)}>
                  Close
                </Button>
                
              </div>
            </Modal>
                
          <div className="bg-image hover-overlay hover-zoom hover-shadow ripple">
            <MDBCardImage className="w-100"
              src={`http://localhost:5000/public/uploads/${post.file}`}
              alt="Responsive image"
              position="top"
            /></div>
           
            <MDBCardBody className="p-4">
              <h4 className="fw-bold mb-3">{post.title}</h4>
              <h6 className="fw-bold mb-4"> {post.location} </h6> 
                
              <p className="mb-4">
                {post.description}
              </p>
              <p className="mb-4">
                Number Of Requested Employees : <b>{post.employees}</b>
              </p>
              <p className="text-muted mb-4">
               Salary Per Employee : <b>{post.salary} DT</b>
              </p>
              <hr className="hr hr-blurry mb-4" />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent:"center" , gap:'50px'}}>
              <i class="bi bi-chat" onClick={() => {setModalCommentOpen(true);}}> COMMENT </i>
              <Modal onChange={() => setPost(post._id)}
              isOpen={modalCommentOpen}
              className="modal-dialog-centered modal-lg "
              contentClassName="bg-gradient-danger"
              onClick={() => setModalCommentOpen(false)}
            >
              <div className="modal-header">
              <h6 className=" modal-title" id="modal-title-notification" style={{paddingLeft:'300px', textTransform: "capitalize"}}>
                {post.author.surname}'s post
              </h6>
                <button
                  aria-label="Close"
                  className="close"
                  onClick={() => setModalCommentOpen(false)}
                  type="button"
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body-lg">
                <div className="py-3 text-center">
                 
                  <div  className="d-flex align-items-center" style={{paddingLeft:'25px'}}>
        <MDBCardImage  src={`http://localhost:5000/api/users/file/${post.author?._id}`} 
                    className="rounded-circle" fluid style={{ width: '40px', height:"40px"}} /> 
          <MDBCardText className="text-muted mb-0 ml-3" >
              <Form onSubmit={handleSubmit}>
      <div className="form_group" style={{ display: 'flex', alignItems: 'center' }}>
                    <FormGroup  >
                    <FormControl type="text" required placeholder="Comment..." name="comment" value={comment} onChange={(e) => setComment(e.target.value)} className="form_control" style={{border: '1px solid grey', width:'640px'}} onClick={handleInputClick}/>
                    </FormGroup>   <button type="submit" style={{ marginLeft: '20px', fontSize:'25px ' }}><i class="fas fa-paper-plane"  ></i></button>
      </div> 
      </Form>
            </MDBCardText>
            </div>

               
                </div>
              </div>
             
              </Modal>
            
              <i class="bi bi-star" style={{fontSize:'18px'}} onClick={() => {setModalRateOpen(true);}} > RATE</i>
              <Modal 
              isOpen={modalRateOpen}
              className="modal-dialog-centered modal-dialog-scrollable  justify-content-end"
                    // style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: "auto" }}
              onClick={() => setModalRateOpen(false)}
            >
              <div className="modal-header">
              <h6 className=" modal-title" id="modal-title-notification" style={{paddingLeft:'125px', textTransform: "capitalize"}}>
                Rate {post.author.surname}'s post
              </h6>
                <button
                  aria-label="Close"
                  className="close"
                  onClick={() => setModalRateOpen(false)}
                  type="button"
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body-lg">
                <div className="py-3 text-center">
                 
                  <div  className="d-flex align-items-center" style={{paddingLeft:'170px'}} onClick={handleInputClick}>
                  <div>
                    <Rating value={rating} onClick={handleRatingClick} />
                    <p>Selected rating: {rating}</p>
                    </div>
    
            </div>

               
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
              
                <Button
                  className="btn-white"
                  color="default"
                  onClick={() => {setModalRateOpen(false); ratePost(rating, post._id)}}
                  type="button"
                > 
                  Done !
                </Button>
              </div>
             
              </Modal>
            </div>
            </MDBCardBody>
            <MDBCardFooter style={{textAlign:"center"}}>
            <button>
            <a onClick={() => {
    setModalNotificationOpen(true);
    setModalDeleteSecondOpen(false);
   launch(post._id)} }>
              View Comments
            </a>
          </button>

            <Modal
              isOpen={modalNotificationOpen}
              className="modal-dialog-centered modal-xl modal-container"
              contentClassName="bg-gradient-danger"
              onClick={() => setModalNotificationOpen(false)}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  {comments.length} Comments
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  onClick={() => setModalNotificationOpen(false)}
                  type="button"
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
               
                  
                  {comments.map((c)=>(
                    <div  className="d-flex align-items-center mt-3 mb-4" style={{paddingLeft:'25px'}}>
                    <MDBCardImage  src={`http://localhost:5000/api/users/file/${c.author._id}`} 
                                className="rounded-circle" fluid style={{ width: '60px', height:"60px"}} /> 
                 
                    <div style={{paddingLeft:'25px'}}>
                      <MDBCardText className=" mb-0" tag="h6" style={{ textTransform: 'capitalize', fontSize:'13px'}}>
                        {c.author.surname} {c.author.name}
                      </MDBCardText>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <p style={{fontSize:'18px', marginLeft: '10px'}}>{c.comment}</p>
                      <MDBCardText className="text-muted mb-0 ml-3" style={{fontSize:'12px'}}>
                        <MDBIcon far icon="clock"/> {Moment(c.createdAt).format('h:mm a, Do MMMM')} <MDBIcon fas icon="trash-alt" style={{paddingLeft:'10px'}}  onClick={() => {
    setCommentValue(c._id);
    setModalDeleteSecondOpen(true)
  }}/> 
                        
                      <MDBIcon fas icon="pen" onClick={() => {
                       
                        setModalEditSecondOpen(true)}} 
                        style={{paddingLeft:'10px'}}/>
                      </MDBCardText>
                      {/* Edit Comment Modal */}
                        <Modal onChange={() => setPost(post._id)}
                          isOpen={modalEditSecondOpen}
                          className="modal-dialog-centered modal-lg "
                          contentClassName="bg-gradient-danger"
                          onClick={() => setModalEditSecondOpen(false)}
                        >
                          <div className="modal-header">
                          <h6 className=" modal-title" id="modal-title-notification" style={{paddingLeft:'300px', textTransform: "capitalize"}}>
                            {post.author.surname}'s post
                          </h6>
                            <button
                              aria-label="Close"
                              className="close"
                              onClick={() => setModalEditSecondOpen(false)}
                              type="button"
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>
                          <div className="modal-body-lg">
                            <div className="py-3 text-center">
                            
                              <div  className="d-flex align-items-center" style={{paddingLeft:'25px'}}>
                    <MDBCardImage  src={`http://localhost:5000/api/users/file/${post.author?._id}`} 
                                className="rounded-circle" fluid style={{ width: '40px', height:"40px"}} /> 
                      <MDBCardText className="text-muted mb-0 ml-3" >
                          <Form onSubmit={handleSubmit}>
                  <div className="form_group" style={{ display: 'flex', alignItems: 'center' }}>
                                <FormGroup  >
                                <FormControl type="text" required placeholder="Comment..." name="{}" value={comment} onChange={(e) => setComment(e.target.value)} className="form_control" style={{border: '1px solid grey', width:'640px'}} onClick={handleInputClick}/>
                                </FormGroup>   <button type="submit" style={{ marginLeft: '20px', fontSize:'25px ' }}><i class="fas fa-paper-plane"  ></i></button>
                  </div> 
                  </Form>
                        </MDBCardText>
                        </div>

                          
                            </div>
                          </div>
                        
                        </Modal>
                      {/* Edit Comment Modal */}  
                    </div>
                  </div>



                  ))}
                 
                </div>
             
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button">
                  Close
                </Button>
                <Button
                  className="text-white ml-right"
                  color="link"
                  onClick={() => setModalDeleteOpen(false)}
                  type="button"
                >
                  Close
                </Button>
              </div>
            </Modal>

            <Modal isOpen={modalDeleteSecondOpen} className="modal-dialog-centered modal-danger" onClick={() => setModalDeleteSecondOpen(false)}>
  <div className="modal-header">
    <h6 className="modal-title" id="modal-title-notification">
      Delete Comment !
    </h6>
    <button
      aria-label="Close"
      className="close"
      onClick={() => setModalDeleteSecondOpen(false)}
      type="button"
    >
      <span aria-hidden={true}>×</span>
    </button>
  </div>

  <div className="modal-footer">
    <Button className="btn-white " color="default" type="button" onClick={() => {
        deleteComment(commentValue, post._id);
        setModalNotificationOpen(true); 
      }}>
      Delete
    </Button>
    <Button
      className="text-white ml-auto"
      onClick={() => {
        setModalDeleteSecondOpen(false);
        setModalNotificationOpen(true); 
      }}
      type="button"
    >
      Close
    </Button>
  </div>
            </Modal>
            
            </MDBCardFooter>
          </MDBCard>
        </div>
        
        

      </div>
    </MDBContainer>
    )
)}
<div className="pagination mb-50 wow fadeInUp">
<ReactPaginate

  previousLabel={<i className="far fa-angle-left" />}
  nextLabel={<i className="far fa-angle-right" />}
  breakLabel={'...'}
  pageCount={Math.ceil(posts.length / postsPerPage)}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={handlePageClick}
  containerClassName={'pagination'}
  activeClassName={'active'}
/>
</div>
 
    
    </>
  );
}