import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatchCart, useCart } from "./Contextreducer";
import { toast } from "react-toastify";

const CustomCard = (props) => {
  let dispatch = useDispatchCart();
  let options = props.options || {};
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || ""); // Set default size to first option

  // Calculate total price dynamically
  const totalPrice = qty * (options[size] || 0);

  const handleAddToCart = async () => {
    if (!localStorage.getItem("authtoken")) {
      toast.error("Please login first!");
      return;
    }

    await dispatch({
      type: "ADD",
      img: props.fooditems.img,
      id: props.fooditems._id,
      name: props.fooditems.name,
      price: totalPrice,
      qty: qty,
      size: size, // Ensures a size is always set
    });

    toast.success("This item has been added to cart.");
  };

  let data = useCart();

  useEffect(() => {
    console.log("Updated Cart Data:", data);
  }, [data]);

  return (
    <Card style={{ width: "18rem", overflow: "hidden" }}>
      <Card.Img
        variant="top"
        src={props.fooditems.img}
        style={{ objectFit: "cover", height: "180px" }}
      />
      <Card.Body>
        <Card.Title>{props.fooditems.name || "Default Food Name"}</Card.Title>

        <div className="w-100 mb-2 d-flex align-items-center">
          {/* Quantity Selector */}
          <select
            className="m-2 ms-0 p-1 bg-success text-white rounded"
            onChange={(e) => setQty(Number(e.target.value))}
            style={{ fontSize: "15px" }}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          {/* Size Selector (Defaults to First Option) */}
          <select
            className="m-2 ms-0 p-1 bg-success text-white rounded"
            value={size} // Ensure the default selection is shown
            onChange={(e) => setSize(e.target.value)}
            style={{ fontSize: "15px" }}
          >
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>

        {/* Total Price Display */}
        <div className="d-inline" style={{ fontSize: "20px", fontWeight: "700" }}>
          Total Price: {totalPrice ? `₹${totalPrice}` : "Select a size"}
        </div>

        {/* Add to Cart Button */}
        <Button variant="success" className="w-100 mt-2" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
