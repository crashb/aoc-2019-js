const { readFileSync } = require("fs");

const INPUT_FILE_PATH = "inputs/01_input.txt";

const fuelForMass = mass => Math.floor(mass / 3) - 2;
function totalFuelForMass(mass) {
    let currentFuel = fuelForMass(mass);
    let totalFuel = 0;
    while (currentFuel >= 0) {
        totalFuel += currentFuel;
        currentFuel = fuelForMass(currentFuel)
    }
    return totalFuel;
}

const sumOfArray = arr => arr.reduce((a, b) => a + b, 0);

function solvePartOne(masses) {
    let fuels = masses.map(mass => fuelForMass(mass));
    return sumOfArray(fuels);
}

function solvePartTwo(masses) {
    let totalFuels = masses.map(mass => totalFuelForMass(mass));
    return sumOfArray(totalFuels);
}

function solveDayOne() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let masses = inputText.split("\n").filter(x => x != "").map(x => parseInt(x));
    let partOneSolution = solvePartOne(masses);
    console.log(`Answer to Day 01 - Part 1: ${partOneSolution}`);
    let partTwoSolution = solvePartTwo(masses);
    console.log(`Answer to Day 01 - Part 2: ${partTwoSolution}`);
}

module.exports = {
    fuelForMass,
    totalFuelForMass,
    solveDayOne,
}
