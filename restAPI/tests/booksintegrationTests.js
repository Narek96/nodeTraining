require('should');

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Book = mongoose.model('Book');
const agent = request.agent(app);

process.env.ENV = "Test";

describe('Book Crud Test:', () => {
    it('should allow a book to be posted and return read and _it',  (done) => {
      const bookPost = {title: 'My Book', author: 'Jon', genre: 'Fiction'};

      agent.post('/api/books')
        .send(bookPost)
        .expect(200)
        .end((err, results) => {
          results.body.read.should.not.equal('false');
          results.body.read.should.have.property('_id');
          done()
        });
    });

    afterEach((done) => {
      Book.deleteMany({}).exec();
      done();
    })
});
