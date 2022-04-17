const isaac = require('isaac');

function generateExpression(seed = 7, depth = 5) {
    isaac.seed(seed);

    const randomInt = (max) => Math.floor(isaac.random() * max);
    const randomItem = (items) => items[randomInt(items.length)];

    const integer = () => randomInt(1000);

    const number = () => integer();

    const positive = () => '+' + primary();
    const negative = () => '-' + primary();

    const group = () => '(' + primary() + ')';

    const primary = () => {
        --depth;
        let result = number();
        if (depth > 0) {
            result = randomItem([result, positive(), negative(), binary(), group()]);
        }
        ++depth;
        return String(result);
    };

    const binary = () => {
        const left = primary();
        const right = primary();
        const op = randomItem(['+', '-', '*', '/']);
        return left + op + right;
    };

    return primary();
}

module.exports = generateExpression;