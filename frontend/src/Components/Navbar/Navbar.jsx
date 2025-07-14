import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import nav_dropdown from '../Assets/nav_dropdown.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [hovered, setHovered] = useState(null);
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdownToggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.replace("/");
  };

  const navItems = [
    { name: "home", label: "Home", path: "/" },
    { name: "supplements", label: "Supplements", path: "/supplements" },
    { name: "protein", label: "Protein", path: "/protein" },
  ];

  return (
    <nav className='nav'>
      <Link to='/' onClick={() => setMenu("home")} className="nav-logo" style={{ textDecoration: 'none' }}>
        <img src={logo} alt="Nutrimax Logo" />
        <p>NUTRIMAX</p>
      </Link>

      <img onClick={dropdownToggle} className='nav-dropdown' src={nav_dropdown} alt="Menu toggle" />

      <ul ref={menuRef} className="nav-menu">
        {navItems.map((item) => (
          <li
            key={item.name}
            onClick={() => setMenu(item.name)}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
            className={(hovered === item.name || (!hovered && menu === item.name)) ? "active" : ""}
          >
            <Link to={item.path} style={{ textDecoration: 'none' }}>{item.label}</Link>
            <hr />
          </li>
        ))}
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </nav>
  );
};

export default Navbar;
