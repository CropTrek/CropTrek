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
  
/***************************** validation des champs  */
//1- email

const [users, setUsers] = useState([]);
useEffect(() => {
  async function fetchUsers() {
    const res = await fetch('http://localhost:5000/api/users/emails/verif');
    const users = await res.json();
    console.log('===========11111111111=========================');
    console.log(users);
    console.log('====================================');
    setUsers(users);
  }

  fetchUsers();
}, []);
// nlawej aal champs bidou bel id mte3ou 
var emailInput = document.getElementById("email");
if (emailInput) {
// bech naamel haja en temps reel 
emailInput.addEventListener("input", function() {
  // nekhou l valeur mte3 l mail illi ena hatytou 
  var email = emailInput.value;

  // nhot l pattern w dej aena hatteout f champ input mte3 l'email 
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // houni ntatsty ken l'eamil valid w lee selon l pattern // NB : l fonction test deja existe yaaani predefinie 
  var isValid = emailPattern.test(email);

  // w houni nraja3 ken l'email valid w lee 
  if (!isValid) {
    emailInput.setCustomValidity("L'adresse e-mail est invalide! voici un exemple : mounaamdouni213@gmail.com");
    emailInput.style.border = "1px solid red";
  }
  
  if (users.includes(email) ||  user.email!= email) {



    // Afficher un message d'erreur et empêcher la soumission du formulaire
   // event.preventDefault();
    emailInput.style.border = "1px solid red";
   // alert("Ce email est déjà utilisé, veuillez en choisir un autre.");
   emailInput.setCustomValidity("Ce mail est deja utilisé ! Verifiez svp!");
   emailInput.style.border = "1px solid red";


  }
  else {
    emailInput.setCustomValidity("");
    emailInput.style.border = "1px solid green";
  }
});
}else {
  console.log("l'element email input mehouch mawjouddddddddddddd !");
}


// 2- name 
var nameInput = document.getElementById("name");
if (nameInput) {
// bech naamel haja en temps reel 
nameInput.addEventListener("input", function() {
  // nekhou l valeur mte3 l mail illi ena hatytou 
  var name = nameInput.value;

  // // nhot l pattern w dej aena hatteout f champ input mte3 l'email 
  // var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // // houni ntatsty ken l'eamil valid w lee selon l pattern // NB : l fonction test deja existe yaaani predefinie 
  // var isValid = emailPattern.test(email);

  // w houni nraja3 ken l'email valid w lee 
  if (!name) {
    nameInput.setCustomValidity("le nom est obligatoire");
    nameInput.style.border = "1px solid red";
    
  } 
  if(name.length<5 || name.length>10){
    nameInput.setCustomValidity("le nom doit avoir au moins 5 caracteres et au max 10 caracteres ");
    nameInput.style.border = "1px solid red";
  }
  else {
    nameInput.setCustomValidity("");
    nameInput.style.border = "1px solid green";
  }
});
}else {
  console.log("l'element name  input mehouch mawjouddddddddddddd !");
}

// 2- surname surnom

var surnomInput = document.getElementById("surnom");
if (surnomInput) {
// bech naamel haja en temps reel 
surnomInput.addEventListener("input", function() {
  // nekhou l valeur mte3 l mail illi ena hatytou 
  var surnom = surnomInput.value;

  // // nhot l pattern w dej aena hatteout f champ input mte3 l'email 
  // var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // // houni ntatsty ken l'eamil valid w lee selon l pattern // NB : l fonction test deja existe yaaani predefinie 
  // var isValid = emailPattern.test(email);

  // w houni nraja3 ken l'email valid w lee 
  if (!surnom) {
    surnomInput.setCustomValidity("le surnom est obligatoire");
    surnomInput.style.border = "1px solid red";
    
  } 
  if(surnom.length<5 || surnom.length>10){
    surnomInput.setCustomValidity("le surnom doit avoir au moins 5 caracteres et au max 10 caracteres ");
    surnomInput.style.border = "1px solid red";
  }
  else {
    surnomInput.setCustomValidity("");
    surnomInput.style.border = "1px solid green";
  }
});
}else {
  console.log("l'element surnom  input mehouch mawjouddddddddddddd !");
}




// 4- date 



var dateInput = document.getElementById("date");
if (dateInput) {
  dateInput.addEventListener("input", function() {
    var date = dateInput.value;
    var birthdate = new Date(date); // Conversion de la chaîne de caractères en objet Date
    var today = new Date();

    if (!date) {
      dateInput.setCustomValidity("La date de naissance est obligatoire");
      dateInput.style.border = "1px solid red";
    } else if (birthdate > today) { // Comparaison des objets Date
      dateInput.setCustomValidity("La date doit être antérieure à la date d'aujourd'hui");
      dateInput.style.border = "1px solid red";
    } else {
      dateInput.setCustomValidity("");
      dateInput.style.border = "1px solid green";
    }
  });
} else {
  console.log("L'élément dateInput n'existe pas !");
}



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
   



      <section  className="contact-three pb-70 wow fadeInUp">
        
        <div   className="container">
        <div  style={{ display: "flex", justifyContent: "flex-start"  }}>
      {/* <Image src="../../" width={500} height={500} /> */}
      {/* <img src='../../../ '  alt="icon" /> */}
            {/* <h1>hiii</h1> */}

            
      <img  width={500} height={500}
                  src="../assets/images/about/4.jpg"
                  className="about-img_one"
                  alt=""
                />
    </div>
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
                      id="name"
                        type="text"
                        className="form_control"
                        placeholder="Name"
                        name="name"
                        required=""
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                      />
                           <input
                           id="surnom"
                        type="text"
                        className="form_control"
                        placeholder="SurName"
                        name="surname"
                        required=""
                        value={user.surname}
                        onChange={(e) => setUser({ ...user, surname: e.target.value })}
                      />
                      
<input
id="date"
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
                      id="email"
                        type="email"
                        className="form_control"
                        placeholder="Email Address"
                        name="email"
                        required=""
                        value={user.email}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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


{/* Script pour la validation des champs en temps reel */}

      </section>

  
    </Layout>
    </>
  );
};
export default UpdateProfile;
