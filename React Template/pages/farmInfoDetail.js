
import Link from "next/link";
import { useEffect, useState } from "react";

import Layout from "/src/layouts/Layout";

import { useSelector } from 'react-redux';

import Access from "./Access"
const FarmInfoDetail = () => {
  // const router = useRouter();
  // const data = router.query.data || "Default Value";
    const [connectedUser, setConnectedUser] = useState(null);
    //const [data, setData] = useState(null);
    const activeLinkStyle = {
      color: 'yellow',
      textDecoration: 'underline yellow',
    };
    const data = useSelector(state => state.data);
      useEffect( ()=>{
        const profile = JSON.parse(localStorage.getItem('profile'));
      setConnectedUser(profile);
   
   // setData(JSON.parse(props.data));
   
  //  setData(JSON.parse(localStorage.getItem('data')));
   console.log(data)
      },[]);





    return (
      <>
      {!connectedUser && <Access/> }
      {connectedUser &&  
        <Layout>
         
         
          <section
  className="page-banner bg_cover position-relative z-1"
  style={{ backgroundImage: "url(assets/images/bg/page-bg-2.jpg)" }}
>
 
   
      <div
      className="container"
      style={{
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        right: '60px',
      }}
    >
       <img
      src={`http://localhost:5000/api/users/file/${connectedUser?._id}`}
        alt="profile"
        style={{
          width: "150%",
          height: "90%",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            <div className="page-title">
              <h1 style={{ textTransform: 'capitalize' }}>
                {connectedUser?.surname} {connectedUser?.name ?? 'Unknown User'}
              </h1>
             
              
            </div>
            
          </div>
          
        </div>
        
      </div>
      
    </section>
<section className="why-choose-one p-r z-1 pt-130">
        <div className="shape shape-one">
          <span>
            <img src="assets/images/shape/leaf-3.png" alt="" />
          </span>
        </div>
        <div className="shape shape-two">
          <span>
            <img src="assets/images/shape/leaf-2.png" alt="" />
          </span>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="choose-one_img-box p-r mb-40 wow fadeInLeft">
                <img
                  src={data?.img}
                  className="choose-img_one"
                  alt=""
                />
                
              </div>
            
                
                  <div className="single-choose-item mb-30">
                    <div className="text">
                      <h5>Harvesting and Storage</h5>
                      
                      {data?.storage && Object.keys(data?.storage).map((key) => (
      <p key={key}>{data?.storage[key]}</p>
    ))}
                    </div>
                  </div>
                  <div className="single-choose-item mb-30">
  <div className="text">
    <h5>Insect & Disease Problems</h5>
    {data?.diseases && Object.keys(data?.diseases).map((key) => (
      <p key={key}>{data?.diseases[key]}</p>
    ))}
  </div>
</div>
            </div>
            <div className="col-lg-6">
              <div className="choose-one_content-box pl-lg-70 mb-40">
                <div className="section-title section-title-left mb-40 wow fadeInDown">
                  <span className="sub-title">Guide</span>
                  <p>{data?.p1}</p>
                  <p>{data?.p2}</p>
                 
                </div>
                <div className="choose-item-list wow fadeInUp">
                  <div className="single-choose-item mb-30">
                    <div className="text">
                      <h5>Quick Guide: Planting, Growing & Harvesting </h5>
                      <p>
                      {data?.quick_guide?.[0]}
                      <br></br>
                      {data?.quick_guide?.[1]}
                      <br></br>
                      {data?.quick_guide?.[2]}
                      <br></br>
                      {data?.quick_guide?.[3]}
                      <br></br>
                      {data?.quick_guide?.[4]}
                      <br></br>
                      {data?.quick_guide?.[5]}
                      <br></br>
                      </p>
                    </div>
                  </div>
                  <div className="single-choose-item mb-30">
                    <div className="text">
                      <h5>Site Preparation</h5>
                      {data?.site_preparation && Object.keys(data?.site_preparation).map((key) => (
      <p key={key}>{data?.site_preparation[key]}</p>
    ))}

                     
                    </div>
                  </div>
                  <div className="single-choose-item mb-30">
                    <div className="text">
                      <h5>How to Plant ?</h5>
                      {data?.howPlant && Object.keys(data?.howPlant).map((key) => (
      <p key={key}>{data?.howPlant[key]}</p>
    ))}
                      
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </section> 
     
      </Layout>}
    </> 
  );
      };
      // export  const getServerSideProps= (context)=> {
      
      //   return {
      //       props: { 
      //         data:  context.query.data//pass it to the page props
      //       }
      //   }
      // }
      export default FarmInfoDetail;