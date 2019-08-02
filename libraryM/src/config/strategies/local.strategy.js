const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url, { useNewUrlParser: true });
          debug('Connected to the server');
          const db = client.db(dbName);

          const collection = await db.collection('users');
          const user = await collection.findOne({ username });

          if (user.password === password) {
            done(null, user)
          } else {
            done(null, false)
          }
        } catch (e) {
          debug(e.stack)
        }
        client.close();
      }());
      const  user = {
        username, password
      };
      done(null, user);
    }
  ));
};
