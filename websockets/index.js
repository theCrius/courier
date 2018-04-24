const socket = require('socket.io');

const namespaces = {
  "SomeFrontend": require('./namespaces/somefrontend')
};

class Hermes {
  constructor(server) {
    this.io = socket(server);

    this.namespaces = {
      "somefrontend": new namespaces.SomeFrontend(this.io)
    };
  }
}


module.exports = Hermes;
