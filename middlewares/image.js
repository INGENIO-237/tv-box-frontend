require("dotenv").config();

const imageEndpoint = (req, res, next) => {
  res.locals.imageEndpoint = process.env.IMAGES_ENDPOINT;
  next();
};

module.exports = { imageEndpoint };
