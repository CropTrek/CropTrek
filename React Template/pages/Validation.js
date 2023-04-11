import Link from "next/link"
import React, { useState } from "react"
import { Form } from "react-bootstrap";
import axios from "axios";
import { useRouter } from 'next/router';



const Validation = ()=>{
  const router = useRouter()
  const [code, setCode] = useState('')

  async function getCode(event){
    event.preventDefault()
    try {
      const phoneNumber = localStorage.getItem('phone')
      const response = await axios.post('http://localhost:5000/api/users/sendVerificationCode', {
      phoneNumber
    });
      return response.data;
    } catch (error) {
      router.push("/User/Page404")
      throw error;
    }
  }

  async function sendCode(event){
    event.preventDefault()
    const email = JSON.parse(localStorage.getItem('attempsUser')).email
    try {
      const response = await axios.get(`http://localhost:5000/api/users/getByMail/${email}`);
      console.log(response.data);
      const phone = response.data.phoneNumber
      localStorage.setItem('phone', phone)
      const codeResponse = await getCode(event);
    console.log(codeResponse);
    } catch (error) {
      console.error(error);
    }


  }


/** await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }) */


  async function verifyCode(event){
      event.preventDefault()
      const phoneNumber = localStorage.getItem('phone');
  try {
    const response = await axios.post('http://localhost:5000/api/users/verifyCode', {


    
      phoneNumber,
      code
    });
    console.log(response.data);
    return response.data;

  } catch (error) {
    router.push("/User/Page404");
    throw error;
  }

  }

    return(
        <section className="contact-one p-r z-2" style={{paddingTop: '600px', paddingBottom:'250px'}}>
        <div className="container-fluid" style={{paddingLeft:'550px'}}>
          <div className="row no-gutters">
            <div className="col-lg-6">
              <div className="contact-one_content-box wow fadeInLeft">
                <div className="contact-wrapper">
                  <div className="section-title section-title-left mb-40">
                    <span className="sub-title">Get In Touch</span>
                    <h2>Verification SMS Code</h2>
                  </div>
                  <div className="contact-form">
                 
                <Form onSubmit={verifyCode}>
                    <div className="form_group">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Enter code" name="code" onChange={(e) => setCode(e.target.value)}  value={code} className="form_control" />
                    </Form.Group>   
                    </div> 
                  
            <button className="main-btn yellow-bg" >
                          Verify
                        </button>
                        <a href="" onClick={sendCode} style={{paddingLeft:'25px'}} > Receive Your Code. </a>

                    

                </Form>

                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    )
}


export default Validation;