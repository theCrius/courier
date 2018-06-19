const allowedServicesControllers = require('../common/allowedServices');

const EventManager = {
  hook
};
module.exports = EventManager;

function hook(req, res, next) {
  let err;

  // set success response
  req.courierResponse = {
    "data": {
      "message": 'Unprocessed Data',
      "recipient": undefined
    },
    "statusCode": 201
  };

  // try to invoke the right event service
  try {
    const isArray = Boolean(req.body) && req.body.constructor === Array;
    if (isArray) {
      for (let i = 0; i < req.body.length; i++) {
        const elReq = Object.assign({}, req);
        elReq.body = req.body[i];
        const type = req.body[i].type;

        const allowedEvents = allowedServicesControllers[req.body[i].from];
        allowedEvents[type].call(this, elReq);
      }
      req.courierResponse.data = {
        "message": `List of ${req.body.length} messages processed successfully`,
        "origin": req.body[0].from.split('-')[0],
        "events": req.body.map((e) => e.type).join(', '),
        "recipient": req.body[0].from.split('-')[1]
      };
    } else {
      const from = req.body.from;
      const type = req.body.type;
      const allowedEvents = allowedServicesControllers[from];
      allowedEvents[type].call(this, req);
      req.courierResponse.data = {
        "message": `Event ${type} processed successfully`,
        "origin": from.split('-')[0],
        "event": type,
        "recipient": from.split('-')[1]
      };
    }
  } catch (error) {
    if (process.env.LOG_MESSAGES) {
      console.error(`[ DEBUG ]`, error);
    }
    err = {
      "at": 'hook',
      "statusCode": 500,
      "message": error.message
    };
  } finally {
    next(err);
  }

}
