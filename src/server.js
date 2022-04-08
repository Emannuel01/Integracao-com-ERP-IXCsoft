const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: true }));

app.use(router);
app.use('/pdf', express.static('./src/views/files/finan.pdf'));

app.listen(3000);
console.log('server run 3000')