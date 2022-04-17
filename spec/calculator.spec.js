const calc = require('../src/calculator');

describe('calc', () => {
    it('should evaluate negations', () => {
        expect(calc('-1')).toEqual(-1);
        //expect(calc('--2')).toEqual(2);
        //expect(calc('-+3')).toEqual(-3);
        //expect(calc('+-4')).toEqual(-4);
    });

    it('should evaluate additions and substractions', () => {
        expect(calc('1 + 2')).toEqual(3);
        expect(calc('1 + 2 + 3')).toEqual(6);
        expect(calc('4 - 5')).toEqual(-1);
        expect(calc('4 - 5 - 6')).toEqual(-7);
        expect(calc('6 + 7 - 8')).toEqual(5);
        expect(calc('6 - 7 + 8')).toEqual(7);
        expect(calc('6 + 7 - 8 + 9')).toEqual(14);
    });

    it('should evaluate multiplications and divisions', () => {
        expect(calc('1 * 2')).toEqual(2);
        expect(calc('1 * 2 * 3')).toEqual(6);
        expect(calc('4 / 5')).toEqual(0.8);
        expect(calc('6 / 3 / 2')).toEqual(1);
        expect(calc('6 * 2 / 3')).toEqual(4);
        expect(calc('6 * 2 / 3 * 2')).toEqual(8);
    });

    it('should honor operator precedences', () => {
        expect(calc('1 + 2 * 3')).toEqual(7);
        expect(calc('1 + 2 - 3 / 4')).toEqual(2.25);
        expect(calc('4 - +12 / 6')).toEqual(2);
        expect(calc('6 * 7 - - 8')).toEqual(50);
    });

    it('should tackle grouped expressions', () => {
        expect(calc('(1)')).toEqual(1);
        expect(calc('(((2)))')).toEqual(2);
        expect(calc('-(3)')).toEqual(-3);
        expect(calc('(1 + 2) * + 3')).toEqual(9);
        expect(calc('-(1 + 2) * - 3')).toEqual(9);
    });
});
