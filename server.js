require('./models/db.js')
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const express = require('express');

const app = express();

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
})