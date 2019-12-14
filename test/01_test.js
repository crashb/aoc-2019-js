var assert = require("assert");
var { fuelForMass, totalFuelForMass } = require("../src/01");

describe('Day 01', () => {
    describe('Part 1 - fuelForMass', () => {
        it('calculates the first example', () => {
            assert.equal(fuelForMass(12), 2);
        });
        it('calculates the second example', () => {
            assert.equal(fuelForMass(14), 2);
        });
        it('calculates the third example', () => {
            assert.equal(fuelForMass(1969), 654);
        });
        it('calculates the fourth example', () => {
            assert.equal(fuelForMass(100756), 33583);
        });
    });

    describe('Part 2 - totalFuelForMass', () => {
        it('calculates the first example', () => {
            assert.equal(totalFuelForMass(14), 2);
        });
        it('calculates the second example', () => {
            assert.equal(totalFuelForMass(1969), 966);
        });
        it('calculates the third example', () => {
            assert.equal(totalFuelForMass(100756), 50346);
        });
    });
});
 