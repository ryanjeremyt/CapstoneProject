import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import supplements_banner from "./Components/Assets/banner_supplements.png";
import protein_banner from "./Components/Assets/banner_protein.png";
import LoginSignup from "./Pages/LoginSignup";
import OrderConfirmation from "./Pages/OrderConfirmation";

//Use environment variable to support production deployment
export const backend_url = 'https://capstoneproject-backend-oova.onrender.com';
export const currency = '$';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/supplements" element={<ShopCategory banner={supplements_banner} category="supplements" />} />
          <Route path="/protein" element={<ShopCategory banner={protein_banner} category="protein" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
