const express = require('express');
const adminRouter = express.Router();
const debug = require('debug')('app:adminRouts');
const { MongoClient } = require('mongodb');

function router(nav) {
  const books = [
    {
      author: 'Lev Nikoloevich Tolstoi',
      title: 'War and peace',
      bookId: 656,
    },
    {
      author: 'Victor Hugo',
      title: 'Lev Miserables',
      bookId: 24280,
    },
    {
      author: 'Jules Verne',
      title: 'The Time Machine'
    },
    {
      author: 'Henry Kutner',
      title: 'The Dark World'
    },
    {
      author: 'Kenneth Grhame',
      title: 'The Wind in the Willows'
    }

  ];
  adminRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo(){
      let client;
      try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        debug('Connected to the server')
        const db = client.db(dbName);

        const response = await db.collection('books').insertMany(books);

        res.json(response);
      } catch (e) {
          debug(e.stack)
      }
      client.close();
    }());
  });

  return adminRouter;
}

module.exports = router;
