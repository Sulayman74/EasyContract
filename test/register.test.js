const { describe, test, expect } = require('@jest/globals')
const validator = require("validator");
const { isEmail } = validator;
const register = require('../controllers/users/register-controllers.js')

describe('register test', () => {
    test('inscription', () => {
        const email = "jojo@icloud.com";
        const result = isEmail(email);
        expect(result).toBe(true);
    });
})
describe('register test', () => {
    test('inscription avec un format non conforme', () => {
        const hasard = "je suis pas une adresse mail";
        const result = isEmail(hasard);
        expect(result).toBe(false);
    });
})