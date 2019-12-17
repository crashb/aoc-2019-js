const { readFileSync } = require("fs");

const INPUT_FILE_PATH = "inputs/10_input.txt";

const ASTEROID_CHAR = '#';

function asteroidsByDirection(rows, stationCol, stationRow) {
    let directions = {};
    for (let r = 0; r < rows.length; r++) {
        for (let c = 0; c < rows[r].length; c++) {
            if (rows[r][c] == ASTEROID_CHAR) {
                if (r == stationRow && c == stationCol) {
                    continue;
                }

                let deltaR = r - stationRow;
                let deltaC = c - stationCol;
                let asteroidDistance = Math.sqrt(Math.pow(deltaR, 2) + Math.pow(deltaC, 2));
                let direction = JSON.stringify([Number((deltaC / asteroidDistance).toFixed(8)), Number((deltaR / asteroidDistance).toFixed(8))]);
                if (!(direction in directions)) {
                    directions[direction] = [];
                }
                directions[direction].push([c, r, asteroidDistance]);
            }
        }
    }
    
    // for each direction, sort by distance from station
    for (let direction in directions) {
        directions[direction].sort((a, b) => a[2] - b[2]);
        directions[direction] = directions[direction].map(d => d.slice(0, 2))
    }

    return directions;
}

function numDetectableAsteroids(rows, stationCol, stationRow) {
    let asteroidDirections = asteroidsByDirection(rows, stationCol, stationRow);
    return Object.keys(asteroidDirections).length;
}

function maxDetectableAsteroids(inputText) {
    let rows = inputText.split("\n").filter(r => r != "").map(r => r.split(""));
    let maxAsteroids = 0;
    let bestLocation = [];
    for (let r = 0; r < rows.length; r++) {
        for (let c = 0; c < rows[r].length; c++) {
            if (rows[r][c] == ASTEROID_CHAR) {
                let numAsteroids = numDetectableAsteroids(rows, c, r);
                if (numAsteroids > maxAsteroids) {
                    maxAsteroids = numAsteroids;
                    bestLocation = [c, r];
                }
            }
        }
    }
    return [maxAsteroids, bestLocation];
}

function destroyedAsteroidLocations(inputText, stationCol, stationRow) {
    let rows = inputText.split("\n").filter(r => r != "").map(r => r.split(""));
    
    // each direction is of the form [normalizedColDistance, normalizedRowDistance]
    let asteroidDirections = asteroidsByDirection(rows, stationCol, stationRow);
    let allDirections = Object.keys(asteroidDirections).map(d => JSON.parse(d));
    let rightDirections = allDirections.filter(d => (d[0] == 0 && d[1] == -1) || (d[0] > 0));  // get asteroids directly above and to the right of the station
    let rightDirectionsSorted = rightDirections.sort((a, b) => a[1] - b[1]);  // sort descending vertically on the right side
    let leftDirections = allDirections.filter(d => (d[0] == 0 && d[1] == 1) || (d[0] < 0));  // get asteroids directly below and to the left of the station
    let leftDirectionsSorted = leftDirections.sort((a, b) => b[1] - a[1]);  // sort ascending vertically on the left side
    let allDirectionsSorted = rightDirectionsSorted.concat(leftDirectionsSorted);  // join the two halves to get a clockwise ordering of directions

    let destroyedOrder = {};
    let i = 1;
    while (Object.entries(asteroidDirections).length > 0) {
        for (let dir of allDirectionsSorted) {
            let jsonDir = JSON.stringify(dir);
            if (!(jsonDir in asteroidDirections)) {
                continue;
            }

            let destroyedAsteroid = asteroidDirections[jsonDir].shift();
            if (asteroidDirections[jsonDir].length == 0) {
                delete asteroidDirections[jsonDir];
            }

            destroyedOrder[i] = destroyedAsteroid;
            i++;
        }        
    }
    return destroyedOrder;
}

function solvePartOne(inputText) {
    return maxDetectableAsteroids(inputText);
}

function solvePartTwo(inputText, stationCol, stationRow) {
    return destroyedAsteroidLocations(inputText, stationCol, stationRow);
}

function solveDayTen() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let partOneResult = solvePartOne(inputText);
    let partOneSolution = partOneResult[0];
    let partOneLocation = partOneResult[1];
    console.log(`Answer to Day 10 - Part 1: ${partOneSolution} (at ${partOneLocation[0]}, ${partOneLocation[1]})`);
    let partTwoResult = solvePartTwo(inputText, partOneLocation[0], partOneLocation[1]);
    let partTwoLocation = partTwoResult[200];
    let partTwoSolution = 100 * partTwoLocation[0] + partTwoLocation[1];
    console.log(`Answer to Day 10 - Part 2: ${partTwoSolution}`);
}

module.exports = {
    maxDetectableAsteroids,
    destroyedAsteroidLocations,
    solveDayTen,
}