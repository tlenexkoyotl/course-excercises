const MatrixUtils = require('../matrixUtils');

module.exports = class SudokuSolutionValidator extends MatrixUtils {
    validateSolution(matrix) {
        let isValid = true;
        const transposed = this.transposeMatrix(matrix);
        const grids = this.getGridArraysFromMatrix(matrix);

        for (const row of matrix)
            isValid = isValid && !this.checkContainsDuplicate(row);

        for (const column of transposed)
            isValid = isValid && !this.checkContainsDuplicate(column);

        for (const grid of grids)
            isValid = isValid && !this.checkContainsDuplicate(grid);

        return isValid;
    }
};
