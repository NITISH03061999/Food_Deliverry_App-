import React, { useState } from "react";
import { Button, Form, Container, Fade } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css"

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    geolocation: "",  
    password: "",
  });
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          location: credentials.geolocation,
          password: credentials.password,
        }),
      });

      const res = await response.json();
      console.log("API Response:", res);

      if (res.success === true) {
        toast.success("Profile created successfully");
      } else {
        toast.error("Enter valid credentials");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className=" min-vh-100 d-flex align-items-center justify-content-center signup-page "

    >
      <Container className="auth-container">
        <Fade in={true} timeout={500}>
          <div className="p-4 signup-box text-black ">
            <h1 className="text-center fw-bolder mb-4">🍽 Dhaka's Kitchen</h1>
            <h2 className="text-center fw-bolder mb-4">👤 Create Your Account</h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 fw-bolder">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                  className="form-control-lg fw-bolder"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 fw-bolder">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="form-control-lg fw-bolder"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 fw-bolder">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="form-control-lg fw-bolder"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 fw-bolder">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  name="geolocation"
                  value={credentials.geolocation}
                  onChange={handleChange}
                  className="form-control-lg fw-bolder"
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Button
                  variant=""
                  className="custom-btn btn-secondary"
                  type="button"
            
                >
                  <Link to="/login" className="text-white text-decoration-none">
                     Already a User?
                  </Link>
                </Button>

                <Button
                  type="submit"
                  className="custom-btn btn-secondary "
                
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                >
                  <Link to="/login" className=" fw-bolder text-white text-decoration-none">
                  Sign Up
                  </Link>
                </Button>
              </div>

              <Fade in={show} timeout={300}>
                <p className="text-muted mt-3 text-center">
                  Join the Best Food Community! 🍕🍔
                </p>
              </Fade>
            </Form>
          </div>
        </Fade>
      </Container>
    </div>
  );
};

export default Signup;
