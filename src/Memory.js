"use strict";

const debug = require('debug');

class Memory {
    constructor(memory) {
        this.memory = memory.split(',');
        this.debug = debug('memory');
    }

    write(value, location) {
        this.debug("Writing %d to $%d", value, location);
        this.memory[location] = value;
    }

    read(location, mode) {
        switch (mode.toString()) {
            case "0":
                let index = parseInt(this.memory[location]);
                let indexedValue = parseInt(this.memory[index]);
                this.debug("Read position $%d -> $%d -> %d", location, index, indexedValue);
                return indexedValue;

            case "1":
                let value = parseInt(this.memory[location]);
                this.debug("Read immediate $%d -> %d", location, value);
                return value;

            default:
                throw new Error("Unknown memory mode")
        }
    }

    readRaw(location) {
        return this.memory[location];
    }

    getLength() {
        return this.memory.length;
    }
}

module.exports = Memory;