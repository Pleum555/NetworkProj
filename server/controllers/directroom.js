const DirectRoom = require("../models/DirectRoom");

//CREATE ROOM
const createDirectedRoomandgetId = async(req, res) => {
    try {
        const {user1, user2} = req.body;
        const checkRoom1 = await DirectRoom.findOne({user1: user1, user2: user2});
        const checkRoom2 = await DirectRoom.findOne({user1: user2, user2: user1});
        let directroomId;
        if(checkRoom1){
            directroomId = checkRoom1.id;
            console.log(1);
        }else if(checkRoom2){
            directroomId = checkRoom2.id;
            console.log(2);
        }else{
            const newRoom = await DirectRoom.create({user1, user2});
            const savedRoom = await newRoom.save();
            directroomId = savedRoom.id;
            console.log(3);
        }
        res.status(201).json(directroomId);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const removeDirectRoom = async (req, res) => {
    try {
        const room = await DirectRoom.findByIdAndDelete(req.params.roomName);
        res.status(201).json(room);
    } catch (err) {
        console.error(err);
        throw new Error('Could not delete room');
    }
};

module.exports = {
    createDirectedRoomandgetId,
    removeDirectRoom
  };