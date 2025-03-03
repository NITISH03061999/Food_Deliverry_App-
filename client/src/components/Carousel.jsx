import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg"
          alt="Burger"
          className="d-block w-100"
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 text-white rounded p-3">
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success  bg-success text-white" type="submit">
              Search
            </Button>
          </Form>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="https://images.pexels.com/photos/10875217/pexels-photo-10875217.jpeg"
          alt="Momos"
          className="d-block w-100"
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 text-white rounded p-3">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success bg-success text-white" type="submit">
              Search
            </Button>
          </Form>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg"
          alt="French Fries"
          className="d-block w-100"
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption className="bg-dark  bg-opacity-50 text-white rounded p-3">
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success text-white" type="submit">
              Search
            </Button>
          </Form>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CustomCarousel;
