const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

if (process.env.ENV === "Test") {
  const db = mongoose.connect('mongodb://localhost/restAPI_Test');
} else {
  const db = mongoose.connect('mongodb://localhost/restAPI');
}
const Book = require('./models/bookModel');

const bookRouter = require('./routes/bookRoutes')(Book);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
