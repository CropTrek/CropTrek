import { Button, Row, Col, Table, Card, CardTitle, CardBody,CardSubtitle,Alert, ListGroupItem, ListGroup, Modal } from "reactstrap";
import FullLayout from "../../src/layouts/FullLayout";
import React ,{useEffect,useState} from "react";
import Moment from 'moment';

import { MDBIcon } from "mdb-react-ui-kit";
import "leaflet/dist/leaflet.css";
import Head from "next/head";
import TopCards from "../../src/components/dashboard/TopCards";
import ReactPaginate from "react-paginate";
import { Bar, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';


const   jobPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        async function loadData(){
            const res = await fetch(`http://localhost:5000/job/getJobPosts`)
            const posts = await res.json()  
            setPosts(posts)
    }  
    

  loadData();

  }, [posts])

   
  const [searchTerm1, setSearchTerm1] = useState('');
    const filterPosts = (posts) => {
      return posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm1.toLowerCase())
      );
    };

     // create an object to store the count of each title
     const titleCount = {};
     filterPosts(posts).forEach((post) => {
       if (titleCount[post.title]) {
         titleCount[post.title]++;
       } else {
         titleCount[post.title] = 1;
       }
     });
   
     // transform the data into an array of objects that can be used by Chart.js
     const data = {
      
       labels: Object.keys(titleCount),
       datasets: [
         {
           label: "Number of Posts",
           data: Object.values(titleCount),
           fill: false,
           borderColor: "#2A8AC0",
           tension: 0.1,
         },
       ],
     };

     const options = {
        scales: {
          x: {
            type: 'category',
            labels: Object.keys(titleCount),
          },
          y: {
            beginAtZero: true,
          },
        },
      };
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
    const [showFullDescription, setShowFullDescription] = useState(false);

    const descriptionPreview = (post) => post.description.slice(0, 40) + '...';

    return(
        <>
       <>
<FullLayout>


      <div>
        <Head>
          <title>Ample Admin Next Js Free Aadmin Dashboard</title>
          <meta
            name="description"
            content="Ample Admin Next Js Free Aadmin Dashboard"
          />
        
          
        </Head>
        <div>
          {/***Top Cards***/}
           
          <Row>
            <Col sm="6" lg="3">
              <TopCards
                bg="bg-light-success text-success"
                title="Profit"
                subtitle="Job Offers"
                earning={posts.length}
                icon="bi bi-wallet"
              />
            </Col>
            
            
           
          </Row>
       
          
        </div>
      </div>

      <div id="my-card">
                      <Card>
                    <CardBody>
                      <CardTitle tag="h5">Job Offers Listing</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Overview Of The Job Offers
                      </CardSubtitle>
                      
                      <div className="table-responsive">
                      <div class="search-container">
                      <input
                        type="text"
                        placeholder="Search By Job Title ..."
                        value={searchTerm1}
                        onChange={(e) => setSearchTerm1(e.target.value)}
                      />
                      </div>

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
                        {filterPosts(selectedPosts).map((post, index) => (

<tbody>
                         
                           
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

                  </div>

                  <div>

                  <Bar data={data} options={options} />    </div>
      </FullLayout> 

</>
        </>
    )

}

export default jobPosts;