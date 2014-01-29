/**
 * Created by micah on 1/17/14.
 */
var mocha = require('mocha'),
    chai = require('chai'),
    CachedPrintioService = require('../lib/cachedprintioservice.js'),
    expect = chai.expect,
    should = chai.should();

var factory = function(){
    var c =  new CachedPrintioService({
        recipeId:'f255af6f-9614-4fe2-aa8b-1b77b936d9d6',
        url:'https://api.print.io/api/v/1/source/widget/'
    });
    return c;
};

describe('printioservice', function(){
    this.timeout(0);

    describe('ctor',function(){
       factory().service.should.exist;
    });

    describe('getProducts', function(){
        it('should get a list of products', function(done){
            factory().getProducts("US","en","USD",function(d){
                d.should.exist;
                d.Products.length.should.be.above(0);
                done();
            });
        });
    });


    describe('getProduct', function(){
        it('should get a product by url-ish name', function(done){
            factory().getProduct("Canvas-Wraps","US","en","USD",function(d){
                d.should.exist;
                done();
            });
        });
        it('should get a product by normal name', function(done){
            factory().getProduct("Canvas Wraps","US","en","USD",function(d){
                d.should.exist;
                done();
            });
        });
    });


    describe('getShipEstimate', function(){
        it('should get an estimate', function(done){
            factory().getShipEstimate(43,"US","USD",function(d){
                d.should.exist;
                d.MinPrice.should.exist;
                done();
            });
        });
    });

});