import React from "react";
import { Button, Container, Form  } from "react-bootstrap";

const Auth=()=>{
    return(
        <Container style={{ marginTop: "30px" }}>
        <Form>

        <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" name="name" onChange={(e)=>handleChange(e)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e)=>handleChange(e)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>    
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" name="password" onChange={(e)=>handleChange(e)}/>
      </Form.Group>
      <Button variant="primary" type="submit"  >
        Log In
      </Button>
      
    </Form>
    </Container>
    );
}

export default Auth;