# babel-plugin-example

An example `babel` plugin & AST transforming script, unittest included.

## `name.plugin.js`

replace identifier `n` into specific names

## `sample.plugin.js`

add `console.time` and `console.timeEnd` to every function calls to output its execution time.

## useful concepts & methods

### `enter` and `exit`

### `path.get()`

This returns the `path` of specific properties, see [doc](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#get-the-path-of-sub-node). For example:

```js
const a = path.node.body;
const b = path.get('body');
console.log(a === b.node);  //  true
```

Besides, there's no way to get `path` of a given `node`. So if we want the `path`, use this `path.get()` properly.

### `unshiftContainer` & `pushContainer`

```js
path.get('body').unshiftContainer('body', t.expressionStatement(t.stringLiteral('before')));
path.get('body').pushContainer('body', t.expressionStatement(t.stringLiteral('after')));
```

### insert source code

There's no direct method to insert source code string into AST. Need to use `@babel/types` to create representing nodes firstly:

```js
import types from '@babel/types';
const exp = t.callExpression(
  t.memberExpression(t.identifier('console'), t.identifier('time')),
  [t.stringLiteral('abc')]
);
```

We can also use `@babel/template` to help creating AST nodes of desired source code:

```js
import template from '@babel/template':
import types from '@babel/types';

//  the UPPERCASE string 'NAME' stands for a variable
const codeMaker = template('console.time(NAME)');
const ast = codeMaker({
  NAME: types.stringLiteral('abc'),
});
```

## references

- <https://babeljs.io/docs/en/babel-core>
- <https://babeljs.io/repl>
- <https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md>
- <https://astexplorer.net/>
- <https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md#programs>
- <https://github.com/lodash/babel-plugin-lodash/blob/master/src/index.js>
- <https://itnext.io/introduction-to-custom-babel-plugins-98a62dad16ee>
