const { readFileSync } = require("fs");
const { runIntcodeProgram, sendInput, startRecordingOutputs, getOutputs, getNewTopic } = require("../src/intcode");

const INPUT_FILE_PATH = "inputs/05_input.txt";

async function getOutputsFromSingleInput(program, input) {
    const inputTopic = getNewTopic();
    const outputTopic = getNewTopic();

    startRecordingOutputs(outputTopic);
    let runningProgram = runIntcodeProgram(program, inputTopic, outputTopic);
    sendInput(inputTopic, input);
    await runningProgram;

    return getOutputs(outputTopic);
}

function validateOutputs(outputs) {
    for (let i = 0; i < outputs.length - 1; i++) {
        let output = outputs[i];
        if (output != 0) {
            throw `Output should have been zero but was instead \"${output}\"`;
        }
    }
}

async function solvePartOne(program) {
    let outputs = await getOutputsFromSingleInput(program, 1);
    validateOutputs(outputs);
    return outputs[outputs.length - 1];
}

async function solvePartTwo(program) {
    let outputs = await getOutputsFromSingleInput(program, 5);
    validateOutputs(outputs);
    return outputs[outputs.length - 1];
}

async function solveDayFive() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let program = inputText.split(",").map(x => parseInt(x));
    let partOneSolution = await solvePartOne(program);
    console.log(`Answer to Day 05 - Part 1: ${partOneSolution}`);
    let partTwoSolution = await solvePartTwo(program);
    console.log(`Answer to Day 05 - Part 2: ${partTwoSolution}`);
}

module.exports = {
    getOutputsFromSingleInput,
    solveDayFive,
}