const { solveDayOne } = require("./src/01");
const { solveDayTwo } = require("./src/02");
const { solveDayThree } = require("./src/03");
const { solveDayFour } = require("./src/04");
const { solveDayFive } = require("./src/05");
const { solveDaySix } = require("./src/06");
const { solveDaySeven } = require("./src/07");

async function solveAllDays() {
    await solveDayOne();
    await solveDayTwo();
    await solveDayThree();
    await solveDayFour();
    await solveDayFive();
    await solveDaySix();
    await solveDaySeven();
}

solveAllDays();