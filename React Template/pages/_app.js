import Head from "next/head";
import FullLayout from "../src/layouts/FullLayout";
import { Fragment, useEffect, useState } from "react";
import PreLoader from "../src/layouts/PreLoader";
import "../styles/globals.css";
import { Provider} from 'react-redux';
import store from './../Redux/Store.js';
import  axios  from 'axios';
import { Switch } from "react-router-dom";
import { Router } from "react-router-dom";
import "/styles/style.scss";
import CreateProduct from './Products/CreateProduct';

import {  

  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
function MyApp({ Component, pageProps }) {
  

  useEffect(() => {
    window.addEventListener('load', function() {
      var links = document.getElementsByTagName('link');
      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (link.rel === 'stylesheet') {
          link.href = link.href + '?v=' + Date.now();
        }
      }
    });
  }, []);


  
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>

    
    <Fragment>
      <Provider store={store} >
      <Head>

      

        <title>Orgarium - Agriculture Farming React Template</title>
        {/*====== Favicon Icon ======*/}
        <link
          rel="shortcut icon"
          href="assets/images/favicon.ico"
          type="image/png"
        />
        {/*====== FontAwesome css ======*/}
        <link
          rel="stylesheet"
          href="assets/fonts/fontawesome/css/all.min.css?v={new Date().getTime()}"
        />
        {/*====== Flaticon css ======*/}
        <link rel="stylesheet" href="assets/fonts/flaticon/flaticon.css?v={new Date().getTime()}" />
        {/*====== Bootstrap css ======*/}
        <link
          rel="stylesheet"
          href="assets/vendor/bootstrap/css/bootstrap.min.css?v={new Date().getTime()}"
        />
        {/*====== magnific-popup css ======*/}
        <link
          rel="stylesheet"
          href="assets/vendor/magnific-popup/dist/magnific-popup.css?v={new Date().getTime()}"
        />
        {/*====== Slick-popup css ======*/}
        <link rel="stylesheet" href="assets/vendor/slick/slick.css?v={new Date().getTime()}" />
        {/*====== Nice Select css ======*/}
        <link
          rel="stylesheet"
          href="assets/vendor/nice-select/css/nice-select.css?v={new Date().getTime()}"
        />
        {/*====== Animate css ======*/}
        <link rel="stylesheet" href="assets/vendor/animate.css?v={new Date().getTime()}" />
        {/*====== Default css ======*/}
        <link rel="stylesheet" href="assets/css/default.css?v={new Date().getTime()}" />
        {/*====== Style css ======*/}
        <link rel="stylesheet" href="assets/css/style.css?v={new Date().getTime()}" />
      </Head>
      {loader && <PreLoader />}
     
        <Component {...pageProps} />
      



      </Provider>
    </Fragment>
    </>
  );
}

export default MyApp;
