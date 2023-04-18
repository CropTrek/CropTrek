import React, { useState,useMemo } from "react";
import axios from "axios";
import Layout from "../src/layouts/Layout";
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router';
import Link from "next/link";
import { Form, Button, CardDeck, Card } from 'react-bootstrap';

const Register=()=>{

  const router = useRouter()
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
  const [validationState, setValidationState] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    repeatPassword: false,

  });

  const [validationState2, setValidationState2] = useState({
 
    adresse:false,
    phoneNumber:false,
    dateOfBirth:false,

  });


  const isFormValid = useMemo(() => {
    const { name, surname, email, password, repeatPassword } = formData;
  
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  
    const isNameValid = nameRegex.test(name);
    const isSurnameValid = nameRegex.test(surname);
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);
    const isRepeatPasswordValid = password === repeatPassword;
  
    setValidationState({
      name: isNameValid,
      surname: isSurnameValid,
      email: isEmailValid,
      password: isPasswordValid,
      repeatPassword: isRepeatPasswordValid,
    });
  
    return isNameValid && isSurnameValid && isEmailValid && isPasswordValid && isRepeatPasswordValid;
  }, [formData]);

  const isFormValid2 = useMemo(() => {
    const { adresse, phoneNumber, dateOfBirth } = formData;
  
    const isAddressValid = adresse.length >= 5;
    const isPhoneNumberValid = /^\d{8}$/.test(phoneNumber);
    const isDateValid = !isNaN(Date.parse(dateOfBirth));
  
    setValidationState2({
      adresse: isAddressValid,
      phoneNumber: isPhoneNumberValid,
      dateOfBirth: isDateValid,
    });
  
    return isAddressValid && isPhoneNumberValid && isDateValid;
  }, [formData]);
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
   router.push("/Auth")
      // Registration successful, redirect to dashboard
    } catch (error) {
      console.error('Error:', error);
     
    }
  };


  const renderStepOne = () => (
    <div>
    <style jsx>{`
    .selected-card {
      border: 2px solid #007bff;
      cursor: pointer;
    }
  `}</style>
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
            <Card.Title>Supplier</Card.Title>
            <Card.Text>Are you a supplier?</Card.Text>
          </Card.Body>
        </Card>
       
        <Card onClick={() => setFormData({ ...formData, role: 'supplier' })} className={formData.role === 'supplier' ? 'selected-card' : ''}>
  
  
          <Card.Body>
            <Card.Title>jobSeeker</Card.Title>
            <Card.Text>Are you a jobSeeker?</Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
      <div className="d-flex justify-content-end mt-4">
      <button className="main-btn yellow-bg"  type="button" onClick={() => setStep(2)} disabled={!formData.role}>
        Next
      </button>
      </div>
    </Form.Group>
    </div>
  );

  const renderStepTwo = () => (
    <Form.Group>
      <Form.Label>Name:</Form.Label>
      <Form.Control type="text" name="name" onChange={handleChange} value={formData.name}  isInvalid={!validationState.name}/>
      <Form.Control.Feedback type="invalid">Name is invalid.</Form.Control.Feedback>     
       <Form.Label>Surname:</Form.Label>
      <Form.Control type="text" name="surname" onChange={handleChange} value={formData.surname}  isInvalid={!validationState.surname} />
      <Form.Control.Feedback type="invalid">Surname is invalid.</Form.Control.Feedback>     
      <Form.Label>Email:</Form.Label>
      <Form.Control type="email" name="email" onChange={handleChange} value={formData.email}  isInvalid={!validationState.email}/>
      <Form.Control.Feedback type="invalid">Email is invalid.</Form.Control.Feedback>     
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" name="password" onChange={handleChange} value={formData.password}  isInvalid={!validationState.password} />
      <Form.Control.Feedback type="invalid">Password is invalid.</Form.Control.Feedback>     
      <Form.Label>Repeat Password:</Form.Label>
      <Form.Control type="password" name="repeatPassword" onChange={handleChange} value={formData.repeatPassword}  isInvalid={!validationState.repeatPassword} />
      <Form.Control.Feedback type="invalid">Password Doesn't Match.</Form.Control.Feedback>     

     
      <div className="d-flex justify-content-between mt-4">
      <button className="main-btn gray-bg" type="button" onClick={() => setStep(1)}>
      Previous
      </button>
      <button className="main-btn yellow-bg"  type="button" onClick={() => setStep(3)} disabled={!isFormValid} >
        Next
      </button>
      </div>
  
    </Form.Group>
  );
  const renderStepThree = () => (
    <Form.Group>
      <Form.Label>Adress:</Form.Label>
      <Form.Control type="text" name="adresse" onChange={handleChange} value={formData.adresse} isInvalid={!validationState2.adresse} />
      <Form.Control.Feedback type="invalid">Adress is invalid.</Form.Control.Feedback>     
      <Form.Label>Phone Number:</Form.Label>
      <Form.Control type="text" name="phoneNumber" onChange={handleChange} value={formData.phoneNumber}  isInvalid={!validationState2.phoneNumber}/>
      <Form.Control.Feedback type="invalid">Phone Number is invalid.</Form.Control.Feedback>     
      <Form.Label>Date Naissance:</Form.Label>
      <Form.Control type="date" name="dateOfBirth" onChange={handleChange} value={formData.dateOfBirth}  isInvalid={!validationState2.dateOfBirth} />
      <Form.Control.Feedback type="invalid">Date Naissance is invalid.</Form.Control.Feedback>     

      
    
      <div className="d-flex justify-content-between mt-4">
      <button className="main-btn gray-bg" type="button" onClick={() => setStep(2)}>
      Previous
      </button>
<button disabled={!isFormValid2} className="main-btn yellow-bg">
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

           
              <div className="d-flex justify-content-center flex-column align-items-center mt-5">
             <a href="http://localhost:5000/auth/google" className="btn google-auth-btn mb-2">
  <i className="bi bi-google google-auth-icon"></i>
  Authenticate with Google
</a>
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