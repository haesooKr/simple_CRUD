require('./models/db.js')
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');
const path = require('path');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser')

const employeeController = require('./controllers/employeeController');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ 
  extname: 'hbs', 
  defaultLayout: 'mainLayout', 
  layoutsDir: __dirname + '/views/layouts/', 
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'hbs');

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
})

app.use('/employee', employeeController)

app.get('/', (req, res) => {
  res.send('Simple Crud Home.')
})