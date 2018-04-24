# COURIER

This is an Express (4.x) with socket.io (2.x) running on a Node.js (8.9.4). It is written trying to adhere to ES6 style guides.

The scope of the project is to provide a central event manager that can broadcast information to the connected devices using the namespace approach so that we can differentiate which data to broadcast.

### Make it run

- Run `npm install` to install the dependencies
- Duplicate `.env_sample` and rename it to `.env`. Edit the content to match the desired parameters.
- Duplicate `serverConfig.sample.js` and rename it to `serverConfig.js`. Edit the content to match the desired parameters. You should probably set a specific port.
- If you selected the HTTPS protocol, be sure to add a certificate into the `/certs/` and edit the serverConfig.js accordingly.
- Run your preferred node wrapper (like pm2 or nodemon) or just plain `node index.js` to start the engines. In production use some process manager that manage the restart on reboot.

### Current version

- Working namespace chat protocol
- Working triggers using endpoint
- Support for multiple events sent to triggers

### Future iterations

- Implement authorization before broadcasting
- Implement and test working send/sendEmails events

### Production (not) Ready

 This is still a work in progress and you should not use this in production. It lacks a robust set of tests. You can use it at your own risk of course or to learn how to better use web-sockets using socket.io.

### Credits

The project was initially designed by [Emilio Merella](https://github.com/emiliomerella) while we were working together.
Afterwards I picket it up again and worked on it to adjust it to some real-life use-case I faced, adding SSL support, polishing error handling and adding support for multiple events sent to the triggers (still to be properly tested).
