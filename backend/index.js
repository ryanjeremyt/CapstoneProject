const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors()); 

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI not found in .env");
  process.exit(1);
}

mongoose
  .connect(`${process.env.MONGO_URI}ECommerceApp`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/images', express.static('upload/images'));

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({ success: 1, image_url: `/images/${req.file.filename}` });
});

const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send({ errors: "Please authenticate using a valid token" });

  try {
    const data = jwt.verify(token, "secret_ecom"); // 🔐 Consider using process.env.JWT_SECRET
    req.user = data.user;
    next();
  } catch {
    return res.status(401).send({ errors: "Invalid token" });
  }
};

app.get("/", (req, res) => res.send("Root"));

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, errors: "Email already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const cart = Array(300).fill(0);

    const user = new User({ name: username, email, password: hashedPassword, cartData: cart });
    await user.save();

    const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ success: false, errors: "Incorrect email or password" });
    }

    const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.get("/allproducts", async (_, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.get("/newcollections", async (_, res) => {
  const products = await Product.find({});
  res.send(products.slice(-8));
});

app.get("/popularinprotein", async (_, res) => {
  const products = await Product.find({ category: "protein" });
  res.send(products.slice(0, 4));
});

app.get("/popularinsupplements", async (_, res) => {
  const products = await Product.find({ category: "supplements" });
  res.send(products.slice(0, 4));
});

app.post("/relatedproducts", async (req, res) => {
  const products = await Product.find({ category: req.body.category });
  res.send(products.slice(0, 4));
});

app.post('/addtocart', fetchuser, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cartData[req.body.itemId] += 1;
  await user.save();
  res.send("Added");
});

app.post('/removefromcart', fetchuser, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.cartData[req.body.itemId] > 0) {
    user.cartData[req.body.itemId] -= 1;
  }
  await user.save();
  res.send("Removed");
});

app.post('/getcart', fetchuser, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.cartData);
});

app.post("/clearcart", async (req, res) => {
  const token = req.headers["auth-token"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "secret_ecom");
    const userId = decoded.user.id;
    const emptyCart = Array(300).fill(0);
    await User.findByIdAndUpdate(userId, { cartData: emptyCart });
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addproduct", async (req, res) => {
  const products = await Product.find({});
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  const product = new Product({ id, ...req.body });
  await product.save();
  res.json({ success: true, name: req.body.name });
});

app.post("/removeproduct", async (req, res) => {
  try {
    const result = req.body._id
      ? await Product.findByIdAndDelete(req.body._id)
      : await Product.findOneAndDelete({ id: req.body.id });

    if (!result) return res.status(404).json({ success: false, message: "Product not found" });

    console.log("Deleted product:", result.name);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/api/place-order", async (req, res) => {
  try {
    const orderNumber = await Order.getNextOrderNumber();
    const newOrder = new Order({ orderNumber, ...req.body });
    await newOrder.save();
    res.json({ success: true, orderNumber });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, error: "Failed to place order" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
