import { Link } from "react-router-dom";
import "./Home.css";
import ProductCard from "../Card/Card";

const Home = () => {
  return (
    <div className="home">
      <div className="banner">
        <img src="/images/pumabanner.jpg" alt="Alışverişe Başla" />
        <div className="banner-text">
          <h1 className="banner-title">Kaliteli Ürünler,</h1>
          <h3 className="banner-title"> Uygun Fiyatlar</h3>
        </div>
      </div>

      <div className="categories">
        <div className="category-grid">
          <Link to="/kadin" className="category-card">
            <button className="button">KADIN</button>
            <img src="/images/png.avif" alt="Kadın" />
          </Link>
          <Link to="/erkek" className="category-card">
            <button className="button">ERKEK</button>
            <img src="/images/pumaerkek.avif" alt="Erkek" />
          </Link>
          <Link to="/cocuk" className="category-card">
            <button className="button">ÇOCUK</button>
            <img src="/images/pumacocuk.jpeg" alt="Çocuk" />
          </Link>
        </div>
      </div>

      <div className="best-sellers">
        <h2>En Çok Satanlar</h2>
        <div className="best-product-grid">
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
