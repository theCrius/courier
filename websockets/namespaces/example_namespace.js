class ExampleNamespace {
  constructor(io) {
    const self = io.of('/example_namespace');
    self.on('connection', (socket) => {
      console.log(`[ INFO ] - Example Namespace - New Connection`);

      socket.on('disconnect', (reason) => {
        console.log(`[ INFO ] - Example Namespace - client disconnected (${reason})`);
      });
    });

    console.log("[ INFO ] - 'Example Namespace' namespace ready!");
  }
}
module.exports = ExampleNamespace;
