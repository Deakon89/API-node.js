const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const Product = require('../models/product'); 
const db = require('../config/db'); 

describe('Product Model', function () {
    afterEach(() => {
        // reset sinon
        sinon.restore(); 
    });
    //start simulation
    it('dovrebbe creare un prodotto', function (done) {
        const fakeProduct = {
            name: 'Test Product',
            price: 100,
            stock: 5,
            image: 'test.jpg'
        };

        const dbStub = sinon.stub(db, 'query').callsFake((sql, values, callback) => {
            callback(null, { insertId: 1 }); 
        });

        Product.create(fakeProduct, (err, result) => {
            expect(err).to.be.null;
            expect(result.insertId).to.equal(1);
            sinon.assert.calledOnce(dbStub);
            done();
        });
    });

    it('dovrebbe gestire un errore del database', function (done) {
        const fakeProduct = {
            name: 'Test Product',
            price: 100,
            stock: 5,
            image: 'test.jpg'
        };
    
        const dbStub = sinon.stub(db, 'query').callsFake((sql, values, callback) => {
            callback(new Error('Database error'), null);
        });
    
        Product.create(fakeProduct, (err, result) => {
            expect(err).to.be.an('error');
            expect(err.message).to.equal('Database error');
            expect(result).to.be.null; 
            sinon.assert.calledOnce(dbStub);
            dbStub.restore(); 
            done();
        });
    });
});