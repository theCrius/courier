const allowedServicesControllers = require('../../common/allowedServices');

const EventManager = {
  hook
};
module.exports = EventManager;

function hook(req, res, next) {
  let err;

  // set success response
  req.websocketResponse = {
    "data": {
      "message": 'Unprocessed Data',
      "recipient": undefined
    },
    "statusCode": 201
  };

  // try to invoke the right event service
  try {
    let from = '';
    let type = '';
    let events = [];
    if (Boolean(req.body) && req.body.constructor === Array) {
      req.body.forEach((el) => {
        from = el.from;
        type = el.type;
        events = allowedServicesControllers[from];

        const elReq = req;
        elReq.body = el;
        events[type].call(this, elReq);
      });
      req.websocketResponse.data = {
        "message": `List of ${req.body.length} messages processed`,
        "origin": from.split('-')[0],
        "event": type,
        "recipient": from.split('-')[1]
      };
    } else {
      from = req.body.from;
      type = req.body.type;
      events = allowedServicesControllers[from];
      events[type].call(this, req);
      req.websocketResponse.data = {
        "message": `Event ${type} processed`,
        "origin": from.split('-')[0],
        "event": type,
        "recipient": from.split('-')[1]
      };
    }
  } catch (error) {
    // console.log(`[ ERROR ] `, ev.message);
    err = {
      "at": 'hook',
      "statusCode": 500,
      "message": error.message
    };
  } finally {
    next(err);
  }

}
