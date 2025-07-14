import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">About Us</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          We strive to offer the highest quality nutritional supplements that 
          support both an active and healthy lifestyle. All of our available 
          products are third-party tested and made with the highest quality 
          ingredients. Each product is specifically designed for recovery and 
          enhancement—supporting tissue repair, cellular health, and overall wellbeing.
        </p>
        <p>
          Just as we are committed to product quality, we are equally committed to 
          excellent customer service. If you encounter any issues with your order 
          or feel our service has been inadequate, please reach out to our support 
          team. We’re here to help.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;