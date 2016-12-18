export function tokenizer(code) {
    let input = code
                    .replace(/\./gi, ' DOT ')
                    .replace(/\,/gi, ' COMMA '); console.log(input);

    let current = 0;
    const tokens = [];

    while (current < input.length) {
        const WHITESPACE = /\s/;
        const LETTERS = /[a-z]/i;
        const NUMBERS = /[0-9]/;

        let char = input[current];
        
        if (char === '(') {
            tokens.push({
                type: 'paren',
                value: '('
            });
            current++;
            continue;
        }

        if (char === ')') {
            tokens.push({
                type: 'paren',
                value: ')'
            });
            current++;
            continue;
        }

        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        if (NUMBERS.test(char)) {
            let value = '';

            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }

            tokens.push({
                type: 'number',
                value: value
            });

            continue;
        }

        if (LETTERS.test(char)) {
            let value = '';

            while (LETTERS.test(char)) {
                value += char;
                char = input[++current];
            }

            tokens.push({
                type: 'word',
                value: value
            });

            continue;
        }

        throw new TypeError('I dont know what this character is: ' + char);
    }

    return tokens;
}