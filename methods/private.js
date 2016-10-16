// third-party
const superagent = require('superagent');
const Bluebird   = require('bluebird');

exports.verifyProjectPermissions = function (authToken, subject, projectId, permissions) {

  return this._authReq(
    'GET',
    '/project/' + projectId + '/verify-permissions',
    {
      authToken: authToken,
      query: {
        subject: subject,
        permissions: permissions,
      }
    }
  )
};

/**
 * Creates a version of a project given a zipFile
 *
 * ATTENTION:
 * This method is the same one as the one of the public api and should
 * strive to keep the same signature!
 *
 * The only reason for the separation between the methods is due to differences
 * in implementation.
 *
 * @param  {String} authToken
 * @param  {String} identifier
 * @param  {String|ReadStream} zipFile
 * @param  {Object} options
 * @return {Bluebird}
 */
exports.createVersion = function (authToken, projectIdentifier, zipFile, options) {
  if (!authToken) { return Bluebird.reject(new errors.Unauthorized()); }
  if (!projectIdentifier) { return Bluebird.reject(new errors.InvalidOption('projectIdentifier', 'required')); }
  if (!zipFile) { return Bluebird.reject(new errors.InvalidOption('zipFile', 'required')); }

  options = options || {};

  // the destination URL
  var destinationURL = this.serverURI + '/project/' + projectIdentifier + '/versions';

  if (options.byCode) {
    destinationURL += '?byCode=true';
  }

  return new Bluebird(function (resolve, reject) {

    superagent.post(destinationURL)
      .set('Authorization', 'Bearer ' + authToken)
      .attach('file', zipFile)
      .end(function (err, res) {
        if (err) {
          if (res && res.body && res.body.error) {
            reject(res.body.error);
          } else {
            reject(err);
          }
        } else {
          if (res && res.body && res.body.data) {
            resolve(res.body.data);
          } else {
            resolve();
          }
        }
      });

  });
};
