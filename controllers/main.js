const axios = require("axios");
const { imagePath } = require("../utils/image-path");

const renderIndex = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/articles")
    .then((response) => {
      const articles = response.data;

      // Arrange image path
      articles.forEach((article) => {
        article.image_art = imagePath(article);
      });

      res.render("index", {
        articles,
      });
    })
    .catch((error) => {
      res.render("pages/errors", {
        error: error.response.data.message,
      });
    });
};

module.exports = { renderIndex };
