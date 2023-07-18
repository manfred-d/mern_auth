import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

import { useState } from "react";
// import LinkContainer from "react-router-bootstrap/LinkContainer";

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(name);
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Full Names</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full names"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-3" controlId="confirmpassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-4 w-100">
          <Button className=" w-100" variant="secondary" type="submit">
            Register Here
          </Button>
        </Form.Group>
        <Row className="py-3 w-100">
          <Col className=" d-flex">
            <p className=" mx-2 "> have an account?</p>
            <Link to={"/login"}>Login Here</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
