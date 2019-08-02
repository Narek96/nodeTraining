const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');
const sql = require('mssql');


const app = express();
const port = process.env.PORT || 3000;

const config = {
  user: 'librar',
  password: 'narek_12',
  server: 'pslibrar.database.windows.net',
  database: 'PSLibrary',
  options : {
    encrypt : true
  }
};

const nav = [
  {link: '/books', title: 'Books'},
  {link: '/authors',title: 'Authors'}
];

const bookRouter = require('./src/routes/bookRouts')(nav);

sql.connect(config).catch(err => debug(err));

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render('index',
    {
      nav,
      title: "Library"
    }
      )
});

app.listen(port, () => {
  debug('Server running on port ' + chalk.green(port))
});
