const cartSession = (req, res, next) => {
  var cart = req.session.cart || {};
  res.locals.cart = cart;
  next();
};

module.exports = cartSession;
