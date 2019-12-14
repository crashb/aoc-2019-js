const { readFileSync } = require("fs");
const { runIntCodeProgram } = require("./intcode");

const INPUT_FILE_PATH = "inputs/02_input.txt";

const TARGET_OUTPUT = 19690720;

function solvePartOne(program) {
    program[1] = 12;
    program[2] = 2;
    let finalState = runIntCodeProgram(program)[0];
    return finalState[0];
}

function solvePartTwo(program) {
    for (var noun = 0; noun < 100; noun++) {
        for (var verb = 0; verb < 100; verb++) {
            program[1] = noun;
            program[2] = verb;
            let finalState = runIntCodeProgram(program)[0];
            if (finalState[0] == TARGET_OUTPUT) {
                return 100 * noun + verb;
            }
        }
    }
}

function solveDayTwo() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let program = inputText.split(",").map(x => parseInt(x));
    let partOneSolution = solvePartOne(program);
    console.log(`Answer to Day 02 - Part 1: ${partOneSolution}`);
    let partTwoSolution = solvePartTwo(program);
    console.log(`Answer to Day 02 - Part 2: ${partTwoSolution}`);
}

module.exports = {
    solveDayTwo,
}