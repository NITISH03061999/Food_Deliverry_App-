import React, { useState, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useCart, useDispatchCart } from "./Contextreducer";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const cartData = useCart() || []; // ✅ Ensure cartData is always an array
  const dispatch = useDispatchCart();
  const cartCount = useMemo(() => cartData.length, [cartData]);

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    toast.success("Logout Successful");
    navigate("/login");
  };

  // ✅ State for Cart Modal
  const [showCart, setShowCart] = useState(false);
  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  // ✅ Checkout Handler with Fixes
  const handleCheckout = async () => {
    const useremail = localStorage.getItem("userEmail");
    if (!useremail) {
      toast.error("Please log in to place an order!");
      return;
    }

    if (cartData.length === 0) {
      toast.error("Your cart is empty. Add items before checkout.");
      return;
    }

    try {
      const response = await fetch(
        "https://vercel-backend-foodapp.onrender.com/api/OrderData",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_data: cartData,
            email: useremail,
            order_date: new Date().toDateString(),
            order_time: new Date().toLocaleTimeString(),
          }),
        }
      );

      const responseData = await response.json();
      if (response.ok) {
        dispatch({ type: "DROP" });
        handleCloseCart();
        toast.success("Order placed successfully!");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-success px-3"
        variant="dark"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="text-white me-5 fst-italic fw-bolder text-truncate"
            style={{
              fontSize: "clamp(18px, 5vw, 32px)",
              maxWidth: "100%",
              whiteSpace: "nowrap",
            }}
          >
            Dhaka's Kitchen
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/"
                className="text-white me-4 fs-5 fw-bolder"
              >
                Home
              </Nav.Link>
              {localStorage.getItem("authtoken") && (
                <Nav.Link
                  as={Link}
                  to="/myorder"
                  className="text-white fs-5 fw-bolder"
                >
                  My Orders
                </Nav.Link>
              )}
            </Nav>

            {!localStorage.getItem("authtoken") ? (
              <Nav className="ms-auto d-flex gap-3">
                <Nav.Link
                  as={Link}
                  to="/"
                  className="btn bg-white text-success p-2 fw-bolder"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  className="btn bg-white text-success p-2 fw-bolder"
                >
                  Signup
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="ms-auto d-flex gap-3">
                <Nav.Link
                  className="btn bg-white text-success p-2 fw-bolder"
                  onClick={handleShowCart}
                >
                  My Cart
                  {cartCount > 0 && (
                    <Badge bg="danger" className="ms-2">
                      {cartCount}
                    </Badge>
                  )}
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/"
                  className="btn bg-white text-danger p-2 fw-bolder"
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ Cart Modal */}
      <Modal show={showCart} onHide={handleCloseCart} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>🛒 Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            scrollbarWidth: "thin",
            msOverflowStyle: "none",
          }}
        >
          {cartData.length === 0 ? (
            <div className="text-center fs-4">Your cart is empty!</div>
          ) : (
            <div className="container">
              <div className="row">
                {cartData.map((item, index) => (
                  <div
                    key={item._id || item.id || index}
                    className="col-md-12 mb-3"
                  >
                    <Card className="shadow-sm">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <Card.Img
                            src={item.img}
                            alt={item.name}
                            className="img-fluid rounded-start"
                            style={{ height: "160px", objectFit: "cover" }}
                          />
                        </div>
                        <div className="col-md-8">
                          <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                              <strong>Size:</strong> {item.size} |{" "}
                              <strong>Qty:</strong> {item.qty}
                            </Card.Text>
                            <Card.Text>
                              <strong>Price:</strong> ₹{item.price}
                            </Card.Text>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() =>
                                dispatch({
                                  type: "REMOVE",
                                  id: item._id || item.id,
                                })
                              }
                            >
                              Remove
                            </Button>
                          </Card.Body>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <h5 className="me-auto">
            Total: ₹
            {cartData.reduce((total, item) => total + (item.price || 0), 0)}
          </h5>
          <Button variant="secondary" onClick={handleCloseCart}>
            Close
          </Button>
          <Button variant="success" onClick={handleCheckout}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomNavbar;
