const assert = require("assert");
const { paintNextSquare, DIR_UP, DIR_LEFT, DIR_DOWN } = require("../src/11");

describe("Day 11 #intcode", () => {
    describe("Part 1 - paintNextSquare", () => {
        it("paints the given example", () => {
            let squares = {};
            let currentPos = [0, 0];
            let currentDir = [DIR_UP];

            paintNextSquare([1, 0], currentPos, currentDir, squares);
            assert.deepEqual(currentPos, [-1, 0]);
            assert.deepEqual(currentDir, [DIR_LEFT]);
            paintNextSquare([0, 0], currentPos, currentDir, squares);
            assert.deepEqual(currentPos, [-1, -1]);
            assert.deepEqual(currentDir, [DIR_DOWN]);
            paintNextSquare([1, 0], currentPos, currentDir, squares);
            paintNextSquare([1, 0], currentPos, currentDir, squares);
            assert.deepEqual(currentPos, [0, 0]);
            assert.deepEqual(currentDir, [DIR_UP]);
            paintNextSquare([0, 1], currentPos, currentDir, squares);
            paintNextSquare([1, 0], currentPos, currentDir, squares);
            paintNextSquare([1, 0], currentPos, currentDir, squares);
            assert.deepEqual(currentPos, [0, 1]);
            assert.deepEqual(currentDir, [DIR_LEFT]);

            assert.equal(Object.keys(squares).length, 6);
        });
    });
});