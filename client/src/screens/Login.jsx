import React, { useState } from "react";
import { Button, Form, Container, Fade } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css"

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);

  let navigate = useNavigate();

  const validateForm = () => {
    const newErrors = [];
    
    if (!credentials.email) newErrors.push("Email is required.");
    else if (!/\S+@\S+\.\S+/.test(credentials.email)) newErrors.push("Email is invalid.");
    if (!credentials.password) newErrors.push("Password is required.");

    // Show errors as toast notifications
    newErrors.forEach((error) => toast.error(error));
    
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("https://vercel-backend-foodapp.onrender.com/api/loginuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const res = await response.json();
      if (res.authToken) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authtoken", res.authToken);
        navigate("/home");
        toast.success("Login Successfull!");
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center login-page">
      <Container className="auth-container">
        <Fade in={true} timeout={500}>
          <div className="p-4 login-box">
            <h1 className="text-center text-black fw-bolder mb-4">🍽 Dhaka's Kitchen</h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="login-label text-black fw-bolder">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="form-control-lg login-input"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="login-label text-black fw-bolder">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="form-control-lg login-input"
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Button className="custom-btn btn-secondary text-white fw-bolder text-decoration-none" type="button">
                  <Link to="/signup" className="text-white text-decoration-none">
                    New User?
                  </Link>
                </Button>

                <Button type="submit" className="custom-btn btn-secondary text-white fw-bolder">
                  Login
                </Button>
              </div>

              <Fade in={show} timeout={300}>
                <p className="mt-3 text-black text-center fw-bolder">Tasty Food Awaits You! 🍕🍔</p>
              </Fade>
            </Form>
          </div>
        </Fade>
      </Container>
    </div>
  );
};

export default Login;
