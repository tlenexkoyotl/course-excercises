const checkContainsDuplicate = (array) => {
    let valuesSoFar = Object.create(null);

    for (let i = 0; i < array.length; ++i) {
        let value = array[i];

        if (value in valuesSoFar) {
            return true;
        }

        valuesSoFar[value] = true;
    }

    return false;
};

const initializeGrid = () => {
    let grids = [];

    for (let i = 0; i < 9; i++)
        grids.push([])

    return grids;
}

const gridArraysFromMatrix = (matrix) => {
    let y = 0;
    let x = 0;
    let y0 = 0;
    let x0 = 0;
    let grid = 0;
    let grids = Object.assign({}, initializeGrid());

    while (y < (y0 + 3)) {
        while (x < (x0 + 3)) {
            grids[grid].push(matrix[y][x++]);

            if (x === (x0 + 3)) {
                x = x0;
                y++;
            }

            if (y === (y0 + 3)) {
                y = y0;
                x0 += 3;
                x = x0;
                grid++;

                if (grid >= 9) {
                    y = 3;
                    y0 = 0;
                    break;
                }

                if (x >= 8) {
                    y0 += 3;
                    y = y0;
                    x = 0;
                    x0 = x;
                }
            }
        }
    }

    return grids;
};

const transposeMatrix = (matrix) => {
    const transposedMatrix = [];

    runOverMatrix(matrix, (y) => {
        transposedMatrix.push([]);

        for (let i = 0; i < matrix.length; i++)
            transposedMatrix[y].push(matrix[i][y]);
    });

    return transposedMatrix;
};

const runOverMatrix = (matrix, callback) => {
    for (const y in matrix) {
        const row = matrix[y];

        callback(y, row);
    }
};

const checkSolutionValidity = (matrix) => {
    let isValid = {value: true};

    runOverMatrix(matrix, (y, row) => {
        isValid.value = isValid.value && !checkContainsDuplicate(row);
    });

    runOverMatrix(transposeMatrix(matrix), (y, row) => {
        isValid.value = isValid.value && !checkContainsDuplicate(row);
    });

    runOverMatrix(gridArraysFromMatrix(matrix), (y, row) => {
        isValid.value = isValid.value && !checkContainsDuplicate(row);
    });

    return isValid.value;
};

module.exports = checkSolutionValidity;
