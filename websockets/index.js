const socket = require('socket.io');

const namespaces = {
  ExampleNamespace: require('./namespaces/example_namespace')
};

class Courier {
  constructor(server) {
    this.io = socket(server);

    this.namespaces = {
      exampleNamespace: new namespaces.ExampleNamespace(this.io)
    };
  }
}


module.exports = Courier;
