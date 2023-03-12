import React from 'react';
import {useEffect,useState} from "react";
import { useRouter } from 'next/router';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { Button} from 'reactstrap';
import FullLayout from '../../../src/layouts/FullLayout';

export default function ProfilePage() {



   
    const [user, setUser] = useState({}); 
    const router = useRouter();
    const { id } = router.query;
  
    useEffect(() => {
      fetch(`http://localhost:5000/api/users/${id}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(error => console.log(error));
    }, [id]);
   
    const handleClick = () => {
        router.push(`../updateProfileDash/${id}`)
      }
      
  return (
    <>
    <FullLayout>
    <section >
    
        

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                   src={`http://localhost:5000/api/users/file/${user._id}`}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">Admin CropTrek</p>
                <p className="text-muted mb-4">{user.surname}{user.name}</p>
                <div className="d-flex justify-content-center mb-2">
                <Button className="btn" color="warning" >Profile</Button>
                 <Button className="btn" color="warning" outline onClick={handleClick} >Update</Button>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>{user.email}</MDBCardText>
                  </MDBListGroupItem>
                  
                 
                 
                  
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.surname}{user.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"  >{user.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Birthday</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.dateOfBirth}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Password</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.password}</MDBCardText>
                   
                  </MDBCol>
                </MDBRow>
                <hr />
                
              </MDBCardBody>
            </MDBCard>

           
          </MDBCol>
        </MDBRow>
    
    </section>
    </FullLayout>
    </>
  );
}