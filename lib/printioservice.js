/**
 * PrintioService
 *
 * Cached(memoized) access to printio api
 */
var req = require('request'),
    async = require('async');

var PrintioService = function(config){
    this._config = config;
};

/**
 * Generic function to create api endpoint URLs. Should be used for internal methods
 * @param endpoint
 * @param obj
 * @param cb
 * @returns {*}
 * @private
 */
PrintioService.prototype._get = function(endpoint,obj,cb){
    var url = this._config.url,
        final = '';
    obj = obj||{};
    obj.recipeId = this._config.recipeId;
    final = url+endpoint;
    return req.get(final,{qs:obj, json:true},cb);
};

/**
 * Get locale info about a user based on IP address
 * @param ip
 * @param cb
 * @returns {*}
 */
PrintioService.prototype.getUserInfo = function(ip,cb){
    var defaults = {
        "LanguageCode": "en",
        "CountryCode": "us",
        "CountryName": "United States",
        "CurrencyFormat": "${1}",
        "CurrencyCode": "USD",
        "CurrencyName": "United States dollar"
    };
    return this._get("userinfo",{ip:ip},function(err,res,body){
        if(err){
            return cb(defaults);
        }
        return cb(body);
    });
};

/**
 * Gets the recipe's products. Will throw any errors.
 * @param countryCode
 * @param languageCode
 * @param currencyCode
 * @param cb
 * @returns {*}
 */
PrintioService.prototype.getProducts = function(countryCode, languageCode, currencyCode, cb){
    return this._get("products",{
        countryCode:countryCode,
        languageCode:languageCode,
        currencyCode:currencyCode
    },function(err,res,body){
        if(err) throw err;
        return cb(body);
    });
};

/**
 * Get product shipping estimate
 * @param productId
 * @param countryCode
 * @param currencyCode
 * @param cb
 * @returns {*}
 */
PrintioService.prototype.getShipEstimate = function(productId, countryCode, currencyCode, cb){
    return this._get("shippriceestimate",{
        countryCode:countryCode,
        productId:productId,
        currencyCode:currencyCode
    },function(err,res,body){
        if(err) throw err;
        return cb(body);
    });
};

/**
 * Sugar over getProducts to get a specific product by its name
 * @param name
 * @param countryCode
 * @param languageCode
 * @param currencyCode
 * @param cb
 * @returns {*}
 */
PrintioService.prototype.getProduct = function(name,countryCode,languageCode,currencyCode,cb){
    return this.getProducts(countryCode,languageCode,currencyCode,function(prods){
        return cb(prods.Products.filter(function(p){
            var n1 = name.toLowerCase(),
                n2 = p.Name.toLowerCase();
            return n1===n2 || n1 === n2.replace(/\s/g,"-");
        })[0]);
    });
};







/**
 * Cached/memoized versions of the above functions
 *
 */




module.exports = PrintioService;
