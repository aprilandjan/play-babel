const babel = require('@babel/core');
const plugin = require('../sample.plugin');

//  no return;
const example1 = `
function abc() {
  for (var i = 0; i < 100; i++) {
    console.log(i);
  }
}
`;

//  has a return at the end
const example2 = `
function def() {
  for (var i = 0; i < 100; i++) {
    console.log(i);
  }
  return 'done';
}
`;

//  has multiple possible return
const example3 = `
function joker() {
  for (var i = 0; i < 100; i++) {
    console.log(i);
    if (Math.random() < 0.5) {
      return 'abort';
    }
  }
  return 'done';
}
`

//  not direct return for it
const example4 = `
function terrible() {
  const log = () => {
    return 'log!';
  }
  for (var i = 0; i < 100; i++) {
    console.log(i);
    if (Math.random() < 0.5) {
      return 'abort';
    }
  }
  return 'done';
}
`

const transform = (source) => babel.transform(source, {
  plugins: [plugin]
}).code;


describe('sample.plugin.js', () => {
  it('should transform example1 correctly', () => {
    const result = transform(example1);
    expect(result).toMatchSnapshot();
  });
  it('should transform example2 correctly', () => {
    const result = transform(example2);
    expect(result).toMatchSnapshot();
  });
  it('should transform example3 correctly', () => {
    const result = transform(example3);
    expect(result).toMatchSnapshot();
  });
  it.only('should transform example4 correctly', () => {
    const result = transform(example4);
    expect(result).toMatchSnapshot();
  });
});
