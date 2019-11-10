const SudokuValidator = require('../../src/sudokuValidator');

module.exports = class SudokuSolver extends SudokuValidator {
    constructor() {
        super();
        this.DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    hasSingleSolution(puzzle) {
        return true;
    }

    tellAbscissa(x) {
        if (x < 3) return 0;
        else if (x > 2 && x < 6) return 1;
        else if (x > 5) return 2;
    }

    tellGrid(x, y) {
        if (y < 3) return this.tellAbscissa(x);
        else if (y > 2 && y < 6) return this.tellAbscissa(x) + 3;
        else if (y > 5) return this.tellAbscissa(x) + 6;
    }

    isDigitInSudoku(digit, row, column, grid) {
        return row.includes(digit) || column.includes(digit) || grid.includes(digit);
    }

    generateNumber(row, column, grid, callback) {
        for (const digit of this.DIGITS)
            if (!this.isDigitInSudoku(digit, row, column, grid))
                if (typeof callback == "function") callback(digit);
                else return digit
    }

    generateNumbers(row, column, grid) {
        let possibleDigits = [];

        this.generateNumber(row, column, grid, digit => {
            possibleDigits = [...possibleDigits, digit];
        });

        return possibleDigits;
    }

    findZeros(matrix) {
        let zeros = [];

        for (const y in matrix) {
            const row = matrix[y];

            for (const x in row)
                if (matrix[y][x] === 0)
                    zeros = [...zeros, {x: parseInt(x), y: parseInt(y), possibleDigits: []}];
        }

        return zeros;
    }

    findPossibleDigits(matrix, transposed, grids) {
        const zeros = this.findZeros(matrix);

        for (const zero of zeros)
            zero.possibleDigits = this.generateNumbers(matrix[zero.y],
                transposed[zero.x],
                grids[this.tellGrid(zero.x, zero.y)]);

        return zeros;
    }

    fillPossibleMatrixes(puzzle, transposedPuzzle, grids, zeros, matrixes = []) {
        const matrix = this.cloneArrayOfArrays(puzzle);
        const transposed = this.cloneArrayOfArrays(transposedPuzzle);

        for (const i in zeros)
            for (const j in zeros[i].possibleDigits)
                for (const k in zeros)
                    if (i !== k)
                        for (const z in zeros[k].possibleDigits)
                            if (zeros[i].possibleDigits[j] !== zeros[k].possibleDigits[z]) {
                                const x1 = zeros[i].x;
                                const y1 = zeros[i].y;
                                const x2 = zeros[k].x;
                                const y2 = zeros[k].y;

                                if (!this.isDigitInSudoku(zeros[i].possibleDigits[j], matrix[y1], transposed[x1], grids[this.tellGrid(x1, y1)]))
                                    matrix[y1][x1] = zeros[i].possibleDigits[j];

                                if (!this.isDigitInSudoku(zeros[k].possibleDigits[z], matrix[y2], transposed[x2], grids[this.tellGrid(x2, y2)]))
                                    matrix[y2][x2] = zeros[k].possibleDigits[z];
                            }

        if (this.validateSolution(matrix))
            return matrix;
        else
            this.fillPossibleMatrixes(puzzle, transposedPuzzle, grids, zeros, matrixes)
    }

    solveSudoku(puzzle) {
        if (this.hasSingleSolution(puzzle))
            if (this.validateSolution(puzzle)) return puzzle;
            else {
                const matrix = this.cloneObjectArray(puzzle);
                const transposed = this.transposeMatrix(matrix);
                const grids = this.getGridArraysFromMatrix(matrix);
                const zeros = this.findPossibleDigits(puzzle,
                    transposed,
                    grids,
                    this.findZeros(puzzle));

                return [];
            }
        else
            return false;
    }
};
