const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('./app/DB/Conection');

const { json } = require('express');
app.use(json());

app.listen(1030, () => {
    console.log("Post Start...");
})

app.get('/', (req, res) => {
    res.send('<h2>JWT Backend Start...</h2>')
})
// const { verify } = require('./app/middleware/middleware');

app.use('/api', require('./app/API/singupApi'));
// app.use('/api/all-data', require('./app/API/userdata'));

