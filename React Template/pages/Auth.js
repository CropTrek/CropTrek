import React, { useState } from "react";
import {  Form  } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import axios from "axios";
const Auth=()=>{

    /*******useState()*******/
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState();
    const handleChange=(e)=>{
        console.log(e.target.value);
    }

/*************reset********** */
const handleForgotPassword = async (event) => {
  event.preventDefault();
  try {
   const response= await axios.post('http://localhost:5000/reset/forgot-password', { email });
   console.log(response.status);
if(response.status===200)
setSuccess('Check your email in order to reset password!');
  
  }
  catch(error){} 
 
};





    return(<>
        {/* <Header /> */}
        <section className="contact-one p-r z-2" style={{paddingTop: '500px'}}>
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

                <Form>
                    <div className="form_group">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} className="form_control" />
                    </Form.Group>   
                    </div> 
                    <div className="form_group">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" onChange={(e)=>handleChange(e)}  className="form_control"/>
                    </Form.Group>
                    </div>
                    { success &&
              <Alert variant="success">
                {success}
              </Alert>
            }
                    <div className="form_group">
                        <button className="main-btn yellow-bg">
                          Login
                        </button>
                      </div> 
                      <div className="call-button ">
                <span>
                &nbsp;
                <a href="" onClick={handleForgotPassword} >Forgot Password ?</a>
                </span>
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
      </>
    );
}

export default Auth;