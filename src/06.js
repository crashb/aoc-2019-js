const { readFileSync } = require("fs");

const INPUT_FILE_PATH = "inputs/06_input.txt";

const BODY_CENTER = 'COM';
const BODY_SOURCE = 'YOU';
const BODY_TARGET = 'SAN';

function numOrbits(map) {
    let orbitsPerBody = { [BODY_CENTER]: 0 };
    let bodiesToProcess = [BODY_CENTER];
    while (bodiesToProcess.length > 0) {
        let currentBody = bodiesToProcess.shift();
        let directOrbits = map.filter(x => x[0] == currentBody).map(x => x[1]);
        for (let orbit of directOrbits) {
            orbitsPerBody[orbit] = orbitsPerBody[currentBody] + 1;
            bodiesToProcess.push(orbit);
        }
    }
    return Object.values(orbitsPerBody).reduce((a, b) => a + b);
}

function numTransfers(map) {
    let orbitsObject = map.reduce((obj, orbit) => {
        obj[orbit[1]] = orbit[0];
        return obj;
    }, {});

    let nodesSourceToCom = {};
    let currentBody = BODY_SOURCE;
    let distanceFromSource = 0;
    while (orbitsObject[currentBody] != BODY_CENTER) {
        let nextBody = orbitsObject[currentBody];
        nodesSourceToCom[nextBody] = distanceFromSource;
        currentBody = nextBody;
        distanceFromSource++;
    }

    currentBody = BODY_TARGET;
    let distanceFromTarget = 0;
    while (orbitsObject[currentBody] != BODY_CENTER) {
        let nextBody = orbitsObject[currentBody];
        if (nextBody in nodesSourceToCom) {
            return distanceFromTarget + nodesSourceToCom[nextBody];
        }
        currentBody = nextBody;
        distanceFromTarget++;
    }

    throw `Path not found between \"${BODY_SOURCE}\" and \"${BODY_TARGET}\"`;
}

function solvePartOne(map) {
    return numOrbits(map);
}

function solvePartTwo(map) {
    return numTransfers(map);
}

function solveDaySix() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let map = inputText.split("\n").filter(x => x != "").map(x => x.split(')'));
    let partOneSolution = solvePartOne(map);
    console.log(`Answer to Day 06 - Part 1: ${partOneSolution}`);
    let partTwoSolution = solvePartTwo(map);
    console.log(`Answer to Day 06 - Part 2: ${partTwoSolution}`);
}

module.exports = {
    numOrbits,
    numTransfers,
    solveDaySix,
}