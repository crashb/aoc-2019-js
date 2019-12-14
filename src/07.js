const { readFileSync } = require("fs");
const { runIntcodeProgram, sendInput, startRecordingOutputs, getOutputs, getNewTopic } = require("../src/intcode");
const { permutation } = require("js-combinatorics");

const INPUT_FILE_PATH = "inputs/07_input.txt";

async function maxThrusterSignal(program) {
    let phaseSettings = [0, 1, 2, 3, 4];
    let phasePermutations = permutation(phaseSettings).toArray();
    let maxSignal = 0;
    for (let settings of phasePermutations) {
        let runningAmps = [];
        let topics = [getNewTopic()];
        for (let i = 0; i < 5; i++) {
            topics.push(getNewTopic());
            runningAmps.push(runIntcodeProgram(program.slice(), topics[i], topics[i + 1]));
        }

        let outputTopic = topics[5];
        startRecordingOutputs(outputTopic);
        for (let i = 0; i < 5; i++) {
            sendInput(topics[i], settings[i]);
        }
        sendInput(topics[0], 0);
        await Promise.all(runningAmps);

        let output = getOutputs(outputTopic)[0];
        if (output > maxSignal) {
            maxSignal = output;
        }
    }
    return maxSignal;
}

async function maxThrusterFeedbackSignal(program) {
    let phaseSettings = [5, 6, 7, 8, 9];
    let phasePermutations = permutation(phaseSettings).toArray();
    let maxSignal = 0;
    for (let settings of phasePermutations) {
        let runningAmps = [];
        let topics = [getNewTopic()];
        for (let i = 0; i < 5; i++) {
            topics.push(getNewTopic());
            runningAmps.push(runIntcodeProgram(program.slice(), topics[i], topics[(i + 1) % 5]));
        }

        let outputTopic = topics[0];
        startRecordingOutputs(outputTopic);
        for (let i = 0; i < 5; i++) {
            sendInput(topics[i], settings[i]);
        }
        sendInput(topics[0], 0);
        await Promise.all(runningAmps);

        let outputs = getOutputs(outputTopic);
        let lastOutput = outputs[outputs.length - 1];
        if (lastOutput > maxSignal) {
            maxSignal = lastOutput;
        }
    }
    return maxSignal;
}

async function solvePartOne(program) {
    return await maxThrusterSignal(program);
}

async function solvePartTwo(program) {
    return await maxThrusterFeedbackSignal(program);
}

async function solveDaySeven() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let program = inputText.split(",").map(x => parseInt(x));
    let partOneSolution = await solvePartOne(program);
    console.log(`Answer to Day 07 - Part 1: ${partOneSolution}`);
    let partTwoSolution = await solvePartTwo(program);
    console.log(`Answer to Day 07 - Part 2: ${partTwoSolution}`);
}

module.exports = {
    maxThrusterSignal,
    maxThrusterFeedbackSignal,
    solveDaySeven,
}