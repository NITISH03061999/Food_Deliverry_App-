import React, { useState } from "react";
import { Button, Form, Container, Fade } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    geolocation: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Validate Form and Show Toast Error Messages
  const validateForm = () => {
    const newErrors = [];

    // Check if name is provided
    if (!credentials.name) newErrors.push("Name is required.");

    // Check if email is provided and valid using a stricter regex
    if (!credentials.email) {
      newErrors.push("Email is required.");
    } else {
      // More strict email regex (handles common invalid email cases better)
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2})?$/;

      if (!emailRegex.test(credentials.email)) {
        newErrors.push("Email is invalid.");
      }
    }

    // Check if password is provided and meets length requirement
    if (!credentials.password) newErrors.push("Password is required.");
    else if (credentials.password.length < 5) newErrors.push("Password must be at least 5 characters.");

    // Check if address is provided
    if (!credentials.geolocation) newErrors.push("Address is required.");

    // Show errors as toast notifications
    newErrors.forEach((error) => toast.error(error));

    // Return false if there are any validation errors
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side validation before making API call
    if (!validateForm()) return;

    try {
      const response = await fetch("https://vercel-backend-foodapp.onrender.com/api/createuser", {
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
      if (res.success === true) {
        toast.success("Profile created successfully");

        // Redirect to login page after successful signup
        setTimeout(() => {
          navigate("/login"); // Use navigate to redirect to login page
        }, 1500); // Wait for 1.5 seconds to show the success toast before navigating
      } else {
        toast.error("Failed to create profile. Please try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center signup-page">
      <Container className="auth-container">
        <Fade in={true} timeout={500}>
          <div className="p-4 signup-box text-black">
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
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Button variant="" className="custom-btn btn-secondary" type="button">
                  <Link to="/login" className="text-white text-decoration-none">
                    Already a User?
                  </Link>
                </Button>

                <Button
                  type="submit"
                  className="custom-btn btn-secondary"
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                  onClick={validateForm}
                >
                  Sign Up
                </Button>
              </div>

              <Fade in={show} timeout={300}>
                <p className="text-muted mt-3 text-center">Join the Best Food Community! 🍕🍔</p>
              </Fade>
            </Form>
          </div>
        </Fade>
      </Container>
    </div>
  );
};

export default Signup;
