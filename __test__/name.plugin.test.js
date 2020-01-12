const babel = require('@babel/core');
const plugin = require('../name.plugin');

var example = `
function square(n) {
  return n * n;
};
`;

describe('name.plugin.js', () => {
  it('should transform correctly with no params', () => {
    const { code } = babel.transform(example, {
      plugins: [
        plugin
      ],
    });
    expect(code).toMatchSnapshot();
  });

  it('should transform correctly with customized params', () => {
    const { code } = babel.transform(example, {
      plugins: [
        [plugin, {
          replace: 'z',
        }]
      ],
    });
    expect(code).toMatchSnapshot();
  });
});
