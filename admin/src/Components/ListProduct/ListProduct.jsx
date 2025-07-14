import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../Assets/cross_icon.png';
import { backend_url, currency } from "../../config"; // ✅ corrected path

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backend_url}/allproducts`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setAllProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (_id) => {
    try {
      const res = await fetch(`${backend_url}/removeproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id }), // 🔧 use Mongo _id
      });

      const data = await res.json();
      if (data.success) {
        fetchInfo(); // Refresh list
      } else {
        alert("Failed to remove product");
      }
    } catch (err) {
      console.error("Remove error:", err);
      alert("Error removing product");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p> <p>Title</p> <p>Old Price</p> <p>New Price</p> <p>Category</p> <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.length > 0 ? (
          allproducts.map((e, index) => (
            <div key={index}>
              <div className="listproduct-format-main listproduct-format">
                <img className="listproduct-product-icon" src={`${backend_url}${e.image}`} alt={e.name} />
                <p className="cartitems-product-title">{e.name}</p>
                <p>{currency}{e.old_price}</p>
                <p>{currency}{e.new_price}</p>
                <p>{e.category}</p>
                <img
                  className="listproduct-remove-icon"
                  onClick={() => removeProduct(e._id)}
                  src={cross_icon}
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
