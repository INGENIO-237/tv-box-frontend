const axios = require("axios");


const dashboardMarketer = (req, res) =>{
    res.render("pages/marketer/dashboard-com", {
        layout: "dashboard-layout.ejs",
      });
}

module.exports = dashboardMarketer;