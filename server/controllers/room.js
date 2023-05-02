const Room = require("../models/Room");
// const filter = require("../utils/leave-room");
// const mongoose = require("mongoose");

//GET ROOMS
const getallUndirectedRooms = async(req, res) => {
    try {
        const rooms = await Room.find().where({directed: false});
        res.status(200).json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getRoombyid = async(req, res) => {
    try {
        const room = await Room.findById(req.body.roomId);
        res.status(201).json(room);
    } catch (err) {
        console.error(err);
        throw new Error('Could not find room by ID');
    }
};

const getRoombyname = async(req, res) => {
    try {
        const room = await Room.findOne({ name: req.params.roomName });
        res.status(201).json(room);
    } catch (err) {
        console.error(err);
        throw new Error('Could not find room by name');
    }
};

//CREATE ROOM
const createundirectedRoom = async(req, res) => {
    const name = req.body.name;
    try {
        const newRoom = new Room({name});
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createdirectedRoom = async(req, res) => {
    const name = req.body.name;
    const directed = true;
    // const room = await Room.findOne({ name: req.body.user.name });
    try {
        let newRoom;
        // if(!room)
            newRoom = new Room({name, directed});
        // else newRoom = room;
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const removeRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.roomName);
        res.status(201).json(room);
    } catch (err) {
        console.error(err);
        throw new Error('Could not delete room');
    }
};

module.exports = {
    getallUndirectedRooms,
    getRoombyid,
    getRoombyname,
    createundirectedRoom,
    createdirectedRoom,
    removeRoom
  };