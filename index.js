const fs = require('fs');
const path = require('path');
const glob = require('glob');
const transform = require('./transform');

//  configure source and dist directories
const defaultConfig = {
  src: './src',
  dist: './dist',
};

module.exports = (config) => {
  const { src, dist } = config;
  const sources = glob.sync(path.join(config.src, '**/*.js'));
  sources.map(file => {
    console.log('begin transpile ' + file);
    // const code = fs.readFileSync(filePath, 'utf8');
    const result = transform(file);
    const relativePathToSrc = path.relative(src, file);
    fs.writeFileSync(path.join(dist, relativePathToSrc), result.code);
    console.log('transpile complete!');
  });
}

module.exports(defaultConfig);

