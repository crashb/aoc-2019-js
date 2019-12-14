const assert = require("assert");
const { closestIntersectionByManhattanDistance, closestIntersectionByWireLength } = require("../src/03");

describe("Day 03", () => {
    describe("Part 1 - closestIntersectionByManhattanDistance", () => {
        it("calculates the first example", () => {
            let firstWire = ["R8", "U5", "L5", "D3"];
            let secondWire = ["U7", "R6", "D4", "L4"];
            assert.equal(closestIntersectionByManhattanDistance(firstWire, secondWire), 6);
        });
        it("calculates the second example", () => {
            let firstWire = ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"];
            let secondWire = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];
            assert.equal(closestIntersectionByManhattanDistance(firstWire, secondWire), 159);
        });
        it("calculates the third example", () => {
            let firstWire = ["R98", "U47", "R26", "D63", "R33", "U87", "L62", "D20", "R33", "U53", "R51"];
            let secondWire = ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"];
            assert.equal(closestIntersectionByManhattanDistance(firstWire, secondWire), 135);
        });
    });

    describe("Part 2 - closestIntersectionByWireLength", () => {
        it("calculates the first example", () => {
            let firstWire = ["R8", "U5", "L5", "D3"];
            let secondWire = ["U7", "R6", "D4", "L4"];
            assert.equal(closestIntersectionByWireLength(firstWire, secondWire), 30);
        });
        it("calculates the second example", () => {
            let firstWire = ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"];
            let secondWire = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];
            assert.equal(closestIntersectionByWireLength(firstWire, secondWire), 610);
        });
        it("calculates the third example", () => {
            let firstWire = ["R98", "U47", "R26", "D63", "R33", "U87", "L62", "D20", "R33", "U53", "R51"];
            let secondWire = ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"];
            assert.equal(closestIntersectionByWireLength(firstWire, secondWire), 410);
        });
    });
});