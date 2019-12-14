const assert = require("assert");
const { runIntcodeProgram } = require("../src/intcode");

describe('Day 02 #intcode', () => {
    describe('runIntcodeProgram', () => {
        it('executes the first example program', async () => {
            let program = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
            let expectedState = [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50];
            assert.deepEqual(await runIntcodeProgram(program), expectedState);
        });
        it('executes the second example program', async () => {
            let program = [1, 0, 0, 0, 99];
            let expectedState = [2, 0, 0, 0, 99];
            assert.deepEqual(await runIntcodeProgram(program), expectedState);
        });
        it('executes the third example program', async () => {
            let program = [2, 3, 0, 3, 99];
            let expectedState = [2, 3, 0, 6, 99];
            assert.deepEqual(await runIntcodeProgram(program), expectedState);
        });
        it('executes the fourth example program', async () => {
            let program = [2, 4, 4, 5, 99, 0];
            let expectedState = [2, 4, 4, 5, 99, 9801];
            assert.deepEqual(await runIntcodeProgram(program), expectedState);
        });
        it('executes the fifth example program', async () => {
            let program = [1, 1, 1, 4, 99, 5, 6, 0, 99];
            let expectedState = [30, 1, 1, 4, 2, 5, 6, 0, 99];
            assert.deepEqual(await runIntcodeProgram(program), expectedState);
        });
    });
});