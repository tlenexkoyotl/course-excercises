const assert = require('chai').assert;
const ArrayUtils = require('../../src/arrayUtils');
const arrayUtils = new ArrayUtils();

suite('Test array utils', () => {
    test('Array elements are unique', () => {
        assert.isFalse(arrayUtils.checkContainsDuplicate([5, 3, 4, 6, 7, 8, 9, 1, 2]));
    });

    test('Array elements are not unique', () => {
        assert.isTrue(arrayUtils.checkContainsDuplicate([5, 3, 4, 6, 7, 8, 5, 1, 2]));
    });

    test('Row sum', () => {
        assert.strictEqual(arrayUtils.getArraySum([5, 3, 4, 6, 7, 8, 9, 1, 2]), 45);
    });

    test('Get indexes of element in array', () => {
        let array = [5, 3, 4, 0, 7, 8, 9, 0, 2];
        let indexes = [3, 7];

        assert.deepEqual(arrayUtils.getIndexesOf(array, 0), indexes);

        array = [6, 7, 2, 1, 9, 0, 0, 4, 8];
        indexes = [5, 6];

        assert.deepEqual(arrayUtils.getIndexesOf(array, 0), indexes);

        array = [9, 6, 0, 5, 3, 7, 2, 8, 0];
        indexes = [2, 8];

        assert.deepEqual(arrayUtils.getIndexesOf(array, 0), indexes);
    });
});
