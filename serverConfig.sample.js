module.exports = {
  "name": process.env.COMPUTERNAME || 'Courier',
  "host": "courier.website.com",
  "https": false,
  "port": 4001,
  "ssl": {
    "pfx": 'cert\\wildcard.website.com.pfx',
    "passphrase": 'password'
  },
  "showLogs": false
};
