const HYPHEN = "-";

const decomposeNumberString = numberObj => {
    numberObj.number = numberObj.number.split("").reverse();

    return numberObj;
};

const sortNumberStrings = decomposedNumbers =>
    decomposedNumbers.sort((a, b) => b.number.length - a.number.length);

const sumDigit = (result, i, amount) => {
    if (result.decomposed[i] !== undefined)
        result.decomposed[i] += amount;
    else
        result.decomposed.push(amount);
};

const sumAndCarry = (result, number, i) => {
    sumDigit(result, i, number[i]);

    if (result.decomposed[i] >= 10) {
        result.decomposed[i] -= 10;

        sumDigit(result, i + 1, 1);
    } else if (result.decomposed[i] <= -10) {
        result.decomposed[i] += 10;

        sumDigit(result, i + 1, -1);
    }
};

const doBinarySum = (result, number) => {
    for (let i = 0; i < number.length; i++) {
        sumAndCarry(result, number, i);
    }
};

const parseDigits = decomposedNumber => {
    for (let i = 0; i < decomposedNumber.number.length; i++) {
        decomposedNumber.number[i] = parseInt(decomposedNumber.number[i]);

        if (!decomposedNumber.sign) {
            decomposedNumber.number[i] *= -1;
        }
    }
};

const determineResultSign = (result, decomposedNumber) => {
    if (result.sign === decomposedNumber.sign) return decomposedNumber.sign;
    else {
        if (result.decomposed.length > decomposedNumber.number.length) {
            return result.sign;
        } else if (result.decomposed.length < decomposedNumber.number.length) {
            return decomposedNumber.sign;
        } else {
            let revertedResult = result.decomposed.reverse();
            decomposedNumber.number = decomposedNumber.number.reverse();

            for (const digit in decomposedNumber.number) {
                if (Math.abs(revertedResult[digit]) > Math.abs(decomposedNumber.number[digit])) {
                    return result.sign;
                } else {
                    return decomposedNumber.sign;
                }
            }
        }
    }
};

const getArrayResult = (result, decomposedNumbers) => {
    for (const decomposedNumber of decomposedNumbers) {
        parseDigits(decomposedNumber);
    }

    for (const decomposedNumber of decomposedNumbers) {
        result.sign = determineResultSign(result, decomposedNumber);

        doBinarySum(result, decomposedNumber.number);
    }

    result.value = result.sign ? '' : '-';
    result.value += result.decomposed.reverse().join('').replace(/-+/g, '');
};

const formNumberObject = numberString => {
    const isNumberPositive = !numberString.includes(HYPHEN);
    numberString = numberString.replace(HYPHEN, "");

    return {
        number: numberString,
        sign: isNumberPositive
    };
};

const sum = (...numberStrings) => {
    let result = {value: '0', decomposed: [], sign: true};

    if (numberStrings.length > 0) {
        numberStrings = numberStrings.map(formNumberObject);
        numberStrings = sortNumberStrings(numberStrings);
        const decomposedNumbers = numberStrings.map(decomposeNumberString);
        getArrayResult(result, decomposedNumbers);
    }

    return result.value;
};

module.exports = sum;