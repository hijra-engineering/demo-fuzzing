const TOKEN = require('./tokens');
const tokenize = require('./tokenizer');

function parse(expression) {
    const tokens = tokenize(expression);

    const next = () => tokens.shift();

    const match = (type) => tokens.length > 0 && tokens[0].type === type;

    const expect = (type) => {
        if (!match(type)) {
            throw new Error('Unexpected token');
        }
        next();
    };

    // Group ::= "(" Expression ")"
    const parseGroup = () => {
        expect(TOKEN.OpenParenthesis);
        const expr = parseExpression();
        expect(TOKEN.CloseParenthesis);
        return expr;
    };

    // Primary ::= Number | Group
    const parsePrimary = () => {
        if (match(TOKEN.OpenParenthesis)) {
            return parseGroup();
        }
        const token = next();
        if (!token) {
            throw new Error('Unexpected end of input');
        }
        const { type, start, end } = token;
        if (type !== TOKEN.Number) {
            throw new Error('Unexpected end of input');
        }
        const text = expression.substring(start, end);
        return parseFloat(text);
    };

    // Unary ::= Primary |
    //           "+" Unary |
    //           "-" Unary
    const parseUnary = () => {
        if (match(TOKEN.Plus) || match(TOKEN.Minus)) {
            const { type } = next();
            const expr = parsePrimary(); // FIXME BUG
            return type === TOKEN.Minus ? ['-', expr] : expr;
        }
        return parsePrimary();
    };

    // Multiplicative ::= Unary |
    //                    Multiplicative "*"" Unary |
    //                    Multiplicative "/" Unary
    const parseMultiplicative = () => {
        let expr = parseUnary();
        while (match(TOKEN.Star) || match(TOKEN.Slash)) {
            const { type } = next();
            const op = type === TOKEN.Star ? '*' : '/';
            expr = [op, expr, parseUnary()];
        }
        return expr;
    };

    // Additive ::= Multiplicative |
    //              Additive "+" Multiplicative
    //              Additive "-" Multiplicative
    const parseAdditive = () => {
        let expr = parseMultiplicative();
        while (match(TOKEN.Plus) || match(TOKEN.Minus)) {
            const { type } = next();
            const op = type === TOKEN.Plus ? '+' : '-';
            expr = [op, expr, parseMultiplicative()];
        }
        return expr;
    };

    const parseExpression = () => parseAdditive();

    // console.log('parsing', expression, JSON.stringify(tokens))

    return parseExpression();
}

module.exports = parse;