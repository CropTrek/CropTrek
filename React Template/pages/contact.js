import Slider from "react-slick";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layouts/Layout";
import { logoSlider } from "../src/sliderProps";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then((module) => module.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((module) => module.TileLayer), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((module) => module.Popup), { ssr: false });
const MarkerClusterGroup = dynamic(() => import('react-leaflet-markercluster').then((module) => module.MarkerClusterGroup), { ssr: false });

const Contact = () => {
  const [addresses, setAddresses] = useState([]);
  const [isFetchingMarkers, setIsFetchingMarkers] = useState(false);
  const [Marker, setMarkerr] = useState(null);
  const [coordinates, setCoordinates] = useState([36.8065, 10.1815]); // Initialize the map to Tunisia

  useEffect(() => {
    import('react-leaflet').then(module => {
      setMarkerr(module.Marker);
    });
  }, [coordinates]);

  const [L, setL] = useState(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      setL(() => L);
    });
  }, [addresses]);
  const [icon,setIcon]=useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await fetch("http://localhost:5000/api/users/map");
      const { addresses } = await response.json();
  
      setAddresses(addresses);
      console.log(addresses);
    };
  
    fetchAddresses();
  }, []);
  

  

  

  
  const [markers, setMarkers] = useState([]);
  
  useEffect(() => {
    const fetchMarkers = async () => {
      setIsFetchingMarkers(true);
      const newMarkers = [];
      for (const address of addresses) {
        const url = `https://nominatim.openstreetmap.org/search/${encodeURIComponent(
          address
        )}?format=json&limit=1`;
        const response = await fetch(url);
        const [result] = await response.json();
        if (result) {
          const { lat, lon } = result;
          newMarkers.push({ lat, lng: lon });
        }
      }
      setMarkers(newMarkers);
      setIsFetchingMarkers(false);
    };

    fetchMarkers();
  }, [addresses]);

  if (isFetchingMarkers) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <PageBanner pageName={"Contact Us"} />
      <section className="contact-information-one p-r z-1 pt-215 pb-130">
        <div className="information-img_one wow fadeInRight">
          <img src="assets/images/contact/img-1.jpg" alt="Imaged" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-12">
              <div className="contact-two_information-box">
                <div className="section-title section-title-left mb-50 wow fadeInUp">
                  <span className="sub-title">Get In Touch</span>
                  <h2>
                    We’re Ready to Help You! Need Any Foods or Consultations ?
                  </h2>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="information-item-two info-one mb-30 wow fadeInDown">
                      <div className="icon">
                        <i className="far fa-map-marker-alt" />
                      </div>
                      <div className="info">
                        <h5>Locations</h5>
                        <p>505 Main Street, 2nd Block, New York</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="information-item-two mb-30 info-two wow fadeInUp">
                      <div className="icon">
                        <i className="far fa-envelope-open-text" />
                      </div>
                      <div className="info">
                        <h5>Email Address</h5>
                        <p>
                          <a href="mailto:hotlinein@gmail.com">
                            hotlinein@gmail.com
                          </a>
                        </p>
                        <p>
                          <a href="mailto:www.info.net">www.info.net</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="information-item-two mb-30 info-three wow fadeInDown">
                      <div className="icon">
                        <i className="far fa-phone" />
                      </div>
                      <div className="info">
                        <h5>Phone Number</h5>
                        <p>
                          <a href="tel:+01234567899">+012 (345) 678 99</a>
                        </p>
                        <p>
                          <a href="tel:+0123456">+0123456</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8">
                    <p>
                      Natus error sit voluptatem accusantium doloremque
                      laudatium, totam rem aperiam eaque ipsa quae abllo
                      inventore veritatis et quase
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Contact Information section ======*/}
      
      <MapContainer center={coordinates} zoom={12} style={{ height: "100vh", width: "100%" }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <MarkerClusterGroup>
      {markers.map((position, index) => (
        <Marker key={index} position={[position.lat, position.lng]} icon={icon}>
          <Popup>{addresses[index]}</Popup>
        </Marker>
      ))}
        <Marker position={[40.7128, -74.006]} icon={icon}>
            <Popup>Marker position: =</Popup>
          </Marker>
    </MarkerClusterGroup>
  </MapContainer>

      {/*====== Start Map section ======*/}
      <section className="contact-page-map">
        <div className="map-box" id="map"></div>
      </section>
      <section className="contact-page-map">
        <div className="map-box">
          <iframe src="https://maps.google.com/maps?q=new%20york&t=&z=13&ie=UTF8&iwloc=&output=embed" />
        </div>
      </section>
      {/*====== End Map section ======*/}
      {/*====== Start Contact Section ======*/}
      <section className="contact-three pb-70 wow fadeInUp">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-xl-7 col-lg-10">
              <div className="contact-three_content-box">
                <div className="section-title section-title-left mb-60">
                  <span className="sub-title">Get In Touch</span>
                  <h2>Need Oragnic Foods! Send Us Message</h2>
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
                    <div className="form_group">
                      <textarea
                        className="form_control"
                        placeholder="Write Message"
                        name="message"
                        defaultValue={""}
                      />
                    </div>
                    <div className="form_group">
                      <button className="main-btn btn-yellow">
                        Send Us Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Contact Section ======*/}
      {/*====== Start Partner Section ======*/}
      <section className="partners-one p-r z-1 pt-50 pb-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center mb-30 wow fadeInUp">
                <h4>We Have More Then 1235+ Global Partners</h4>
              </div>
            </div>
          </div>
          <Slider {...logoSlider} className="partner-slider-one wow fadeInDown">
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-7.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-8.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-9.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-10.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-11.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-12.png"
                  alt="partner image"
                />
              </div>
            </div>
            <div className="partner-item-two">
              <div className="partner-img">
                <img
                  src="assets/images/partner/img-10.png"
                  alt="partner image"
                />
              </div>
            </div>
          </Slider>
        </div>
      </section>
    </Layout>
  );
};
export default Contact;
