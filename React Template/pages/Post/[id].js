import { useRouter } from 'next/router';
import React,{ useState, useEffect } from 'react';
import Moment from 'moment';
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBCardText,
  MDBRipple,
  MDBCardTitle,
} from "mdb-react-ui-kit";


export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);

  const profile = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('profile'));
  const author= profile._id


  async function  updateProfile(){
    await router.push(`/HomePagePost`)
      }

      
  useEffect(() => {
    console.log("yallllllllllllllla",id);
    async function fetchPost() {
      const res = await fetch(`http://localhost:5000/job/findJobPostById/${id}`);
      const data = await res.json();
      setPost(data);
    }
    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
<div style={{ display: 'flex', justifyContent: 'center' }}> 
    <MDBCard className='mb-4'>
      <div className="d-flex align-items-center justify-content-between mt-3 mb-4">   
        <div className="d-flex align-items-center mt-3 mb-4" style={{paddingLeft:'25px'}}>
          <MDBCardImage src={`http://localhost:5000/api/users/file/${post.author._id}`} 
                        className="rounded-circle" fluid style={{ width: '60px', height:"60px"}} /> 
          <div className="d-flex flex-column align-items-center ">
            <MDBCardText className="mb-0" tag="h6" style={{ textTransform: 'capitalize'}}>
              {post.author.surname} {post.author.name}
            </MDBCardText>
            <MDBCardText className="text-muted mb-0 ml-3" >
              <MDBIcon fas icon="clock" />
              {Moment(post.createdAt).format('h:mm a, Do MMMM')}
            </MDBCardText>
          </div>
        </div>
      </div>
      
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src={`http://localhost:5000/public/uploads/${post.file}`} style={{width:'750px', height:'550px'}} fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      
      <MDBCardBody style={{paddingLeft:'25px', paddingBottom:'20px'}}>
        <MDBCardTitle style={{ textTransform: 'capitalize'}}>{post.title}</MDBCardTitle>
        <MDBCardText>{post.description}</MDBCardText>
        <p className="text-muted mb-4">
          <MDBIcon fas icon="dollar-sign "  style={{paddingRight : '5px'}}/>  {post.salary} DT
        </p>
        <MDBIcon fab icon="facebook-messenger" />
      </MDBCardBody>
    </MDBCard>
    <div style={{paddingLeft:'25px', paddingTop:'400px'}}>
    <button className="main-btn yellow-bg align-self-center" style={{height:'50px', backgroundColor: '#eece38', borderRadius:'15px',borderColor:'#eece38'}} onClick={updateProfile}>View More Job Offers</button>
  
  </div></div>
</div>


  );
}

 
