import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
  } from 'reactstrap';
  import Image from 'next/image';
  import axios from "axios";
  import { Alert } from "react-bootstrap";
  import FullLayout from '/src/layouts/FullLayout';
  import {useEffect,useState} from "react";
import { useRouter } from 'next/router';
import moment from 'moment';
  const Forms = () => {
   
    const [user, setUser] = useState({}); 
    const router = useRouter();
    const { id } = router.query;
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState();
    
    useEffect(() => {
        fetch(`http://localhost:5000/api/users/${id}`)
          .then(res => res.json())
          .then(data => setUser(data))
          .catch(error => console.log(error));
       


      }, [id]);
      const handleChange = (event) => {
        setImage(event.target.files[0]);
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append("photo", image);
    
        fetch(`http://localhost:5000/api/users/${user._id}/photo`, {
          method: "PUT",
          body: formData,
        })
        fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then( router.push(`/User/getProfileDash/${id}`));
        };
  
      
     const handleForgotPassword = async (event) => {
       const email=user.email;
  event.preventDefault();
  try {
   const response= await axios.post('http://localhost:5000/reset/forgot-password', { email });
   console.log(response.status);
        if(response.status===200)
        setSuccess('Check your email in order to reset password!');
      }
  catch(error){} 
 };
    return (
      <>
      <FullLayout>
      <Row>
        <Col>
        { success &&
              <Alert variant="success">
                {success}
              </Alert>
            }
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              &nbsp; &nbsp;
             Edit your profile
            </CardTitle>

            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label >Surname</Label>
                  <Input
                    id="Surname"
                    name="Surname"
                    value={user.surname}
                        onChange={(e) => setUser({ ...user, surname: e.target.value })}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Label >Name</Label>
                  <Input
                    id="Name"
                    name="Name"
                    value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Label >Email</Label>
                  <Input
                    id="Email"
                    name="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value})}
                    type="email"
                  />
                </FormGroup>
                <FormGroup>
                  <Label >Birthdate</Label>
                  <Input
                    id="Birthdate"
                    name="Birthdate"
                    value={moment(user.dateOfBirth).format("YYYY-MM-DD")}
                    onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
                    type="date"
                  />
                </FormGroup>
               
                
               
                
                <FormGroup>
                  <Label  >File</Label>
                  <Input id="exampleFile" name="file" type="file" onChange={handleChange}  />
                </FormGroup>
               
                
                <Button className="btn" color="warning" >Update</Button>
                &nbsp;
                <span style={{paddingTop:'25px'}}>
                &nbsp;
                <a href="" onClick={handleForgotPassword} >Reset Password ?</a>
                </span>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      </FullLayout>
      </>
    );
  };
  
  export default Forms;
  