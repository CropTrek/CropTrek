import React from "react";
import { Container } from "reactstrap";
import Header from "./header/Header";
import Sidebar from "./sidebars/vertical/Sidebar";
import Head from 'next/head';

const FullLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const showMobilemenu = () => {
    setOpen(!open);
  };

  return (

    <>

<Head>


  <link rel="stylesheet" href="/assets/css/style.css" />
<link rel="stylesheet" href="/assets/css/default.css" />
<link rel="stylesheet" href="/assets/vendor/animate.css" />
<link rel="stylesheet" href="/assets/vendor/slick/slick.css" />
<link rel="stylesheet" href="/assets/vendor/nice-select/css/nice-select.css" />
<link rel="stylesheet" href="/assets/vendor/magnific-popup/dist/magnific-popup.css" />
<link rel="stylesheet" href="/assets/vendor/jquery-ui/jquery-ui.min.css" />
<link rel="stylesheet" href="/assets/vendor/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="/assets/fonts/fontawesome/css/all.min.css" />
<link rel="stylesheet" href="/assets/fonts/flaticon/flaticon.css" />  


</Head>
    <main>
      <div className="styles.pageWrapper d-md-block d-lg-flex">
        {/******** Sidebar **********/}
        <aside
          className={`sidebarArea shadow bg-white ${
            !open ? "" : "showSidebar"
          }`}
        >
          <Sidebar showMobilemenu={() => showMobilemenu()} />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header showMobmenu={() => showMobilemenu()} />

          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <div>{children}</div>
          </Container>
        </div>
      </div>
    </main>
    </>
    
  );
};

export default FullLayout;
