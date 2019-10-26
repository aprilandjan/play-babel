export default function (babel) {
  const { type: t } = babel;
  return {
    visitor: {
      // 标识符
      Identifier(path, state) {

      },
      // 二元运算符
      BinaryExpression(path) {
        //  检查是否使用全等
        if (path.node.operator !== '===') {
          return;
        }
        path.node.left = t.identifier('x');
        path.node.right = t.identifier('y');
      }
    }
  }
}