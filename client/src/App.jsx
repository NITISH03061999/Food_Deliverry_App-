import Home from "./screens/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/Contextreducer";
import Myorder from "./screens/Myorder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/myorder" element={<Myorder />} />
          
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
