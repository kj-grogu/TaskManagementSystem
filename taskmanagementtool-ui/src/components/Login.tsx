import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import "./style.css";

interface FormState {
  username: string;
  password: string;
  submitted: boolean;
}

const Login: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    username: "",
    password: "",
    submitted: false,
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState((prevState) => ({
      ...prevState,
      submitted: true,
    }));

    // Perform form validation
    if (formState.username.trim().length < 4) {
      return;
    }

    if (formState.password.trim() === "") {
      return;
    }

    try {
      const response = await loginUser(formState);
      if (response.success) {
        // Redirect to the login page if createUser is successful
        navigate("/dashboard");
      } else {
        setError("Invalid username or password. Couldnt login!");
        console.error("User login failed:", response.error);
      }
    } catch (error) {
      console.error("Error occurred during user login", error);
    }
  };

  const loginUser = async (userData: FormState) => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/loginUser", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(userData),
      });
      // if (response.ok) {
      //   const data = await response.json();
      //   return { success: true, data };
      // } else {
      if (response.ok) {
        const data = await response.json();
        const sessionValue = data.sessionValue;
        const userName = data.sessionValue.split("_")[0];
        //const auth = data.sessionValue.split("_")[1].split(" ")[1];
        sessionStorage.setItem("user", userName);
        //sessionStorage.setItem("userAuth", auth);
        localStorage.setItem("username", userName);
        return { success: true, sessionValue };
      } else {
        const error = await response.text();
        return { success: false, error };
      }
    } catch (error) {
      throw new Error("error.message");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center custom-container"
      
    >
      <Card style={{ width: '300px', backgroundColor: 'white', padding: '1rem' , color: 'black'}}>
       <h5>Login</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label className="label-black">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={formState.username}
              onChange={handleInputChange}
              className={
                formState.submitted && formState.username.trim().length < 4
                  ? "is-invalid"
                  : ""
              }
            />
            {formState.submitted && formState.username.trim().length < 4 && (
              <Form.Control.Feedback type="invalid">
                Please enter a long enough username.
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label className="label-black">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formState.password}
              onChange={handleInputChange}
              className={
                formState.submitted && formState.password.trim() === ""
                  ? "is-invalid"
                  : ""
              }
            />
            {formState.submitted && formState.password.trim() === "" && (
              <Form.Control.Feedback type="invalid">
                Please enter a password.
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <Row className="justify-content-between">
            <Col>
              <Button type="submit">Login</Button>
            </Col>
            <Col >
              <Link to="/">
                <Button variant="secondary">Cancel</Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
