import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { CartContext } from "../CartPage/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItemCount } = useContext(CartContext);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? "auto" : "hidden";
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          Sefa Karataş
        </Link>

        <div className="navbar-menu">
          <Link to="/kadin">Kadın</Link>
          <Link to="/erkek">Erkek</Link>
          <Link to="/cocuk">Çocuk</Link>
          <Link to="/outlet">Outlet</Link>
        </div>

        <div className="navbar-icons">
          <Link to="/cart">
            <CiShoppingCart className="cart-icon" />
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}{" "}
          </Link>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMenu}>
          ×
        </button>
        <Link to="/kadin" onClick={toggleMenu}>
          Kadın
        </Link>
        <Link to="/erkek" onClick={toggleMenu}>
          Erkek
        </Link>
        <Link to="/cocuk" onClick={toggleMenu}>
          Çocuk
        </Link>
        <Link to="/outlet" onClick={toggleMenu}>
          Outlet
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
