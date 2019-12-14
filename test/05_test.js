const assert = require("assert");
const { runIntcodeProgram } = require("../src/intcode");
const { getOutputsFromSingleInput } = require("../src/05");


describe('Day 05 #intcode', () => {
    describe('Part 1 - runIntcodeProgram', () => {
        it('runs a program that outputs whatever it receives as input', async () => {
            let program = [3, 0, 4, 0, 99];
            let input = 123;
            outputs = await getOutputsFromSingleInput(program, input);
            assert.deepEqual(outputs, [input]);
        });
        it('runs a program that uses different parameter modes', async () => {
            let program = [1002, 4, 3, 4, 33]
            let expectedState = [1002, 4, 3, 4, 99];
            assert.deepEqual(await runIntcodeProgram(program), expectedState);
        });
        it('runs a program that uses negative numbers as parameters', async () => {
            let program = [1101, 100, -1, 4, 0];
            let expectedState = [1101, 100, -1, 4, 99];
            assert.deepEqual(await runIntcodeProgram(program), expectedState);
        });
    });

    describe("Part 2 - runIntcodeProgram", () => {
        describe("Position mode programs", () => {
            describe("runs a program testing the \"equals\" opcode", () => {
                let program = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
                it("outputs 1 when the input equals 8", async () => {
                    let outputs = await getOutputsFromSingleInput(program, 8);
                    assert.deepEqual(outputs, [1]);
                });
                it("outputs 0 when the input does not equal 8", async () => {
                    let outputs = await getOutputsFromSingleInput(program, 7);
                    assert.deepEqual(outputs, [0]);
                });
            });
            describe("runs a program testing the \"less than\" opcode", () => {
                let program = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
                it("outputs 1 when the input is less than 8", async () => {
                    let outputs = await getOutputsFromSingleInput(program, 7);
                    assert.deepEqual(outputs, [1]);
                });
                it("outputs 0 when the input is not less than 8", async () => {
                    let outputs = await getOutputsFromSingleInput(program, 8);
                    assert.deepEqual(outputs, [0]);
                });
            });
            describe("runs a program testing the \"jump-if-true\" and \"jump-if-false\" opcodes", () => {
                let program = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
                it("outputs 1 when the input is non-zero", async () => {
                    let outputs = await getOutputsFromSingleInput(program, 7);
                    assert.deepEqual(outputs, [1]);
                });
                it("outputs 0 when the input is zero", async () => {
                    let outputs = await getOutputsFromSingleInput(program, 0);
                    assert.deepEqual(outputs, [0]);
                });
            });
        });
        describe("Immediate mode programs", () => {
            describe("runs a program testing the \"equals\" opcode", () => {
                let program = [3, 3, 1108, -1, 8, 3, 4, 3, 99];
                it("outputs 1 when the input equals 8", async () => {
                    let outputs = await getOutputsFromSingleInput(program, 8);
                    assert.deepEqual(outputs, [1]);
                });
                it("outputs 0 when the input does not equal 8", async () => {
                    let outputs = await getOutputsFromSingleInput(program, 7);
                    assert.deepEqual(outputs, [0]);
                });
            });
            describe("runs a program testing the \"less than\" opcode", () => {
                let program = [3, 3, 1107, -1, 8, 3, 4, 3, 99];
                it("outputs 1 when the input is less than 8", async () => {
                    let outputs = await getOutputsFromSingleInput(program, 7);
                    assert.deepEqual(outputs, [1]);
                });
                it("outputs 0 when the input is not less than 8", async () => {
                    let outputs = await getOutputsFromSingleInput(program, 8);
                    assert.deepEqual(outputs, [0]);
                });
            });
            describe("runs a program testing the \"jump-if-true\" and \"jump-if-false\" opcodes", () => {
                let program = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
                it("outputs 1 when the input is non-zero", async () => {
                    let outputs = await getOutputsFromSingleInput(program, 7);
                    assert.deepEqual(outputs, [1]);
                });
                it("outputs 0 when the input is zero", async () => {
                    let outputs = await getOutputsFromSingleInput(program, 0);
                    assert.deepEqual(outputs, [0]);
                });
            });
        });

        describe("runs the final example program", () => {
            let program = [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 
                20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4,
                20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4,
                20, 1105, 1, 46, 98, 99];
            it("outputs 999 when the input is less than 8", async () => {
                let outputs = await getOutputsFromSingleInput(program, 7);
                assert.deepEqual(outputs, [999]);
            });
            it("outputs 1000 when the input is equal to 8", async () => {
                let outputs = await getOutputsFromSingleInput(program, 8);
                assert.deepEqual(outputs, [1000]);
            });
            it("outputs 1001 when the input is greater than 8", async () => {
                let outputs = await getOutputsFromSingleInput(program, 9);
                assert.deepEqual(outputs, [1001]);
            });
        });
    });
});