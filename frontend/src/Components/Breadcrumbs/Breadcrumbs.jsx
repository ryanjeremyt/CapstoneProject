import React from 'react';
import './Breadcrumbs.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrumbs = ({ product }) => {
  if (!product) return null;

  const formattedCategory = product.category
    ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
    : "";

  return (
    <div className='breadcrumbs'>
      HOME <img src={arrow_icon} alt="arrow" /> SHOP <img src={arrow_icon} alt="arrow" /> {formattedCategory} <img src={arrow_icon} alt="arrow" /> {product.name}
    </div>
  );
};

export default Breadcrumbs;