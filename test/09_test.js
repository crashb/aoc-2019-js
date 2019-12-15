const assert = require("assert");
const { runIntcodeProgram, startRecordingOutputs, getOutputs, getNewTopic } = require("../src/intcode");

async function getOutputsFromProgramWithNoInput(program) {
    let outputTopic = getNewTopic();
    startRecordingOutputs(outputTopic);
    await runIntcodeProgram(program, "", outputTopic);
    return getOutputs(outputTopic);
}

describe("Day 09 #intcode", () => {
    it("runs the first example program (a quine)", async () => {
        let program = [109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99];
        let outputs = await getOutputsFromProgramWithNoInput(program);
        assert.deepEqual(outputs, program);
    });
    it("runs the second example program", async () => {
        let program = [1102, 34915192, 34915192, 7, 4, 7, 99, 0];
        let outputs = await getOutputsFromProgramWithNoInput(program);
        assert.equal(outputs[0], 1219070632396864);
    });
    it("runs the third example program", async () => {
        let program = [104, 1125899906842624, 99];
        let outputs = await getOutputsFromProgramWithNoInput(program);
        assert.equal(outputs[0], 1125899906842624);
    });
});