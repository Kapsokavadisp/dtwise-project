const { loadData } = require('./data_model');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

const port = 3005;
app.listen(port, () => console.log('server running...'));

app.get('/', (request, response) => {
  response.send('Welcome');
});

app.get('/data', (request, response) => {
  response.send(loadData());
});
