import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch("https://capstoneproject-backend-i0xb.onrender.com/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);

  // Filter products by category
  const filteredProducts = allproducts.filter(
    (item) => props.category === item.category
  );

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="banner" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1 - {filteredProducts.length}</span> out of{" "}
          {filteredProducts.length} Products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="dropdown icon" />
        </div>
      </div>

      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <Item
            id={item.id}
            key={i}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      <div className="shopcategory-loadmore">
        <Link to="/" style={{ textDecoration: "none" }}>
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default ShopCategory;
