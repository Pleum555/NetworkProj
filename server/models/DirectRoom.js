const mongoose = require("mongoose");

const directRoomSchema = mongoose.Schema({
    user1: {
        type: String,
        require: true
    },
    user2: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model("DirectRoom", directRoomSchema);