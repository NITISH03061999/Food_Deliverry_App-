import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatchCart, useCart } from "./Contextreducer";
import { toast } from "react-toastify";


const CustomCard = (props) => {

  let dispatch = useDispatchCart();
  let options = props.options || {};
  let priceOptions = Object.keys(options);
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");

  // Dynamically calculate total price
  const totalPrice = qty * (props.options[size] || 0);

  const handleaddtocart = async () => {
    if (!size) {
      toast.error("Please select a size before adding to cart!");
      return;
    }
    else if(!localStorage.getItem("authtoken")){
      toast.success("please login first !");
    }
    else{
      await dispatch({
        type: "ADD",
        img:props.fooditems.img,
        id: props.fooditems._id,
        name: props.fooditems.name,
        price: totalPrice,
        qty: qty,
        size: size,
      });
      toast.success("This item has been added to cart.") 
    }

   
  };
  let data = useCart();

  // UseEffect to check updated cart
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
          <select
            className="m-2 ms-0 p-1 bg-success text-white rounded"
            onChange={(e) => setqty(Number(e.target.value))}
            style={{ fontSize: "15px" }}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1} className="">
                {i + 1}
              </option>
            ))}
          </select>

          <select
            className="m-2 ms-0 p-1 bg-success text-white rounded"
            onChange={(e) => setsize(e.target.value)}
            style={{ fontSize: "15px" }}
          >
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>

        <div className="d-inline" style={{ fontSize: "20px", fontWeight: "700" }}>
          Total Price: {totalPrice ? `₹${totalPrice}` : "Select a size"}
        </div>

        <Button variant="success" className="w-100 mt-2" onClick={handleaddtocart}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
