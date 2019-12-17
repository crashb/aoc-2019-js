const { readFileSync } = require("fs");
const { runIntcodeProgram, sendInput, getNewTopic } = require("../src/intcode");
const PubSub = require("pubsub-js");

const INPUT_FILE_PATH = "inputs/11_input.txt";

const COLOUR_BLACK = 0;
const COLOUR_WHITE = 1;

const TURN_LEFT = 0;
const TURN_RIGHT = 1;

const DIR_UP = 0; // [0, 1];
const DIR_RIGHT = 1; // [1, 0];
const DIR_DOWN = 2; // [0, -1];
const DIR_LEFT = 3; // [-1, 0];

// extracted for testability. all arguments to this function are expected to mutate.
function paintNextSquare(outputs, currentPos, currentDir, squares) {
    let newSquareColour = outputs.shift();
    let turnDirection = outputs.shift();

    squares[JSON.stringify(currentPos)] = newSquareColour;
    switch(turnDirection) {
        case TURN_RIGHT:
            currentDir[0] = (currentDir[0] + 1) % 4;
            break;
        case TURN_LEFT:
            currentDir[0] = (currentDir[0] + 3) % 4;
            break;
        default:
            throw `Unexpected direction to turn: ${outputs[1]}`;
    }

    let deltaCoords = [0, 0];
    switch(currentDir[0]) {
        case DIR_UP:
            deltaCoords = [0, 1];
            break;
        case DIR_RIGHT:
            deltaCoords = [1, 0];
            break;
        case DIR_DOWN:
            deltaCoords = [0, -1];
            break;
        case DIR_LEFT:
            deltaCoords = [-1, 0];
            break;
        default:
            throw `Unexpected direction to move: ${currentDir}`;
    }
    currentPos[0] += deltaCoords[0];
    currentPos[1] += deltaCoords[1];

    let currentSquareColour = squares[JSON.stringify(currentPos)];
    if (currentSquareColour == undefined) {
        currentSquareColour = COLOUR_BLACK;
    }
    return currentSquareColour;
}

async function getPaintedSquares(program, startingColour) {
    let currentPos = [0, 0];
    let currentDir = [DIR_UP];
    let currentSquareColour = startingColour;
    let squares = {};
    let topicInput = getNewTopic();
    let topicOutput = getNewTopic();

    let outputs = [];
    PubSub.subscribe(topicOutput, (msg, data) => {
        outputs.push(data);
        if (outputs.length < 2) {
            return;
        }

        let currentSquareColour = paintNextSquare(outputs, currentPos, currentDir, squares);
        sendInput(topicInput, currentSquareColour);
    });

    let runningProgram = runIntcodeProgram(program, topicInput, topicOutput);
    sendInput(topicInput, currentSquareColour);
    await runningProgram;
    return squares;
}

async function numSquaresPainted(program) {
    let squares = await getPaintedSquares(program, COLOUR_BLACK);
    return Object.keys(squares).length;
}

async function solvePartOne(program) {
    return await numSquaresPainted(program);
}

function getMessageFromWhiteSquares(squares) {
    let whiteSquaresJson = Object.keys(squares).reduce((acc, curr) => {
        if (squares[curr] == COLOUR_WHITE) {
            acc.push(curr);
        }
        return acc;
    }, []);
    let whiteSquareCoords = whiteSquaresJson.map(coords => JSON.parse(coords));

    let left = Math.min(...whiteSquareCoords.map(x => x[0]));
    let right = Math.max(...whiteSquareCoords.map(x => x[0]));
    let top = Math.max(...whiteSquareCoords.map(x => x[1]));
    let bottom = Math.min(...whiteSquareCoords.map(x => x[1]));

    let rows = [];
    for (let y = top; y >= bottom; y--) {
        let row = [];
        for (let x = left; x <= right; x++) {
            let coords = JSON.stringify([x, y]);
            if (whiteSquaresJson.includes(coords)) {
                row.push('#');
            }
            else {
                row.push('.');
            }
        }
        rows.push(row.join(""));
    }
    return rows.join("\n");
}

async function solvePartTwo(program) {
    let squares = await getPaintedSquares(program, COLOUR_WHITE);
    return getMessageFromWhiteSquares(squares);
}

async function solveDayEleven() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let program = inputText.split(",").map(x => parseInt(x));
    let partOneSolution = await solvePartOne(program);
    console.log(`Answer to Day 11 - Part 1: ${partOneSolution}`);
    let partTwoSolution = await solvePartTwo(program);
    console.log(`Answer to Day 11 - Part 2:\n${partTwoSolution}`);
}

module.exports = {
    paintNextSquare,
    solveDayEleven,
    DIR_UP,
    DIR_RIGHT,
    DIR_DOWN,
    DIR_LEFT
}