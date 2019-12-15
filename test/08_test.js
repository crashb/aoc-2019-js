const assert = require("assert");
const { getLayersFromDigits, decodeImage } = require("../src/08");

describe("Day 08", () => {
    describe("Part 1 - getLayersFromDigits", () => {
        it("calculates the given example", () => {
            let input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2];
            let expected = [[1, 2, 3, 4, 5, 6], [7, 8, 9, 0, 1, 2]];
            assert.deepEqual(getLayersFromDigits(input, 3, 2), expected);
        });
    });

    describe("Part 2 - decodeImage", () => {
        it("calculates the given example", () => {
            let input = [[0, 2, 2, 2], [1, 1, 2, 2], [2, 2, 1, 2], [0, 0, 0, 0]];
            let expected = "01\n10";
            assert.equal(decodeImage(input, 2, 2), expected);
        });
    });
});