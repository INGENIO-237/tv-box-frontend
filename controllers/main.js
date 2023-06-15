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
        articles: articles,
      });
    })
    .catch((error) => {
      console.error(error.response);
    });
};

module.exports = { renderIndex }