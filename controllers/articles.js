const axios = require("axios");
require("dotenv").config();

const getAllArticles = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/articles")
    .then((response) => {
      const articles = response.data;
      console.log(articles);
    })
    .catch((error) => {
      console.error(error.response);
    });
};

module.exports = { getAllArticles };
