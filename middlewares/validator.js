const allowedServicesNames = Object.keys(require('../common/allowedServices'));

const mod = {
  checkReq
};

module.exports = mod;

// Exported Functions
/**
 * Check if this is a properly formatted request.
 * @param {req} req , The client request.
 * @param {res} res , The response to return.
 * @param {next} next , Execute the next function.
 */
function checkReq(req, res, next){
  let err;
  const body = req.body;
  let validationErrors = [];

  if (Boolean(body) && body.constructor === Array){
    body.forEach((el) => {
      validationErrors.push(runValidations(el));
    });
  } else {
    validationErrors = runValidations(body);
  }

  if (validationErrors.length || validationErrors.findIndex((item) => item.length) !== -1) {
    err = {
      "at": 'hook',
      "statusCode": 400,
      "list": Boolean(body) && body.constructor === Array,
      validationErrors
    };
  }
  next(err);
}

function _isAllowed(serviceName) {
  const index = allowedServicesNames.findIndex((allowed) => allowed === serviceName);

  return index >= 0;
}

function runValidations(payload) {
  const errors = [];
  if (!payload.from || !_isAllowed(payload.from)) {
    errors.push({
      "errorCode": 101, // Service not recognized
      "message": `Origin service not recognized!`,
      "param": 'from',
      "value": payload.from
    });
  }
  if (payload.type === undefined) {
    errors.push({
      "errorCode": 103, // Event type not included
      "message": `Event type is missing!`,
      "param": 'type',
      "value": payload.type
    });
  }
  if (payload.data === undefined || payload.constructor !== Object || Object.keys(payload.data).length === 0) {
    errors.push({
      "errorCode": 104, // Event data not recognized
      "message": `Payload cannot be empty and must be a valid JSON Object.`,
      "param": 'data',
      "value": payload.data
    });
  }

  return errors;
}
