const generateExpression = require('./generator');
const calc = require('../src/calculator');

describe('fuzzing', () => {
    for (let seed = 1; seed < 1e3; ++seed) {
        it(`should parse generated expression from seed ${seed}`, () => {
            const expression = generateExpression(seed);
            expect(() => calc(expression)).not.toThrow();
        });
    }
});
