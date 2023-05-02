const express = require('express');
const router = express.Router();

const {
    getallUndirectedRooms,
    getRoombyid,
    getRoombyname,
    createUndirectedRoom,
    createdirectedRoom,
    removeRoom 
} = require('../controllers/room');

// Routes for Rooms by http://localhost:4000/api/v1/rooms
router.get('/', getallUndirectedRooms);
router.post('/', createUndirectedRoom);
//router.post('/direct', createdirectedRoom);
router.delete('/', removeRoom);

module.exports = router;