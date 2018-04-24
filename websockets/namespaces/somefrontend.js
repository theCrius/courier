const SomeFrontendController = require('../../controllers/eventManager/somefrontend');

class SomeFrontend {
  constructor(io) {
    const self = io.of('/somefrontend');
    self.on('connection', (socket) => {
      console.log(`[ INFO ] - SOMEFRONTEND - client connected`);

      // This broadcast everything sent to the namespace to all clients connected
      socket.on('new-message', (data) => {
        self.emit('update:new-message', data);
      });

      socket.on('disconnect', (reason) => {
        console.log(`[ INFO ] - SOMEFRONTEND - client disconnected (${reason}).`);
      });
    });

    console.log("[ INFO ] - SomeFrontend namespace ready!");
  }
}
module.exports = SomeFrontend;
