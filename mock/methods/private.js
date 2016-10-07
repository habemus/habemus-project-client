// third-party
const Bluebird = require('bluebird');

module.exports = function (Constructor, mockOptions) {
  Constructor.prototype.verifyProjectPermissions = function (authToken, sub, projectId, permissions) {

    if (sub === 'unauthorized-user-id' || projectId === 'unauthorized-project-id') {
      return Bluebird.resolve({
        allowed: false
      });

    } else {
      return Bluebird.resolve({
        allowed: true,
      });
    }

  };
};
