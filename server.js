require('./models/db.js')
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')

const employeeController = require('./controllers/employeeController');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("./public/css/"))
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
})

app.use('/employee', employeeController)