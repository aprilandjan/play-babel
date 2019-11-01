const transpile = require('../index');
const fs = require('fs-extra');
const dirCompare= require('dir-compare');
const path = require('path');

describe('transpile directory', () => {
  const config = {
    src: path.join(__dirname, './fixtures/src'),
    dist: path.join(__dirname, './dist'),
  };
  const referred = path.join(__dirname, './fixtures/dist');
  beforeEach(() => {
    fs.ensureDirSync(config.dist);
    fs.emptyDirSync(config.dist);
  })
  it('should correctly transpile', () => {
    transpile(config);
    const result = dirCompare.compareSync(config.dist, referred);
    expect(result.same).toBeTruthy();
  });
});