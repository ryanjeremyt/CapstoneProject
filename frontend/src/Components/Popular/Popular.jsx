import React from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = ({ data }) => {
  return (
    <section className='popular'>
      <h1>Popular in Protein</h1>
      <hr />
      <div className="popular-item">
        {data.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </section>
  );
};

export default Popular;
