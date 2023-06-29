
import React, { useState } from "react";
import { Button, Form, Alert, Col, Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import "./style.css";

import {
  Typography,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
 
  InputBase,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";


interface FormState {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  submitted: boolean;
}

const Register: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    submitted: false,
  });

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
    if (formState.firstname.trim() === "") {
      return;
    }
    if (formState.lastname.trim() === "") {
      return;
    }
    if (formState.username.trim().length < 4) {
      return;
    }

    if (!validateEmail(formState.email)) {
      return;
    }

    if (formState.password.trim() === "") {
      return;
    }

    if (!validateStrongPassword(formState.password)) {
      return;
    }

    if (formState.confirmPassword.trim() === "") {
      return;
    }

    if (formState.password !== formState.confirmPassword) {
      return;
    }

    // Form is valid, submit it
    console.log("Form is valid, submit it");

    try {
      const response = await createUser(formState);
      if (response.success) {
        // Redirect to the login page if createUser is successful
        navigate("/login");
      } else {
        // Handle the failure case
        console.error("User creation failed:", response.error);
      }
    } catch (error) {
      console.error("Error occurred during user creation:", error);
    }
  };

  const createUser = async (userData: FormState) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/registerUser",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return { success: true, data };
      } else {
        const error = await response.text();
        return { success: false, error };
      }
    } catch (error) {
      throw new Error("error.message");
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStrongPassword = (password: string): boolean => {
    const emailRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    return emailRegex.test(password);
  };



return (
    
        <div className="container smaller-container" style={{ background: 'white', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' ,paddingBottom: '2rem',width: '80%', maxWidth: '600px', margin: '0 auto'}}>
          <AppBar className="app-bar">
            <Toolbar>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                Task Management Tool
              </Typography>
              
              <Link to="/login">
            <Button variant="info">Contact Us</Button>
          </Link>
              <Link to="/login">
            <Button variant="dark">Login</Button>
          </Link>
              <div>
            
              </div>
            </Toolbar>
          </AppBar>
          <h2>Task Management Tool</h2>
          <div className="row">
          
          
              
              
           
            <Col md={12}>
      <div >
      <Card bg="secondary" text="dark" className="p-4">Join today by registering now!
  <Card.Text>
    
  </Card.Text>
</Card>
        <Form className="form" onSubmit={handleSubmit}>
          {/* Add form fields here */}
          <Form.Group controlId="firstname">
            <Form.Label className="label-black">Firstname</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              placeholder="Enter firstname"
              value={formState.firstname}
              onChange={handleInputChange}
              className={`border-black ${
                formState.submitted && formState.firstname.trim() === ""
                  ? "is-invalid"
                  : ""
              }`}
            />
            {formState.submitted && formState.firstname.trim() === "" && (
              <Form.Control.Feedback type="invalid">
                Please enter a firstname.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label className="label-black">Lastname</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              placeholder="Enter lastname"
              value={formState.lastname}
              onChange={handleInputChange}
              className={`border-black ${
                formState.submitted && formState.lastname.trim() === ""
                  ? "is-invalid"
                  : ""
              }`}
            />
            {formState.submitted && formState.lastname.trim() === "" && (
              <Form.Control.Feedback type="invalid">
                Please enter a lastname.
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label className="label-black">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={formState.username}
              onChange={handleInputChange}
              className={`border-black ${
                formState.submitted && formState.username.trim().length < 4
                  ? "is-invalid"
                  : ""
              }`}
            />
            {formState.submitted && formState.username.trim().length < 4 && (
              <Form.Control.Feedback type="invalid">
                Please enter a long enough username.
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label className="label-black">Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter email"
              value={formState.email}
              onChange={handleInputChange}
              className={`border-black ${
                formState.submitted && !validateEmail(formState.email)
                  ? "is-invalid"
                  : ""
              }`}
            />
            {formState.submitted && !validateEmail(formState.email) && (
              <Form.Control.Feedback type="invalid">
                Please enter an email.
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
              className={`border-black ${
                formState.submitted &&
                !validateStrongPassword(formState.password)
                  ? "is-invalid"
                  : ""
              }`}
            />
            {formState.submitted &&
              !validateStrongPassword(formState.password) && (
                <Form.Control.Feedback type="invalid">
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                </Form.Control.Feedback>
              )}
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label className="label-black">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formState.confirmPassword}
              onChange={handleInputChange}
              className={`border-black ${
                formState.submitted &&
                formState.password !== formState.confirmPassword
                  ? "is-invalid"
                  : ""
              }`}
            />
            {formState.submitted &&
              formState.password !== formState.confirmPassword && (
                <Form.Control.Feedback type="invalid">
                  Passwords do not match.
                </Form.Control.Feedback>
              )}
          </Form.Group>

          <Button variant="primary" type="submit">Register</Button>
          
        </Form>
      </div>
    </Col>
          </div>
        </div>
  );

};
export default Register;