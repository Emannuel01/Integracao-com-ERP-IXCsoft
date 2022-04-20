const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: true }));

app.use(router);
app.use('/app/', express.static('./src/views/'));
app.use('/app/login', express.static('./src/views/login.html'));
app.use('/app/system', express.static('./src/views/system.html'));


app.listen(3000);
console.log('server run 3000');
