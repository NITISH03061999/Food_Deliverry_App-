import React, { useState } from "react";
import { Button, Form, Container, Fade } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css"

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false); // For fade animation

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const res = await response.json();
      if (res.authToken) {
        console.log(credentials.email);
        
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authtoken", res.authToken);
        navigate("/");
        toast.success("Login Successfull!");
      } else {
        console.log("Invalid credentials");
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went Wrong!");
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
              <Form.Group className="mb-3 ">
                <Form.Label className="login-label text-black fw-bolder ">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="form-control-lg login-input"
                  required
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
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center" >
                <Button  className="custom-btn  btn-secondary text-white fw-bolder text-decoration-none" type="button">
                  <Link to="/signup" className=" text-white text-decoration-none">
                    New User?
                  </Link>
                </Button>

                <Button
                 
                  type="submit"
                  className="custom-btn btn-secondary text-white fw-bolder"
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
               
                >
                   Login
                </Button>
              </div>

              <Fade in={show} timeout={300}>
                <p className=" mt-3 text-black text-center fw-bolder">Tasty Food Awaits You! 🍕🍔</p>
              </Fade>
            </Form>
          </div>
        </Fade>
      </Container>
    </div>
  );
};

export default Login;
