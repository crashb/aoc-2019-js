const { readFileSync } = require("fs");

const INPUT_FILE_PATH = "inputs/03_input.txt";

const DIRECTION_UP = 'U';
const DIRECTION_DOWN = 'D';
const DIRECTION_LEFT = 'L';
const DIRECTION_RIGHT = 'R';

function getDirectionDeltas(direction) {
    let x_delta = 0;
    let y_delta = 0;
    if (direction == DIRECTION_UP) {
        y_delta = 1;
    }
    else if (direction == DIRECTION_DOWN) {
        y_delta = -1;
    }
    else if (direction == DIRECTION_RIGHT) {
        x_delta = 1;
    }
    else if (direction == DIRECTION_LEFT) {
        x_delta = -1;
    }
    else {
        throw `Unimplemented direction: ${direction}`;
    }
    return [x_delta, y_delta];
}

function getWirePoints(wire) {
    x = 0;
    y = 0;
    length = 0;
    points = [];
    for (var i = 0; i < wire.length; i++) {
        let wireInstruction = wire[i];
        let direction = wireInstruction.slice(0, 1);
        let magnitude = parseInt(wireInstruction.slice(1));
        let [x_delta, y_delta] = getDirectionDeltas(direction);

        for (var j = 0; j < magnitude; j++) {
            x += x_delta;
            y += y_delta;
            length += 1;
            points.push([[x, y], length]);
        }
    }

    return points;
}

function closestIntersectionByManhattanDistance(firstWire, secondWire) {
    let firstWirePoints = getWirePoints(firstWire);
    let secondWirePoints = getWirePoints(secondWire);
    let firstWirePointsSet = new Set(firstWirePoints.map(p => JSON.stringify(p[0])));
    let secondWirePointsSet = new Set(secondWirePoints.map(p => JSON.stringify(p[0])));

    let intersections = [];
    for (let firstWirePoint of firstWirePointsSet) {
        if (secondWirePointsSet.has(firstWirePoint)) {
            intersections.push(JSON.parse(firstWirePoint));
        }
    }

    let intersectionManhattanDistances = intersections.map(p => Math.abs(p[0]) + Math.abs(p[1]));
    return Math.min(...intersectionManhattanDistances);
}

function wirePointsToObject(points) {
    let obj = {};
    for (var point of points) {
        let key = JSON.stringify(point[0]);
        if (!(obj[key] && obj[key] < point[1])) {
            obj[key] = point[1];
        }
    }
    return obj;
}

function closestIntersectionByWireLength(firstWire, secondWire) {
    let firstWirePoints = getWirePoints(firstWire);
    let secondWirePoints = getWirePoints(secondWire);
    let firstWirePointObject = wirePointsToObject(firstWirePoints);
    let secondWirePointObject = wirePointsToObject(secondWirePoints);

    let intersectionWireLengths = [];
    for (var firstWirePoint in firstWirePointObject) {
        if (firstWirePoint in secondWirePointObject) {
            intersectionWireLength = firstWirePointObject[firstWirePoint] + secondWirePointObject[firstWirePoint]
            intersectionWireLengths.push(intersectionWireLength);
        }
    }
    
    return Math.min(...intersectionWireLengths);
}

function solvePartOne(firstWire, secondWire) {
    return closestIntersectionByManhattanDistance(firstWire, secondWire);
}

function solvePartTwo(firstWire, secondWire) {
    return closestIntersectionByWireLength(firstWire, secondWire);
}

function solveDayThree() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let [firstWireText, secondWireText] = inputText.split("\n");
    let firstWire = firstWireText.split(",");
    let secondWire = secondWireText.split(",");
    let partOneSolution = solvePartOne(firstWire, secondWire);
    console.log(`Answer to Day 03 - Part 1: ${partOneSolution}`);
    let partTwoSolution = solvePartTwo(firstWire, secondWire);
    console.log(`Answer to Day 03 - Part 2: ${partTwoSolution}`);
}

module.exports = {
    closestIntersectionByManhattanDistance,
    closestIntersectionByWireLength,
    solveDayThree,
}