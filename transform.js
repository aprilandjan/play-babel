const core = require('@babel/core');
const plugin = require('./name.plugin');

//  transform, using
module.exports = function (file) {
  return core.transformFileSync(file, {
    plugins: [
      [plugin, {
        replace: 'z',
      }],
    ],
  })
}