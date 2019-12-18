const assert = require("assert");
const { simulatePosAndVel, getSystemEnergy, getSystemCycleLength } = require("../src/12");

describe("Day 12", () => {
    describe("Part 1", () => {
        describe("simulatePosAndVel", () => {
            it("calculates the first example", () =>{
                let moons = [
                    {posX: -1, posY: 0, posZ: 2, velX: 0, velY: 0, velZ: 0},
                    {posX: 2, posY: -10, posZ: -7, velX: 0, velY: 0, velZ: 0},
                    {posX: 4, posY: -8, posZ: 8, velX: 0, velY: 0, velZ: 0},
                    {posX: 3, posY: 5, posZ: -1, velX: 0, velY: 0, velZ: 0},
                ];
                simulatePosAndVel(moons, 1);
                assert.deepEqual(moons[0], {posX: 2, posY: -1, posZ: 1, velX: 3, velY: -1, velZ: -1});
                assert.deepEqual(moons[1], {posX: 3, posY: -7, posZ: -4, velX: 1, velY: 3, velZ: 3});
                assert.deepEqual(moons[2], {posX: 1, posY: -7, posZ: 5, velX: -3, velY: 1, velZ: -3});
                assert.deepEqual(moons[3], {posX: 2, posY: 2, posZ: 0, velX: -1, velY: -3, velZ: 1});
                simulatePosAndVel(moons, 9);
                assert.deepEqual(moons[0], {posX: 2, posY: 1, posZ: -3, velX: -3, velY: -2, velZ: 1});
                assert.deepEqual(moons[1], {posX: 1, posY: -8, posZ: 0, velX: -1, velY: 1, velZ: 3});
                assert.deepEqual(moons[2], {posX: 3, posY: -6, posZ: 1, velX: 3, velY: 2, velZ: -3});
                assert.deepEqual(moons[3], {posX: 2, posY: 0, posZ: 4, velX: 1, velY: -1, velZ: -1});
            });
            it("calculates the second example", () =>{
                let moons = [
                    {posX: -8, posY: -10, posZ:  0, velX: 0, velY: 0, velZ: 0},
                    {posX:  5, posY:   5, posZ: 10, velX: 0, velY: 0, velZ: 0},
                    {posX:  2, posY:  -7, posZ:  3, velX: 0, velY: 0, velZ: 0},
                    {posX:  9, posY:  -8, posZ: -3, velX: 0, velY: 0, velZ: 0},
                ];
                simulatePosAndVel(moons, 10);
                assert.deepEqual(moons[0], {posX: -9, posY: -10, posZ:  1, velX: -2, velY: -2, velZ: -1});
                assert.deepEqual(moons[1], {posX:  4, posY:  10, posZ:  9, velX: -3, velY:  7, velZ: -2});
                assert.deepEqual(moons[2], {posX:  8, posY: -10, posZ: -3, velX:  5, velY: -1, velZ: -2});
                assert.deepEqual(moons[3], {posX:  5, posY: -10, posZ:  3, velX:  0, velY: -4, velZ:  5});
                simulatePosAndVel(moons, 90);
                assert.deepEqual(moons[0], {posX:   8, posY: -12, posZ: -9, velX: -7, velY:   3, velZ:  0});
                assert.deepEqual(moons[1], {posX:  13, posY:  16, posZ: -3, velX:  3, velY: -11, velZ: -5});
                assert.deepEqual(moons[2], {posX: -29, posY: -11, posZ: -1, velX: -3, velY:   7, velZ:  4});
                assert.deepEqual(moons[3], {posX:  16, posY: -13, posZ: 23, velX:  7, velY:   1, velZ:  1});
            });
        });
        describe("getSystemEnergy", () => {
            it("calculates the first example", () => {
                let moons = [
                    {posX: 2, posY: 1, posZ: -3, velX: -3, velY: -2, velZ: 1},
                    {posX: 1, posY: -8, posZ: 0, velX: -1, velY: 1, velZ: 3},
                    {posX: 3, posY: -6, posZ: 1, velX: 3, velY: 2, velZ: -3},
                    {posX: 2, posY: 0, posZ: 4, velX: 1, velY: -1, velZ: -1}
                ];
                assert.equal(getSystemEnergy(moons), 179);
            });
            it("calculates the second example", () => {
                let moons = [
                    {posX:   8, posY: -12, posZ: -9, velX: -7, velY:   3, velZ:  0},
                    {posX:  13, posY:  16, posZ: -3, velX:  3, velY: -11, velZ: -5},
                    {posX: -29, posY: -11, posZ: -1, velX: -3, velY:   7, velZ:  4},
                    {posX:  16, posY: -13, posZ: 23, velX:  7, velY:   1, velZ:  1}
                ];
                assert.equal(getSystemEnergy(moons), 1940);
            });
        });
    });

    describe("Part 2 - getSystemCycleLength", () => {
        it("calculates the given example", () => {
            let moons = [
                {posX: -8, posY: -10, posZ:  0, velX: 0, velY: 0, velZ: 0},
                {posX:  5, posY:   5, posZ: 10, velX: 0, velY: 0, velZ: 0},
                {posX:  2, posY:  -7, posZ:  3, velX: 0, velY: 0, velZ: 0},
                {posX:  9, posY:  -8, posZ: -3, velX: 0, velY: 0, velZ: 0},
            ];
            assert.equal(getSystemCycleLength(moons), 4686774924);
        });
    });
});