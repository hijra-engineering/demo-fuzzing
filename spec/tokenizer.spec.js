const T = require('../src/tokens');
const tokenize = require('../src/tokenizer');

describe('tokenizer', () => {
    const tokens = (expr) => tokenize(expr).map((t) => t.type);

    it('should return [] on empty expression', () => {
        expect(tokenize()).toEqual([]);
    });

    it('should ignore whitespaces', () => {
        expect(tokenize(' ')).toEqual([]);
        expect(tokenize('  ')).toEqual([]);
    });

    it('should recognize operators', () => {
        expect(tokens('(')).toEqual([T.OpenParenthesis]);
        expect(tokens(')')).toEqual([T.CloseParenthesis]);
        expect(tokens('()')).toEqual([T.OpenParenthesis, T.CloseParenthesis]);
        expect(tokens('+')).toEqual([T.Plus]);
        expect(tokens('-')).toEqual([T.Minus]);
        expect(tokens('*')).toEqual([T.Star]);
        expect(tokens('/')).toEqual([T.Slash]);
    });

    it('should handle integer numbers', () => {
        expect(tokens('0')).toEqual([T.Number]);
        expect(tokens(' 42  ')).toEqual([T.Number]);
    });

    it('should handle floating-point numbers', () => {
        expect(tokens('1.2')).toEqual([T.Number]);
        expect(tokens('3.14159')).toEqual([T.Number]);
        expect(tokens('0.1')).toEqual([T.Number]);
        expect(tokens('.1')).toEqual([T.Number]);
        expect(tokens('1.')).toEqual([T.Number]);
    });
});
