import React, { useEffect, useState } from "react";
import Moment from 'moment';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBCardText,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCardFooter
} from "mdb-react-ui-kit";
import { Modal, Button, FormGroup, Form } from "reactstrap";
import { FormControl } from "react-bootstrap";
import axios from "axios";
import badWords from 'bad-words';

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

export default function JobPosts() {

    const [isTogOpen, setIsTogOpen] = useState(false);
    const handleDropdown = () => {
      setIsOpen(!isOpen);
    };
    const [comment, setComment]= useState('')
    const [commentValue, setCommentValue] = useState('')
    const[post, setPost]=useState('')
    const [job, setJob]= useState('')

    const [isOpen, setIsOpen] = useState(false);
    const [modalDefaultOpen, setModalDefaultOpen] = React.useState(false);
    const [modalNotificationOpen, setModalNotificationOpen] = React.useState(false);
    const [modalCommentOpen, setModalCommentOpen] = React.useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = React.useState(false);
    const [modalDeleteSecondOpen, setModalDeleteSecondOpen] = useState(false);
    const [modalRateOpen, setModalRateOpen] = React.useState(false);

    const handleInputClick = (event) => {
      event.stopPropagation();
    }

    const profile = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('profile'));
    const author= profile._id
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const userId = profile._id

    useEffect(()=>{
        async function loadData(){
            const res = await fetch(`http://localhost:5000/job/getJobPosts`)
            const posts = await res.json()  
            setPosts(posts)
            console.log(posts);  
    }

    loadData();
    }, [])

    const [rating, setRating] = useState(0);
    const handleRatingClick = (value) => {
      setRating(value);
    };

    const handleResetForm = () => {
      setComment('');
    }

    const [totalRates, setTotalRates] = useState('')
    

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
        const res2 = await fetch(`http://localhost:5000/job/getAllPostsByUserId/${author}`)
      console.log(res);
      }
    catch (error) {
      console.error(error);
    }
    }    


    const ratePost = async(rating,id)=>{
      try{
        const res = await axios.put(`http://localhost:5000/job/updateJoRate/${id}`, {rating, userId})
        console.log("done !");
      }catch (error){
        console.log(error);
      }
    }

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
      
    }, []);
     

  return (
    <>

{posts.length === 0 ? (
  <p>No posts to display</p>
) : (
    posts.map((post)=>(

    
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
                    <li >Edit Post</li>
                    <li onClick={() => deletePost(post._id)}>Delete Post</li>
                  </ul>
                )}
              </div>
                </div>
          <div className="bg-image hover-overlay hover-zoom hover-shadow ripple">
            <MDBCardImage className="w-100"
              src={`http://localhost:5000/public/uploads/${post.file}`}
              alt="Responsive image"
              position="top"
            /></div>
           
            <MDBCardBody className="p-4">
              <h4 className="fw-bold mb-4">{post.title}</h4>
              
              <p className="mb-4">
                {post.description}
              </p>
              <p className="text-muted mb-4">
              
              <MDBIcon fas icon="dollar-sign"  style={{paddingRight : '5px'}}/>  {post.salary} DT
                
              </p>
              <hr className="hr hr-blurry mb-4" />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent:"center" , gap:'50px'}}>
              <MDBIcon fas icon="comment" onClick={() => {setModalCommentOpen(true);}}> Comment </MDBIcon>
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
              <MDBIcon fab icon="facebook-messenger" > Contact </MDBIcon>
              <MDBIcon fas icon="star" onClick={() => {setModalRateOpen(true);}} > Rate</MDBIcon>
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
                    <MDBCardImage  src={`http://localhost:5000/api/users/file/${c.author}`} 
                                className="rounded-circle" fluid style={{ width: '60px', height:"60px"}} /> 
                 
                    <div style={{paddingLeft:'25px'}}>
                      <MDBCardText className=" mb-0" tag="h6" style={{ textTransform: 'capitalize', fontSize:'13px'}}>
                        {post.author.surname} {post.author.name}
                      </MDBCardText>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <p style={{fontSize:'18px', marginLeft: '10px'}}>{c.comment}</p>
                      <MDBCardText className="text-muted mb-0 ml-3" style={{fontSize:'12px'}}>
                        <MDBIcon far icon="clock"/> {Moment(c.createdAt).format('h:mm a, Do MMMM')} <MDBIcon fas icon="trash-alt" style={{paddingLeft:'10px'}}  onClick={() => {
    setCommentValue(c._id);
    setModalDeleteSecondOpen(true)
  }}/> 
                        
                      <MDBIcon fas icon="pen" style={{paddingLeft:'10px'}}/>
                      </MDBCardText>
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
    )))}
    
    </>
  );
}