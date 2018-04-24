/**
 * Broadcast a message to a room
 * @param {req} req , The client request.
 * @param {string} label , The event name to identify the message
 */
function broadcast(req, label) {
  const io = req.webSocket.io ? req.webSocket.io : req.webSocket;
  const data = req.body.data;
  const namespace = io.of('/' + req.body.from.split('-').pop());
  namespace.emit(label, JSON.stringify(data));

  if (process.env.LOG_MESSAGES) {
    // console.log(JSON.stringify(req.headers));
    console.log(`Trigger invoked from ${req.header('host')} on ${namespace.name}: (${label})\n`, data);
  }
  return true;
}

module.exports = broadcast;
