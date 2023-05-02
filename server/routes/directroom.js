const express = require('express');
const router = express.Router();

const {
    createDirectedRoomandgetId,
    removeDirectRoom
} = require('../controllers/directroom');

// Routes for Rooms by http://localhost:4000/api/v1/directrooms
router.get('/', createDirectedRoomandgetId);

module.exports = router;