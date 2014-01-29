/**
 * Created by micah on 1/17/14.
 */
var express = require('express'),
    path = require('path'),
    ejs = require('ejs'),
    CachedPrintioService = require('./lib/cachedprintioservice.js');

// TODO: add in your recipeId
var pio = new CachedPrintioService({
        recipeId:'f255af6f-9614-4fe2-aa8b-1b77b936d9d6',
        url:'https://api.print.io/api/v/1/source/widget/'
    });

var app = express();
var port = process.env.PORT || 1337;

ejs.filters.urlify = function(str){
  return str.toLowerCase().replace(/\s/g,'-');
};

//view engine (my preference)
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,"/views"));
//static file serving
app.use('/public',express.static(path.join(__dirname , '/public')));


app.get('/',function(req,res){
    return res.redirect('/products');
});

app.get('/products',function(req,res){
    var pageData = {
        title:'Products'
    };


    return pio.getProducts(
        "en"
        ,"us"
        ,"usd"
        ,function(d){
            pageData.Products = d.Products;
            return res.render('products.ejs',pageData);
    });
});

app.get('/products/:name',function(req,res){
    var pageData = {
        title:''
    };

    // first, make a call to get the product data
    return pio.getProduct(
        req.params.name.toLowerCase()
        ,"en"
        ,"us"
        ,"usd"
        ,function(product){

            // then make a call to get the product ship estimate data
            return pio.getShipEstimate(product.Id,"us","usd",function(shipData){
                pageData.title = 'Customizable '+ product.Name;
                pageData.Product = product;
                pageData.ShipEstimate = shipData;
                pageData.url = req.protocol + "://" + req.get('host') + req.url;
                return res.render('product-details.ejs',pageData);
            });
        }
    );
});






//pre load english products
console.log('preloading products...')
pio.getProducts("us","en","USD",function(d){});
console.log('... done.');


app.listen(port);
console.log("listening on port "+port);

