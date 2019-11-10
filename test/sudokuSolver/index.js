const assert = require('chai').assert;
const SudokuSolver = require('../../src/sudokuSolver');
const sudokuSolver = new SudokuSolver();

suite('Solve sudoku', () => {
    test('Tell abscissa', () => {
        assert.strictEqual(sudokuSolver.tellAbscissa(0), 0);
        assert.strictEqual(sudokuSolver.tellAbscissa(1), 0);
        assert.strictEqual(sudokuSolver.tellAbscissa(2), 0);
        assert.strictEqual(sudokuSolver.tellAbscissa(3), 1);
        assert.strictEqual(sudokuSolver.tellAbscissa(4), 1);
        assert.strictEqual(sudokuSolver.tellAbscissa(5), 1);
        assert.strictEqual(sudokuSolver.tellAbscissa(6), 2);
        assert.strictEqual(sudokuSolver.tellAbscissa(7), 2);
        assert.strictEqual(sudokuSolver.tellAbscissa(8), 2);
    });

    test('Tell grid', () => {
        assert.strictEqual(sudokuSolver.tellGrid(0, 2), 0);
        assert.strictEqual(sudokuSolver.tellGrid(1, 1), 0);
        assert.strictEqual(sudokuSolver.tellGrid(2, 2), 0);
        assert.strictEqual(sudokuSolver.tellGrid(3, 0), 1);
        assert.strictEqual(sudokuSolver.tellGrid(4, 1), 1);
        assert.strictEqual(sudokuSolver.tellGrid(5, 2), 1);
        assert.strictEqual(sudokuSolver.tellGrid(6, 1), 2);
        assert.strictEqual(sudokuSolver.tellGrid(7, 0), 2);
        assert.strictEqual(sudokuSolver.tellGrid(8, 2), 2);

        assert.strictEqual(sudokuSolver.tellGrid(0, 3), 3);
        assert.strictEqual(sudokuSolver.tellGrid(1, 4), 3);
        assert.strictEqual(sudokuSolver.tellGrid(2, 5), 3);
        assert.strictEqual(sudokuSolver.tellGrid(3, 5), 4);
        assert.strictEqual(sudokuSolver.tellGrid(4, 4), 4);
        assert.strictEqual(sudokuSolver.tellGrid(5, 3), 4);
        assert.strictEqual(sudokuSolver.tellGrid(6, 3), 5);
        assert.strictEqual(sudokuSolver.tellGrid(7, 4), 5);
        assert.strictEqual(sudokuSolver.tellGrid(8, 4), 5);

        assert.strictEqual(sudokuSolver.tellGrid(0, 6), 6);
        assert.strictEqual(sudokuSolver.tellGrid(1, 7), 6);
        assert.strictEqual(sudokuSolver.tellGrid(2, 8), 6);
        assert.strictEqual(sudokuSolver.tellGrid(3, 8), 7);
        assert.strictEqual(sudokuSolver.tellGrid(4, 6), 7);
        assert.strictEqual(sudokuSolver.tellGrid(5, 6), 7);
        assert.strictEqual(sudokuSolver.tellGrid(6, 8), 8);
        assert.strictEqual(sudokuSolver.tellGrid(7, 7), 8);
        assert.strictEqual(sudokuSolver.tellGrid(8, 7), 8);
    });

    test('Is digit in sudoku', () => {
        let row = [5, 3, 4, 0, 7, 8, 9, 1, 2];
        let column = [5, 0, 1, 8, 4, 7, 9, 2, 3];
        let grid = [5, 3, 4, 0, 7, 2, 1, 9, 8];

        assert.isFalse(sudokuSolver.isDigitInSudoku(6, row, column, grid));
        assert.isTrue(sudokuSolver.isDigitInSudoku(5, row, column, grid));
        assert.isTrue(sudokuSolver.isDigitInSudoku(4, row, column, grid));

        row = [6, 7, 2, 1, 9, 5, 0, 4, 8];
        column = [9, 0, 5, 4, 7, 8, 2, 6, 1];
        grid = [9, 1, 2, 0, 4, 8, 5, 6, 7];

        assert.isFalse(sudokuSolver.isDigitInSudoku(3, row, column, grid));
        assert.isTrue(sudokuSolver.isDigitInSudoku(9, row, column, grid));
        assert.isTrue(sudokuSolver.isDigitInSudoku(7, row, column, grid));

        row = [9, 6, 0, 5, 3, 7, 2, 8, 4];
        column = [4, 2, 8, 9, 6, 3, 0, 7, 5];
        grid = [9, 6, 0, 2, 8, 7, 3, 4, 5];


        assert.isFalse(sudokuSolver.isDigitInSudoku(1, row, column, grid));
        assert.isTrue(sudokuSolver.isDigitInSudoku(8, row, column, grid));
        assert.isTrue(sudokuSolver.isDigitInSudoku(3, row, column, grid));
    });

    test('Generate number', () => {
        let row = [5, 3, 4, 0, 7, 8, 9, 1, 2];
        let column = [5, 0, 1, 8, 4, 7, 9, 2, 3];
        let grid = [5, 3, 4, 0, 7, 2, 1, 9, 8];

        assert.strictEqual(sudokuSolver.generateNumber(row, column, grid), 6);

        row = [6, 7, 2, 1, 9, 5, 0, 4, 8];
        column = [9, 0, 5, 4, 7, 8, 2, 6, 1];
        grid = [9, 1, 2, 0, 4, 8, 5, 6, 7];

        assert.strictEqual(sudokuSolver.generateNumber(row, column, grid), 3);

        row = [9, 6, 0, 5, 3, 7, 2, 8, 4];
        column = [4, 2, 8, 9, 6, 3, 0, 7, 5];
        grid = [9, 6, 0, 2, 8, 7, 3, 4, 5];

        assert.strictEqual(sudokuSolver.generateNumber(row, column, grid), 1);
    });

    test('Get indexes of element in array', () => {
        let array = [5, 3, 4, 0, 7, 8, 9, 0, 2];
        let indexes = [3, 7];

        assert.deepEqual(sudokuSolver.getIndexesOf(array, 0), indexes);

        array = [6, 7, 2, 1, 9, 0, 0, 4, 8];
        indexes = [5, 6];

        assert.deepEqual(sudokuSolver.getIndexesOf(array, 0), indexes);

        array = [9, 6, 0, 5, 3, 7, 2, 8, 0];
        indexes = [2, 8];

        assert.deepEqual(sudokuSolver.getIndexesOf(array, 0), indexes);
    });

    test('Find zeros', () => {
        const puzzle = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]];
        const zeros = [
            {x: 2, y: 0, possibleDigits: []},
            {x: 3, y: 0, possibleDigits: []},
            {x: 5, y: 0, possibleDigits: []},
            {x: 6, y: 0, possibleDigits: []},
            {x: 7, y: 0, possibleDigits: []},
            {x: 8, y: 0, possibleDigits: []},

            {x: 1, y: 1, possibleDigits: []},
            {x: 2, y: 1, possibleDigits: []},
            {x: 6, y: 1, possibleDigits: []},
            {x: 7, y: 1, possibleDigits: []},
            {x: 8, y: 1, possibleDigits: []},

            {x: 0, y: 2, possibleDigits: []},
            {x: 3, y: 2, possibleDigits: []},
            {x: 4, y: 2, possibleDigits: []},
            {x: 5, y: 2, possibleDigits: []},
            {x: 6, y: 2, possibleDigits: []},
            {x: 8, y: 2, possibleDigits: []},

            {x: 1, y: 3, possibleDigits: []},
            {x: 2, y: 3, possibleDigits: []},
            {x: 3, y: 3, possibleDigits: []},
            {x: 5, y: 3, possibleDigits: []},
            {x: 6, y: 3, possibleDigits: []},
            {x: 7, y: 3, possibleDigits: []},

            {x: 1, y: 4, possibleDigits: []},
            {x: 2, y: 4, possibleDigits: []},
            {x: 4, y: 4, possibleDigits: []},
            {x: 6, y: 4, possibleDigits: []},
            {x: 7, y: 4, possibleDigits: []},

            {x: 1, y: 5, possibleDigits: []},
            {x: 2, y: 5, possibleDigits: []},
            {x: 3, y: 5, possibleDigits: []},
            {x: 5, y: 5, possibleDigits: []},
            {x: 6, y: 5, possibleDigits: []},
            {x: 7, y: 5, possibleDigits: []},

            {x: 0, y: 6, possibleDigits: []},
            {x: 2, y: 6, possibleDigits: []},
            {x: 3, y: 6, possibleDigits: []},
            {x: 4, y: 6, possibleDigits: []},
            {x: 5, y: 6, possibleDigits: []},
            {x: 8, y: 6, possibleDigits: []},

            {x: 0, y: 7, possibleDigits: []},
            {x: 1, y: 7, possibleDigits: []},
            {x: 2, y: 7, possibleDigits: []},
            {x: 6, y: 7, possibleDigits: []},
            {x: 7, y: 7, possibleDigits: []},

            {x: 0, y: 8, possibleDigits: []},
            {x: 1, y: 8, possibleDigits: []},
            {x: 2, y: 8, possibleDigits: []},
            {x: 3, y: 8, possibleDigits: []},
            {x: 5, y: 8, possibleDigits: []},
            {x: 6, y: 8, possibleDigits: []}
        ];

        assert.deepEqual(sudokuSolver.findZeros(puzzle), zeros);
    });

    test('Find possible digits', () => {
        const puzzle = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]];
        const transposed = sudokuSolver.transposeMatrix(puzzle);
        const grids = sudokuSolver.getGridArraysFromMatrix(puzzle);
        const expectedZeros = [
            {x: 2, y: 0, possibleDigits: [1, 2, 4]},
            {x: 3, y: 0, possibleDigits: [2, 6]},
            {x: 5, y: 0, possibleDigits: [2, 4, 6, 8]},
            {x: 6, y: 0, possibleDigits: [1, 4, 8, 9]},
            {x: 7, y: 0, possibleDigits: [1, 2, 4, 9]},
            {x: 8, y: 0, possibleDigits: [2, 4, 8]},
            {x: 1, y: 1, possibleDigits: [2, 4, 7]},
            {x: 2, y: 1, possibleDigits: [2, 4, 7]},
            {x: 6, y: 1, possibleDigits: [3, 4, 7, 8]},
            {x: 7, y: 1, possibleDigits: [2, 3, 4]},
            {x: 8, y: 1, possibleDigits: [2, 4, 7, 8]},
            {x: 0, y: 2, possibleDigits: [1, 2]},
            {x: 3, y: 2, possibleDigits: [2, 3]},
            {x: 4, y: 2, possibleDigits: [3, 4]},
            {x: 5, y: 2, possibleDigits: [2, 4]},
            {x: 6, y: 2, possibleDigits: [1, 3, 4, 5, 7]},
            {x: 8, y: 2, possibleDigits: [2, 4, 7]},
            {x: 1, y: 3, possibleDigits: [1, 2, 5]},
            {x: 2, y: 3, possibleDigits: [1, 2, 5, 9]},
            {x: 3, y: 3, possibleDigits: [5, 7, 9]},
            {x: 5, y: 3, possibleDigits: [1, 4, 7]},
            {x: 6, y: 3, possibleDigits: [4, 5, 7, 9]},
            {x: 7, y: 3, possibleDigits: [2, 4, 5, 9]},
            {x: 1, y: 4, possibleDigits: [2, 5]},
            {x: 2, y: 4, possibleDigits: [2, 5, 6, 9]},
            {x: 4, y: 4, possibleDigits: [5]},
            {x: 6, y: 4, possibleDigits: [5, 7, 9]},
            {x: 7, y: 4, possibleDigits: [2, 5, 9]},
            {x: 1, y: 5, possibleDigits: [1, 5]},
            {x: 2, y: 5, possibleDigits: [1, 3, 5, 9]},
            {x: 3, y: 5, possibleDigits: [5, 9]},
            {x: 5, y: 5, possibleDigits: [1, 4]},
            {x: 6, y: 5, possibleDigits: [4, 5, 8, 9]},
            {x: 7, y: 5, possibleDigits: [4, 5, 9]},
            {x: 0, y: 6, possibleDigits: [1, 3, 9]},
            {x: 2, y: 6, possibleDigits: [1, 3, 4, 5, 7, 9]},
            {x: 3, y: 6, possibleDigits: [3, 5, 7]},
            {x: 4, y: 6, possibleDigits: [3, 5]},
            {x: 5, y: 6, possibleDigits: [7]},
            {x: 8, y: 6, possibleDigits: [4]},
            {x: 0, y: 7, possibleDigits: [2, 3]},
            {x: 1, y: 7, possibleDigits: [2, 7, 8]},
            {x: 2, y: 7, possibleDigits: [2, 3, 7]},
            {x: 6, y: 7, possibleDigits: [3, 6]},
            {x: 7, y: 7, possibleDigits: [3]},
            {x: 0, y: 8, possibleDigits: [1, 2, 3]},
            {x: 1, y: 8, possibleDigits: [1, 2, 4, 5]},
            {x: 2, y: 8, possibleDigits: [1, 2, 3, 4, 5]},
            {x: 3, y: 8, possibleDigits: [2, 3, 5, 6]},
            {x: 5, y: 8, possibleDigits: [2, 6]},
            {x: 6, y: 8, possibleDigits: [1, 3, 4, 6]}];
        const zeros = sudokuSolver.cloneObjectArray(expectedZeros);
        const results = sudokuSolver.findPossibleDigits(puzzle, transposed, grids, zeros);

        for (const i in results)
            assert.deepEqual(results[i].possibleDigits, expectedZeros[i].possibleDigits);
    });

    test('Find possible matrixes', () => {
        const puzzle = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]];
        const transposed = sudokuSolver.transposeMatrix(puzzle);
        const grids = sudokuSolver.getGridArraysFromMatrix(puzzle);
        const zeros = sudokuSolver.findPossibleDigits(puzzle, transposed, grids);
        const solution = sudokuSolver.fillPossibleMatrixes(puzzle, transposed, grids, zeros);
        const answer = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]];

        assert.deepEqual(solution, answer);
    });

    test('Valid case', () => {
        const puzzle = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]];

        const answer = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]];

        assert.deepEqual(sudokuSolver.solveSudoku(puzzle), answer);
    });
});
