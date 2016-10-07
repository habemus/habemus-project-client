// third-party
const Bluebird = require('bluebird');

module.exports = function (Constructor, mockOptions) {

  var mockData = mockOptions.data;

  Constructor.prototype.get = function (authToken, identifier, options) {

    options = options || {};

    var byCode = options.byCode || false;

    if (!byCode) {
      return new Bluebird((resolve, reject) => {
        var proj = mockData.projects.find((proj) => {
          return (proj._id === identifier);
        });

        if (proj) {
          resolve(proj);
        } else {
          reject(new Error('NotFound'));
        }

      });
    } else {
      return new Bluebird((resolve, reject) => {
        var proj = mockData.projects.find((proj) => {
          return (proj.code === identifier);
        });

        if (proj) {
          resolve(proj);
        } else {
          reject(new Error('NotFound'));
        }

      });
    }
  };

  Constructor.prototype.getVersion = function (authToken, projectIdentifier, versionCode, options) {

    return this.get(authToken, projectIdentifier, options)
      .then((project) => {
        // specific version
        return mockData.projectVersions.find((version) => {
          return (version.projectId === project._id && version.code === versionCode);
        });
      })
      .then((version) => {
        if (version) {
          return version;
        } else {
          return Bluebird.reject(new Error('NotFound'));
        }
      });

  };

  Constructor.prototype.getLatestVersion = function (authToken, projectIdentifier, options) {
    
    return this.get(authToken, projectIdentifier, options)
      .then((project) => {
        // latest version
        var projectVersions = mockData.projectVersions.filter((version) => {
          return version.projectId === project._id;
        });

        version = projectVersions[projectVersions.length - 1];

        return version;
      })
      .then((version) => {
        if (version) {
          return version;
        } else {
          return Bluebird.reject(new Error('NotFound'));
        }
      });

  };
};
