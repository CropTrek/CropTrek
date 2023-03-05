import React, { useState } from "react";
import {  Form  } from "react-bootstrap";


const Auth=()=>{

    /*******useState()*******/
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange=(e)=>{
        console.log(e.target.value);
    }

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
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e)=>handleChange(e)} className="form_control" />
                    </Form.Group>   
                    </div> 
                    <div className="form_group">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" onChange={(e)=>handleChange(e)}  className="form_control"/>
                    </Form.Group>
                    </div>
                    <div className="form_group">
                        <button className="main-btn yellow-bg">
                          Login
                        </button>
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