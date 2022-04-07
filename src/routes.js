const express = require('express');
const { authenticateUser } = require('./controllers/authenticateUser');
const { getFinan, getFileFinan } = require('./controllers/finan');
const { getTicket } = require('./controllers/ticket');

const router = express.Router();

router.get('/login', authenticateUser);
router.get('/finan', getFinan);
router.get('/finan_file', getFileFinan);
router.get('/ticket', getTicket);

module.exports = router;