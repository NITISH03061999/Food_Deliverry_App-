import React, { useEffect, useState } from "react";
import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCard from "../components/Card";
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  const [foodcat, Setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);
  const [search, Setsearch] = useState("");

  const loadData = async () => {
    try {
      let response = await fetch("https://vercel-backend-foodapp.onrender.com/api/fooddata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      let data = await response.json();
      console.log("Fetched Data:", data);

      if (Array.isArray(data) && data.length >= 2) {
        setfooditem(data[0] || []);
        Setfoodcat(data[1] || []);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <CustomNavbar />

      {/* Container for Carousel & Search Bar */}
      <div className="position-relative">
        {/* Search Bar - Single Instance */}
        <div
          className="position-absolute w-50 start-50 translate-middle-x"
          style={{
            bottom: "40px", // Adjust vertical position
            zIndex: "10", // Ensure it's above images
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent bg
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <div className="d-flex">
            <input
              type="search"
              placeholder="Search"
              className="form-control text-white bg-dark border-white"
              style={{ borderRadius: "5px" }}
              value={search}
              onChange={(e) => Setsearch(e.target.value)}
            />
           
          </div>
        </div>

        {/* Carousel */}
        <Carousel>
          <Carousel.Item>
            <img
              src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg"
              alt="Burger"
              className="d-block w-100"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              src="https://images.pexels.com/photos/10875217/pexels-photo-10875217.jpeg"
              alt="Momos"
              className="d-block w-100"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              src="https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg"
              alt="French Fries"
              className="d-block w-100"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Food Items */}
      <div className="w-100 mt-3 container ">
        {foodcat.length > 0 ? (
          foodcat.map((item) => (
            <div
              key={item._id || item.id || Math.random()}
              className="row fs-3 mb-3 "
            >
              {item.CategoryName}
              <hr />
              {fooditem.length > 0 ? (
                fooditem
                  .filter(
                    (itemdata) =>
                      item.CategoryName === itemdata.CategoryName &&
                      itemdata.name.toLowerCase().includes(search.toLowerCase()) // Search filter
                  )
                  .map((filteredItem) => (
                    <div
                      key={filteredItem._id || filteredItem.id || Math.random()}
                      className="col-12 col-md-6 col-lg-3 mb-5 d-flex justify-content-center"
                    >
                      <CustomCard
                       fooditems={filteredItem}
                        options={filteredItem.options[0]}></CustomCard>
                      
                       
                    </div>
                  ))
              ) : (
                <div>No Such Data Found</div>
              )}
            </div>
          ))
        ) : (
          <div>No Data Available</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
