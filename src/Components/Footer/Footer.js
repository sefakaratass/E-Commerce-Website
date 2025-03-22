import React from "react";
import "./Footer.css";
import { FaXTwitter } from "react-icons/fa6";
import { CiInstagram } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <p>Uygun fiyatlarla kaliteli alışveriş deneyimi.</p>
        </div>

        <ul className="footer-links">
          <li>
            <a href="/">Ana Sayfa</a>
          </li>
          <li>
            <a href="/contact">İletişim</a>
          </li>
        </ul>

        <div className="footer-social">
          <a href="https://www.instagram.com">
            <CiInstagram />
          </a>
          <a href="https://x.com/karatassefaa">
            <FaXTwitter />
          </a>
          <a href="https://www.facebook.com">
            <CiFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
