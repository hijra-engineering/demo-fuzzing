const parse = require('./parser');

function calc(expression) {
    const eval = (node) => {
        if (Array.isArray(node)) {
            const [op, ...operands] = node;
            const subs = operands.map(eval);
            const [left, right] = subs;
            switch (op) {
                case '+':
                    return left + right;
                case '-':
                    return node.length === 3 ? left - right : -left;
                case '*':
                    return left * right;
                case '/':
                    return left / right;
                default:
                    throw new Error('Unknown operator ' + op);
                    break;
            }
        }
        return node;
    };

    return eval(parse(expression));
}

module.exports = calc;
