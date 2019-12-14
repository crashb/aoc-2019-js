const assert = require("assert");
const { numOrbits, numTransfers } = require("../src/06");

describe("Day 06", () => {
    describe("Part 1 - numOrbits", () => {
        it("calulates the given example", () => {
            let map = [
                ["COM", "B"],
                ["B", "C"],
                ["C", "D"],
                ["D", "E"],
                ["E", "F"],
                ["B", "G"],
                ["G", "H"],
                ["D", "I"],
                ["E", "J"],
                ["J", "K"],
                ["K", "L"]
            ];
            assert.equal(numOrbits(map), 42);
        });
    });

    describe("Part 2 - numTransfers", ()=> {
        it("calulates the given example", () => {
            let map = [
                ["COM", "B"],
                ["B", "C"],
                ["C", "D"],
                ["D", "E"],
                ["E", "F"],
                ["B", "G"],
                ["G", "H"],
                ["D", "I"],
                ["E", "J"],
                ["J", "K"],
                ["K", "L"],
                ["K", "YOU"],
                ["I", "SAN"]
            ];
            assert.equal(numTransfers(map), 4);
        });
    });
});