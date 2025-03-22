import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import WomenProducts from "./Components/WomanPage/WomanPage";
import ManProducts from "./Components/ManPage/ManPage";
import ChildProducts from "./Components/ChildPage/ChildPage";
import Home from "./Components/HomePage/Home";
import Footer from "./Components/Footer/Footer";
import Outlet from "./Components/OutletPage/Outlet";
import Cart from "./Components/CartPage/Cart";
import { CartProvider } from "./Components/CartPage/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kadin" element={<WomenProducts />} />
            <Route path="/erkek" element={<ManProducts />} />
            <Route path="/cocuk" element={<ChildProducts />} />
            <Route path="/outlet" element={<Outlet />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </CartProvider>
  );
}

export default App;
