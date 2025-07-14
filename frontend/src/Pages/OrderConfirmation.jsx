import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/OrderConfirmation.css"; 

const OrderConfirmation = () => {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber;
  const { clearCart } = useContext(ShopContext);

useEffect(() => {
  clearCart();
}, []); 

  return (
    <div className="order-confirmation">
      <h1>Thank you, your order has been placed.</h1>
      {orderNumber ? <p>Order #{orderNumber}</p> : <p>Your order has been submitted.</p>}
    </div>
  );
};

export default OrderConfirmation;
