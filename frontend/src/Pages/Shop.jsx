import React, { useEffect, useState } from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import NewsLetter from '../Components/NewsLetter/NewsLetter';

const Shop = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetch('https://capstoneproject-backend-oova.onrender.com/popularinprotein')
      .then((res) => res.json())
      .then((data) => setPopular(data));
  }, []);

  return (
    <div>
      <Hero />
      <Popular data={popular} />
      <NewsLetter />
    </div>
  );
};

export default Shop;
