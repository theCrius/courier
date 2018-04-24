const broadcast = require('../../common/broadcast');

const eventsSomeFrontend = {
  anEvent,
  anotherEvent
};

module.exports = eventsSomeFrontend;


function anEvent(req) {
  broadcast(req, 'update:an-event');
}

function anotherEvent(req) {
  broadcast(req, `update:another-event`);
}
