import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${backend_url}/api/place-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          total: getTotalCartAmount(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        navigate("/order-confirmation", {
          state: { orderNumber: data.orderNumber },
        });
      } else {
        alert("Checkout failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while placing your order");
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <div key={product.id}>
              <div className="cartitems-format-main cartitems-format">
                <img
                  className="cartitems-product-icon"
                  src={backend_url + product.image}
                  alt={product.name}
                />
                <p className="cartitems-product-title">{product.name}</p>
                <p>{currency}{product.new_price}</p>
                <button className="cartitems-quantity">{cartItems[product.id]}</button>
                <p>{currency}{product.new_price * cartItems[product.id]}</p>
                <img
                  onClick={() => removeFromCart(product.id)}
                  className="cartitems-remove-icon"
                  src={cross_icon}
                  alt="remove"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{currency}{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{currency}{getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>Enter Promo Code Here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
