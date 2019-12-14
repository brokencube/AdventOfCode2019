"use strict";

const debug = require('debug');
const Register = require('./Register');

class Processor {
    /**
     * @param code string input program
     */
    constructor(memory) {
        this.memory = memory;
        this.opcodes = {};
        this.debug = debug('processor');
        this.counter = new Register(0);
    }

    run() {
        const length = this.memory.getLength();
        this.counter.write(0);
        while (this.counter.read() < length) {
            if (this.processOpcode() === false) {
                return;
            }
        }
        throw new Error("Unexpected end of program");
    }

    registerOpcode(opcode, callback) {
        this.opcodes[opcode] = callback;
    }

    processOpcode() {
        const counter = this.counter.read();
        const code = this.memory.readRaw(counter).toString().padStart(5, '0');
        this.debug('Interpret: $%d -> %s', counter, code);
        let opcode = code.substr(3, 2);
        let modes = [null, code.charAt(2), code.charAt(1), code.charAt(0)];

        if (!Object.hasOwnProperty.call(this.opcodes, opcode)) {
            this.debug("Unknown Opcode: %d", opcode);
            throw new Error("Unknown Opcode: " + opcode);
        }

        return this.opcodes[opcode](this.counter, this.memory, modes);
    }
}

module.exports = Processor;