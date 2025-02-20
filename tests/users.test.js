const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app'); 
const User = require('../models/user');

describe('User API', () => {
  let createStub;

  beforeEach(() => {
    // stub create function
    createStub = sinon.stub(User, 'create');
  });

  afterEach(() => {
    // reset stub
    createStub.restore();
  });

  it('should create a user with valid data', (done) => {
    const mockResult = { insertId: 1 }; // simulation
    createStub.yields(null, mockResult);

    request(app)
      .post('/api/users')
      .send({ name: 'John Doe', email: 'john@example.com' })
      .expect(201)
      .expect((res) => {
        expect(res.body.message).to.equal('user created');
        expect(res.body.id).to.equal(mockResult.insertId);
      })
      .end(done);
  });

  it('should return a 500 error if database fails', (done) => {
    const mockError = new Error('database error');
    createStub.yields(mockError, null); // database err sumulation

    request(app)
      .post('/api/users')
      .send({ name: 'John Doe', email: 'john@example.com' })
      .expect(500)
      .expect((res) => {
        expect(res.body.error).to.equal('database error');
      })
      .end(done);
  });
});