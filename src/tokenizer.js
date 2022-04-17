const TOKEN = require('../src/tokens');

const isSpace = (code) => code === 9 || code === 10 || code === 13 || code === 32;
const isDigit = (code) => code >= 0x30 && code <= 0x39; // 0..9

function tokenize(expression = '') {
    const input = expression;
    const length = expression.length;
    let index = 0;

    const skipSpaces = () => {
        while (index < length) {
            const code = input.charCodeAt(index);
            if (!isSpace(code)) {
                break;
            }
            ++index;
        }
    };

    const scanOperator = () => {
        const start = index;
        const ch = input[start];
        let type = null;

        switch (ch) {
            case '(':
                type = TOKEN.OpenParenthesis;
                ++index;
                break;
            case ')':
                type = TOKEN.CloseParenthesis;
                ++index;
                break;
            case '+':
                type = TOKEN.Plus;
                ++index;
                break;
            case '-':
                type = TOKEN.Minus;
                ++index;
                break;
            case '*':
                type = TOKEN.Star;
                ++index;
                break;
            case '/':
                type = TOKEN.Slash;
                ++index;
                break;
            default:
                break;
        }
        const end = index;

        return type ? { type, start, end } : null;
    };

    const scanNumber = () => {
        const start = index;
        while (index < length) {
            const code = input.charCodeAt(index);
            if (!isDigit(code)) {
                break;
            }
            ++index;
        }

        if (input[index] === '.') {
            ++index;
            while (index < length) {
                const code = input.charCodeAt(index);
                if (!isDigit(code)) {
                    break;
                }
                ++index;
            }
        } else if (index <= start) {
            return null;
        }

        const type = TOKEN.Number;
        const end = index;
        return { type, start, end };
    };

    const main = () => {
        const tokens = [];
        while (index < length) {
            skipSpaces();
            let token = scanOperator();
            if (!token) {
                token = scanNumber();
            }

            if (token) {
                tokens.push(token);
            } else {
                const char = input[index];
                if (!char) {
                    break;
                }
                throw new Error('Invalid character: ' + char);
            }
        }
        return tokens;
    };

    return main();
}

module.exports = tokenize;
