const calc = require('../src/calculator');
const generateExpression = require('./generator');

for (let seed = 0; seed < 10; ++seed) {
    const expression = generateExpression(seed);
    try {
        const result = calc(expression);
        console.log('OK', { seed, expression, result });
    } catch (e) {
        console.error('FAIL', { seed, expression });
        process.exit(-1);
    }
}
