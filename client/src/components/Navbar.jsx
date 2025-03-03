import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";
const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="ps-3 bg-success gap-3">

      <Link to="/" className="text-white text-decoration-none fs-1 fst-italic fw-bold ">
        GoFood
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/" className="text-white text-decoration-none me-4">
            Navbar
          </Link>

          <Link to="/login" className="text-white text-decoration-none">
           Login
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default CustomNavbar;
