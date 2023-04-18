import { User } from "react-feather";
import Image from "next/image";
import { Button, Row, Col, Table, Card, CardTitle, CardBody,CardSubtitle,Alert, ListGroupItem, ListGroup, Modal } from "reactstrap";
import FullLayout from "../../src/layouts/FullLayout";
import React ,{useEffect,useState} from "react";
import Moment from 'moment';
import AccessDach from "../accessDach";
import {
    Breadcrumb,
    BreadcrumbItem,
  } from "reactstrap";
  import Link from "next/link";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";


const MapContainer = dynamic(() => import('react-leaflet').then((module) => module.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((module) => module.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((module) => module.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((module) => module.Popup), { ssr: false });

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UsersDash = () => {


  const [modalList, setModalList] = React.useState(false);

  const tableData = [
    {
      avatar: "user5",
      name: "Hanna Gover",
      email: "hgover@gmail.com",
      project: "Ample React",
      status: "done",
      weeks: "35",
      budget: "95K",
    },
  ];

  const [showChecklist, setShowChecklist] = useState(false);

  const handleChecklistClick = () => {
    setShowChecklist(!showChecklist);
  };
  const [connectedUser, setConnectedUser] = useState(null);
  const [usersMap, setUsersMap] = useState([]);
  const [L, setL] = useState(null);
  const [icon, setIcon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertMessageBlock, setAlertMessageBlock] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
    useEffect(() => {
      const fetchUsers = async () => {
        const response = await fetch("http://localhost:5000/api/users/map");
        const { users } = await response.json();
        setUsersMap(users);
        console.log(users);
      };
    
      fetchUsers();
    }, []);
    useEffect(() => {
      import("leaflet").then((L) => {
        setL(() => L);
    
      });
  
    }, []);
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
    
    useEffect(() => {
      const profile = JSON.parse(localStorage.getItem('profile'));
      setConnectedUser(profile);
      async function fetchUsers() {
       await axios.get('http://localhost:5000/api/users').then((res)=>{setUsers(res.data);console.log(res)})
        .catch((error)=>console.log(error))
      }
  
      fetchUsers();

      setIsBlocked(false);
      let timeoutId;
      if (alertMessage ||alertMessageBlock ) {
        timeoutId = setTimeout(() => {
          setAlertMessage('');
          setAlertMessageBlock('');
        }, 3000); // affiche l'alerte pendant 3 secondes avant de la masquer
      }
      
      return () => clearTimeout(timeoutId);
    }, [alertMessage,alertMessageBlock]);
  
    const filteredUsers = users.filter(user => 
      
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    
    function deleteUser(id) {
        const filteredUsers = users.filter(user => user._id !== id);
       axios.delete(`http://localhost:5000/api/users/deleteUserDash/${id}`).then(()=>{
        setAlertMessage(`A user has been deleted  `);
       setUsers(filteredUsers)});
      }
      const data = {
        accStatus: false,
      };
      function blockUser(id) {
       
       axios.put(`http://localhost:5000/api/users/blockUserDash/${id}`,data).then(()=>{
        setAlertMessageBlock(`A user has been blocked  `);
        setIsBlocked(true);   
    
    });
      
      }
      const FeedData = [
        {
          icon: "bi bi-card-checklist",
          color: "dark",
          id: 1,
        },
      ];

      const [showFullDescription, setShowFullDescription] = useState(false);

  const descriptionPreview = (post) => post.description.slice(0, 40) + '...';
  
      const [posts, setPosts] = useState([])

      const [chartData, setChartData] = useState(null);
      const loadData = async(id)=>{
        await axios.get(`http://localhost:5000/job/getAllPostsByUserId/${id}`)
        .then((res)=>{setPosts(res.data);;console.log(res)})
        .catch((error)=>console.log(error))
            
    }

    function deletePost(id) {
      axios.delete(`http://localhost:5000/job/deleteJobPost/${id}`)
        .then(() => {
          setAlertMessage(`A Post has been deleted`);
          setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
        })
        .catch(error => console.log(error));
    }
   
    useEffect(() => {
      const ratingsByLocation = {};
    
      posts.forEach((post) => {
        const location = post.location;
        const rating = post.rating[0];
    
        if (rating && typeof rating.value === "number" && !isNaN(rating.value)) {
          if (location in ratingsByLocation) {
            ratingsByLocation[location].total += rating.value;
            ratingsByLocation[location].count++;
          } else {
            ratingsByLocation[location] = { total: rating.value, count: 1 };
          }
        }
      });
    
      const locations = Object.keys(ratingsByLocation);
      const avgRatings = locations.map((location) => {
        const count = ratingsByLocation[location].count;
    
        if (count > 0) {
          return ratingsByLocation[location].total / count;
        } else {
          return 0;
        }
      });
      console.log(avgRatings);
      console.log(ratingsByLocation);
    
      setChartData({
        options: {
          chart: {
            type: "bar",
          },
          xaxis: {
            categories: locations,
          },
        },
        series: [
          {
            name: "Average Rating",
            data: avgRatings,
          },
        ],
      });
    }, [posts]);
    
    

  return (

<>

{!connectedUser || connectedUser.role != "admin" && <AccessDach/> }
{connectedUser && <FullLayout>
  

<Breadcrumb>
             
              <BreadcrumbItem active>Users</BreadcrumbItem>
              <BreadcrumbItem>
                <Link href="/User/BlockedUsersDash">Blocked Users</Link>
              </BreadcrumbItem>
            </Breadcrumb>



            <MapContainer
  center={[36.81897, 10.16579]}
  zoom={5}
  scrollWheelZoom={false}
  zoomControl={true}
  style={{ height: "400px", width: "100%", border: "2px solid #ccc" }}
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {usersMap.map((user) => (
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

         
       



    <Card>
    {alertMessage && (
        <Alert color="success" onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </Alert>
)}
   {alertMessageBlock && (
        <Alert color="danger" onClose={() => setAlertMessageBlock('')} dismissible>
          {alertMessageBlock}
        </Alert>
)}

      <CardBody>
    

     
        <CardTitle tag="h5">User List</CardTitle>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search user" /> 
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Coordinates</th>
                <th>Birthdate</th>
                  <th>Role</th>
                  <th>User Job Offers' List</th>
                <th>Status</th>
               
                <th>Actions</th>
                

               
              </tr>
            </thead>
            <tbody>
              {searchTerm === '' 
          ? users.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                       <Image
                        src={`http://localhost:5000/api/users/file/${tdata._id}`}
                        className="rounded-circle"
                        width="45"
                        height="45"
                      />   




                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.surname}&nbsp;{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.dateOfBirth}</td>
                  <td>{tdata.role}</td>
                  <td className="text-center"> {tdata.role === "farmer" &&
            
              <Button
                className="rounded-circle me-3"
                size="sm"
                color="dark"
                onClick={() => {handleChecklistClick(); loadData(tdata._id);}}
                
              ><a href="#my-card">
                <i className="bi bi-card-checklist" />
                </a>
              </Button>
              
          }
         
    </td>
                  <td>
            


                    {tdata.accStatus == true && !isBlocked ? (
                     <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                    )  : (
                        <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                    )}
                  </td>


                  <td>
                  {tdata.accStatus== true && !isBlocked ? (
  <>
    <Button onClick={() => deleteUser(tdata._id)} className="btn" outline color="warning">
    <i class="bi bi-trash3-fill"></i>
    </Button>
    &nbsp;
    <Button  onClick={() => blockUser(tdata._id)} className="btn" outline color="warning">
    <i class="bi bi-person-x-fill"></i>
    </Button>
  </>
) : (
  <>
   
    <Button onClick={() => deleteUser(tdata._id)} className="btn" outline color="warning">
    <i class="bi bi-trash3-fill"></i>
    </Button>
  </>
)}

                 
                  </td>

                 
                </tr>
              )) :
              filteredUsers.map((tdata,index)=> (
              
              <tr key={index} className="border-top">
              <td>
                <div className="d-flex align-items-center p-2">
                   <Image
                    src={`http://localhost:5000/api/users/file/${tdata._id}`}
                    className="rounded-circle"
                    width="45"
                    height="45"
                  />   




                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="ms-3">
                    <h6 className="mb-0">{tdata.surname}&nbsp;{tdata.name}</h6>
                    <span className="text-muted">{tdata.email}</span>
                  </div>
                </div>
              </td>
              <td>{tdata.dateOfBirth}</td>
              <td>{tdata.role}</td>
              <td>
        


                {tdata.accStatus == true && !isBlocked ? (
                 <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                )  : (
                    <span className="p-2 bg-danger rounded-circle d-inline-block ms-3" />
                )}
              </td>


              <td>
              {tdata.accStatus== true && !isBlocked ? (
<>
<Button onClick={() => deleteUser(tdata._id)} className="btn" outline color="warning">
<i class="bi bi-trash3-fill"></i>
</Button>
&nbsp;
<Button  onClick={() => blockUser(tdata._id)} className="btn" outline color="warning">
<i class="bi bi-person-x-fill"></i>
</Button>
</>
) : (
<>

<Button onClick={() => deleteUser(tdata._id)} className="btn" outline color="warning">
<i class="bi bi-trash3-fill"></i>
</Button>
</>
)}

             
              </td>

             
            </tr>
              
              
              
              
              
              
           ))   }
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
   {showChecklist && (
                    <div id="my-card">
                      <Card>
                    <CardBody>
                      <CardTitle tag="h5">Job Offers Listing</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Overview Of The Job Offers
                      </CardSubtitle>
                      <div className="table-responsive">
                        <Table className="text-nowrap mt-3 align-middle" borderless>
                          <thead>
                            <tr>
                              <th>Job Offer </th>
                              <th>Job Offer</th>
              
                              <th>Location</th>
              
                              <th>Budget</th>
                              <th>Reviews</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                        { posts.map((post, index)=>(  <tbody>
                         
                           
                              <tr key={index} className="border-top">
                                <td>
                                  <div className="d-flex align-items-center p-2">
                                    
                                    <div className="ms-3">
                                      <h6 className="mb-0">{post.title}</h6>
                                      <span className="text-muted"><MDBIcon far icon="clock" /> {Moment(post.createdAt).format('Do MMMM, h:mm a')}</span>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                {showFullDescription ? post.description : descriptionPreview(post)}
                                <button onClick={() => setShowFullDescription(!showFullDescription)}>
                                  {showFullDescription ? 'Show Less' : 'Show More'}
                                </button>
                              </td>
                                <td>
                                {post.location}
                                </td>
              
                                <td>{post.salary} DT</td>
                                <td>
                                {post.rating.length > 0 ? (
                                  Array.from({ length: Math.min(post.rating[0].value, 5) }).map((_, i) => (
                                    <i
                                      key={i}
                                      className="fa fa-star"
                                      style={{ color: 'gold' }}
                                    ></i>
                                  ))
                                ) : (
                                  "No reviews"
                                )}

                              </td>
                              <td><Button onClick={() => deletePost(post._id)} className="btn" outline color="warning">
    <i class="bi bi-trash3-fill"></i>
    </Button></td>






                              </tr>
                          
                          </tbody>  ))}
                        </Table>
                      </div>
                    </CardBody>
                    </Card>
                   
                    <Row>
            <Col sm="12" lg="12">
            <Card>
  <CardBody>
    <CardTitle tag="h5">Average Ratings by Location</CardTitle>
    <CardSubtitle className="text-muted" tag="h6">
      Based on {posts.length} job posts
    </CardSubtitle>
    {chartData ? (
      <Chart
        type="bar"
        height="300"
        options={chartData.options}
        series={chartData.series}
      />
    ) : (
      <p>Loading...</p>
    )}
  </CardBody>
</Card>
            </Col>
          </Row>
                  </div>
      )}
  
  
    </FullLayout>}
</>


  );
};

export default UsersDash;