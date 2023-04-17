import Link from "next/link";
import PageBanner from "../../src/components/PageBanner";
import Layout from "../../src/layouts/Layout";
import { Provider} from 'react-redux';
import store from './../../Redux/Store.js';
import { axios } from 'axios';
import { useDispatch,useSelector } from "react-redux";
import React ,{useEffect,useState} from "react";
//import Loading from "./Products/LoadingError/Loading";
import Message from "./../Products/LoadingError/Error";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import  {listProduct}  from './../../Redux/Actions/productActions';
import { Route } from "react-router-dom";
import { listUsers } from './../../Redux/Actions/UserActions';

const listUserPage = () => {
 



  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('http://localhost:5000/api/users');
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

      <PageBanner pageTitle={"listUsers"} pageName="Shop" />
 
<Link href="/products" >MMMMMMMM</Link>

    

      <section className="shaop-page pt-170 pb-70">

 

   


        <div className="container">
       



          <div className="row">
            <div className="col-xl-12">
              <div className="products-wrapper">
               
                <div className="row">
               
                 
                                      {users.map( (user)=>(

<div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={user._id}>

<div className="single-product-item mb-60 wow fadeInUp">

  <div className="product-info">

  
    <h3 className="title">
   
        <a>{user.name}</a>
   
    </h3>

    <Link href={`/User/${user._id}`}>chouff</Link>







  </div>
</div>
</div>

                  )
                  
                  
                  )}
                 

                 
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  

       {/* <Provider store={store} >
        <CreateProduct></CreateProduct>
      </Provider>  */}
     
    </Layout>
  );
};
export default listUserPage;
