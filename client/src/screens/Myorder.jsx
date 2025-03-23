import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const Myorder = () => {
  const [orderData, setOrderData] = useState([]); 

  const fetchMyOrder = async () => {
    try {
      const email = localStorage.getItem("userEmail"); 
      if (!email) {
        toast.error("Please log in to view your orders.");
        return;
      }

      console.log("Fetching orders for:", email);
      toast.info("Fetching your orders...");

      const res = await fetch("https://vercel-backend-foodapp.onrender.com/api/myOrderData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      console.log("Full API Response:", response);

      if (!response || !Array.isArray(response.order_data)) {
        setOrderData([]); 
        return;
      }

      setOrderData(response.order_data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrderData([]);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  useEffect(() => {
    console.log("Updated Order Data:", orderData);
  }, [orderData]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="mt-4 text-center">📦 My Orders</h2>
        <div className="row h-100">
          {orderData.length === 0 ? (
            <p className="text-center text-muted">No orders found.</p>
          ) : (
            orderData.slice().reverse().map((order, index) => (
              <div key={index} className="col-12">
                <h4 className="mt-5 fw-bold ">
                  🗓️ Order Date: {order.Order_date}
                </h4>
                <hr />
                <div className="row">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, idx) => (
                      <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="card mt-3 shadow-lg border-0 rounded-3">
                          <img
                            src={item.img}
                            className="card-img-top rounded-top"
                            alt={item.name}
                            style={{ height: "160px", objectFit: "cover" }}
                          />
                          <div className="card-body text-center">
                            <h5 className="card-title fw-bold">{item.name}</h5>
                            <p className="text-muted mb-1">
                              Size: {item.size} | Qty: {item.qty}
                            </p>
                            <p className="fw-bold text-danger fs-5">₹{item.price}/-</p>
                            <p className="small text-muted mb-0">📅 {order.Order_date}</p>
                            <p className="small text-muted mb-0">📅 {order.Order_time}</p>

                           
                        
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No items in this order.</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Myorder;
