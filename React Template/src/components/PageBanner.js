import Link from "next/link";
import { useEffect, useState } from "react";
import MobileHeader from "../layouts/MobileHeader";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import  ProfilePage  from "../../pages/Card";


const PageBanner = ({ pageName, pageTitle }) => {

 const [connectedUser, setConnectedUser] = useState(null);
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    setConnectedUser(profile);
    
  }, []);

  return (
    <>
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
              <ul className="breadcrumbs-link">
              {connectedUser && <li>
                  <Link href="HomePagePost">Home</Link>
                </li>}
                {connectedUser &&<li>
                  <Link href="Card">Job Offers</Link>
                </li>}
             

              </ul>
              
            </div>
            
          </div>
          
        </div>
        
      </div>
      
    </section>
    {/* <section style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft:'100px' }}>
  <ProfilePage />
</section> */}
    
    <section style={{paddingBottom : '150px'}}>
     {/* <header className="header-area" >
     <div className="header-navigation navigation-one" >
     <div className="nav-overlay" />
     <div className="container-1350">
       <div className="primary-menu">
         <div className="site-branding">
           <Link href="/">
             <a className="brand-logo">
               <img src="assets/images/logo/logo-1.png" alt="Site Logo" />
             </a>
           </Link>
         </div>
         <div className="nav-inner-menu">
           <div className="nav-menu">
             <div className="mobile-logo mb-30 d-block d-xl-none text-center">
               <Link href="/">
                 <a className="brand-logo">
                   <img src="assets/images/logo/logo-1.png" alt="Site Logo" />
                 </a>
               </Link>
             </div>
            
             <Menu />
             <MobileHeader />
           </div>
           
           <div className="nav-right-item">
             <div className="navbar-toggler">
               <span />
               <span />
               <span />
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
         </header> */}
    </section>
     
</>
    
  );
};
export default PageBanner;

const Menu = () => (

  <nav className="main-menu ">
    <ul>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li className="menu-item has-children">
        <a href="#">Farms</a>
        <ul className="sub-menu">
        
          <li>
            <Link href="/farms">My farm</Link>
          </li>
        
        </ul>
      </li>
      <li className="menu-item has-children">
        <a href="#">Portfolio</a>
        <ul className="sub-menu">
          <li>
            <Link href="portfolio-grid">Portfolio Grid</Link>
          </li>
          <li>
            <Link href="portfolio-full-width">Portfolio Full Width</Link>
          </li>
          <li>
            <Link href="portfolio-details">Portfolio Details</Link>
          </li>
        </ul>
      </li>
      <li className="menu-item has-children">
        <a href="#">Shop</a>
        <ul className="sub-menu">
          <li>
            <Link href="products">Our Products</Link>
          </li>
                    
          <li>
            <Link href="ProductsLeftBar">Product Left Sidebar</Link>
          </li>
          <li>
            <Link href="products-right-sidebar">Product Right Sidebar</Link>
          </li>
          <li>
             <Link href="product-details">Product Details</Link> 
            {/* <Link href="/product-details/[productID]" as={`/product-details/${productID}`}>
  Product Details2
</Link> */}
          </li>
          <li>
            <Link href="cart">Cart</Link>
          </li>
          <li>
            <Link href="Checkout">Checkout</Link>
          </li>
        </ul>
      </li>

      <li className="menu-item has-children">
        <a href="#">Users</a>
        <ul className="sub-menu">
         
          <li>
            <Link href="listUsers">Liste Des utilisateurs(Test) </Link>
          </li>
        </ul>
      </li>
      <li className="menu-item has-children">
        <a href="#">Blog</a>
        <ul className="sub-menu">
          <li>
            <Link href="blog-standard">Blog Standard</Link>
          </li>
          <li>
            <Link href="blog-details">Blog Details</Link>
          </li>
        </ul>
      </li>
      <li className="menu-item has-children">
        <a href="#">Pages</a>
        <ul className="sub-menu">
          <li>
            <Link href="farmers">Our Farmers</Link>
          </li>
          <li>
            <Link href="faqs">Faq</Link>
          </li>
          <li>
            <Link href="contact">Contact</Link>
          </li>
        </ul>
      </li>



    </ul>
  </nav>
);
