export function parser(tokens) {
    const AST = {
        type: 'Drawing',
        body: []
    };

    let current = 0;

    while (current < tokens.length) {
        let token = tokens[current]; console.log(current, token);

        if (token.type === 'number') {
            AST.body.push({
                type: 'NumberLiteral',
                value: token.value
            });

            current++;
            continue;
        }

        if (token.type === 'word') {
            AST.body.push({
                type: 'StringLiteral',
                value: token.value
            });

            current++;
            continue;
        }

        if (token.type === 'paren' && token.value === '(') {
            let node = {
                type: 'CallExpression',
                word: token.value,
                params: []
            };

            token = tokens[++current];

            while ((token.type !== 'paren') || (token.type === 'paren' && token.value !== ')')) {
                node.params.push(token);
                token = tokens[++current];
                continue;
            }
            
            AST.body.push(node);

            current++;
            continue;
        }

      throw new TypeError(token.type);
  }

  return AST;
}