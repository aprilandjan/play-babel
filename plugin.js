//  plugin is actually babel ast visitor definitions
module.exports = (babel) => {
  //  'babel' is `babel-core` exports
  //  't' is 'babel-types' exports
  const { type: t } = babel;
  return {
    visitor: {
      Identifier(path) {
        if (path.isIdentifier({
          name: 'n'
        })) {
          console.log('transform identifier n...');
          path.node.name = 'w';
        }
      }
    }
  }
}