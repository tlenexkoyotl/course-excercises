const assert = require('chai').assert;
const sum = require('../../src/sumStringsAsNumbers');

describe('Sum Strings as Numbers', () => {
    it('Case empty params', () => {
        assert.strictEqual(sum(), '0');
    });

    it('Case once param, outputs the input', () => {
        assert.strictEqual(sum('200'), '200');
    });

    it('Case two positive numbers', () => {
        assert.strictEqual(sum('800', '9567'), '10367');
    });

    it('Case carrier not missing', () => {
        assert.strictEqual(sum('99', '1'), '100');
    });

    it('Case three numbers', () => {
        assert.strictEqual(sum('99', '1', '37'), '137');
    });

    it('Case four numbers', () => {
        assert.strictEqual(sum('45', '42', '25', '38'), '150');
    });

    it('Case big numbers not overflowing', () => {
        assert.strictEqual(sum('99999999999999999999'), '99999999999999999999');
    });

    it('Case sum and carry big positive numbers', () => {
        assert.strictEqual(sum('44444444444444444444', '77777777777777777777'), '122222222222222222221');
    });

    it('Case neutral additive', () => {
        assert.strictEqual(sum('0', '111'), '111');
    });

    it('Case sum, not concatenate', () => {
        assert.strictEqual(sum('111', '0'), '111');
    });

    it('Case sum negative numbers', () => {
        assert.strictEqual(sum('-5', '-7'), '-12');
    });

    it('Case sum negative and positive, output positive result', () => {
        assert.strictEqual(sum('-5', '7'), '2');
    });

    it('Case sum negative and positive, output negative result', () => {
        assert.strictEqual(sum('5', '-7'), '-2');
    });

    it('Case big negative numbers not overflowing', () => {
        assert.strictEqual(sum('-999999999999999999999'), '-999999999999999999999');
    });

    it('Case sum big negative numbers', () => {
        assert.strictEqual(sum('-55555555555555555555555', '-44444444444444444444444'), '-99999999999999999999999');
    });

    it('Case sum and carry big negative numbers', () => {
        assert.strictEqual(sum('-44444444444444444444', '-77777777777777777777'), '-122222222222222222221');
    });

    it('Case sum big positive and negative numbers, output positive result', () => {
        assert.strictEqual(sum('-44444444444444444444', '77777777777777777777'), '33333333333333333333');
    });

    it('Case sum big positive and negative numbers, output negative result', () => {
        assert.strictEqual(sum('44444444444444444444', '-77777777777777777777'), '-33333333333333333333');
    });
});