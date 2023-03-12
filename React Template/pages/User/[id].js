import Slider from "react-slick";
// import PageBanner from "../../src/components/PageBanner";
import Layout from "../../src/layouts/Layout";
import { logoSlider } from "../../src/sliderProps";
import { useRouter } from 'next/router';
import React ,{useEffect,useState} from "react";
import Head from 'next/head';
import { listUsers } from './../../Redux/Actions/UserActions';
import moment from 'moment';
import Link from "next/link";

import Image from 'next/image';

const UpdateProfile = () => {






  const [user, setUser] = useState({}); 
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(error => console.log(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data =>  { console.log(data)
        router.push('/User/listUsers');
   
  })
      .catch(error => console.log(error));

      fetch
  };
  const PageBanner2 = ({ pageName, pageTitle }) => {
    return (
   
      <section
        className="page-banner bg_cover position-relative z-1"
        style={
        
          { backgroundImage: "url(../../../../../assets/images/bg/page-bg-1.jpg)" }}
      >


        <div style={{
          top: "250px",
          backgroundColor:'transparent',
        }}  className="brand-card text-crente">
        {/* <img src='../../../../../profile/640b989ccefbacb4191e721a.jpg'  alt="icon" /> */}
        <Image
      style={{
        borderRadius: '50%',
        width: '200px',
        height: '200px',
      }}
        src={`http://localhost:5000/api/users/file/${user._id}`}
        alt="Image utilisateur"
        width={300}
        height={300}
      />
            <div>
      <form onSubmit={handleSubmit2}>
        
        <input type="file" accept="image/*" onChange={handleChange2} />

        <button type="submit" class="btn btn-primary" name="submit"><i class="fas fa-edit"></i></button>
      </form>
      {message && <div>{message}</div>}
    </div>
 
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="page-title">
                <h1>{pageTitle ? pageTitle : pageName}</h1>
                <ul className="breadcrumbs-link">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li className="active">{pageName}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };





    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
  
    const handleChange2 = (event) => {
      setImage(event.target.files[0]);
    };
  
    const handleSubmit2 = (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append("photo", image);
  
      fetch(`http://localhost:5000/api/users/${user._id}/photo`, {
        method: "PUT",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("erreur ");
          }
          setMessage("Bien !!!!!");
        })
        .catch((error) => {
          setMessage(error.message);
        });
    };
  
  return (
<>



    <Layout>
      <PageBanner2 pageName={"Update Your Profile"} />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
     





      <section className="contact-three pb-70 wow fadeInUp">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-xl-7 col-lg-10">
              <div className="contact-three_content-box">
                <div className="section-title section-title-left mb-60">
                  <span className="sub-title">Update Your Profile</span>
                  <h2>Update Your Profile</h2>
                </div>
                <div className="contact-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form_group">
                      <input
                        type="text"
                        className="form_control"
                        placeholder="Name"
                        name="name"
                        required=""
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                      />
                           <input
                        type="text"
                        className="form_control"
                        placeholder="SurName"
                        name="name"
                        required=""
                        value={user.surname}
                        onChange={(e) => setUser({ ...user, surname: e.target.value })}
                      />
                      
<input
  type="date"
  className="form_control"
  placeholder="date"
  name="dateOfBirth"
  required=""
  value={moment(user.dateOfBirth).format("YYYY-MM-DD")}
  onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
/>

                    </div>
                    <div className="form_group">
                      <input
                        type="email"
                        className="form_control"
                        placeholder="Email Address"
                        name="email"
                        required=""
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />


                      
                    </div>
                    {/* <div className="form_group">
                      <textarea
                        className="form_control"
                        placeholder="Write Message"
                        name="message"
                        defaultValue={""}
                      />
                    </div> */}


                    <div className="form_group">
                      <button type="submit" className="main-btn btn-yellow">
                    Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  
    </Layout>
    </>
  );
};
export default UpdateProfile;
