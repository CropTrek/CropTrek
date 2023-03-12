import Link from "next/link";
import MobileHeader from "../layouts/MobileHeader";

const PageBanner = ({ pageName, pageTitle }) => {

  const connectedUser = JSON.parse(localStorage.getItem('profile'));
  console.log(connectedUser);

  return (
    <>
    <section
      className="page-banner bg_cover position-relative z-1"
      style={{ backgroundImage: "url(assets/images/bg/page-bg-1.jpg)" }}>
     
      <div className="brand-card text-center" style={{width : '300px', height : '300px',   position: 'absolute', right: '30px'}}>
        <img src={connectedUser.profilePhoto} alt="icon" width={'125px'} />
        <h4>{connectedUser.name}</h4>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            <div className="page-title">
              <h1 style={{ textTransform: 'capitalize' }}>{connectedUser.surname } {connectedUser.name}</h1>
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
    <section style={{paddingBottom : '150px'}}>
     <header className="header-area" >
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
             {/*=== Mobile Logo ===*/}
             <div className="mobile-logo mb-30 d-block d-xl-none text-center">
               <Link href="/">
                 <a className="brand-logo">
                   <img src="assets/images/logo/logo-1.png" alt="Site Logo" />
                 </a>
               </Link>
             </div>
             {/*=== Main Menu ===*/}
             <Menu />
             <MobileHeader />
           </div>
           {/*=== Nav Right Item ===*/}
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
         </header>
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
            <Link href="products-left-sidebar">Product Left Sidebar</Link>
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
            <Link href="checkout">Checkout</Link>
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