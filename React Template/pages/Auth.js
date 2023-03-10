import React, { useState } from "react";
import {  Form  } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import axios from "axios";
import Layout from "../src/layouts/Layout";
import jwt_decode from "jwt-decode";
import {setUser,logout, LoginAction} from "../Redux/Actions/authActions"
import {setAuth} from "../Utils/setAuth"
import { useDispatch, useSelector} from "react-redux"   



    /*******Decode JWT*******/
// if (typeof window !== 'undefined' && window.localStorage.jwt) {
//   console.log(window.localStorage.jwt);
//       const decode = jwt_decode(window.localStorage.jwt)
//       StorageEvent.dispatch(setUser(decode))
//       setAuth(window.localStorage.jwt)
//       const currentDate = Date.now / 1000
    
// if (decode.exp > currentDate) {
//         store.dispatch(logout())
//       }
//     }
    /*******Decode JWT*******/


const Auth=()=>{

    /*******Decode JWT*******/
    /*******auth is defined in Redux/Reducers/index.js*******/    
    // const auth = useSelector(state => state.auth) 
    
    // const user = {
    //   isConnected : auth.isConnected,
    //   //role : auth.user.role
    // }
    

    /*******useState()*******/
    // const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [form, setForm] = useState({})
    // const errors = useSelector(state => state.errors)
    const [success, setSuccess] = useState();
    const handleChange=(e)=>{
        setForm({
          ...form,
          [e.target.name] : e.target.value
        })
        // console.log(e.target.value);
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


     /*******Login User*******/
// const onSubmit = (e) => {
//   e.preventDefault();
//   dispatch(LoginAction(form))
// }
     

     /*******Login User*******/

  async function loginUser(event){
          event.preventDefault()
          const response = await fetch('http://localhost:5000/auth/login',{
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
              email,
              password
            })
            
          })
          .then(response => response.json())
          .then(data => {
            const user = data.user
            const token = data.token
            console.log(user);
            const decoded = jwt_decode(token);
            console.log(decoded);
          })
          .catch(error => console.error('Error:', error));

  }   

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

                <Form onSubmit={loginUser}>
                    <div className="form_group">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)}  value={email} className="form_control" />
                    </Form.Group>   
                    </div> 
                    <div className="form_group" >
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form_control"/>
                    </Form.Group>
                    </div>
                    { success &&
              <Alert variant="success">
                {success}
              </Alert>
            }
                    <div className="form_group" style={{paddingTop:'15px'}}>
                        <button className="main-btn yellow-bg">
                          Login
                        </button>
                      </div> 
                      <div className="call-button ">
                <span style={{paddingTop:'25px'}}>
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
      </Layout>
      </>
    );
}

export default Auth;