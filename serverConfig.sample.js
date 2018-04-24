module.exports = {
  "name": 'COURIER',
  "host": "courier.local",
  "port": 4001,
  "https": false, //If you turn this on, you can add the certs in the 'ssl' attributes
  "ssl": {
    "pfx": 'certs/cert.file.pfx',
    "passphrase": 'certs-password'
  },
  "showLogs": true //Turn this off to not display every message sent to the service
};
