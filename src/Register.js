"use strict";

const debug = require('debug');

class Register {
    constructor(value) {
        this.value = value;
        this.debug = debug('register');
    }

    write(value) {
        this.debug("Writing %d to register", value);
        this.value = value;
    }

    increment(value) {
        this.debug("Incrementing register %d + %d", this.value, value);
        this.value += value;
    }

    read() {
        return this.value;
    }
}

module.exports = Register;