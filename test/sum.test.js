const { describe, test, expect } = require('@jest/globals')
const sum = require('../sum')
describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});