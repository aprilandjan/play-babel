const fs = require('fs');
const path = require('path');
const glob = require('glob');
const assert = require('assert');
const transform = require('./transform');

//  configure source and dist directories
// const defaultConfig = {
//   src: './src',
//   dist: './dist',
// };

//  sync transform src into dist
module.exports = (config = {}) => {
  assert(config, 'config not provided!');
  assert(config.src, 'config.src directory not provided!');
  assert(config.dist, 'config.dist directory not provided!');

  const { src, dist } = config;
  const sources = glob.sync(path.join(config.src, '**/*.js'));
  sources.map(file => {
    const result = transform(file);
    const relativePathToSrc = path.relative(src, file);
    fs.writeFileSync(path.join(dist, relativePathToSrc), result.code);
  });
}
