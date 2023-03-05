import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import PreLoader from "../src/layouts/PreLoader";
import "../styles/globals.css";
import { Provider} from 'react-redux';
import store from './../Redux/Store.js';
import  axios  from 'axios';
import { Switch } from "react-router-dom";
import { Router } from "react-router-dom";

import CreateProduct from './Products/CreateProduct';

import {

  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
function MyApp({ Component, pageProps }) {
  //const {data}= axios.get('http://localhost:5000/api/products')



// const [data, setData] = useState(null);

// useEffect(() => {
//   axios.get('http://localhost:5000/api/products')
//     .then(response => {
//       setData(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }, []);
// console.log(data)

  
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
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
          href="assets/fonts/fontawesome/css/all.min.css"
        />
        {/*====== Flaticon css ======*/}
        <link rel="stylesheet" href="assets/fonts/flaticon/flaticon.css" />
        {/*====== Bootstrap css ======*/}
        <link
          rel="stylesheet"
          href="assets/vendor/bootstrap/css/bootstrap.min.css"
        />
        {/*====== magnific-popup css ======*/}
        <link
          rel="stylesheet"
          href="assets/vendor/magnific-popup/dist/magnific-popup.css"
        />
        {/*====== Slick-popup css ======*/}
        <link rel="stylesheet" href="assets/vendor/slick/slick.css" />
        {/*====== Nice Select css ======*/}
        <link
          rel="stylesheet"
          href="assets/vendor/nice-select/css/nice-select.css"
        />
        {/*====== Animate css ======*/}
        <link rel="stylesheet" href="assets/vendor/animate.css" />
        {/*====== Default css ======*/}
        <link rel="stylesheet" href="assets/css/default.css" />
        {/*====== Style css ======*/}
        <link rel="stylesheet" href="assets/css/style.css" />
      </Head>
      {loader && <PreLoader />}
      <Component {...pageProps} />




      </Provider>
    </Fragment>
  );
}

export default MyApp;