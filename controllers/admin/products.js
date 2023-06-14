const axios = require("axios");
const { newPath } = require("../../utils/article-image");
const { imagePath } = require("../../utils/image-path");
require("dotenv").config();

const getAllProducts = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/articles")
    .then((response) => {
      const products = response.data;

      // Arrange image path
      products.forEach((product) => {
        product.image_art = imagePath(product);
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

const createProduct = async (req, res) => {
  const { title, category, description, price } = req.body;
  const imgPath = await newPath(req.file);

  axios
    .post(process.env.BACKEND_ENDPOINT + "/articles", {
      id_cat: category,
      nom_art: title,
      desc_art: description,
      prix_art: price,
      image_art: imgPath,
    })
    .then((response) => {
      res.redirect("/products");
    })
    .catch((error) => {
      console.error(error);
    });
};

const getSingleProduct = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/articles/" + req.params.id)
    .then((response) => {
      const product = response.data;
      product.image_art = imagePath(product);

      axios
        .get(process.env.BACKEND_ENDPOINT + "/categories")
        .then((response) => {
          const categories = response.data;

          res.render("pages/admin/edit-product", {
            layout: "dashboard-layout.ejs",
            product: product,
            categories: categories,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
};

// const updateProduct = (req, res) => {
//   const { title, category, description, price } = req.body;
// };

module.exports = { getAllProducts, createProduct, getSingleProduct };
