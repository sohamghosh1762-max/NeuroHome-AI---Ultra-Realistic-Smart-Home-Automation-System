const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    room: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        default: false
    },

    powerUsage: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Device", deviceSchema);