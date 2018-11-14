require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const port = process.env.SERVER_PORT || 3002;
const app = express();

const { getCategories, getListItems, getPlaceInfo } = require('./controllers/searchData');

app.use(cors());
app.use(json());

//// Endpoint
app.get('/api/getCategories/:userInput', getCategories)
app.post('/api/getList', getListItems)
app.get('/api/getPlaceInfo/:id', getPlaceInfo)




app.listen(port, () => {
  console.log(`Server is UP and listen to port: ${ port }`)
});