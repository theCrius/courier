# HERMES

This is an Express (4.x) with socket.io (2.x) running on a Node.js (8.9.4). It is written trying to adhere to ES6 style guides.

The scope of the project is to provide a central event manager that can broadcast information to the connected devices using the namespace approach so that we can differentiate which data to broadcast.

# Current version

- Broadcast data for the HOY frontend

# Future iterations

- Implement authorization before broadcasting
- Implement additional namespaces as the needs arise

# Make it run

- Run `npm install` to install the dependencies
- Duplicate `.env_sample` and rename it to `.env`. Edit the content to match the desired parameters.
- Duplicate `serverConfig.sample.js` and rename it to `serverConfig.js`. Edit the content to match the desired parameters. You should probably set a specific port.
- If you selected the HTTPS protocol, be sure to add a certificate into the `/cert/` and edit the serverConfig.js accordingly.
- Run your preferred node wrapper (like pm2 or nodemon) or just plain `node index.js` to start the engines. In production use PM2 properly configured to restart on reboot.
