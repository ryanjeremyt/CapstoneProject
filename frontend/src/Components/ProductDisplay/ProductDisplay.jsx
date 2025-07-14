import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  const formattedCategory = product.category
    ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
    : "";

  return (
    <section className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={backend_url + product.image}
            alt={product.name}
          />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          {[...Array(4)].map((_, i) => (
            <img key={i} src={star_icon} alt="star" />
          ))}
          <img src={star_dull_icon} alt="star-dull" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            {currency}{product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            {currency}{product.new_price}
          </div>
        </div>

        <div className="productdisplay-right-description">
          {product.description}
        </div>

        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>

        <p className="productdisplay-right-category">
          <span>Category:</span> {formattedCategory}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span> Nutrition, Recovery
        </p>
      </div>
    </section>
  );
};

export default ProductDisplay;