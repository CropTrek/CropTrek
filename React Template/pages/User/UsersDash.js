import { User } from "react-feather";
import Image from "next/image";
import { Button, Row, Col, Table, Card, CardTitle, CardBody,CardSubtitle,Alert } from "reactstrap";
import FullLayout from "../../src/layouts/FullLayout";
import React ,{useEffect,useState} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
  } from "reactstrap";
  import Link from "next/link";
import axios from "axios";
const UsersDash = () => {




    const [users, setUsers] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertMessageBlock, setAlertMessageBlock] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
    useEffect(() => {
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



  return (

<>

<FullLayout>
  






         
       



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
      <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/User/BlockedUsersDash">Blocked Users</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Users</BreadcrumbItem>
            </Breadcrumb>


        <CardTitle tag="h5">User List</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
         CropTrek users
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Coordinates</th>
               

                <th>Status</th>

                <th>Actions</th>

               
              </tr>
            </thead>
            <tbody>
              {users.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                       {/* <Image
                        src={tdata.avatar}
                        className="rounded-circle"
                        
                        width="45"
                        height="45"
                      />  */}
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.surname}&nbsp;{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
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
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  
    </FullLayout>
</>


  );
};

export default UsersDash;