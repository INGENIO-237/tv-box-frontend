const customerSession = (req, res, next) => {
  res.locals.customer = req.session.customer;
  next();
};

module.exports = customerSession;
