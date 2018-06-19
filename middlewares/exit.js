module.exports = {
  exit
};

/**
 * Exported functions
 */
function exit(req, res, next){
  const response = req.courierSocket;
  res.status(response.statusCode).json(response.data);
  next();
}
