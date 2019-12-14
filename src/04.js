const { readFileSync } = require("fs");

const INPUT_FILE_PATH = "inputs/04_input.txt";

function numberToDigits(num) {
    return Array.from(String(num), Number);
}

function passwordContainsDouble(password) {
    let digits = numberToDigits(password);
    for (let i = 0; i < digits.length - 1; i++) {
        if (digits[i] == digits[i + 1]) {
            return true;
        }
    }
    return false;
}

function passwordContainsExclusiveDouble(password) {
    let digits = numberToDigits(password);
    for (let i = 0; i < digits.length - 1; i++) {
        if (digits[i] == digits[i + 1]) {
            if ((i == 0 || digits[i - 1] != digits[i]) && (i == digits.length - 2 || digits[i + 2] != digits[i])) {
                return true;
            }
        }
    }
    return false;
}

function passwordNeverDecreases(password) {
    let digits = numberToDigits(password);
    let currentDigit = 0;
    for (let i = 0; i < digits.length; i++) {
        if (digits[i] < currentDigit) {
            return false;
        }
        currentDigit = digits[i];
    }
    return true;
}

function isPasswordValidPartOne(password) {
    return (passwordContainsDouble(password) && passwordNeverDecreases(password));
}

function isPasswordValidPartTwo(password) {
    return (passwordContainsExclusiveDouble(password) && passwordNeverDecreases(password));
}

function solvePartOne(lowBound, highBound) {
    let numValidPasswords = 0;
    for (let i = lowBound; i <= highBound; i++) {
        if (isPasswordValidPartOne(i)) {
            numValidPasswords++;
        }
    }
    return numValidPasswords;
}

function solvePartTwo(lowBound, highBound) {
    let numValidPasswords = 0;
    for (let i = lowBound; i <= highBound; i++) {
        if (isPasswordValidPartTwo(i)) {
            numValidPasswords++;
        }
    }
    return numValidPasswords;
}

function solveDayFour() {
    let inputText = readFileSync(INPUT_FILE_PATH, "utf-8");
    let [lowBound, highBound] = inputText.split('-');
    let partOneSolution = solvePartOne(lowBound, highBound);
    console.log(`Answer to Day 04 - Part 1: ${partOneSolution}`);
    let partTwoSolution = solvePartTwo(lowBound, highBound);
    console.log(`Answer to Day 04 - Part 2: ${partTwoSolution}`);
}

module.exports = {
    isPasswordValidPartOne,
    isPasswordValidPartTwo,
    solveDayFour,
}