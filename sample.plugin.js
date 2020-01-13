const template = require('@babel/template').default;

const buildTimeStart = template(`console.time(NAME)`);

module.exports = ({ types: t}) => {
  return {
    name: 'sample',
    visitor: {
      // Identifier: {
      //   //  `enter` is triggered firstly encountered
      //   //  this is the default method
      //   enter(path) {
      //     console.log('Identifier enter called', path.node.name);
      //   },
      //   //  `exit` is triggered while the control exits the node
      //   exit(path) {
      //     console.log('Identifier exit called', path.node.name);
      //   }
      // },
      //  function f () {}
      "FunctionDeclaration": {
        enter(path) {
          // console.log('FunctionDeclaration enter called', path.node.id.name);
          //  1. get the path of the function body. actually a BlockStatement
          const bodyPath = path.get('body');
          //  2. create an desired expression
          // const exp = t.callExpression(
          //   t.memberExpression(t.identifier('console'), t.identifier('time')),
          //   [t.stringLiteral(path.node.id.name)]
          // );
          // can not directly insert a bunch of code in AST
          // const exp = t.expressionStatement(`console.time("${path.node.id.name}")`);
          // but it is ok to use `@babel/template` to create AST nodes from template string
          const exp = buildTimeStart({
            NAME: t.stringLiteral(path.node.id.name),
          });
          //  3. insert the expression
          bodyPath.unshiftContainer('body', exp);
        },
        //  TODO: doses the previously inserted AST nodes exist here?
        exit(path) {
          // console.log('FunctionDeclaration exit called', path.node.id.name);
          //  1. get the path of the function body
          const bodyPath = path.get('body');
          //  2. make call expression
          const exp = t.callExpression(
            t.memberExpression(t.identifier('console'), t.identifier('timeEnd')),
            [t.stringLiteral(path.node.id.name)],
          );
          //  3. insert the expression directly. This is not ideal
          // bodyPath.pushContainer('body', exp);

          //  FIXME: check if the last line of the block is ReturnStatement

          //  3. find all 'ReturnStatement' for **current function body**
          bodyPath.traverse({
            ReturnStatement(innerPath) {
              //  find closest function body for this return
              const parentFuncPath = innerPath.getFunctionParent();
              if (parentFuncPath.get('body') === bodyPath) {
                innerPath.insertBefore(exp);
              }
            },
          })
        }
      }
      // FunctionDeclaration (path) {
      //   console.log('FunctionDeclaration enter called', path.node.id.name);
      // }
    }
  }
}
