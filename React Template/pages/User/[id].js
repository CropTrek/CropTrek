import Slider from "react-slick";
import PageBanner from "../../src/components/PageBanner";
import Layout from "../../src/layouts/Layout";
import { logoSlider } from "../../src/sliderProps";
import { useRouter } from 'next/router';
import React ,{useEffect,useState} from "react";
import Head from 'next/head';
import { listUsers } from './../../Redux/Actions/UserActions';
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

  return (
<>



    <Layout>
      <PageBanner pageName={"Update Your Profile"} />
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
                        placeholder="Full Name"
                        name="name"
                        required=""
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
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
