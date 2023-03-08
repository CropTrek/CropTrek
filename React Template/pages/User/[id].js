import Slider from "react-slick";
import PageBanner from "../../src/components/PageBanner";
import Layout from "../../src/layouts/Layout";
import { logoSlider } from "../../src/sliderProps";
import { useRouter } from 'next/router';
import React ,{useEffect,useState} from "react";
const Contact = () => {






  const [users, setUsers] = useState([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchUsers() {

      const  {id}  = router.query;
      console.log('====================================');
      console.log(id);
      console.log('====================================');
      const res = await fetch(`http://localhost:5000/api/users/63e6444963343c4cdd194470`);
      const users = await res.json();
      console.log('====================================');
      console.log(users);
      console.log('====================================');
      setUsers(users);
    }

    fetchUsers();
  }, []);

  return (
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
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form_group">
                      <input
                        type="text"
                        className="form_control"
                        placeholder="Full Name"
                        name="name"
                        required=""
                      />
                    </div>
                    <div className="form_group">
                      <input
                        type="email"
                        className="form_control"
                        placeholder="Email Address"
                        name="email"
                        required=""
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
                      <button className="main-btn btn-yellow">
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
  );
};
export default Contact;
