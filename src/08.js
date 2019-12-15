const { readFileSync } = require("fs");

const INPUT_FILE_PATH = "inputs/08_input.txt";

const IMAGE_WIDTH = 25;
const IMAGE_HEIGHT = 6;

function getLayersFromDigits(digits, width, height) {
    let pixelsPerLayer = width * height;
    let layers = [];
    for (let i = 0; i < digits.length; i += pixelsPerLayer) {
        layers.push(digits.slice(i, i + pixelsPerLayer));
    }
    return layers;
}

function numDigitsInLayer(layer, digit) {
    return layer.filter(x => x == digit).length;
}

function layerChecksum(layers) {
    let layerWithLeastZeroes = layers.reduce((acc, curr) => numDigitsInLayer(curr, 0) < numDigitsInLayer(acc, 0) ? curr : acc);
    return numDigitsInLayer(layerWithLeastZeroes, 1) * numDigitsInLayer(layerWithLeastZeroes, 2);
}

function decodeImage(layers, width, height) {
    let pixelsPerLayer = width * height;
    let finalLayer = new Array(pixelsPerLayer).fill(2);
    let currentLayerIndex = 0;
    while (numDigitsInLayer(finalLayer, 2) > 0) {
        let currentLayer = layers[currentLayerIndex];
        for (let i = 0; i < pixelsPerLayer; i++) {
            if (finalLayer[i] == 2) {
                finalLayer[i] = currentLayer[i];
            }
        }
        currentLayerIndex++;
    }

    let finalRows = [];
    for (let i = 0; i < pixelsPerLayer; i += width) {
        finalRows.push(finalLayer.slice(i, i + width));
    }
    return finalRows.map(r => r.join("")).join("\n");
}

function solvePartOne(layers) {
    return layerChecksum(layers);
}

function solvePartTwo(layers, width, height) {
    return decodeImage(layers, width, height);
}

function prettifyImage(image) {
    return image.split("").map(p => p == '0' ? '.' : p).map(p => p == '1' ? '#' : p).join("");
}

function solveDayEight() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let digits = inputText.split("").filter(x => x != "\n").map(Number);
    let layers = getLayersFromDigits(digits, IMAGE_WIDTH, IMAGE_HEIGHT);
    let partOneSolution = solvePartOne(layers);
    console.log(`Answer to Day 08 - Part 1: ${partOneSolution}`);
    let partTwoSolution = solvePartTwo(layers, IMAGE_WIDTH, IMAGE_HEIGHT);
    let prettySolution = prettifyImage(partTwoSolution);
    console.log(`Answer to Day 08 - Part 2:\n${prettySolution}`);
}

module.exports = {
    getLayersFromDigits,
    decodeImage,
    solveDayEight,
}