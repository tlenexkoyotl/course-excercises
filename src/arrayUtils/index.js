module.exports = class ArrayUtils {
    checkContainsDuplicate(array) {
        let valuesSoFar = Object.create(null);

        for (const i in array) {
            let value = array[i];

            if (value in valuesSoFar)
                return true;

            valuesSoFar[value] = true;
        }

        return false;
    }

    getArraySum(row) {
        return row.reduce((sum, digit) => sum + digit, 0)
    }

    getIndexesOf(array, element) {
        let indexes = [];

        for (const i in array)
            if (array[i] === element)
                indexes = [...indexes, parseInt(i)];

        return indexes;
    }

    cloneObjectArray(originalArray) {
        let copiedArray = [];

        for (const originalElement of originalArray)
            copiedArray = [...copiedArray, Object.assign({}, originalElement)];

        return copiedArray;
    }

    cloneArrayOfArrays(originalArray) {
        let copiedArray = [];

        for (const originalElement of originalArray)
            copiedArray = [...copiedArray, Object.assign([], originalElement)];

        return copiedArray;
    }
};
