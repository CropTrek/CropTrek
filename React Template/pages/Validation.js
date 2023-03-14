import Link from "next/link";
import React from "react"
import { Form } from "react-bootstrap";


const Validation = ()=>{

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
                  {/* <div class="col" >
								<div class="col-lg-6 col-md-6 col-xs-12 col-sm-6">
									<a href="#" className="btn btn-primary google-plus" style={{backgroundColor: "#db4c3e", border: "1px solid #db4c3e" ,width : '225px', ':hover': { background: '#bd4033', borderColor: '#bd4033'}}}> Login with Google <i class="fa fa-google-plus"></i> </a>
								</div>
                <p>OR</p>
							</div> */}
							
                <Form >
                    <div className="form_group">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Enter code" name="code"  className="form_control" />
                    </Form.Group>   
                    </div> 
                  
            <button className="main-btn yellow-bg" >
                          Verify
                        </button>

                    

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