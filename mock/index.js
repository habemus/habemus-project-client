module.exports = function (mockOptions) {

  /**
   * Data objects to be used for performing mock operations
   * - projects
   * - projectVersions
   * @type {Object}
   */
  var mockData = mockOptions.data || DEFAULT_MOCK_DATA;

  if (!mockData.projects) {
    throw new Error('projects are required');
  }

  if (!mockData.projectVersions) {
    throw new Error('projectVersions are required');
  }

  function PrivateHProjectMock(options) {}

  // load methods
  require('./methods/public')(PrivateHProjectMock, mockOptions);
  require('./methods/shared')(PrivateHProjectMock, mockOptions);

  return PrivateHProjectMock;
}
