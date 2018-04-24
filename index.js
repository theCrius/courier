require('log-timestamp');
require('dotenv').load();

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const app = require('express')();

app.use(bodyParser.urlencoded({ "extended": true }));
app.use(bodyParser.json());

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, DELETE");
  next();
});

// Additional custom validators TODO: this should go in a separated files in /common
app.use(expressValidator({
  "customValidators": {
    "isArray"(value) {
      return Array.isArray(value);
    },
    "isFormat"(value) {
      return value === 'png' || value === 'jpeg';
    },
    "isNotEmpty"(value) {
      return Object.keys(value).length !== 0 && value.constructor === Object;
    },
    "isObject"(value) {
      if (value === null) {
        return false;
      }

      return typeof value === 'function' || typeof value === 'object';
    }
  }
}));

const serverConfig = require('./serverConfig');
let server;
if (serverConfig.https) {
  const http = require('https');
  const fs = require('fs');
  server = http.createServer({
    "pfx": fs.readFileSync(serverConfig.ssl.pfx),
    "passphrase": serverConfig.ssl.passphrase
  }, app);
} else {
  const http = require('http');
  server = http.createServer(app);
}

const websockets = require('./websockets/index');
const WS = new websockets(server);

app.use('/', (req, res, next) => {
  req.webSocket = WS;
  next();
}, require('./routes/eventManager'));

app.use(require('./middlewares/errorHandlers').logError);
app.use(require('./middlewares/errorHandlers').errorHandler);

server.listen(serverConfig.port, () => {
  console.log(`Hermes is listening on port ${serverConfig.port}...`);
});
