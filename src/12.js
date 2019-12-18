const { readFileSync } = require("fs");

const INPUT_FILE_PATH = "inputs/12_input.txt";

// https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers/37716618
function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
}

https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers/37716618
function lcm(a, b) {
    return (a * b) / gcd(a, b);   
}

function lcmThreeFactors(a, b, c) {
    let lcmAB = lcm(a, b);
    return lcm(lcmAB, c);
}

function arraysEqual(a, b) {
    return (a.length == b.length) && a.every((value, index) => b[index] == value);
}

function updateVel(a, b) {
    for (let axis of ['X', 'Y', 'Z']) {
        let posAxis = `pos${axis}`;
        let velAxis = `vel${axis}`;

        let velChange = 0;
        if (a[posAxis] > b[posAxis]) {
            velChange = -1;
        }
        else if (a[posAxis] < b[posAxis]) {
            velChange = 1;
        }

        a[velAxis] += velChange;
    }
}

function updatePos(moon) {
    for (let axis of ['X', 'Y', 'Z']) {
        let posAxis = `pos${axis}`;
        let velAxis = `vel${axis}`;
        moon[posAxis] += moon[velAxis];
    }
}

function simulatePosAndVel(moons, numSteps) {
    for (let i = 0; i < numSteps; i++) {
        for (let a of moons) {
            for (let b of moons) {
                if (a == b) {
                    continue;
                }
            
                updateVel(a, b);
            }
        }
    
        for (let moon of moons) {
            updatePos(moon);
        }
    }
}

function getSystemEnergy(moons) {
    let systemEnergy = 0;
    for (let moon of moons) {
        let potentialEnergy = Math.abs(moon.posX) + Math.abs(moon.posY) + Math.abs(moon.posZ);
        let kineticEnergy = Math.abs(moon.velX) + Math.abs(moon.velY) + Math.abs(moon.velZ);
        let totalEnergy = potentialEnergy * kineticEnergy;
        systemEnergy += totalEnergy;
    }
    return systemEnergy;
}

function solvePartOne(moons) {
    simulatePosAndVel(moons, 1000);
    return getSystemEnergy(moons);
}

function getSystemCycleLength(moons) {
    let initialPositions = {
        X: moons.map(m => m.posX),
        Y: moons.map(m => m.posY),
        Z: moons.map(m => m.posZ)
    }
    let cycles = {
        X: 0,
        Y: 0,
        Z: 0
    }
    let numCycles = 0;
    while (cycles.X == 0 || cycles.Y == 0 || cycles.Z == 0) {
        numCycles++;
        simulatePosAndVel(moons, 1);
        let currentPositions = {
            X: moons.map(m => m.posX),
            Y: moons.map(m => m.posY),
            Z: moons.map(m => m.posZ)
        }
        let currentVelocities = {
            X: moons.map(m => m.velX),
            Y: moons.map(m => m.velY),
            Z: moons.map(m => m.velZ)
        }
        for (let axis of ["X", "Y", "Z"]) {
            if (cycles[axis] != 0) {
                continue;
            }
            if (!arraysEqual([0, 0, 0, 0], currentVelocities[axis])) {
                continue;
            }
            if (!arraysEqual(initialPositions[axis], currentPositions[axis])) {
                continue;
            }

            cycles[axis] = numCycles;
        }
    }
    
    return lcmThreeFactors(cycles.X, cycles.Y, cycles.Z);
}

function solvePartTwo(moons) {
    return getSystemCycleLength(moons);
}

function getMoonsFromInputText(inputText) {
    let moonsText = inputText.split("\n").filter(m => m != "").map(m => m.slice(1, m.length - 1));
    let moonPositions = moonsText.map(m => m.split(", ").map(p => Number(p.split("=")[1])));
    let moons = [];
    for (let moonPosition of moonPositions) {
        moons.push({
            posX: moonPosition[0],
            posY: moonPosition[1],
            posZ: moonPosition[2],
            velX: 0,
            velY: 0,
            velZ: 0
        });
    }
    return moons;
}

function solveDayTwelve() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let partOneMoons = getMoonsFromInputText(inputText);
    let partOneSolution = solvePartOne(partOneMoons);
    console.log(`Answer to Day 12 - Part 1: ${partOneSolution}`);

    let partTwoMoons = getMoonsFromInputText(inputText);
    let partTwoSolution = solvePartTwo(partTwoMoons);
    console.log(`Answer to Day 12 - Part 2: ${partTwoSolution}`);
}

module.exports = {
    simulatePosAndVel,
    getSystemEnergy,
    getSystemCycleLength,
    solveDayTwelve,
}