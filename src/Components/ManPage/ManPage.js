import { useState, useEffect, useContext } from "react";
import "./Man.css";
import productsData from "../data/products.json";
import Sidebar from "../Sidebar/Sidebar";
import { CartContext } from "../CartPage/CartContext";

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

const ManProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const { addToCart, message } = useContext(CartContext);

  useEffect(() => {
    const filtered = productsData.filter((product) =>
      product.category.some((cat) => cat.toLowerCase().includes("erkek"))
    );
    setProducts(filtered);
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

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => {
      const newSelectedSizes = { ...prev };
      if (newSelectedSizes[productId] === size) {
        delete newSelectedSizes[productId];
      } else {
        newSelectedSizes[productId] = size;
      }
      return newSelectedSizes;
    });
  };

  const isAddToCartEnabled = (productId) => {
    return selectedColors[productId] && selectedSizes[productId];
  };

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      selectedColor: selectedColors[product.productId],
      selectedSize: selectedSizes[product.productId],
    });
  };

  return (
    <div className="woman-products">
      <Sidebar products={products} setFilteredProducts={setFilteredProducts} />
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
                    <div className="size-buttons">
                      {product.allSizes &&
                        product.allSizes.map((size, index) => (
                          <label key={index} className="size-label">
                            <input
                              type="radio"
                              name={`size-${product.productId}`}
                              value={size}
                              checked={
                                selectedSizes[product.productId] === size
                              }
                              onChange={() =>
                                handleSizeChange(product.productId, size)
                              }
                              className="size-input"
                            />
                            <span
                              className={`size-button ${
                                selectedSizes[product.productId] === size
                                  ? "selected"
                                  : ""
                              }`}
                            >
                              {size}
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>

                  <div className="woman-color-options">
                    <strong>Renk:</strong>
                    <div className="color-buttons">
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
                                className="color-input"
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

      {message && <div className="cart-message">{message}</div>}
    </div>
  );
};

export default ManProducts;
