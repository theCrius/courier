const emit = require('../../common/emit');

const eventsFrontend = {
  anEvent,
  anotherEvent
};

module.exports = eventsFrontend;


/**
 * broadcast - broadcast a message to the whole namespace
 * @param  {request} req
 */
function anEvent(req) {
  emit(req, `update:an-event`);
}

function anotherEvent(req) {
  emit(req, `update:another-event`);
}
