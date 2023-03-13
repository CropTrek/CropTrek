import React, { useState } from "react";
import axios from "axios";
import Layout from "../src/layouts/Layout";
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router';
import Link from "next/link";
import { Form, Button, CardDeck, Card } from 'react-bootstrap';



const Register=()=>{

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    adresse:'',
    phoneNumber:'',
    dateOfBirth:'',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
  
      return;
    }

    // Form is valid, submit the data to the API endpoint
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

   console.log(formData)
      // Registration successful, redirect to dashboard
    } catch (error) {
      console.error('Error:', error);
     
    }
  };


  const renderStepOne = () => (
    <Form.Group>
      <Form.Label>Choose your user type:</Form.Label>
      <CardDeck>
        <Card onClick={() => setFormData({ ...formData, role: 'farmer' })} className={formData.role === 'farmer' ? 'selected-card' : ''}>
          <Card.Body>
            <Card.Title>Farmer</Card.Title>
            <Card.Text>Are you a farmer?</Card.Text>
          </Card.Body>
        </Card>
        <Card onClick={() => setFormData({ ...formData, role: 'jobSeeker' })} className={formData.role === 'jobSeeker' ? 'selected-card' : ''}>
          <Card.Body>
            <Card.Title>Seller</Card.Title>
            <Card.Text>Are you a jobSeeker?</Card.Text>
          </Card.Body>
        </Card>
    
      </CardDeck>
      <Button variant="primary" type="button" onClick={() => setStep(2)} disabled={!formData.role}>
        Next
      </Button>
    </Form.Group>
  );

  const renderStepTwo = () => (
    <Form.Group>
      <Form.Label>Name:</Form.Label>
      <Form.Control type="text" name="name" onChange={handleChange} value={formData.name} />
      <Form.Label>Surname:</Form.Label>
      <Form.Control type="text" name="surname" onChange={handleChange} value={formData.surname} />
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email" name="email" onChange={handleChange} value={formData.email} />
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" name="password" onChange={handleChange} value={formData.password} />
      <Form.Label>Repeat Password:</Form.Label>
      <Form.Control type="password" name="repeatPassword" onChange={handleChange} value={formData.repeatPassword} />
      <Button variant="secondary" type="button" onClick={() => setStep(1)}>
        Previous
      </Button>
      <Button variant="primary" type="button" onClick={() => setStep(3)} >   Next   </Button>

  
    </Form.Group>
  );
  const renderStepThree = () => (
    <Form.Group>
      <Form.Label>Adress:</Form.Label>
      <Form.Control type="text" name="adresse" onChange={handleChange} value={formData.adresse} />
      <Form.Label>num tel:</Form.Label>
      <Form.Control type="text" name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} />
      <Form.Label>date naissance:</Form.Label>
      <Form.Control type="date" name="dateOfBirth" onChange={handleChange} value={formData.dateOfBirth} />
      
      <Button variant="secondary" type="button" onClick={() => setStep(2)}>
        Previous
      </Button>
      <div className="d-flex justify-content-between align-items-start " >

<button className="main-btn yellow-bg">
  Register
</button>

</div> 
     
    </Form.Group>
  );

    return(<>       
        <Layout header={4}>
        <section className="contact-one p-r z-2" style={{paddingTop: '600px', paddingBottom:'250px'}}>
        <div className="container-fluid">
          <div className="row no-gutters">
            <div className="col-lg-6">
              <div className="contact-one_content-box wow fadeInLeft">
                <div className="contact-wrapper">
                  <div className="section-title section-title-left mb-40">
                    <span className="sub-title">Get In Touch</span>
                    <h2>WELCOME</h2>
                  </div>
                  <div className="contact-form">
                  {/* <div class="col" >
								<div class="col-lg-6 col-md-6 col-xs-12 col-sm-6">
									<a href="#" className="btn btn-primary google-plus" style={{backgroundColor: "#db4c3e", border: "1px solid #db4c3e" ,width : '225px', ':hover': { background: '#bd4033', borderColor: '#bd4033'}}}> Login with Google <i class="fa fa-google-plus"></i> </a>
								</div>
                <p>OR</p>
							</div> */}
							 <Form onSubmit={handleSubmit}>
      {step === 1 && renderStepOne()}
      {step === 2 && renderStepTwo()}
      {step === 3 && renderStepThree()}
  
                   
               
                      <div className="call-button ">

           
              <div className="d-flex justify-content-center mt-5">
             <span> Already have an account?  <Link href="Auth"  > Sign in.</Link></span>
                </div>             
              </div>
                </Form>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="contact-one_information-box bg_cover wow fadeInRight"
                style={{
                  backgroundImage: "url(assets/images/bg/contact-bg-1.jpg)",width: '80%', height: 700, borderRadius: '120px 120px 120px 120px'
                }}
              >
                
              </div>
            </div>
          </div>
        </div>
      </section>
      </Layout>
      </>
    );
}

export default Register;