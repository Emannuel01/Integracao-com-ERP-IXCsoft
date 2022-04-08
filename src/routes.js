const express = require('express');
const { authenticateUser } = require('./controllers/authenticateUser');
const { getFinan, getFileFinan } = require('./controllers/finan');

const router = express.Router();

router.post('/login', authenticateUser);
router.post('/finan', getFinan);
router.post('/finan_file', getFileFinan);

module.exports = router;