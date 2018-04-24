const request = require('request');

/**
 * Perform an http request to another endpoint
 * @param {string} endpoint , The destination endpoint
 * @param {string} method , the method to use to contact the endpoint, default to GET
 * @param {object} data , the body of the request, optional
 * @param {object} headers , The headers to forward to the destination endpoint, optional
 */
function send(endpoint, method = 'GET', data = null, headers = {}) {
  const err = {
    "statusCode": 500
  };

  if (!endpoint) {
    err.message = '[ ERROR ] common/send - missing url endpoint!';
    throw err;
  }

  request({
    "body": data,
    headers,
    "json": true,
    method,
    "url": endpoint
  }, (error, response, body) => {
    console.log(response.statusCode);
    console.error(body);
  });
}

module.exports = send;
