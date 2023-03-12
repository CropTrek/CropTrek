import { Button,Row, Col, Table, Card, CardTitle, CardBody,Alert } from "reactstrap";
import ProjectTables from "../../src/components/dashboard/ProjectTable";
import FullLayout from "../../src/layouts/FullLayout";
import React ,{useEffect,useState} from "react";
import axios from "axios";
import {
    Breadcrumb,
    BreadcrumbItem,
  } from "reactstrap";
  import Link from "next/link";
const BlockedUsersDash = () => {


    const [users, setUsers] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    useEffect(() => {
        async function fetchUsers() {
         await axios.get('http://localhost:5000/api/users/getblockedUser').then((res)=>{setUsers(res.data);console.log(res)})
          .catch((error)=>console.log(error))
        }
        fetchUsers();
        let timeoutId;
        if (alertMessage  ) {
          timeoutId = setTimeout(() => {
            setAlertMessage('');
          }, 3000); // affiche l'alerte pendant 3 secondes avant de la masquer
        } 
        return () => clearTimeout(timeoutId);
      }, [alertMessage]);
      const data = {
        accStatus: true,
      };
      function deblock(id) {
        const filteredUsers = users.filter(user => user._id !== id);
        axios.put(`http://localhost:5000/api/users/blockUserDash/${id}`,data).then(()=>{
         setAlertMessage(`block was canceled`);
         setUsers(filteredUsers)
        
     
     });
       
       }


  return (

<>

<FullLayout>
{alertMessage && (
        <Alert color="success" onClose={() => setAlertMessage('')} dismissible>
          {alertMessage}
        </Alert>
)}
<Breadcrumb>
              
              <BreadcrumbItem >
                <Link href="/User/UsersDash">Users</Link>
              </BreadcrumbItem>
              <BreadcrumbItem >
                Blocked Users
              </BreadcrumbItem>
            </Breadcrumb>

    <Row>
 
      <Col lg="12">
        <Card>




          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i class="bi bi-person-x-fill"></i>
          &nbsp;
          &nbsp;
            Blocked users
          </CardTitle>
          <CardBody className="primary">
            <Table bordered striped>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Birthdate</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {users.map((tdata, index) => (
                <tr key={index}>
                  <td>{tdata.surname}</td>
                  <td>{tdata.name}</td>
                  <td>{tdata.email}</td>
                  <td>{tdata.dateOfBirth}</td>
                  <td>{tdata.role}</td>
                  <td>
                  <Button onClick={() => deblock(tdata._id)} className="btn" outline color="warning">
                  <i class="bi bi-person-check-fill"></i>
    </Button>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    
    </Row>

    </FullLayout>
</>


  );
};

export default BlockedUsersDash;
