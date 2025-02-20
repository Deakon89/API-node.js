const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const Order = require('../models/orders_item');
const app = require('../app');
const request = require('supertest');

describe('Order Routes', function() {
    let createStub, getAllStub, getByUserIdStub;

    beforeEach(() => {
        // creating stub function
        createStub = sinon.stub(Order, 'create');
        getAllStub = sinon.stub(Order, 'getAll');
        getByUserIdStub = sinon.stub(Order, 'getByUserId');
    });

    afterEach(() => {

        // reset stub
        sinon.restore();
    });
        // start simulation
    it('dovrebbe creare un ordine con i dati validi', function(done) {
        createStub.yields(null, { insertId: 1 });

        request(app)
            .post('/api/orders_item')
            .send({ user_id: 1, product_id: 2, quantity: 3 })
            .expect(201)
            .end((err, res) => {
                expect(res.body).to.have.property('orderId', 1);
                sinon.assert.calledOnce(createStub);
                done();
            });
    });

    it('dovrebbe restituire un errore 400 se mancano parametri', function(done) {
        request(app)
            .post('/api/orders_item')
            .send({ user_id: 1, product_id: 2 }) 
            .expect(400, done);
    });

    it('dovrebbe restituire tutti gli ordini', function(done) {
        getAllStub.yields(null, [{ id: 1, user_id: 1, product_id: 2, quantity: 3 }]);

        request(app)
            .get('/api/orders_item')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(1);
                sinon.assert.calledOnce(getAllStub);
                done();
            });
    });

    it('dovrebbe restituire gli ordini di un utente specifico', function(done) {
        getByUserIdStub.yields(null, [{ id: 1, user_id: 1, product_id: 2, quantity: 3 }]);

        request(app)
            .get('/api/orders_item/user/1')
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.property('user_id', 1);
                sinon.assert.calledOnce(getByUserIdStub);
                done();
            });
    });
});
