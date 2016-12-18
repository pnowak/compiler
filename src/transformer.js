export function transformer (ast) {
  const canvas = document.getElementsByTagName('canvas');
  const svgAst = {
      tag : 'svg',
      attr: {
          width: canvas ? canvas.getAttribute('width') : 100, 
          height: canvas ? canvas.getAttribute('height') : 100, 
          viewBox: `0 0 ${width} ${height}`,
          xmlns: 'http://www.w3.org/2000/svg', 
          version: '1.1'
      },
      body:[]
  }

  let current = 0;

  while (current < ast.body.length) {
      let node = ast.body[current];

      switch (node.type) {
          case 'StringLiteral' :
              svgAst.body.push({ 
                  tag : node.value
              });
              break;
          case 'CallExpression' :
              let params = node.params;
              svgAst.body.push({
                  attr : {
                      x: params[0].value, 
                      y: params[1].value,
                      width: params[2].value, 
                      height: params[3].value,
                  }
              });
              break;
          default:
            throw new TypeError(node.type);
      }
  }

  return svgAst;
 }