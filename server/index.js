require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const port = process.env.SERVER_PORT || 3002;
const app = express();

app.use(cors());
app.use(json());


app.listen(port, () => {
  console.log(`Server is UP and listen to port: ${ port }`)
});