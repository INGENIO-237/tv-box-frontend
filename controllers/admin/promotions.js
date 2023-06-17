const axios = require("axios");
require("dotenv").config();

const getAllPromotions = (req, res) => {
  axios.get(process.env.BACKEND_ENDPOINT + "/promotions").then((response) => {
    const promotions = response.data;

    axios
      .get(process.env.BACKEND_ENDPOINT + "/users/roles/2")
      .then((response) => {
        marketers = response.data;
        res.render("pages/admin/promotions", {
          layout: "dashboard-layout.ejs",
          promotions: promotions,
          marketers: marketers,
        });
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  });
};

const createPromotion = (req, res) => {
  const { marketer, discount, commission } = req.body;

  axios
    .post(process.env.BACKEND_ENDPOINT + "/promotions/", {
      id_usr: marketer,
      reduction_prom: discount,
      commission_prom: commission,
    })
    .then((response) => {
      res.redirect("/promotions");
    })
    .catch((error) => {
      console.error(error.response);
    });
};

const getSinglePromotion = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/promotions/" + req.params.id)
    .then((response) => {
      const promotion = response.data;
      res.render("pages/admin/edit-promotion", {
        layout: "dashboard-layout.ejs",
        promotion: promotion,
      });
    });
};

const updatePromotion = (req, res) => {
  const { discount, commission } = req.body;

  axios
    .put(process.env.BACKEND_ENDPOINT + "/promotions/" + req.params.id, {
      reduction_prom: discount,
      commission_prom: commission,
    })
    .then((response) => {
      res.redirect("/promotions");
    })
    .catch((error) => {
      console.error(error.response);
    });
};

const deletePromotion = (req, res) => {
  axios
    .delete(process.env.BACKEND_ENDPOINT + "/promotions/" + req.params.id)
    .then((response) => {
      res.redirect("/promotions");
    })
    .catch((error) => {
      console.error(error.response);
    });
};

module.exports = {
  getAllPromotions,
  createPromotion,
  getSinglePromotion,
  updatePromotion,
  deletePromotion,
};
