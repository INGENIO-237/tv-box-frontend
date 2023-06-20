const axios = require("axios");
const { imagePath } = require("../utils/image-path");
require("dotenv").config();

const getAllArticles = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/articles")
    .then((response) => {
      const articles = response.data;

      // Arrange image path
      articles.forEach((article) => {
        article.image_art = imagePath(article);
      });

      res.render("pages/articles/articles", {
        articles: articles,
      });
    })
    .catch((error) => {
      res.render("pages/errors", { error: error.response.data.message });
    });
};

module.exports = { getAllArticles };
