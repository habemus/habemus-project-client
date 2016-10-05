// constants
const TRAILING_SLASH_RE = /\/$/;

const aux = require('./aux');

function PrivateHProjectClient(options) {
  if (!options.serverURI) { throw new TypeError('serverURI is required'); }

  this.serverURI = options.serverURI.replace(TRAILING_SLASH_RE, '');
}

Object.assign(PrivateHProjectClient.prototype, require('./aux'));
Object.assign(PrivateHProjectClient.prototype, require('./methods/shared'));
Object.assign(PrivateHProjectClient.prototype, require('./methods/private'));

module.exports = PrivateHProjectClient;
