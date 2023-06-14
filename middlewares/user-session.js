// Sets user visible for all templates
const userSession = (req, res, next) => {
  res.locals.user = req.session.user;
  next();
};

// checkLoggedIn
const checkLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/account/login");
  }
  else{
    next();
  }
};

module.exports = {userSession, checkLoggedIn};
