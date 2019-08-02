const express = require('express');
const bookRouter = express.Router();
const debug = require('debug')('app:bookRouts');
const { MongoClient, ObjectID } = require('mongodb');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadService');

function booksRouter(nav) {
  const { getIndex, getById, middleware } = bookController(nav, bookService);

  bookRouter.use(middleware);

  bookRouter.route('/').get(getIndex);
  bookRouter.route('/:id').get(getById);

  return bookRouter;
}

module.exports = booksRouter;
