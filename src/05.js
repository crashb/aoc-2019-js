const { readFileSync } = require("fs");
const { runIntCodeProgram } = require("../src/intcode");

const INPUT_FILE_PATH = "inputs/05_input.txt";

function solvePartOne(program) {
    let inputs = [1];
    let outputs = runIntCodeProgram(program, inputs)[1];
    for (let i = 0 ; i < outputs.length - 1; i++) {
        let output = outputs[i];
        if (output != 0) {
            throw `Output in position ${i} should have been 0 (was ${output})`;
        }
    }
    return outputs[outputs.length - 1];
}

function solvePartTwo(program) {
    let inputs = [5];
    let outputs = runIntCodeProgram(program, inputs)[1];
    return outputs[0];
}

function solveDayFive() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let program = inputText.split(",").map(x => parseInt(x));
    let partOneSolution = solvePartOne(program);
    console.log(`Answer to Day 05 - Part 1: ${partOneSolution}`);
    let partTwoSolution = solvePartTwo(program);
    console.log(`Answer to Day 05 - Part 2: ${partTwoSolution}`);
}

module.exports = {
    solveDayFive,
}