const assert = require("assert");
const { maxDetectableAsteroids, destroyedAsteroidLocations } = require("../src/10");

describe("Day 10", () => {
    describe("Part 1 - maxDetectableAsteroids", () => {
        it("calculates the first example", () => {
            let map = ".#..#\n" +
                      ".....\n" +
                      "#####\n" +
                      "....#\n" +
                      "...##\n";
            let result = maxDetectableAsteroids(map);
            assert.equal(result[0], 8);
            assert.deepEqual(result[1], [3, 4]);
        });
        it("calculates the second example", () => {
            let map = "......#.#.\n" +
                      "#..#.#....\n" +
                      "..#######.\n" +
                      ".#.#.###..\n" +
                      ".#..#.....\n" +
                      "..#....#.#\n" +
                      "#..#....#.\n" +
                      ".##.#..###\n" +
                      "##...#..#.\n" +
                      ".#....####\n";
            let result = maxDetectableAsteroids(map);
            assert.equal(result[0], 33);
            assert.deepEqual(result[1], [5, 8]);
        });
        it("calculates the third example", () => {
            let map = "#.#...#.#.\n" +
                      ".###....#.\n" +
                      ".#....#...\n" +
                      "##.#.#.#.#\n" +
                      "....#.#.#.\n" +
                      ".##..###.#\n" +
                      "..#...##..\n" +
                      "..##....##\n" +
                      "......#...\n" +
                      ".####.###.\n";
            let result = maxDetectableAsteroids(map);
            assert.equal(result[0], 35);
            assert.deepEqual(result[1], [1, 2]);
        });
        it("calculates the fourth example", () => {
            let map = ".#..#..###\n" +
                      "####.###.#\n" +
                      "....###.#.\n" +
                      "..###.##.#\n" +
                      "##.##.#.#.\n" +
                      "....###..#\n" +
                      "..#.#..#.#\n" +
                      "#..#.#.###\n" +
                      ".##...##.#\n" +
                      ".....#.#..\n";
            let result = maxDetectableAsteroids(map);
            assert.equal(result[0], 41);
            assert.deepEqual(result[1], [6, 3]);
        });
        it("calculates the fifth example", () => {
            let map = ".#..##.###...#######\n" +
                      "##.############..##.\n" +
                      ".#.######.########.#\n" +
                      ".###.#######.####.#.\n" +
                      "#####.##.#.##.###.##\n" +
                      "..#####..#.#########\n" +
                      "####################\n" +
                      "#.####....###.#.#.##\n" +
                      "##.#################\n" +
                      "#####.##.###..####..\n" +
                      "..######..##.#######\n" +
                      "####.##.####...##..#\n" +
                      ".#####..#.######.###\n" +
                      "##...#.##########...\n" +
                      "#.##########.#######\n" +
                      ".####.#.###.###.#.##\n" +
                      "....##.##.###..#####\n" +
                      ".#.#.###########.###\n" +
                      "#.#.#.#####.####.###\n" +
                      "###.##.####.##.#..##\n";
            let result = maxDetectableAsteroids(map);
            assert.equal(result[0], 210);
            assert.deepEqual(result[1], [11, 13]);
        });
    });

    describe("Part 2 - nthDestroyedAsteroid", () => {
        it("calculates the first example", () => {
            let map = ".#....#####...#..\n" +
                      "##...##.#####..##\n" +
                      "##...#...#.#####.\n" +
                      "..#.....#...###..\n" +
                      "..#.#.....#....##\n";
            let result = destroyedAsteroidLocations(map, 8, 3);
            assert.deepEqual(result[1],   [8,  1]);
            assert.deepEqual(result[2],   [9,  0]);
            assert.deepEqual(result[3],   [9,  1]);
            assert.deepEqual(result[10],  [12, 2]);
            assert.deepEqual(result[20],  [2,  3]);
            assert.deepEqual(result[30],  [7,  0]);
            assert.deepEqual(result[36],  [14, 3]);
        });
        it("calculates the second example", () => {
            let map = ".#..##.###...#######\n" +
                      "##.############..##.\n" +
                      ".#.######.########.#\n" +
                      ".###.#######.####.#.\n" +
                      "#####.##.#.##.###.##\n" +
                      "..#####..#.#########\n" +
                      "####################\n" +
                      "#.####....###.#.#.##\n" +
                      "##.#################\n" +
                      "#####.##.###..####..\n" +
                      "..######..##.#######\n" +
                      "####.##.####...##..#\n" +
                      ".#####..#.######.###\n" +
                      "##...#.##########...\n" +
                      "#.##########.#######\n" +
                      ".####.#.###.###.#.##\n" +
                      "....##.##.###..#####\n" +
                      ".#.#.###########.###\n" +
                      "#.#.#.#####.####.###\n" +
                      "###.##.####.##.#..##\n";
            let result = destroyedAsteroidLocations(map, 11, 13);
            assert.deepEqual(result[1],   [11, 12]);
            assert.deepEqual(result[2],   [12, 1]);
            assert.deepEqual(result[3],   [12, 2]);
            assert.deepEqual(result[10],  [12, 8]);
            assert.deepEqual(result[20],  [16, 0]);
            assert.deepEqual(result[50],  [16, 9]);
            assert.deepEqual(result[100], [10, 16]);
            assert.deepEqual(result[199], [9,  6]);
            assert.deepEqual(result[200], [8,  2]);
            assert.deepEqual(result[201], [10, 9]);
            assert.deepEqual(result[299], [11, 1]);
        });
    });
});