const parse = require('../src/parser');

describe('parser', () => {
    it('should parse numbers', () => {
        expect(parse('0')).toEqual(0);
        expect(parse('1')).toEqual(1);
        expect(parse('3.14')).toEqual(3.14);
    });

    it('should parse unary expressions', () => {
        expect(parse('-0')).toEqual(['-', 0]);
        expect(parse('+1')).toEqual(1);
    });

    it('should parse additions and subtractions', () => {
        expect(parse('1 + 2')).toEqual(['+', 1, 2]);
        expect(parse('1 + 2 + 3')).toEqual(['+', ['+', 1, 2], 3]);
        expect(parse('4 - 5')).toEqual(['-', 4, 5]);
        expect(parse('4 - 5 - 6')).toEqual(['-', ['-', 4, 5], 6]);
        expect(parse('6 + 7 - 8')).toEqual(['-', ['+', 6, 7], 8]);
        expect(parse('6 - 7 + 8')).toEqual(['+', ['-', 6, 7], 8]);
        expect(parse('6 + 7 - 8 + 9')).toEqual(['+', ['-', ['+', 6, 7], 8], 9]);
    });

    it('should parse multiplications and divisions', () => {
        expect(parse('1 * 2')).toEqual(['*', 1, 2]);
        expect(parse('1 * 2 * 3')).toEqual(['*', ['*', 1, 2], 3]);
        expect(parse('4 / 5')).toEqual(['/', 4, 5]);
        expect(parse('4 / 5 / 6')).toEqual(['/', ['/', 4, 5], 6]);
        expect(parse('6 * 7 / 8')).toEqual(['/', ['*', 6, 7], 8]);
        expect(parse('6 / 7 * 8')).toEqual(['*', ['/', 6, 7], 8]);
        expect(parse('6 * 7 / 8 * 9')).toEqual(['*', ['/', ['*', 6, 7], 8], 9]);
    });

    it('should honor operator precedences', () => {
        expect(parse('1 + 2 * 3')).toEqual(['+', 1, ['*', 2, 3]]);
        expect(parse('1 + 2 - 3 / 4')).toEqual(['-', ['+', 1, 2], ['/', 3, 4]]);
        expect(parse('4 - +5 / 6')).toEqual(['-', 4, ['/', 5, 6]]);
        expect(parse('6 * 7 - - 8')).toEqual(['-', ['*', 6, 7], ['-', 8]]);
    });

    it('should parse grouped expressions', () => {
        expect(parse('(1)')).toEqual(1);
        expect(parse('(((2)))')).toEqual(2);
        expect(parse('-(3)')).toEqual(['-', 3]);
        expect(parse('(1 + 2) * + 3')).toEqual(['*', ['+', 1, 2], 3]);
    });
});
