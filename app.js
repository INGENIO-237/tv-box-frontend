const express = require("express");
const layouts = require("express-ejs-layouts");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.urlencoded({ extended: false }));

// EJS
app.use(layouts);
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", require("./routes/main"));
app.use("/account", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
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
