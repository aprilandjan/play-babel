const fs = require('fs');
const path = require('path');
const glob = require('glob');

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;
const types = require('@babel/types');

const config = {
  src: './src',
  dist: './dist',
}

const sources = glob.sync(path.join(config.src, '**/*.js'));

function transpile(filePath) {
  console.log('===> transpile ' + filePath);
  const code = fs.readFileSync(filePath, 'utf8');
  const ast = parser.parse(code);
  traverse(ast, {
    enter(path) {
      //  是标识符
      if (path.isIdentifier({
        name: 'n',
      })) {
        console.log('node identifier n', path);
        path.node.name = 'w';
      }
    }
  });

  //  inject some lines
  //  tagged template, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  const fn = template(`
    var IMPORT_NAME = require(SOURCE);
  `);
  const injectAst = fn({
    IMPORT_NAME: types.identifier('_'),
    SOURCE: types.stringLiteral('lodash'),
  });
  const t2 = generator(injectAst);

  const transpiled = generator(ast);
  const relativePathToSrc = path.relative(config.src, filePath);
  fs.writeFileSync(path.join(config.dist, relativePathToSrc), t2.code + '\n' + transpiled.code);
}

sources.forEach(transpile);

