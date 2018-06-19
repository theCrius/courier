/**
 * Broadcast a message to a room
 * @param {req} req , The client request.
 * @param {string} label , The event name to identify the message
 */
function emit(req, label) {
  const io = req.courierSocket.io ? req.courierSocket.io : req.courierSocket;
  const data = req.body.data;
  const namespace = io.of('/' + req.body.from.split('-').pop());
  namespace.emit(label, JSON.stringify(data));

  if (process.env.LOG_MESSAGES) {
    // console.log(JSON.stringify(req.headers));
    console.log(`[ DEBUG ] Trigger invoked from ${req.header ? req.header('host') : 'self'} on ${namespace.name}: (${label})\n`, data);
  }
  return true;
}

module.exports = emit;
