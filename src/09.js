const { readFileSync } = require("fs");
const { getOutputsFromSingleInput } = require("./05");

const INPUT_FILE_PATH = "inputs/09_input.txt";

async function solvePartOne(program) {
    let outputs = await getOutputsFromSingleInput(program, 1);
    return outputs[0];
}

async function solvePartTwo(program) {
    let outputs = await getOutputsFromSingleInput(program, 2);
    return outputs[0];
}

async function solveDayNine() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let program = inputText.split(",").map(x => parseInt(x));
    let partOneSolution = await solvePartOne(program);
    console.log(`Answer to Day 09 - Part 1: ${partOneSolution}`);
    let partTwoSolution = await solvePartTwo(program);
    console.log(`Answer to Day 09 - Part 2: ${partTwoSolution}`);
}

module.exports = {
    solveDayNine,
}    