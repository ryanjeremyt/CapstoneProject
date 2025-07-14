import React from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  const handleSubscribe = () => {
    alert("Thank you for subscribing!");
    // Placeholder subscription logic
  };

  return (
    <section className='newsletter'>
      <h1>Subscribe For Exclusive Offers</h1>
      <p>You may unsubscribe at any time.</p>
      <div>
        <input type="email" placeholder='Enter your email here...' aria-label="Email address" />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
    </section>
  );
};

export default NewsLetter;
