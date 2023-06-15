const express = require("express");
const layouts = require("express-ejs-layouts");
const cookies = require("cookie-parser");
const session = require("express-session");
const { userSession } = require("./middlewares/user-session");
const { imageEndpoint } = require("./middlewares/image");
const cartSession = require("./middlewares/cart-session");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.urlencoded({ extended: false }));

// Cookies parser
app.use(cookies());

// Initialize session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

// User Session
app.use(userSession);

// Cart Session
app.use(cartSession);

// Image Endpoint
app.use(imageEndpoint);

// EJS
app.use(layouts);
app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));

app.use("/", require("./routes/main"));
app.use("/cart", require("./routes/cart"));
app.use("/account", require("./routes/auth"));
app.use("/articles", require("./routes/article"));

// Just for rendering the view and handle commercial request
app.use("/commercials", require("./routes/commercial"));

// Available just for the administrator for CRUD operations
app.use("/marketers", require("./routes/admin/marketers"));
app.use("/promotions", require("./routes/admin/promotions"));
app.use("/products", require("./routes/admin/products"));

app.use("/orders", require("./routes/admin/orders"));
app.use("/payments", require("./routes/admin/payments"));

// For the administrator to add another admins
app.use("/users", require("./routes/admin/users"));

app.use("/support", require("./routes/support"));

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
