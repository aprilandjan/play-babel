const transpile = require('../index');
const glob = require('glob');
const fs = require('fs');

describe('transpile', () => {
  const config = {
    src: '../src',
    dist: '../dist',
  }
  beforeEach(() => {
    // TODO: clear dist folder
  })
  it('should correctly transpile', () => {
    transpile(config);
    // TODO:
    // file exist
    // file content matching
  });
});