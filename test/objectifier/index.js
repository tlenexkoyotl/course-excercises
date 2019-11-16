const assert = require('chai').assert;
const Objectifier = require('../../src/objectifier');
const objectifier = new Objectifier();

suite('Objectify tests', () => {
    test('Case form object from array', () => {
        const array = [
            {name: 'John'},
            {surname: 'Doe'},
            {age: 17},
            {height: '6ft2'}
        ];
        const expected = {
            name: 'John',
            surname: 'Doe',
            age: 17,
            height: '6ft2'
        };
        const result = objectifier.objectify(array);

        for (const entry of Object.entries(expected))
            assert.strictEqual(result[entry], expected[entry]);

        assert.deepEqual(result, expected);
    });
});
