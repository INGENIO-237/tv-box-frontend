const axios = require("axios");
const { newPath } = require("../../utils/article-image");
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

module.exports = { getAllProducts, createProduct };
