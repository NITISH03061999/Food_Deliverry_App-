import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CustomCard = () => {
  return (
    <Card className="mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
      <Card.Img variant="top" src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg"  />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
        Lorem ipsum dolor sit amet.
        </Card.Text>
        <div className=" w-full mb-2 ">
          <select className="m-2 ms-0 h-100 bg-success rounded">
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select name="" id="" className="m-2 ms-0 h-100 bg-success rounded">
            <option value="Half">Half</option>
            <option value="Full">Full</option>
          </select>

          <div className="d-inline">Total Price:</div>
        </div>
        <Button variant="primary">Submit Order</Button>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
