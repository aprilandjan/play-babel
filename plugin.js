//  plugin is actually babel ast visitor definitions

//  an example plugin
//  with option: { replace: string }
module.exports = (babel) => {
  //  'babel' is `babel-core` exports
  //  't' is 'babel-types' exports
  const { type: t } = babel;
  return {
    visitor: {
      //  state.opts is the config options of the plugin
      Identifier(path, state) {
        // console.log('plugin option: ', state.opts);
        if (path.isIdentifier({
          name: 'n'
        })) {
          // console.log('transform identifier n...');
          path.node.name = state.opts.replace || 'a';
        }
      }
    }
  }
}