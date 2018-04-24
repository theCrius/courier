module.exports = {
  checkAuth
};

// Exported Functions
/**
 * Check if this user have the authorization to make this request.
 * @param {req} req , The client request.
 * @param {res} res , The response to return in case something goes wrong.
 * @param {next} next , Execute the next function.
 */
function checkAuth(req, res, next){
  let err;

  if (req.headers.authorization !== process.env.HERMES_SECRET) {
    err = {
      "at": 'hook',
      "statusCode": 403,
      "message": `Not Authorized to access ${req.method} ${req.originalUrl}`
    };
  }
  next(err);

}
