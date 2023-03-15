import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from "react";
import Head from 'next/head';
import { Alert } from "react-bootstrap";


const resetPwd = () => {
  
  const router = useRouter();
    const { id, token } = router.query;
const [password, setPassword] = useState('');
const [isValidToken, setIsValidToken] = useState(false);

const [message, setMessage] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');


const handleClick = () => {
  router.push('/Auth')
}


useEffect(() => {
  console.log(id);
  const validateToken = async () => {
    try { 
      await axios.get(`http://localhost:5000/reset/resetPwd/${id}/${token}`);
      setIsValidToken(true);
      console.log("verified");


    


    } catch (error) {
      // Gérer les erreurs de validation du token
    }
  };
  validateToken();
}, [id, token]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
     
    }  
    else{


    await axios.post(`http://localhost:5000/reset/resetPwd/${id}/${token}`, { password }).then(_ => setMessage('Your password is updated'));
    // Rediriger l'utilisateur vers la page de connexion ou afficher un message de confirmation
    console.log("changed");
  }
  } catch (error) {
    // Gérer les erreurs de réinitialisation de mot de passe
  }
};

const handleChange = (e) => {
  setPassword(e.target.value);
};

if (!isValidToken) {
  return <div>Token invalide</div>;
}

return (
  <>

<Head>
<link rel="stylesheet" href="/assets/css/style.css" />
<link rel="stylesheet" href="/assets/css/default.css" />
<link rel="stylesheet" href="/assets/vendor/animate.css" />
<link rel="stylesheet" href="/assets/vendor/slick/slick.css" />
<link rel="stylesheet" href="/assets/vendor/slick/slick.css" />
<link rel="stylesheet" href="/assets/vendor/nice-select/css/nice-select.css" />
<link rel="stylesheet" href="/assets/vendor/magnific-popup/dist/magnific-popup.css" />
<link rel="stylesheet" href="/assets/vendor/jquery-ui/jquery-ui.min.css" />
<link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="/assets/fonts/fontawesome/css/all.min.css" />
<link rel="stylesheet" href="/assets/fonts/flaticon/flaticon.css" />

</Head>


<section className="project-grid-page p-r z-1 pt-170 pb-130">
         <div className="container">
           <div className="row justify-content-center">
             <div className="col-xl-7 col-lg-10">
                 <div className="contact-three_content-box">
                   <div className="section-title section-title-left mb-60">
                   
                    <h2>Reset your password</h2>
                  </div>
                  <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                      <div className="form_group">
                        <input
                          type="password"
                          className="form_control"
                           placeholder="New Password"
                           id="password"
                          name="password"
                          required=""
                          value={password}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form_group">
                        <input
                          type="password"
                          className="form_control"
                          placeholder="Confirm Password"
                          id="confirmedPassword"
                          name="confirmedPassword"
                          required=""
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      { message &&
                      <Alert variant="info">
                {message} 
              </Alert>
              
                     }  
                   
                    <div className="form_group">
                         <button className="main-btn btn-yellow">
                           Reset
                         </button> &ensp; &ensp;
                         <button className="main-btn btn-yellow" onClick={handleClick}>
                         Login
                         </button>
                        
                       </div>
                       
                     </form>
                   </div>
                 </div>
               </div>
             </div>
         </div>
       </section>



</>

);
}

export default resetPwd;