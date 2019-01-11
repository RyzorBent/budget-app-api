const express = require('express');
app = express();
port = process.env.PORT || 3005;
bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const RecordRoutes = require('./routes/Records');

app.get('/', (req, res) => {
    res.send('hello from root route');
});

app.use('/api/records', RecordRoutes);

app.listen(port, () => {
    console.log(`budget app running on port: 3005 `);
});