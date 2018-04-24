module.exports = {
  logError,
  errorHandler
};

/**
* Exported functions
*/
function logError(err, req, res, next) {
  // console.log(err);
  let consoleError = `[ ERROR ] `;

  switch (err.statusCode) {
  case 400:
    consoleError += `Code: ${err.statusCode}\nValidation Errors:\n`;
    if (err.list) {
      err.validationErrors.forEach((errors, index) => {
        if (errors.length) {
          consoleError += ` -> Event n. ${index + 1} has the following errors:\n`;
          errors.forEach((item) => {
            consoleError += `     -> ${item.message ? item.message : item.shortmsg}\n`;
          });
        }
      });
    } else {
      err.validationErrors.forEach((item) => {
        consoleError += ` -> ${item.message ? item.message : item.shortmsg}\n`;
      });
    }
    break;
  case 500:
    consoleError += `Code: ${err.statusCode}\nProcessing Error:\n`;
    break;
  default:
    consoleError += `Message: ${err.message}\n${err.stack.split('\n')[1]}\n`;
  }

  console.error(consoleError);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(err.statusCode || 500).json(err);
  next();
}
