import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoMdMenu } from "react-icons/io";

const Sidebar = ({ products, setFilteredProducts }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterHistory, setFilterHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const colors = [...new Set(products.flatMap((product) => product.colors))];

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

  useEffect(() => {
    setFilteredProducts(products);
  }, [products, setFilteredProducts]);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "0-1000") {
      setPriceRange([0, 1000]);
    } else if (value === "1000-2000") {
      setPriceRange([1000, 2000]);
    } else if (value === "2000-10000") {
      setPriceRange([2000, 10000]);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const applyFilters = () => {
    setFilterHistory((prevHistory) => [
      { priceRange, selectedColors, selectedCategory },
      ...prevHistory,
    ]);

    let filtered = products.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) => selectedColors.includes(color))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.category.some((cat) =>
          cat.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }

    setFilteredProducts(filtered);
    setSidebarOpen(false); // Filtreleme sonrası sidebar'ı kapat
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedColors([]);
    setSelectedCategory("");
    setFilteredProducts(products);
    setFilterHistory([]);
  };

  const revertToPreviousFilter = () => {
    if (filterHistory.length === 0) {
      resetFilters();
    } else {
      const previousFilter = filterHistory[0];
      setPriceRange(previousFilter.priceRange);
      setSelectedColors(previousFilter.selectedColors);
      setSelectedCategory(previousFilter.selectedCategory);

      let filtered = products.filter(
        (product) =>
          product.price >= previousFilter.priceRange[0] &&
          product.price <= previousFilter.priceRange[1]
      );

      if (previousFilter.selectedColors.length > 0) {
        filtered = filtered.filter((product) =>
          product.colors.some((color) =>
            previousFilter.selectedColors.includes(color)
          )
        );
      }

      if (previousFilter.selectedCategory) {
        filtered = filtered.filter((product) =>
          product.category.some((cat) =>
            cat
              .toLowerCase()
              .includes(previousFilter.selectedCategory.toLowerCase())
          )
        );
      }

      setFilteredProducts(filtered);
      setFilterHistory((prevHistory) => prevHistory.slice(1));
    }
  };

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <IoMdMenu />
      </button>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="filter-group">
          <h3 className="filter-label">Fiyat Aralığı</h3>
          <div className="price-options">
            <label className="price-option">
              <input
                type="radio"
                name="priceRange"
                value="0-1000"
                checked={priceRange[1] === 1000}
                onChange={handlePriceChange}
              />
              <span>0 - 1000 TL</span>
            </label>
            <label className="price-option">
              <input
                type="radio"
                name="priceRange"
                value="1000-2000"
                checked={priceRange[1] === 2000}
                onChange={handlePriceChange}
              />
              <span>1000 - 2000 TL</span>
            </label>
            <label className="price-option">
              <input
                type="radio"
                name="priceRange"
                value="2000-10000"
                checked={priceRange[1] === 10000}
                onChange={handlePriceChange}
              />
              <span>2000 - 10000 TL</span>
            </label>
          </div>
        </div>

        <div className="filter-group">
          <h3 className="filter-label">Renk</h3>
          <div className="color-options">
            {colors
              .filter((color) => colorMap[color])
              .map((color) => (
                <label key={color} className="color-label">
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorChange(color)}
                  />
                  <span
                    className={`color-button ${
                      selectedColors.includes(color) ? "selected" : ""
                    }`}
                    style={{
                      backgroundColor: colorMap[color],
                      border: selectedColors.includes(color)
                        ? "2px solid #000"
                        : "none",
                    }}
                  ></span>
                </label>
              ))}
          </div>
        </div>

        <button
          onClick={revertToPreviousFilter}
          className="filter-button revert"
        >
          <RiArrowGoBackLine />
        </button>
        <button onClick={applyFilters} className="filter-button apply">
          Filtrele
        </button>
        <button onClick={resetFilters} className="filter-button reset">
          Sıfırla
        </button>
      </div>
    </>
  );
};

export default Sidebar;
