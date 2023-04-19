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
import ReactPaginate from 'react-paginate';


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UsersDash = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
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

    const [users, setUsers] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertMessageBlock, setAlertMessageBlock] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
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

    const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  const startIndex = currentPage * itemsPerPage;
  const selectedPosts = posts.slice(startIndex, startIndex + itemsPerPage);

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
                  <td className="text-center"> 
                  {tdata.role !== "admin" &&
            
              <Button
                className="rounded-circle me-3"
                size="sm"
                color="warning"
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
                        { selectedPosts.map((post, index) => ( <tbody>
                         
                           
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
                      <div className="parent-container" style={{float:"right"}}>
                      <div className="pagination-container">
                      <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value={5}>5 items per page</option>
                            <option value={10}>10 items per page</option>
                            <option value={20}>20 items per page</option>
                          </select>
                          <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(posts.length / itemsPerPage)}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                          />

                      </div></div>

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