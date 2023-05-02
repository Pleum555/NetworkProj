const express = require('express');
const router = express.Router();

const {
    getallUndirectedRooms,
    getRoombyid,
    getRoombyname,
    createundirectedRoom,
    createdirectedRoom,
    removeRoom 
} = require('../controllers/room');

// Routes for Rooms
router.get('/', getallUndirectedRooms);
router.get('/:roomName', getRoombyname);
router.post('/', createundirectedRoom);
router.post('/direct', createdirectedRoom);
router.delete('/:roomName', removeRoom);

module.exports = router;