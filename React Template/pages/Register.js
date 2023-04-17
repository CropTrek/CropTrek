import React, { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import Layout from "../src/layouts/Layout";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import Link from "next/link";
import { Form, Button, CardDeck, Card } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import { Typeahead } from 'react-bootstrap-typeahead';



const Register = () => {
  const [adresseOptions, setAdresseOptions] = useState([]);
  const [geocodeData, setGeocodeData] = useState([]);

  const [users, setUsers] = useState([]);

  const [MapContainer, setMapContainer] = useState(null);
  const [TileLayer, setTileLayer] = useState(null);
  const [Popup, setPopup] = useState(null);
  const [Marker, setMarkerr] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [useMapEvents, setMapEvents] = useState(null);
  const [L, setL] = useState(null);
  const [icon, setIcon] = useState(null);
  const [Polygon, setPolygon] = useState(null);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [terrain, setTerrain] = useState([]);
  const [showTerrain, setShowTerrain] = useState(false);

  const polygonRef = useRef();
  const [coordinates, setCoordinates] = useState([36.8065, 10.1815]); // Initialize the map to Tunisia
  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setCoordinates([lat, lng]);
    setMarkerPosition(event.latlng);
  
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2`)
      .then((response) => response.json())
      .then((data) => {
        const { address } = data;
        setFormData({
          ...formData,
          adresse: {
            type: "Point",
            coordinates: [lat, lng],
        fullAdresse:address,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/api/users/map");
      const { users } = await response.json();
      setUsers(users);
      console.log(users);
    };
  
    fetchUsers();
  }, []);
  useEffect(() => {
    import("leaflet").then((L) => {
      setL(() => L);
      import("react-leaflet").then((RL) => {
        setMapContainer(() => RL.MapContainer);
        setTileLayer(() => RL.TileLayer);
        setMarkerr(() => RL.Marker);
        setPopup(() => RL.Popup);
        setPolygon(() => RL.Polygon);
        setMapEvents(() => RL.useMapEvent);
      });
    });

  }, [coordinates]);

  useEffect(() => {
    if (!L) return;

    const myIcon = L.icon({
      iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      iconRetinaUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",

      iconSize: [30, 45],
      iconAnchor: [15, 45],
      popupAnchor: [0, -40],
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      shadowSize: [41, 41],
      shadowAnchor: [13, 41],
    });
    setIcon(() => myIcon);
  }, [L]);


  function MapClickHandler() {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  }
  function MapClick2Handler() {
    useMapEvents({
      click: handleMap2Click,
    });
    return null;
  }

  function handleCurrentLocationClick(e) {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkerPosition([latitude, longitude]);
  
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const { address } = data;
            setFormData({
              ...formData,
              adresse: {
                type: "Point",
                coordinates: [latitude, longitude],
            fullAdresse:address,
              },
            });
          })
          .catch((error) => console.error(error));
      },
      (error) => {
        console.error(error);
      }
    );
  }
  const [selectedAdresse, setSelectedAdresse] = useState("");

 
 

  function handleGeolocationError(error) {
    console.error(`Geolocation error: ${error.message}`);
  }

  const handleMap2Click = (event) => {
    const { lat, lng } = event.latlng;
    const updatedTerrain = [...terrain, [lat, lng]];
    setTerrain(updatedTerrain);
    console.log("polygonRef.current:", polygonRef.current);
    if (polygonRef.current) {
      polygonRef.current.setLatLngs(updatedTerrain);
    }
    console.log("New terrain coordinates:", updatedTerrain);
  };
  const handleDeletePoint = (e) => {
    e.preventDefault();
    // Create a new array that excludes the last point in the terrain array
    const updatedTerrain = [...terrain.slice(0, -1)];
    // Update the terrain state with the new array
    setTerrain(updatedTerrain);
    // Update the Polygon component with the new coordinates
    if (polygonRef.current) {
      polygonRef.current.setLatLngs(updatedTerrain);
    }
  };
  const handleTerrainClick = () => {
    setShowTerrain(!showTerrain);
  };
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    adresse: {
      type: "Point",
      coordinates: [0, 0],
      fullAdresse: "",
  
    },
    phoneNumber: "",
    dateOfBirth: "",
  
  });
 

  

  
  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func(...args);
        timerId = null;
      }, delay);
    };
  };
  
  const fetchAdresseOptions = async (inputValue, setOptions) => {
    if (inputValue) {
      const url = `https://nominatim.openstreetmap.org/search.php?q=${inputValue}&format=json&countrycodes=tn&limit=5`;
      const response = await fetch(url);
      const data = await response.json();
      const options = Array.isArray(data) && data.length > 0 ? [data[0].display_name] : [];
      setOptions(options);
    } else {
      setOptions([]);
    }
  };
  
  const debouncedFetchAdresseOptions = debounce(fetchAdresseOptions, 2000);
  
  const handleSelect = (selectedValue, fieldName) => {
    const selectedAddress = adresseOptions.find(option => option === selectedValue);
    const url = `https://nominatim.openstreetmap.org/search.php?q=${selectedAddress}&format=json&addressdetails=1&limit=1`;
    if (!selectedAddress) {
      console.error("Invalid address selected");
      return;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const [longitude, latitude] = [data[0].lon, data[0].lat];
          setMarkerPosition([latitude, longitude]);
          const addressDetails = data[0].address;
          const fullAdresse = {
            house_number: addressDetails.house_number,
            road: addressDetails.road,
            suburb: addressDetails.suburb,
            city_district: addressDetails.city_district,
            city: addressDetails.city,
            county: addressDetails.county,
            state_district: addressDetails.state_district,
            state: addressDetails.state,
            postcode: addressDetails.postcode,
            country: addressDetails.country,
            country_code: addressDetails.country_code
          };
          setFormData({
            ...formData,
            [fieldName]: {
              type: "Point",
              coordinates: [latitude, longitude],
              fullAdresse
            }
          });
        } else {
          console.error("No data returned from server");
        }
      })
      .catch(error => console.error(error));
  };
  
  
  const handleInputChange = async (inputValue, fieldName) => {
    

  
    const setOptions = getSetOptionsFunctionByFieldName(fieldName);
  
    await debouncedFetchAdresseOptions(inputValue, setOptions);

  };
  
  const getSetOptionsFunctionByFieldName = (fieldName) => {
    switch (fieldName) {
      case "adresse":
        return setAdresseOptions;
      default:
        return () => {};
    }
  };
  
  const [validationState, setValidationState] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    repeatPassword: false,
  });

  const [validationState2, setValidationState2] = useState({
    adresse: false,
    phoneNumber: false,
    dateOfBirth: false,
  });

  const isFormValid = useMemo(() => {
    const { name, surname, email, password, repeatPassword } = formData;

    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    const isNameValid = nameRegex.test(name);
    const isSurnameValid = nameRegex.test(surname);
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);
    const isRepeatPasswordValid = password === repeatPassword;

    setValidationState({
      name: isNameValid,
      surname: isSurnameValid,
      email: isEmailValid,
      password: isPasswordValid,
      repeatPassword: isRepeatPasswordValid,
    });

    return (
      isNameValid &&
      isSurnameValid &&
      isEmailValid &&
      isPasswordValid &&
      isRepeatPasswordValid
    );
  }, [formData]);

  const isFormValid2 = useMemo(() => {
    const { adresse, phoneNumber, dateOfBirth } = formData;

    const isPhoneNumberValid = /^\d{8}$/.test(phoneNumber);
    const isDateValid = !isNaN(Date.parse(dateOfBirth));
    const isAdresseValid = adresseOptions.includes(adresse);

    console.log(isAdresseValid);
    console.log(formData);
    console.log(JSON.stringify(formData.adresse));

    const handleMapValidator = () => {
      if (coordinates[0] === 51.505 && coordinates[1] === -0.09) {
        setMapValidator("");
      } else {
        setMapValidator("valid");
      }
    };

    setValidationState2({
     
      phoneNumber: isPhoneNumberValid,
      dateOfBirth: isDateValid,
      adresse: isAdresseValid,
    });

    return isPhoneNumberValid && isDateValid ;
  }, [formData]);

  useEffect(() => {
    if (!validationState2.adresse || !markerPosition) return;

    const { lat, lng } = markerPosition;

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2`
    )
      .then((response) => response.json())
      .then((data) => {
        const { address } = data;
        setFormData({
          ...formData,
          adresse: {
            type: "Point",
            coordinates: [lat, lng],
          fullAdresse : address,
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [markerPosition]);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();

      return;
    }
   

    // Form is valid, submit the data to the API endpoint
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(formData);
      router.push("/Auth");
      // Registration successful, redirect to dashboard
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderStepOne = () => (
    <div>
      <style jsx>{`
        .selected-card {
          border: 2px solid #007bff;
          cursor: pointer;
        }
      `}</style>
<MapContainer
  center={[36.81897, 10.16579]}
  zoom={5}
  scrollWheelZoom={false}
  style={{ height: "400px", width: "100%" }}
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {users.map((user) => (
    <Marker
  key={user.id}
  position={
    user.adresse.coordinates[0] && user.adresse.coordinates[1]
      ? [user.adresse.coordinates[0], user.adresse.coordinates[1]]
      : [0, 0] // Set default coordinates if either lat or lng is undefined
  }
  icon={icon}
>

      <Popup>
        <span>{user.name}</span>
      </Popup>
    </Marker>
  ))}
</MapContainer>

      <Form.Group>
        <Form.Label>Choose your user type:</Form.Label>
        <CardDeck>
          <Card
            onClick={() => setFormData({ ...formData, role: "farmer" })}
            className={formData.role === "farmer" ? "selected-card" : ""}
          >
            <Card.Body>
              <Card.Title>Farmer</Card.Title>
              <Card.Text>Are you a farmer?</Card.Text>
            </Card.Body>
          </Card>
          <Card
            onClick={() => setFormData({ ...formData, role: "supplier" })}
            className={formData.role === "supplier" ? "selected-card" : ""}
          >
            <Card.Body>
              <Card.Title>Supplier</Card.Title>
              <Card.Text>Are you a supplier?</Card.Text>
            </Card.Body>
          </Card>

          <Card
            onClick={() => setFormData({ ...formData, role: "jobSeeker" })}
            className={formData.role === "jobSeeker" ? "selected-card" : ""}
          >
            <Card.Body>
              <Card.Title>jobSeeker</Card.Title>
              <Card.Text>Are you a jobSeeker?</Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
        <div className="d-flex justify-content-end mt-4">
          <button
            className="main-btn yellow-bg"
            type="button"
            onClick={() => setStep(2)}
            disabled={!formData.role}
          >
            Next
          </button>
        </div>
      </Form.Group>
    </div>
  );
  const renderTerrain = () => (
    <div className="mt-4">
      <button
        className="main-btn green-bg"
        type="button"
        onClick={handleTerrainClick}
      >
        Add Terrain
      </button>
      <br></br>
      {showTerrain && (
        <>
          <Form.Group>
            <Form.Label>Terrain Name:</Form.Label>
            <Form.Control
              type="text"
              name="terrainName"
              onChange={handleChange}
              value={formData.terrainName}
            />
            <br></br>

            <button className="btn yellow-bg" onClick={handleDeletePoint}>
              Delete Last Point
            </button>

            <MapContainer
              center={[36.8065, 10.1815]}
              zoom={13}
              style={{ height: "300px", marginBottom: "20px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              />
              <MapClick2Handler />
              {terrain.length > 0 && (
                <Polygon pathOptions={{ color: "red" }} positions={terrain} />
              )}
            </MapContainer>
          </Form.Group>
        </>
      )}
    </div>
  );
  const renderStepTwo = () => (
    <Form.Group>
      <Form.Label>Name:</Form.Label>
      <Form.Control
        type="text"
        name="name"
        onChange={handleChange}
        value={formData.name}
        isInvalid={!validationState.name}
      />
      <Form.Control.Feedback type="invalid">
        Name is invalid.
      </Form.Control.Feedback>
      <Form.Label>Surname:</Form.Label>
      <Form.Control
        type="text"
        name="surname"
        onChange={handleChange}
        value={formData.surname}
        isInvalid={!validationState.surname}
      />
      <Form.Control.Feedback type="invalid">
        Surname is invalid.
      </Form.Control.Feedback>
      <Form.Label>Email:</Form.Label>
      <Form.Control
        type="email"
        name="email"
        onChange={handleChange}
        value={formData.email}
        isInvalid={!validationState.email}
      />
      <Form.Control.Feedback type="invalid">
        Email is invalid.
      </Form.Control.Feedback>
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        isInvalid={!validationState.password}
      />
      <Form.Control.Feedback type="invalid">
        Password is invalid.
      </Form.Control.Feedback>
      <Form.Label>Repeat Password:</Form.Label>
      <Form.Control
        type="password"
        name="repeatPassword"
        onChange={handleChange}
        value={formData.repeatPassword}
        isInvalid={!validationState.repeatPassword}
      />
      <Form.Control.Feedback type="invalid">
        Password Doesn't Match.
      </Form.Control.Feedback>

      <div className="d-flex justify-content-between mt-4">
        <button
          className="main-btn gray-bg"
          type="button"
          onClick={() => setStep(1)}
        >
          Previous
        </button>
        <button
          className="main-btn yellow-bg"
          type="button"
          onClick={() => setStep(3)}
          disabled={!isFormValid}
        >
          Next
        </button>
      </div>
    </Form.Group>
  );
  const renderStepThree = () => (
    <Form.Group>
      <button className="btn yellow-bg" onClick={handleCurrentLocationClick}>
        Set Current Location
      </button>

      <MapContainer
        center={coordinates}
        zoom={13}
        style={{ height: "300px", marginBottom: "20px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {markerPosition && (
          <Marker position={markerPosition} icon={icon}>
            <Popup>Marker position: {markerPosition.toString()}</Popup>
          </Marker>
        )}
      </MapContainer>

      <Form.Control.Feedback type="invalid">
        Please select your location on the map.
      </Form.Control.Feedback>
  
      <div>
  {Object.entries(formData.adresse.fullAdresse).map(([key, value]) => (
    <div key={key}>
      {key}: {value}
    </div>
  ))}
</div>


      <Form.Group controlId="adresse">
        
  <Form.Label>adresse:</Form.Label>
  <Typeahead
    name="adresse"
    onChange={(selected) => handleSelect(selected[0], "adresse")}
    onInputChange={(inputValue) => handleInputChange(inputValue, "adresse")}
    options={adresseOptions}
    placeholder="Enter your adresse"
    isInvalid={!validationState2.adresse}


  />


</Form.Group>

      <Form.Label>Phone Number:</Form.Label>
      <Form.Control
        type="text"
        name="phoneNumber"
        onChange={handleChange}
        value={formData.phoneNumber}
        isInvalid={!validationState2.phoneNumber}
      />
      <Form.Control.Feedback type="invalid">
        Phone Number is invalid.
      </Form.Control.Feedback>
      <Form.Label>Date Naissance:</Form.Label>
      <Form.Control
        type="date"
        name="dateOfBirth"
        onChange={handleChange}
        value={formData.dateOfBirth}
        isInvalid={!validationState2.dateOfBirth}
      />
      <Form.Control.Feedback type="invalid">
        Date Naissance is invalid.
      </Form.Control.Feedback>

      <div className="d-flex justify-content-between mt-4">
        <button
          className="main-btn gray-bg"
          type="button"
          onClick={() => setStep(2)}
        >
          Previous
        </button>
        <button disabled={!isFormValid2} className="main-btn yellow-bg">
          Register
        </button>
      </div>
    </Form.Group>
  );
  if (!MapContainer || !TileLayer || !Marker || !Popup) {
    return null; // Render nothing until all components are imported
  }
  return (
    <>
      <Layout header={4}>
        <section
          className="contact-one p-r z-2"
          style={{ paddingTop: "600px", paddingBottom: "250px" }}
        >
          <div className="container-fluid">
            <div className="row no-gutters">
              <div className="col-lg-6">
                <div className="contact-one_content-box wow fadeInLeft">
                  <div className="contact-wrapper">
                    <div className="section-title section-title-left mb-40">
                      <span className="sub-title">Get In Touch</span>
                      <h2>WELCOME</h2>
                    </div>
                    <div className="contact-form">
                      {/* <div class="col" >
								<div class="col-lg-6 col-md-6 col-xs-12 col-sm-6">
									<a href="#" className="btn btn-primary google-plus" style={{backgroundColor: "#db4c3e", border: "1px solid #db4c3e" ,width : '225px', ':hover': { background: '#bd4033', borderColor: '#bd4033'}}}> Login with Google <i class="fa fa-google-plus"></i> </a>
								</div>
                <p>OR</p>
							</div> */}
                      <Form onSubmit={handleSubmit}>
                        {step === 1&& renderStepOne()}

                        {step === 2 && (
                          <>
                            {formData.role === "farmer" ? (
                              renderTerrain()
                            ) : (
                              <></>
                            )}
                            {renderStepTwo()}
                          </>
                        )}
                        {step === 3 && renderStepThree()}

                        <div className="call-button ">
                          <div className="d-flex justify-content-center flex-column align-items-center mt-5">
                            <a
                              href="http://localhost:5000/auth/google"
                              className="btn google-auth-btn mb-2"
                            >
                              <i className="bi bi-google google-auth-icon"></i>
                              Authenticate with Google
                            </a>
                            <span>
                              {" "}
                              Already have an account?{" "}
                              <Link href="Auth"> Sign in.</Link>
                            </span>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="contact-one_information-box bg_cover wow fadeInRight"
                  style={{
                    backgroundImage: "url(assets/images/bg/contact-bg-1.jpg)",
                    width: "80%",
                    height: 700,
                    borderRadius: "120px 120px 120px 120px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Register;
