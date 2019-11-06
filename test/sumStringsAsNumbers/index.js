const assert = require('chai').assert;
const sum = require('../../src/sumStringsAsNumbers');

suite('Sum Strings as Numbers', () => {
    test('Case empty params', () => {
        assert.strictEqual(sum(), '0');
    });

    test('Case once param, outputs the input', () => {
        assert.strictEqual(sum('200'), '200');
    });

    test('Case two positive numbers', () => {
        assert.strictEqual(sum('800', '9567'), '10367');
    });

    test('Case carrier not missing', () => {
        assert.strictEqual(sum('99', '1'), '100');
    });

    test('Case three numbers', () => {
        assert.strictEqual(sum('99', '1', '37'), '137');
    });

    test('Case four numbers', () => {
        assert.strictEqual(sum('45', '42', '25', '38'), '150');
    });

    test('Case big numbers not overflowing', () => {
        assert.strictEqual(sum('99999999999999999999'), '99999999999999999999');
    });

    test('Case sum and carry big positive numbers', () => {
        assert.strictEqual(sum('44444444444444444444', '77777777777777777777'), '122222222222222222221');
    });

    test('Case neutral additive', () => {
        assert.strictEqual(sum('0', '111'), '111');
    });

    test('Case sum, not concatenate', () => {
        assert.strictEqual(sum('111', '0'), '111');
    });

    test('Case sum negative numbers', () => {
        assert.strictEqual(sum('-5', '-7'), '-12');
    });

    test('Case sum negative and positive, output positive result', () => {
        assert.strictEqual(sum('-5', '7'), '2');
    });

    test('Case sum negative and positive, output negative result', () => {
        assert.strictEqual(sum('5', '-7'), '-2');
    });

    test('Case big negative numbers not overflowing', () => {
        assert.strictEqual(sum('-999999999999999999999'), '-999999999999999999999');
    });

    test('Case sum big negative numbers', () => {
        assert.strictEqual(sum('-55555555555555555555555', '-44444444444444444444444'), '-99999999999999999999999');
    });

    test('Case sum and carry big negative numbers', () => {
        assert.strictEqual(sum('-44444444444444444444', '-77777777777777777777'), '-122222222222222222221');
    });

    test('Case sum big positive and negative numbers, output positive result', () => {
        assert.strictEqual(sum('-44444444444444444444', '77777777777777777777'), '33333333333333333333');
    });

    test('Case sum big positive and negative numbers, output negative result', () => {
        assert.strictEqual(sum('44444444444444444444', '-77777777777777777777'), '-33333333333333333333');
    });
});
