const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const graph = require('./src/app');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/', (req, res) => {
    const { data } = req.body;
    if (!data) {
        res.status(400);
        return res.end();
    }
    const input = Array.isArray(data) ? data : data.split('\n');
    const buffer = graph(input);
    res.type('image/png');
    res.send(buffer);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))