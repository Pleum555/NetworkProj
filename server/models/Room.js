const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    directed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Room", roomSchema);