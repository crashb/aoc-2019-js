const MODE_POSITION = 0;
const MODE_IMMEDIATE = 1;

const OPCODE_SUM = 1;
const OPCODE_MULT = 2;
const OPCODE_INPUT = 3;
const OPCODE_OUTPUT = 4;
const OPCODE_JIT = 5;
const OPCODE_JIF = 6;
const OPCODE_LT = 7;
const OPCODE_EQ = 8;
const OPCODE_HALT = 99;

const INSTRUCTION_LENGTHS = {
    [OPCODE_SUM]: 4,
    [OPCODE_MULT]: 4,
    [OPCODE_INPUT]: 2,
    [OPCODE_OUTPUT]: 2,
    [OPCODE_JIT]: 3,
    [OPCODE_JIF]: 3,
    [OPCODE_LT]: 4,
    [OPCODE_EQ]: 4
}

function getParameterMode(parameterModes, position) {
    return Math.floor(parameterModes / Math.pow(10, position - 1)) % 10;
}

function runIntCodeProgram(program, inputs = []) {
    let state = program.slice();
    let remainingInputs = inputs.slice();

    let programCounter = 0;
    let outputs = [];
    while (state[programCounter] % 100 != OPCODE_HALT) {
        let currentOpcode = state[programCounter] % 100;
        let currentModes = Math.floor(state[programCounter] / 100);
        let instructionLength = INSTRUCTION_LENGTHS[currentOpcode];
        let parameterIndices = [];
        for (let i = 1; i < instructionLength; i++) {
            let parameterMode = getParameterMode(currentModes, i);
            if (parameterMode == MODE_POSITION) {
                parameterIndices.push(state[programCounter + i]);
            }
            else if (parameterMode == MODE_IMMEDIATE) {
                parameterIndices.push(programCounter + i);
            }
        }
        let parameters = parameterIndices.map(i => state[i]);
        
        let jumped = false;
        switch(currentOpcode) {
            case OPCODE_SUM:
                state[parameterIndices[2]] = parameters[0] + parameters[1];
                break;
            case OPCODE_MULT:
                state[parameterIndices[2]] = parameters[0] * parameters[1];
                break;
            case OPCODE_INPUT:
                state[parameterIndices[0]] = remainingInputs.shift();
                break;
            case OPCODE_OUTPUT:
                outputs.push(parameters[0]);
                break;
            case OPCODE_JIT:
                if (parameters[0] != 0) {
                    programCounter = parameters[1];
                    jumped = true;
                }
                break;
            case OPCODE_JIF:
                if (parameters[0] == 0) {
                    programCounter = parameters[1];
                    jumped = true;
                }
                break;
            case OPCODE_LT:
                state[parameterIndices[2]] = (parameters[0] < parameters[1]) ? 1 : 0;
                break;
            case OPCODE_EQ:
                state[parameterIndices[2]] = (parameters[0] == parameters[1]) ? 1 : 0;
                break;
            default:
                throw `Invalid opcode encountered: ${state[programCounter]}`;
        }

        if (!jumped) {
            programCounter += instructionLength;
        }
    }
    return [state, outputs];
}

module.exports = {
    runIntCodeProgram,
}