const assert = require("assert");
const { isPasswordValidPartOne, isPasswordValidPartTwo } = require("../src/04");

describe("Day 04", () => {
    describe("Part 1 - isPasswordValidPartOne", () => {
        it("returns true under normal conditions", () => {
            assert.equal(isPasswordValidPartOne(122345), true);
        });
        it("returns true when all digits are the same", () => {
            assert.equal(isPasswordValidPartOne(111111), true);
        });
        it("returns false when a digit decreases", () => {
            assert.equal(isPasswordValidPartOne(223450), false);
        });
        it("returns false when missing a double", () => {
            assert.equal(isPasswordValidPartOne(123789), false);
        });
    });

    describe("Part 2 - isPasswordValidPartTwo", () => {
        it("returns true with three doubles", () => {
            assert.equal(isPasswordValidPartTwo(112233), true);
        });
        it("returns false with one triple", () => {
            assert.equal(isPasswordValidPartTwo(123444), false);
        });
        it("returns true with one quadruple and double", () => {
            assert.equal(isPasswordValidPartTwo(111122), true);
        });
    });
});