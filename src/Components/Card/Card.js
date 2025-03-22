import { useState, useEffect } from "react";
import "./Card.css";
import productsData from "../data/products.json";

const colorMap = {
  siyah: "#000000",
  bej: "#F5F5DC",
  beyaz: "#FFFFFF",
  mavi: "#0000FF",
  kırmızı: "#FF0000",
  yeşil: "#008000",
  pembe: "#FFC0CB",
  mor: "#800080",
  kahverengi: "#A52A2A",
  turuncu: "#FFA500",
};

const ProductsCard = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    const filtered = productsData.filter((product) =>
      product.category.some((cat) => cat.toLowerCase().includes("en çok satan"))
    );
    setFilteredProducts(filtered);
  }, []);

  const handleColorChange = (productId, color) => {
    setSelectedColors((prev) => {
      const newSelectedColors = { ...prev };
      if (newSelectedColors[productId] === color) {
        delete newSelectedColors[productId];
      } else {
        newSelectedColors[productId] = color;
      }
      return newSelectedColors;
    });
  };

  const isAddToCartEnabled = (productId) => {
    return selectedColors[productId];
  };

  const handleAddToCart = (product) => {
    console.log(
      "Sepete eklendi:",
      product,
      "Renk:",
      selectedColors[product.productId]
    );
  };

  return (
    <div className="woman-products">
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.productId} className="product-card">
              <div className="product-card-inner">
                <div className="product-card-front">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="woman-products-image"
                  />
                  <h3>{product.name}</h3>
                  <p>{product.priceText}</p>
                </div>

                <div className="product-card-back">
                  <div className="size-options">
                    <strong>Beden:</strong>
                    <br />
                    {product.allSizes &&
                      product.allSizes.map((size, index) => (
                        <label key={index} className="size-label">
                          <input
                            type="radio"
                            name={`size-${product.productId}`}
                            value={size}
                            className="size-input"
                          />
                          <span className="size-button">{size}</span>
                        </label>
                      ))}
                  </div>

                  <div className="color-options">
                    <strong>Renk:</strong>
                    {product.colors &&
                      product.colors.map((color, index) => {
                        const cssColor = colorMap[color.trim()];
                        return (
                          <label key={index} className="color-label">
                            <input
                              type="radio"
                              name={`color-${product.productId}`}
                              value={color}
                              checked={
                                selectedColors[product.productId] === color
                              }
                              onChange={() =>
                                handleColorChange(product.productId, color)
                              }
                            />
                            <span
                              className={`color-button ${
                                selectedColors[product.productId] === color
                                  ? "selected"
                                  : ""
                              }`}
                              style={{
                                backgroundColor: cssColor,
                              }}
                            ></span>
                          </label>
                        );
                      })}
                  </div>

                  <button
                    className="purchase-button"
                    disabled={!isAddToCartEnabled(product.productId)}
                    onClick={() => handleAddToCart(product)}
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsCard;
