import React, { useState } from "react";
import {  Form  } from "react-bootstrap";
import { Button } from 'reactstrap';
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useRouter } from 'next/router';
 const ContactAdmin=()=>{
  const router = useRouter();
  const [success, setSuccess] = useState();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [code, setCode] = useState('')
  const email =user.email;
  const id =user._id;
  console.log(email);

  const handleClickSendCode = async() => {
    
    try {
      const response= await axios.post('http://localhost:5000/unblock/generateCode', {email});
      console.log(response.status);
      setSuccess('Check your email in order to get your code!');
          
         }
     catch(error){} 
  }
  const handleClickConfirmCode = async() => {
    if(code.length!=6)
    setSuccess('Your code must contain 6 numbers');
    else
    {
    try { 
      await axios.post(`http://localhost:5000/unblock/verifyCode/${id}`,{code});
      router.push('/CancelRequest')
     } catch (error) {
      setSuccess('code date Expiration please try again');
    }
  }
  }


  
   
    

    return(<>       
       
        <section className="contact-one p-r z-2" style={{paddingTop: '600px', paddingBottom:'250px'}}>
        <div className="container-fluid">
          <div className="row no-gutters">
            <div className="col-lg-6">
              <div className="contact-one_content-box wow fadeInLeft">
                <div className="contact-wrapper">
                { success &&
              <Alert variant="success">
                {success}
              </Alert>
            }
                  <div className="section-title section-title-left mb-40">
                    <span className="sub-title">Get In Touch</span>
                    <h2>Get your code confirmation by email </h2>
<p>{user.email}</p>
                  </div>
                  <div className="contact-form">
                 
							
                <Form >
                    <div className="form_group">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                   
                    <Form.Control type="text" placeholder="Enter your Code" name="code" onChange={(e) => setCode(e.target.value)} className="form_control" />
                    </Form.Group>   
                    </div> 
                    <Button className="btn" color="warning" style={{marginRight: "10px"}} onClick={handleClickSendCode} >Send</Button>
                    <Button className="btn" color="warning" style={{marginRight: "10px"}} onClick={handleClickConfirmCode} >Confirm</Button>
                </Form>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="contact-one_information-box bg_cover wow fadeInRight"
                style={{
                  backgroundImage: "url(assets/images/choose/img-2.jpg)",width: '80%', height: 700, borderRadius: '120px 120px 120px 120px'
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

export default ContactAdmin;