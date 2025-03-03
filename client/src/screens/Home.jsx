import React from "react";
import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCard from "../components/Card";
import CustomCarousel from "../components/Carousel";


const Home = () => {
  return (
    <div>
      <div>
        <CustomNavbar />
      </div>
      <div><CustomCarousel/></div>
      <div>
        <CustomCard />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
