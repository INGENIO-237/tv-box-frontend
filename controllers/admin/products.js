const axios = require("axios");
require("dotenv").config();

const getAllProducts = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/articles")
    .then((response) => {
      const products = response.data;

      // Arrange image path
      products.forEach((product) => {
        const splittedImagePath = product.image_art.split("\\");
        const slicedImagePath = splittedImagePath.slice(1);
        const joinedImagePath = slicedImagePath.join("/");
        product.image_art = joinedImagePath;
      });

      axios
        .get(process.env.BACKEND_ENDPOINT + "/categories")
        .then((response) => {
          const categories = response.data;

          res.render("pages/admin/products", {
            layout: "dashboard-layout.ejs",
            products: products,
            categories: categories,
          });
        })
        .catch((error) => {
          console.error(error.response);
        });
    })
    .catch((error) => {
      console.error(error.response);
    });
};

const createProduct = (req, res) => {
  // const { title, category, description, price, image } = req.body;
  
  console.log(req.body);

  // axios.post()
};

module.exports = { getAllProducts, createProduct };
