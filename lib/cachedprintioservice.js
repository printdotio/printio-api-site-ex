var async = require('async'),
    PrintioService = require('./printioservice.js');


/**
 * A proxy to PrintioService that provides caching of oft-used functions
 * @param config
 * @constructor
 */
var CachedPrintioService = function(config){
    var self = this;
    this.service = new PrintioService(config);

    this.getProducts = async.
        memoize(function(){
            return self.service.getProducts.apply(self.service,arguments);
        },function(a,b,c){
            return a+"-"+b+"-"+c;
        });

    this.getProduct = async
        .memoize(function(){
            return self.service.getProduct.apply(self.service,arguments);
        },function(a,b,c){
            return a+"-"+b+"-"+c;
        });

    this.getShipEstimate = async
        .memoize(function(){
            return self.service.getShipEstimate.apply(self.service,arguments);
        },function(a,b,c){
            return a+"-"+b+"-"+c;
        });
};


module.exports = CachedPrintioService;

