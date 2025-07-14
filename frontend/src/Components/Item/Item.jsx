import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { backend_url, currency } from '../../App';

const Item = ({ id, image, name, new_price, old_price }) => {
  const handleClick = () => window.scrollTo(0, 0);

  return (
    <div className='item'>
      <Link to={`/product/${id}`} onClick={handleClick}>
        <img src={backend_url + image} alt={name} />
      </Link>
      <p>{name}</p>
      <div className="item-prices">
        <div className="item-price-new">{currency}{new_price}</div>
        <div className="item-price-old">{currency}{old_price}</div>
      </div>
    </div>
  );
};

export default Item;
