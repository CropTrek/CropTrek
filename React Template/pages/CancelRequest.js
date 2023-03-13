import React, { useState } from "react";
import {  Form  } from "react-bootstrap";
import { Button } from 'reactstrap';
import axios from "axios";
import { Alert } from "react-bootstrap";

 const CancelRequest=()=>{
  const [success, setSuccess] = useState();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [text, setText] = useState('')
 
  const id =user._id;
 

  const handleClickSend = async() => {
    console.log(text);
    try {
      const response= await axios.post(`http://localhost:5000/unblock/unblockRequest/${id}`,{text});
      setSuccess('Check your email in order to see our decision');
      console.log(response.status);
    
          
         }
     catch(error){} 
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
                    <h2>Please specifiy your reason and we will treat your request  </h2>

                  </div>
                  <div className="contact-form">
                 
							
                <Form >
                    <div className="form_group">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                   
                    <Form.Control type="text" placeholder="Enter your reason" name="reason" onChange={(e) => setText(e.target.value)} className="form_control" />
                    </Form.Group>   
                    </div> 
                    <Button className="btn" color="warning" style={{marginRight: "10px"}} onClick={handleClickSend} >Send</Button>
                   
                </Form>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="contact-one_information-box bg_cover wow fadeInRight"
                style={{
                  backgroundImage: "url(assets/images/contact/img-1.jpg)",width: '80%', height: 700, borderRadius: '120px 120px 120px 120px'
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

export default CancelRequest;