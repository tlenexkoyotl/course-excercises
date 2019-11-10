const ArrayUtils = require('../../src/arrayUtils');

module.exports = class MatrixUtils extends ArrayUtils {
    __initializeGridArrays() {
        let grids = [];

        for (let i = 0; i < 9; i++)
            grids.push([]);

        return grids;
    }

    getGridArraysFromMatrix(matrix) {
        let y = 0;
        let x = 0;
        let y0 = 0;
        let x0 = 0;
        let grid = 0;
        let grids = Object.assign([], this.__initializeGridArrays());

        while (y < (y0 + 3))
            while (x < (x0 + 3)) {
                grids[grid] = [...grids[grid], matrix[y][x++]];

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

        return grids;
    }

    transposeMatrix(matrix) {
        let transposedMatrix = [];

        for (const y in matrix) {
            transposedMatrix = [...transposedMatrix, []];

            for (let i = 0; i < matrix.length; i++)
                transposedMatrix[y] = [...transposedMatrix[y], matrix[i][y]];
        }

        return transposedMatrix;
    }

    getRowsSum(matrix) {
        let rowSums = [];

        for (const row of matrix)
            rowSums = [...rowSums, this.getArraySum(row)];

        return rowSums;
    }

    checkRowSumsEqual(matrix) {
        const rowSums = this.getRowsSum(matrix);

        for (const i in rowSums)
            if (i > 0)
                if (rowSums[i - 1] !== rowSums[i]) return false;

        return true;
    }
};
