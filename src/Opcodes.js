"use strict";

const debug = require('debug')('opcodes');
const util = require('util');
const readlineSync = require('readline-sync');

class Opcodes {

    static register(processor) {
        processor.registerOpcode("01", Opcodes.opcode1);
        processor.registerOpcode("02", Opcodes.opcode2);
        processor.registerOpcode("03", Opcodes.opcode3);
        processor.registerOpcode("04", Opcodes.opcode4);
        processor.registerOpcode("05", Opcodes.opcode5);
        processor.registerOpcode("06", Opcodes.opcode6);
        processor.registerOpcode("07", Opcodes.opcode7);
        processor.registerOpcode("08", Opcodes.opcode8);
        processor.registerOpcode("99", Opcodes.opcode99);
    }

    static opcode1(register, memory, modes) {
        let counter = register.read();
        let x = memory.read(counter + 1, modes[1]);
        let y = memory.read(counter + 2, modes[2]);
        let location = memory.read(counter + 3, 1);
        debug('01: %d + %d -> $%d', x, y, location);

        memory.write(x + y, location);
        register.increment(4);
        return true;
    }

    static opcode2(register, memory, modes) {
        let counter = register.read();
        let x = memory.read(counter + 1, modes[1]);
        let y = memory.read(counter + 2, modes[2]);
        let location = memory.read(counter + 3, 1);
        debug('02: %d * %d -> $%d', x, y, location);

        memory.write(x * y, location);
        register.increment(4);
        return true;
    }

    static opcode3(register, memory) {
        let counter = register.read();
        let input = parseInt(readlineSync.question("Input: "));
        let location = memory.read(counter + 1, 1);
        debug('03: INPUT %d -> $%d', input, location);

        memory.write(input, location);
        register.increment(2);
        return true;
    }

    static opcode4(register, memory, modes) {
        let counter = register.read();
        let value = memory.read(counter + 1, modes[1]);
        debug('04: OUTPUT %d', value);

        console.log(util.format("OUTPUT: %d", value));
        register.increment(2);
        return true;
    }

    static opcode5(register, memory, modes) {
        let counter = register.read();
        let value = memory.read(counter + 1, modes[1]);
        let jump = memory.read(counter + 2, modes[2]);
        debug('05: %d != ZERO -> JUMP $%d', value, jump);

        if (value !== 0) {
            register.write(jump);
        } else {
            register.increment(3);
        }
        return true;
    }

    static opcode6(register, memory, modes) {
        let counter = register.read();
        let value = memory.read(counter + 1, modes[1]);
        let jump = memory.read(counter + 2, modes[2]);
        debug('06: %d == ZERO -> JUMP $%d', value, jump);

        if (value === 0) {
            register.write(jump);
        } else {
            register.increment(3);
        }
        return true;
    }

    static opcode7(register, memory, modes) {
        let counter = register.read();
        let x = memory.read(counter + 1, modes[1]);
        let y = memory.read(counter + 2, modes[2]);
        let value = x < y ? 1 : 0;
        let location = memory.read(counter + 3, 1);
        debug('07: %d < %d -> $%d = %d', x, y, location, value);

        memory.write(value, location);
        register.increment(4);
        return true;
    }

    static opcode8(register, memory, modes) {
        let counter = register.read();
        let x = memory.read(counter + 1, modes[1]);
        let y = memory.read(counter + 2, modes[2]);
        let value = x === y ? 1 : 0;
        let location = memory.read(counter + 3, 1);
        debug('08: %d == %d -> $%d = %d', x, y, location, value);

        memory.write(value, location);
        register.increment(4);
        return true;
    }

    static opcode99() {
        debug('Terminate');
        return false;
    }
}

module.exports = Opcodes;